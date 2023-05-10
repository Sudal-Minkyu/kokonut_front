import {customConfirmData} from "../../../lib/store.js";

const defaultCustomConfirmProp = {
    visible: true, // 팝업 보임의 여부 통제
    type: 'confirm', // 'confirm' 버튼하나, 'ask' 여부 묻기
    callback: () => {}, // 확인버튼시 동작
    icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
    title: '제목 미설정', // 제목
    contents1: '내용 미설정', // 내용
    contents2: '',
    btnCheck: '확인', // 확인 버튼의 텍스트
    btnStart: '실행', // 실행 버튼의 텍스트
    btnCancel: '취소', // 취소 버튼의 텍스트
}

export const openCustomConfirm = (prop) => {
    customConfirmData.update(obj => {
        obj = {...defaultCustomConfirmProp, ...prop};
        console.log('actCP', obj);
        return obj;
    });
}