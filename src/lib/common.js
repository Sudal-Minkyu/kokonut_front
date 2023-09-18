
import VerEx from 'verbal-expressions';
import jQuery from "jquery";
import {keyBufferSto, ivSto} from "./store.js"

// 핸드폰 정규식 함수 -> true, false 반환
function phoneNumver(number) {

    const check = VerEx().startOfLine()
        .range('0', '9')
        .repeatPrevious(3)
        .maybe('-')
        .range('0', '9')
        .repeatPrevious(4)
        .maybe('-')
        .range('0', '9')
        .repeatPrevious(4)
        .endOfLine();

    return check.test(number)
}

// IP 형식 체크 -> true, false 반환
const filter = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
function ipCheck(ip_addr) {
    if (filter.test(ip_addr) === true){
        return false;
    } else{
        return true;
    }
}

// 현재날짜 yyyymmdd 가져오는 함수 -> yyyymmdd 반환
function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}

// 이메일 형식 체크 함수
function emailCheck(email) {
    if(email !== "") {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        return regex.test(email);
    } else {
        return true;
    }
}

// 숫자만 남기고 한글, 영문, 특수문자는 모두 제거하는 함수
function onlyNumber(str) {
    let regex = /[^0-9]/gi;
    return str.replace(regex, "");
}

// 소수숫자만 입력가능 함수
function onlyDouble(str) {
    // 조프리에게 요청해야댐
}

// CapsLock 감지함수
function callCapsLock(event) {
    return event.getModifierState("CapsLock");

    // let regex = /[^0-9]/gi;
    // return true
}

// 공통 팝업닫기 함수
function popOpenBtn() {
    jQuery('#tip_box').addClass('dp_b');
    jQuery('.dim').css('display','block');
    jQuery('.koko_popup').fadeOut(0);
}

// 이미지 크게보기(미완성)
function imgView(url) {
}

// 2주후인 날짜로 반환하는 함수 ex) 2022-03-01 -> 2022. 03. 15 로 반환
function addTwoWeeks(dateString) {
    const dateParts = dateString.split("-").map(Number);
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    date.setDate(date.getDate() + 14);
    return `${date.getFullYear()}. ${("0" + (date.getMonth() + 1)).slice(-2)}. ${("0" + date.getDate()).slice(-2)}`;
}

// AES 암호화 함수
function encryptData(data) {
    const algorithm = 'AES-GCM';
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const keyBuffer = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    keyBufferSto.set(uint8ArrayToBase64(keyBuffer));
    ivSto.set(uint8ArrayToBase64(iv));
    return crypto.subtle.importKey('raw', keyBuffer, algorithm, false, ['encrypt'])
        .then((cryptoKey) =>
            crypto.subtle.encrypt({ name: algorithm, iv }, cryptoKey, dataBuffer)
        )
        .then((encryptedBuffer) => {
            const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
            const encryptedData = new TextDecoder().decode(new Uint8Array(encryptedArray));
            const ivHex = Array.from(iv)
                .map((byte) => byte.toString(16).padStart(2, '0'))
                .join('');

            return uint8ArrayToBase64(encryptedArray);
        });
}

// AES 암호화 데이터 복호화하는 함수
function decryptData(encryptedData, keyBuffer, iv) {
    const algorithm = 'AES-GCM';
    const decoder = new TextDecoder();
    const encryptedBuffer = base64ToUint8Array(encryptedData);
    const keyArray = base64ToUint8Array(keyBuffer);
    const ivArray = base64ToUint8Array(iv);

    return crypto.subtle.importKey('raw', keyArray, algorithm, false, ['decrypt'])
        .then(cryptoKey =>
            crypto.subtle.decrypt({name: algorithm, iv: ivArray}, cryptoKey, encryptedBuffer)
        )
        .then(decryptedBuffer => {
            const decryptedArray = new Uint8Array(decryptedBuffer);
            return decoder.decode(decryptedArray);
        });
}

// 바이너리(byte)형태의 데이터 -> Base64로 변환
function uint8ArrayToBase64(uint8Array) {
    let binary = '';
    uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}

// Base64 -> 바이너리(byte)로 변환
function base64ToUint8Array(base64String) {
    const binaryString = window.atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

/**
 * 객체와 검사를 무시할 키값을 인자로 받아 빈값이 있을 경우 true를 반환한다.
 * @param arrOfObjects : Array<Object> - 검사할 객체
 * @param ignoreKeys : Array<string> - 검사를 무시할 키값의 배열
 * @returns {boolean}
 */
function checkFalsyValuesExceptIgnoredKeys(arrOfObjects, ignoreKeys = []) {
    return arrOfObjects.every(obj => {
        for (let key in obj) {
            if (!ignoreKeys.includes(key) && !obj[key] && obj[key] !== 0) {
                return true;
            }
        }
        return false;
    });
}

export { phoneNumver, ipCheck, getToday, emailCheck, onlyNumber, onlyDouble, callCapsLock, popOpenBtn, imgView
    , addTwoWeeks, encryptData, decryptData, checkFalsyValuesExceptIgnoredKeys };