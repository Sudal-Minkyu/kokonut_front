import {accessToken, is_login, userInfoData, initialUserInfo, expireDate, emailSave} from "../../lib/store.js";
import {ajaxParam, reportCatch} from "./ajax.js";
import {get} from "svelte/store";
import {push} from "svelte-spa-router";

export const logout = () => {
    let sendData = {
        accessToken : get(accessToken),
    }

    ajaxParam('/v1/api/Auth/logout', sendData, (json_success) => {
        try {
            initializingUserData();
        } catch (e) {
            reportCatch('temp007', e);
        }
    }, (errorCode) => {
        try {
            return {
                action: 'ERRORDO',
            }
        } catch (e) {
            reportCatch('temp008', e);
        }
    });
}

// 기본값 초기화처리
const initializingUserData = () => {
    userInfoData.set(JSON.parse(initialUserInfo));
    accessToken.set('');
    is_login.set(false);
    expireDate.set(null);
    push('/login');
}