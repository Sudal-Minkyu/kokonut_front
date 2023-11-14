<script>
    import {fade} from "svelte/transition";
    import ErrorHighlight from "./ErrorHighlight.svelte";
    import {ajaxParam, ajaxExcelBodyParam, reportCatch} from "../ajax.js";
    import {buildExcelFromBase64} from "../buildExcelFromBase64.js";
    import {onlyNumber} from "../../../lib/common.js";
    import {mainScreenBlockerVisibility} from "../../../lib/store.js";
    import {userInfoData} from "../../../lib/store.js";

    export let popType; // 0 개인정보 열람, 1 개인정보 처리 이력, 2 관리자 활동 이력, 3 개인정보 제공, 4 개인정보 제공 등록된 리스트, 5 개인정보 제공이력 리스트

    const title = [
        "현재 개인정보 다운로드",
        "개인정보 처리 이력 다운로드",
        "관리자 활동 이력 다운로드",
        "제공받은 개인정보 다운로드",
        "개인정보 제공 목록 다운로드",
    ]

    // 메뉴에 따라 다른 메시지를 보여줄 것을 대비하여 만들어둠. popType의 순서대로 내용에 표출될 예정
    const warnContents = [
        "<dl>"+$userInfoData.knEmail+"님께서 다운받으신 개인정보 파일은<br>개인정보 보호법 및 관련 법령에 따라 보호되는 정보입니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유에 따라 이용하신 뒤(목적 달성)에는<br>개인정보 파일을 반드시 파기해야 합니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유 이외로 활용하시거나 배포하시면<br>법적 책임을 질 수 있습니다.</dl>",

        "<dl>"+$userInfoData.knEmail+"님께서 다운받으신 개인정보 파일은<br>개인정보 보호법 및 관련 법령에 따라 보호되는 정보입니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유에 따라 이용하신 뒤(목적 달성)에는<br>개인정보 파일을 반드시 파기해야 합니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유 이외로 활용하시거나 배포하시면<br>법적 책임을 질 수 있습니다.</dl>",

        "<dl>"+$userInfoData.knEmail+"님께서 다운받으신 개인정보 파일은<br>개인정보 보호법 및 관련 법령에 따라 보호되는 정보입니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유에 따라 이용하신 뒤(목적 달성)에는<br>개인정보 파일을 반드시 파기해야 합니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유 이외로 활용하시거나 배포하시면<br>법적 책임을 질 수 있습니다.</dl>",

        "<dl>"+$userInfoData.knEmail+"님께서 다운받으신 개인정보 파일은<br>개인정보 보호법 및 관련 법령에 따라 보호되는 정보입니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유에 따라 이용하신 뒤(목적 달성)에는<br>개인정보 파일을 반드시 파기해야 합니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유 이외로 활용하시거나 배포하시면<br>법적 책임을 질 수 있습니다.</dl>",

        "<dl>"+$userInfoData.knEmail+"님께서 다운받으신 개인정보 파일은<br>개인정보 보호법 및 관련 법령에 따라 보호되는 정보입니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유에 따라 이용하신 뒤(목적 달성)에는<br>개인정보 파일을 반드시 파기해야 합니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유 이외로 활용하시거나 배포하시면<br>법적 책임을 질 수 있습니다.</dl>",

        "<dl>"+$userInfoData.knEmail+"님께서 다운받으신 개인정보 파일은<br>개인정보 보호법 및 관련 법령에 따라 보호되는 정보입니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유에 따라 이용하신 뒤(목적 달성)에는<br>개인정보 파일을 반드시 파기해야 합니다.</dl>" +
        "<dl>해당 파일을 다운받으신 사유 이외로 활용하시거나 배포하시면<br>법적 책임을 질 수 있습니다.</dl>",
    ];

    export let excelDownloadPopService = {
        visibility: false,
        useBodyParam: false,
        requestURL: '',
        requestData: {},
        close: () => {
            excelDownloadPopService.visibility = false;
        },
        open: (data) => {
            excelDownloadPopService.requestData = data;
            excelDownloadPopService.visibility = true;
        },
    }

    let downloadReasonErrMsg = '';
    let otpValueErrMsg = '';
    let cautionErrMsg = '';
    let isCautionChecked = false;
    const requestData = {
        downloadReason: '',
        otpValue: '',
    }

    const handleProceedDownload = () => {
        if (!requestData.otpValue) {
            otpValueErrMsg = 'OTP를 적어주세요.';
            return;
        } else {
            otpValueErrMsg = '';
        }

        if (!isCautionChecked) {
            cautionErrMsg = '주의사항을 확인하고 체크해 주세요.';
            return;
        } else {
            cautionErrMsg = '';
        }
        mainScreenBlockerVisibility.set(true);

        if (excelDownloadPopService.useBodyParam) {
            ajaxExcelBodyParam(excelDownloadPopService.requestURL, excelDownloadPopService.requestData, requestData
                , excelReqSuccess, excelReqFail);
        } else {
            ajaxParam(excelDownloadPopService.requestURL, {...requestData, ...excelDownloadPopService.requestData}
                , excelReqSuccess, excelReqFail);
        }
    }

    const excelReqSuccess = (res) => {
        try {
            mainScreenBlockerVisibility.set(false);
            buildExcelFromBase64(res);
            excelDownloadPopService.close();
        } catch (e) {
            reportCatch('temp016', e);
        }
    };

    const excelReqFail = (errCode, errMsg) => {
        try {
            mainScreenBlockerVisibility.set(false);
        } catch (e) {
            reportCatch('temp017', e);
        }
    };
</script>

<!-- [D] 엑셀 다운로드 팝업 -->
<div class="koko_popup excel_download_pop" data-popup="excel_download_pop" in:fade out:fade >
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">{title[popType]}</h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>사유</label>
                    <textarea placeholder="사유를 적어주세요." bind:value={requestData.downloadReason}></textarea>
                    <ErrorHighlight bind:message={downloadReasonErrMsg}/>
                </div>
                <div class="kopopinput marB24">
                    <label>구글 OTP 인증번호(6자리)</label>
                    <input type="text" bind:value={requestData.otpValue} maxlength="6"
                           on:keyup={() => requestData.otpValue = onlyNumber(requestData.otpValue)} placeholder="OTP를 적어주세요." />
                    <ErrorHighlight bind:message={otpValueErrMsg}/>
                </div>
                <div class="popcaseInfoBox">
                    <p>주의사항</p>
                    {@html warnContents[popType]}
                </div>
                <div class="koko_check">
                    <input type="checkbox" value="1" id="pricheck" bind:checked={isCautionChecked}>
                    <label for="pricheck">
                        <em></em>
                        <p class="check">주의사항에 대해 확인했습니다.</p>
                    </label>
                    <ErrorHighlight bind:message={cautionErrMsg}/>
                </div>

                <div class="kokopopBtnBox">
                    <div class="koko_cancel" on:click={excelDownloadPopService.close}>취소</div>
                    <div class="koko_go"><button type="button" on:click={handleProceedDownload}>다운로드</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close excel_download_pop_close" data-popup-close="excel_download_pop_close" on:click={excelDownloadPopService.close} ></div>
    </div>
</div>
<!-- // [D] 엑셀 다운로드 팝업 -->