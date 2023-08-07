import {accessToken, is_login, userInfoData, initialUserInfo} from "../../lib/store.js";
import {ajaxParam} from "./ajax.js";
import {get} from "svelte/store";

export const logout = () => {
    let sendData = {
        accessToken : get(accessToken),
    }

    ajaxParam('/v1/api/Auth/logout', sendData, (json_success) => {
        initializingUserData();
    }, (errorCode) => {
        return {
            action: 'ERRORDO',
        }
    });
}

// 기본값 초기화처리
const initializingUserData = () => {
    userInfoData.set(JSON.parse(initialUserInfo));
    is_login.set(false);
    accessToken.set('');
    location.href = location.origin + '/#/login';
}