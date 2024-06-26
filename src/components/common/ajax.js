import {accessToken, is_login, ivSto, keyBufferSto} from "../../lib/store.js";
import {get} from 'svelte/store';
import axios from 'axios';
import {openConfirm} from "./ui/DialogManager.js";
import {logout} from "./authActions.js";
import {push, location as spaLocation} from "svelte-spa-router";

const pendingRequests = new Map();

// GET 방식 호출, 보낼 데이터가 없다면 false 나 빈문자 등으로 보낼 것
export const ajaxGet = (url, sendData = {}, handleSuccess = () => {}, handleFail = () => {}) => {
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'get',
        params: typeof sendData === 'object' ? sendData : {},
        contentType: 'application/json',
    });
};

// json 형태의 파라메터를 post 형태로 전송할 경우 (백엔드에서 PARAM으로 받는 경우)
export const ajaxParam = (url, sendData = {}, handleSuccess = () => {}, handleFail = () => {}) => {
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        params: sendData,
        contentType: 'application/json',
    });
};

// json 형태의 파라메터를 body 형태로 전송할 경우 (백엔드에서 BODY로 받는 경우)
export const ajaxBody = (url, sendData = {}, handleSuccess = () => {}, handleFail = () => {}) => {
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        data: JSON.stringify(sendData),
        contentType: 'application/json',
    });
};

// 파일 전송이나 폼데이터를 보내기 위함
export const ajaxMultipart = (url, sendData = new FormData(), handleSuccess = () => {}, handleFail = () => {}) => {
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        data: sendData,
        contentType: 'multipart/form-data',
    });
};

// body와 param 두가지 동시에 받는 일부 경우 사용
export const ajaxExcelBodyParam = (url, sendData = {}, sendParams = {}, handleSuccess = () => {}, handleFail = () => {}) => {
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        params: sendParams,
        data: JSON.stringify(sendData),
        contentType: 'application/json',
    });
}

// 테스터용 개인정보 추가 페이지에서만 사용
export const ajaxRegister = (url, sendData = {}, apiKey, handleSuccess = () => {}, handleFail = () => {}) => {

    restapi({
        url,
        handleSuccess,
        handleFail,
        apiKey,
        method: 'post',
        data: JSON.stringify(sendData),
        contentType: 'application/json',
    });
};

export const ajaxParamArray = (url, sendData = {}, handleSuccess = () => {}, handleFail = () => {}) => {
    let params = new URLSearchParams();

    for (let key in sendData) {
        if (Array.isArray(sendData[key])) {
            sendData[key].forEach(value => {
                params.append(`${key}`, value);
            });
        } else {
            params.append(key, sendData[key]);
        }
    }
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        data: params,
        contentType: 'application/x-www-form-urlencoded',
    });
};

export const reportCatch = (name, e) => {
    if (e && e.stack) {
        errorReport('try/catch : ' + name, e.stack);
    } else {
        errorReport('try/catch : ' + name, e.message);
    }
}

let connectionErrorCallCnt = 0;
let connectionErrorTimeoutStore = null;

// RestAPI 호출 함수 from. Woody, mod. Joffrey
// 호출 주소 앞단은 크게 v0, v1, v2 세 종류로 나뉘며 v0은 인증없이 접근할 수 있다.
// url -> 호출할 api 주소
// data, params -> 보낼데이터
// contentType -> 컨텐츠 타입
// handleSuccess -> 호출이 성공했을 경우
// handleFail -> 호출이 실패했을 경우, 반환되는 객체가 있다면 에러에 대한 처리에 사용한다.
//            -> 반환값 {action: 에러에 대해서 취할 공통액션(errorActionTypes 참조), message: 팝업으로 전달할 메시지 }
const restapi = ({url, handleSuccess, handleFail, method, data, params, contentType, apiKey}) => {
    const headers = configureHeaders(url, contentType, apiKey);
    const requestConfig = {
        url: import.meta.env.VITE_SERVER_URL + url,
        method,
        params,
        data,
        headers,
        withCredentials: true,
        timeout: 10000,
    };

    const configString = JSON.stringify(requestConfig);
    if (pendingRequests.has(configString)) {
        return;
    }

    pendingRequests.set(configString, true);

    axios(requestConfig).then(okRes => {
        try {
            pendingRequests.delete(configString);
            let newJwtAccessToken = okRes.headers.get("Authorization");
            if (newJwtAccessToken) {
                accessToken.set(newJwtAccessToken);
            }

            if (okRes.data.status === 200) {
                handleSuccess(okRes);
            } else {
                handleResponseError(okRes, handleSuccess, handleFail);
            }
        } catch (e) {
            reportCatch('temp142', e);
        }
    }).catch(errorRes => {
        pendingRequests.delete(configString);
        try {
            if (errorRes.code === "ECONNABORTED") {
                handleOnConnectionError(errorRes, handleSuccess, handleFail);
            } else {
                handleAxiosError(errorRes, handleSuccess, handleFail);
            }
        } catch (e) {
            reportCatch('temp006', e);
        }
    });
};

