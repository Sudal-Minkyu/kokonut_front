import {openConfirm} from "./ui/DialogManager.js";

export let buildExcelFromBase64 = (res) => {
    const fileData = res.data.sendData.fileData;
    const fileName = res.data.sendData.fileName;
    var byteCharacters = atob(fileData);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    var downloadUrl = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    openConfirm({
        icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
        title: "메일로 암호 전송됨", // 제목
        contents1: '엑셀 파일이 담긴 압축 파일을 다운로드 하였습니다.',
        contents2: '당신의 메일을 확인하여 압축을 해제하세요.',
        btnCheck: '확인', // 확인 버튼의 텍스트
    });
}