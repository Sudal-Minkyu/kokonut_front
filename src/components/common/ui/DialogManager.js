import {bannerMessage, customConfirmData} from "../../../lib/store.js";

const defaultAskProp = {
    visible: true, // 팝업 보임의 여부 통제
    type: 'ask', // 'confirm' 버튼하나, 'ask' 여부 묻기
    callback: () => {}, // 확인버튼시 동작
    icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
    title: '제목 미설정', // 제목
    contents1: '내용 미설정', // 내용
    contents2: '',
    btnCheck: '', // 확인 버튼의 텍스트
    btnStart: '실행', // 실행 버튼의 텍스트
    btnCancel: '취소', // 취소 버튼의 텍스트
}

const defaultConfirmProp = {
    visible: true, // 팝업 보임의 여부 통제
    type: 'confirm', // 'confirm' 버튼하나, 'ask' 여부 묻기
    callback: () => {}, // 확인버튼시 동작
    icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
    title: '제목 미설정', // 제목
    contents1: '내용 미설정', // 내용
    contents2: '',
    btnCheck: '확인', // 확인 버튼의 텍스트
    btnStart: '', // 실행 버튼의 텍스트
    btnCancel: '', // 취소 버튼의 텍스트
}

/**
 * 두개의 버튼을 가진 물음창을 연다.
 * @param prop : object - 전달할 설정값
 */
export const openAsk = (prop) => {
    customConfirmData.update(obj => {
        obj = {...defaultAskProp, ...prop};
        return obj;
    });
}

/**
 * 한개의 버튼을 가진 확인창을 연다.
 * @param prop : object - 전달할 설정값
 */
export const openConfirm = (prop) => {
    customConfirmData.update(obj => {
        obj = {...defaultConfirmProp, ...prop};
        return obj;
    });
}

/**
 * 화면 중앙상단에 잠시 나타났다가 사라지는 메시지를 띄운다.
 * @param msg : string - 전달할 메시지
 */
export const openBanner = (msg) => {
    bannerMessage.set(msg);
}