// 사용자 요청 시간이 오래 지난 경우 작동할 디바운싱화된 함수
const handleOnConnectionError = (errorRes, handleSuccess, handleFail) => {
    if (connectionErrorTimeoutStore) {
        clearTimeout(connectionErrorTimeoutStore);
        connectionErrorTimeoutStore = null;
    }

    connectionErrorCallCnt++;
    connectionErrorTimeoutStore = setTimeout(() => { // 아래에 실질적으로 일어날 동작의 정의
        if (connectionErrorCallCnt > 1) {
            handleMultipleConnectionError(errorRes);
        } else {
            handleSingleConnectionError(errorRes, handleSuccess, handleFail);
        }
        connectionErrorCallCnt = 0;
    }, 1000);
}

// 하나의 요청만 타임아웃으로 실패한 경우 호출됨
const handleSingleConnectionError = (errorRes, handleSuccess, handleFail) => {
    alert('서버와의 통신이 원활하지 않습니다. 인터넷 연결을 확인하시고 확인을 눌러 주세요.');
    handleAxiosError(errorRes, handleSuccess, handleFail);
    window.location.reload();
}

// 한번에 여러개의 요청이 타임아웃으로 실패한 경우 호출됨
const handleMultipleConnectionError = (errorRes) => {
    if(get(is_login)) {
        if(get(spaLocation) === '/service') {
            handleAxiosError(errorRes, ()=>{}, ()=>{});
            alert('서버와의 통신이 원활하지 않습니다. 인터넷 연결을 확인하시고 확인을 눌러 새로고침 합니다.');
            window.location.reload();
        } else {
            handleAxiosError(errorRes, ()=>{}, ()=>{});
            push('/service');
            alert('서버와의 통신이 원활하지 않습니다. 인터넷 연결을 확인하시고 확인을 눌러 메인 페이지로 이동합니다.');
        }
    } else {
        if(get(spaLocation) === '/login') {
            handleAxiosError(errorRes, ()=>{}, ()=>{});
            alert('서버와의 통신이 원활하지 않습니다. 인터넷 연결을 확인하시고 확인을 눌러 새로고침 합니다.');
            window.location.reload();
        } else {
            handleAxiosError(errorRes, ()=>{}, ()=>{});
            push('/login');
            alert('서버와의 통신이 원활하지 않습니다. 인터넷 연결을 확인하시고 확인을 눌러 로그인 페이지로 이동합니다.');
        }
    }
}

// 헤더 설정
const configureHeaders = (url, contentType, apiKey) => {
    const headers = {};
    headers["Content-Type"] = contentType;

    if (url.slice(0, 5).includes('v2/') || url.slice(0, 5).includes('v4/')) { // v2는 인증이 필요한 api 호출에 사용
        headers["Authorization"] = get(accessToken);
    } else if (url.slice(0, 5).includes('v1/')) { // v1은 인증이 불필요한 api 호출에 사용
        headers["keyBufferSto"] = get(keyBufferSto);
        headers["ivSto"] = get(ivSto);
    } else if (url.slice(0, 5).includes('v3/')) {
        headers["x-api-key"] = apiKey;
    }
    return headers;
};


// 백엔드에서 직접 설정한 응답이 도착했으나 실패를 알릴 때
const handleResponseError = (okRes, handleSuccess, handleFail) => {
    const code = okRes.data.err_code;
    const handleFailResult = handleFail(code, okRes.data.err_msg);
    const actionString = handleFailResult?.action || okRes.data.err_action || '';
    const actionSymbol = errorActionTypes[actionString.toUpperCase()];
    const action = actionSymbol ? actionSymbol : errorActionDictionary[code] || errorActionTypes.ERROR;
    const message = handleFailResult?.message || okRes.data.err_msg || '';
    makeUIResponse(action, message, code, handleSuccess);
    errorReport('ok상태에러 - 사용자환경 : ' + navigator.userAgent, JSON.stringify(okRes));
};

