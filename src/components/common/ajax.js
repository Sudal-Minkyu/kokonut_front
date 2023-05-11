import {is_login, accessToken} from "../../lib/store.js";
import { get } from 'svelte/store';
import axios from 'axios';

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

// RestAPI 호출 함수 from. Woody, mod. Joffrey
// 호출 주소 앞단은 크게 v0, v1, v2 세 종류로 나뉘며 v0은 인증없이 접근할 수 있다.
// url -> 호출할 api 주소
// data, params -> 보낼데이터
// contentType -> 컨텐츠 타입
// handleSuccess -> 통신이 성공했을 경우
// handleFail -> 통신이 실패했을 경우
const restapi = ({url, handleSuccess, handleFail, method, data, params, contentType}) => {
    const headers = {};
    headers["Content-Type"] = contentType;

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
        withCredentials: true, // 쿠키 값 보내기 설정
    }).then(response => {
        // 토큰만료시 재발급
        let newJwtAccessToken = response.headers.get("Authorization");
        if (newJwtAccessToken !== null && newJwtAccessToken !== undefined) {
            accessToken.set(newJwtAccessToken);
            // console.log("새로발급한 토큰 : "+newJwtAccessToken);
        }

        if (response.data.status === 200) {
            // console.log("Rest API 호출 성공");
            handleSuccess(response);
        } else {
            if (response.data.status === 500) {
                handleSuccess(response);
            } else {
                console.log(response);
                console.log("무슨 에러인지 확인해보세요.1");
                handleFail(response);
            }
        }
    }).catch(error => {
        console.log("Rest API 에러캣치");
        console.log(error);
        if (operation !== 'logout') {
            if (error.response.status === 401) {
                alert("인증되지 않은 사용자입니다. 다시 로그인해주세요.");
                is_login.set(false);
                location.href = '/login';
            } else if (error.response.status === 403) {
                handleFail();
                // alert("접근 권한이 없습니다.");
            } else if (error.response.status === 400) {
                handleFail();
                alert("전송한 파라메터 데이터가 일치하지 않습니다.");
            } else {
                console.log("무슨 에러인지 확인해보세요.2");
                console.log(error);
            }
        } else {
            is_login.set(false);
            location.href = '/login';
        }
    });
};