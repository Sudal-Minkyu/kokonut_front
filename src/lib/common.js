
import VerEx from 'verbal-expressions';
import jQuery from "jquery";

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
    console.log("체크할 IP : "+ip_addr);
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
    // console.log("이벤트 : "+event.getModifierState("CapsLock"));
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
    console.log("url : "+url);
}

// 2주후인 날짜로 반환하는 함수 ex) 2022-03-01 -> 2022. 03. 15 로 반환
function addTwoWeeks(dateString) {
    const dateParts = dateString.split("-").map(Number);
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    date.setDate(date.getDate() + 14);
    return `${date.getFullYear()}. ${("0" + (date.getMonth() + 1)).slice(-2)}. ${("0" + date.getDate()).slice(-2)}`;
}

export { phoneNumver, ipCheck, getToday, emailCheck, onlyNumber, onlyDouble, callCapsLock, popOpenBtn, imgView, addTwoWeeks };