// 엑시오스와 기본백엔드 응답애러가 발생했을 때
const handleAxiosError = (errorRes, handleSuccess, handleFail) => {
    if (errorRes.response) {
        const status = errorRes.response.status;
        const handleFailResult = handleFail(status, createMsgByErrorStatus(status));
        const actionString = handleFailResult?.action || '';
        const actionSymbol = errorActionTypes[actionString.toUpperCase()];
        const action = actionSymbol ? actionSymbol : errorActionDictionary[status] || errorActionTypes.ERROR;
        const message = handleFailResult?.message || createMsgByErrorStatus(status) || '';
        makeUIResponse(action, message, status, handleSuccess);
        errorReport('실패에러 - 사용자환경 : ' + navigator.userAgent, JSON.stringify(errorRes));
    } else {
        handleFail({}); // 분석하여 조치 필요
    }
};

const openError = (message, errorCode = '', callback = () => {}) => {
    openConfirm({
        icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
        title: `오류${errorCode ? ' (' + errorCode + ')' : '' }`, // 제목 - 백엔드의 에러 code
        contents1: message, // 내용 - 백엔드의 에러 desc
        contents2: '',
        btnCheck: '확인', // 확인 버튼의 텍스트
        callback,
    });
}

const openInfo = (message, errorCode = '', callback = () => {}) => {
    openConfirm({
        icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
        title: `알림${errorCode ? ' (' + errorCode + ')' : ''}`, // 제목
        contents1: message, // 내용 - 백엔드의 에러 desc
        contents2: '',
        btnCheck: '확인', // 확인 버튼의 텍스트
        callback,
    });
}

// 에러 형태에 따른 화면단의 처리를 결정
const makeUIResponse = (action, message, errorCode, handleSuccess) => {
    switch (action) {
        case errorActionTypes.INFO:
            openInfo(message);
            break;
        case errorActionTypes.ERROR:
            openError(message, errorCode);
            break;
        case errorActionTypes.MAIN:
            openError(message, errorCode, () => {
                window.location.href = '/#/service';
            });
            break;
        case errorActionTypes.LOGIN:
            openError(message, errorCode, () => {
                logout();
            });
            break;
        case errorActionTypes.UP:
            openError(message, errorCode, () => {
                const li = window.location.href.lastIndexOf('/');
                window.location.href = window.location.href.substring(0, li);
            });
            break;
        case errorActionTypes.REFRESH:
            openError(message, errorCode, () => {
                window.location.reload();
            });
            break;
        case errorActionTypes.INFODO:
            openInfo(message, errorCode, () => {
                handleSuccess({data: {msg: '에러가 발생했지만 성공 진행'}});
            });
            break;
        case errorActionTypes.ERRORDO:
            openError(message, errorCode, () => {
                handleSuccess({data: {msg: '에러가 발생했지만 성공 진행'}});
            });
            break;
        case errorActionTypes.NONE:
            break;
        default:
            openError(message, errorCode);
            break;
    }
}

// 엑시오스에서 반환받는 기본에러의 메시지 설정
const createMsgByErrorStatus = (status) => {
    let msg = '';
    switch (status) {
        case 400:
            msg = '전송한 파라메터 데이터가 일치하지 않습니다.';
            break;
        case 401:
            msg = '인증되지 않은 사용자입니다. 다시 로그인해주세요.';
            break;
        case 403:
            msg = '해당기능을 사용할 수 있는 권한이 없습니다.';
            break;
        case 404:
            msg = '요청한 기능의 경로가 잘못되었습니다. 관리자에게 문의해 주시기를 바랍니다.';
            break;
        default:
            msg = `${status} 에러가 발생하였습니다.`;
            break;
    }
    return msg;
}

const errorActionTypes = {
    INFO: Symbol('INFO'), // 알림 메시지 표출 후 추가 동작 없음
    ERROR: Symbol('ERROR'), // 에러 메시지 표출 후 추가 동작 없음
    MAIN: Symbol('MAIN'), // 에러 메시지 표출 후 확인시 메인화면 이동
    LOGIN: Symbol('LOGIN'), // 에러 메시지 표출 후 확인시 로그아웃과 함께 로그인화면 이동
    UP: Symbol('UP'), // 에러 메시지 표출 후 확인시 상위 경로로 이동
    REFRESH: Symbol('REFRESH'), // 에러 메시지 표출 후 확인시 현재 경로 재진입
    INFODO: Symbol('INFODO'), // 알림 메시지 표출 후 성공시의 동작 수행
    ERRORDO: Symbol('ERRORDO'), // 에러 메시지 표출 후 성공시의 동작 수행
    NONE: Symbol('NONE'), // 아무 동작 안함
}

