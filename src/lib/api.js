import { is_login, accessToken, keyBufferSto, ivSto } from "./store.js"

import { get } from 'svelte/store'
import { push } from 'svelte-spa-router'
import axios from 'axios'

// RestAPI 호출 함수 from. Woody
// type -> v0, v1, v2 형태를 선택
// operation -> post 및 get 입력
// url -> 호출할 api 주소
// dataType -> RequestBody받을 경우 "body" 입력, Param값 일 경우 "param" 입력, 보낼 값이 없을 경우 ""(공백) 입력
// sendData -> 보낼데이터
// content_type -> 컨텐츠 타입
// success_callback -> 통신이 성공했을 경우
// failure_callback -> 통신이 실패했을 경우
const restapi = (type, operation, url, dataType, sendData, content_type, success_callback, failure_callback) => {

    let method = operation;

    let data;
    let param;
    if(dataType === "body") {
        data = JSON.stringify(sendData);
    } else if(dataType === "param") {
        param = sendData;
    } else if(dataType === "multi") {
        data = sendData;
    }

    let headers = {};
    
    // if(type === 'v2' || type === 'v3') {
    if(type === 'v2') {
        // type이 'v2', 'v3' 일 경우 -> JWT토큰 필수
        headers["Authorization"] = get(accessToken);
    } else if(type === 'v3') {
        headers["ApiKey"] = "ff5873bbf9faa2218b369a577ea9e452";
    } else if(type === 'login') {
        headers["keyBufferSto"] = get(keyBufferSto);
        headers["ivSto"] = get(ivSto);
    }

    // type이 'v0' 일 경우 -> JWT토큰 불필요

    if(operation === 'logout') {
        method = 'post'
    }

    headers["Content-type"] = content_type
    let _url = import.meta.env.VITE_SERVER_URL+url
    axios({
        url: _url,
        method: method,
        params : param,
        data : data,
        headers: headers,
        withCredentials: true, // 쿠키 값 보내기 설정
    })
    .then(response => {

        // 토큰만료시 재발급
        let newJwtAccessToken = response.headers.get("Authorization");
        if(newJwtAccessToken !== null && newJwtAccessToken !== undefined) {
            accessToken.set(newJwtAccessToken);
        }

        if(response.data.status === 200) {
            success_callback(response)
        } else {
            if (operation === 'logout' && response.data.status === 500) { // token time out
                // accessToken.set('')
                // refreshToken.set('')
                // refreshTokenExpirationTime.set('')
                // is_login.set(false)
                alert(response.data.err_msg)
                push('/login')
            }
            else if(response.data.status === 500) {
                success_callback(response)
            }
            else {
                failure_callback(response)
            }
        }
    })
    .catch(error => {
        if(operation !== 'logout') {
            if(error.response.status === 401) {
                alert("인증되지 않은 사용자입니다. 다시 로그인해주세요.");
                is_login.set(false)
                push('/login')
            } else if(error.response.status === 403) {
                failure_callback();
                // alert("접근 권한이 없습니다.");
            }else if(error.response.status === 400) {
                failure_callback();
                alert("전송한 파라메터 데이터가 일치하지 않습니다.")
            }else {
            }
        } else {
            is_login.set(false)
            push('/login')
        }
    })
}

export default restapi
