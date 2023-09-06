<script>
    import {fade} from "svelte/transition";
    import ErrorHighlight from "./ErrorHighlight.svelte";
    import {ajaxParam, ajaxExcelBodyParam, reportCatch} from "../ajax.js";
    import {buildExcelFromBase64} from "../buildExcelFromBase64.js";
    import {onlyNumber} from "../../../lib/common.js";
    import {mainScreenBlockerVisibility} from "../../../lib/store.js";

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


    const handleCancel = () => {

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
                <h3 class="">엑셀 다운로드</h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>사유</label>
                    <textarea placeholder="사유를 적어주세요." bind:value={requestData.downloadReason}></textarea>
                    <ErrorHighlight message={downloadReasonErrMsg}/>
                </div>
                <div class="kopopinput marB24">
                    <label>구글 OTP 인증번호(6자리)</label>
                    <input type="text" bind:value={requestData.otpValue} maxlength="6"
                           on:keyup={() => requestData.otpValue = onlyNumber(requestData.otpValue)} placeholder="OTP를 적어주세요." />
                    <ErrorHighlight message={otpValueErrMsg}/>
                </div>
                <div class="popcaseInfoBox">
                    <p>주의사항</p>
                    <dl>다운로드 파일은 배포가 금지되어 있습니다.</dl>
                    <dl>다운로드 사유 외에 다른 사유로 해당 파일을 사용 시, 법적인 모든 책임을 물을 수 있습니다.</dl>
                </div>
                <div class="koko_check">
                    <input type="checkbox" value="1" id="pricheck" bind:checked={isCautionChecked}>
                    <label for="pricheck">
                        <em></em>
                        <p class="check">주의사항에 대해 확인했습니다.</p>
                    </label>
                    <ErrorHighlight message={cautionErrMsg}/>
                </div>

                <div class="kokopopBtnBox">
                    <div class="koko_go"><button type="button" on:click={handleProceedDownload}>다운로드</button></div>
                    <div class="koko_cancel" on:click={excelDownloadPopService.close}>취소</div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close excel_download_pop_close" data-popup-close="excel_download_pop_close" on:click={excelDownloadPopService.close} ></div>
    </div>
</div>
<!-- // [D] 엑셀 다운로드 팝업 -->