// 반환받을 수 있는 에러 코드와 해당 에러코드가 도착했들 때 기본적으로 행동할 방식의 정의
// 여기에 정의되어있지 않은 경우 기본적으로 ERROR 방식으로 처리된다.
const errorActionDictionary = {
    400: errorActionTypes.ERROR,
    401: errorActionTypes.NONE,
    403: errorActionTypes.ERROR,
    404: errorActionTypes.ERROR,
    KO000: errorActionTypes.MAIN,
    KO001: errorActionTypes.MAIN,
    KO002: errorActionTypes.MAIN,
    KO003: errorActionTypes.INFO,
    KO004: errorActionTypes.INFO,
    KO005: errorActionTypes.INFO,
    KO006: errorActionTypes.LOGIN,
    KO007: errorActionTypes.LOGIN,

    KO009: errorActionTypes.LOGIN,
    KO010: errorActionTypes.ERROR,
    KO011: errorActionTypes.INFO,
    KO012: errorActionTypes.INFO,
    KO013: errorActionTypes.INFO,
    KO014: errorActionTypes.ERROR,
    KO015: errorActionTypes.INFO,
    KO016: errorActionTypes.INFO,
    KO017: errorActionTypes.INFO,
    KO018: errorActionTypes.INFO,
    KO019: errorActionTypes.INFO,
    KO020: errorActionTypes.ERROR,
    KO021: errorActionTypes.ERROR,
    KO022: errorActionTypes.ERROR,
    KO023: errorActionTypes.ERROR,
    KO024: errorActionTypes.INFO,
    KO025: errorActionTypes.INFO,
    KO026: errorActionTypes.ERROR,
    KO027: errorActionTypes.ERROR,
    KO028: errorActionTypes.ERROR,
    KO029: errorActionTypes.ERROR,
    KO030: errorActionTypes.ERROR,
    KO031: errorActionTypes.ERROR,
    KO032: errorActionTypes.ERROR,

    KO033: errorActionTypes.INFO,
    KO034: errorActionTypes.INFO,
    KO035: errorActionTypes.INFO,
    KO036: errorActionTypes.ERROR,

    KO038: errorActionTypes.INFO,
    KO039: errorActionTypes.ERROR,

    KO040: errorActionTypes.ERROR,
    KO041: errorActionTypes.ERROR,
    KO042: errorActionTypes.ERROR,

    KO043: errorActionTypes.ERROR,
    KO044: errorActionTypes.INFO,
    KO045: errorActionTypes.ERROR,
    KO046: errorActionTypes.INFO,

    KO047: errorActionTypes.ERROR,
    KO048: errorActionTypes.ERROR,

    KO049: errorActionTypes.ERROR,
    KO050: errorActionTypes.ERROR,

    KO051: errorActionTypes.ERROR,
    KO052: errorActionTypes.ERROR,

    KO053: errorActionTypes.ERROR,
    KO054: errorActionTypes.ERROR,
    KO055: errorActionTypes.UP,

    KO056: errorActionTypes.ERROR,

    KO057: errorActionTypes.ERROR,

    KO058: errorActionTypes.ERROR,
    KO059: errorActionTypes.ERROR,
    KO060: errorActionTypes.INFO,
    KO061: errorActionTypes.INFO,
    KO062: errorActionTypes.ERROR,
    KO063: errorActionTypes.ERROR,
    KO064: errorActionTypes.INFO,
    KO065: errorActionTypes.INFO,
    KO066: errorActionTypes.INFO,
    KO067: errorActionTypes.ERROR,
    KO068: errorActionTypes.ERROR,
    KO069: errorActionTypes.ERROR,
    KO070: errorActionTypes.ERROR,
    KO071: errorActionTypes.ERROR,
    KO072: errorActionTypes.INFO,
    KO073: errorActionTypes.ERROR,

    KO074: errorActionTypes.INFO,
    KO075: errorActionTypes.INFO,
    KO076: errorActionTypes.INFO,

    KO077: errorActionTypes.INFO,

    KO078: errorActionTypes.INFO,
    KO079: errorActionTypes.INFO,
    KO080: errorActionTypes.ERROR,
    KO081: errorActionTypes.ERROR,
    KO082: errorActionTypes.ERROR,
    KO083: errorActionTypes.INFO,

    KO084: errorActionTypes.ERROR,
    KO085: errorActionTypes.ERROR,
    KO086: errorActionTypes.INFO,

    KO087: errorActionTypes.INFO,
    KO088: errorActionTypes.INFO,
    KO089: errorActionTypes.INFO,

    KO090: errorActionTypes.ERROR,

    KO091: errorActionTypes.ERROR,

    KO092: errorActionTypes.ERROR,
    KO093: errorActionTypes.INFO,
}

// 프론트 엔드의 에러를 백엔드 서버에 수집하기 위함
const errorReport = (etTitle, etMsg) => {
    if (get(accessToken)) {
        fetch(import.meta.env.VITE_SERVER_URL + '/v2/api/Error/errorSave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get(accessToken) // Authorization 헤더 추가
            },
            body: JSON.stringify({etTitle, etMsg})
        });
    }
}