import {
    is_login,
    accessToken,
    knNameHeader,
    knEmailHeader,
    cpNameSider,
    page,
    knPhoneNumber,
} from "../../lib/store.js";
import { get } from 'svelte/store';
import axios from 'axios';
import {openConfirm} from "./ui/DialogManager.js";
import {logout} from "./authActions.js";

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

export const ajaxMultipart = (url, sendData = {}, handleSuccess = () => {}, handleFail = () => {}) => {
    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        data: sendData,
        contentType: 'multipart/form-data',
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
    console.log(params.toString());

    restapi({
        url,
        handleSuccess,
        handleFail,
        method: 'post',
        data: params,
        contentType: 'application/x-www-form-urlencoded',
    });

};

// RestAPI 호출 함수 from. Woody, mod. Joffrey
// 호출 주소 앞단은 크게 v0, v1, v2 세 종류로 나뉘며 v0은 인증없이 접근할 수 있다.
// url -> 호출할 api 주소
// data, params -> 보낼데이터
// contentType -> 컨텐츠 타입
// handleSuccess -> 호출이 성공했을 경우
// handleFail -> 호출이 실패했을 경우, 반환되는 객체가 있다면 에러에 대한 처리에 사용한다.
//            -> 반환값 {action: 에러에 대해서 취할 공통액션(errorActionTypes 참조), message: 팝업으로 전달할 메시지 }
const restapi = ({url, handleSuccess, handleFail, method, data, params, contentType}) => {
    const headers = {};
    headers["Content-Type"] = contentType;

    // 토큰관리를 쿠키로 이전하고 나면 삭제
    // type이 'v0' 일 경우 -> JWT토큰 불필요
    if (url.slice(0, 5).includes('v2/')) {
        // type이 'v2', 'v3' 일 경우 -> JWT토큰 필수
        headers["Authorization"] = get(accessToken);
    } else if(url.slice(0, 5).includes('v3/')) {
        headers["ApiKey"] = "ff5873bbf9faa2218b369a577ea9e452";
    }

    axios({
        url: import.meta.env.VITE_SERVER_URL + url,
        method,
        params,
        data,
        headers,
        withCredentials: true,
    }).then(okRes => {
        // 토큰만료시 재발급, 추후 토큰관리를 쿠키로 이전하고 나면 삭제
        let newJwtAccessToken = okRes.headers.get("Authorization");
        if (newJwtAccessToken !== null && newJwtAccessToken !== undefined) {
            accessToken.set(newJwtAccessToken);
        }

        // ajax 호출 성공시 자동 로그아웃 시간 초기화
        // 같은 객체를 다시 할당하는 이유는, 자동 로그아웃이 해당 변수의 변경을 감지하여 작동하도록 하였기 때문


        if (okRes.data.status === 200) {
            handleSuccess(okRes);
        } else {
            const code = okRes.data.err_code;
            const handleFailResult = handleFail(code);
            const actionString = handleFailResult?.action || okRes.data.err_action || '';
            const actionSymbol = errorActionTypes[actionString.toUpperCase()];
            const action = actionSymbol ? actionSymbol : errorActionDictionary[code] || errorActionTypes.ERROR;
            const message = handleFailResult?.message || okRes.data.err_msg || '';
            makeUIResponse(action, message, code, handleSuccess);
        }
    }).catch(errorRes => {
        console.log('ErrorResponse', errorRes);
        try {
            if (errorRes.response) {
                const status = errorRes.response.status;
                const handleFailResult = handleFail(status);
                const actionString = handleFailResult?.action || '';
                const actionSymbol = errorActionTypes[actionString.toUpperCase()];
                const action = actionSymbol ? actionSymbol : errorActionDictionary[status] || errorActionTypes.ERROR;
                const message = handleFailResult?.message || createMsgByErrorStatus(status) || '';
                makeUIResponse(action, message, status, handleSuccess);
            } else {
                handleFail({}); // 분석하여 조치 필요
            }
        } catch (e) {
            console.log('에러 발생', e);
        }
    });
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
                location.href = '/#/service';
            });
            break;
        case errorActionTypes.LOGIN:
            openError(message, errorCode, () => {
                logout();
            });
            break;
        case errorActionTypes.UP:
            openError(message, errorCode, () => {
                const li = location.href.lastIndexOf('/');
                location.href = location.href.substring(0, li);
            });
            break;
        case errorActionTypes.REFRESH:
            openError(message, errorCode, () => {
                location.reload();
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
    NONE: Symbol('NONE'),
}

const errorActionDictionary = {
    400: errorActionTypes.ERROR,
    401: errorActionTypes.LOGIN,
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