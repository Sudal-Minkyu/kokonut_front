<script>
    import {initialPrivacyDetail, privacyDetailData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxGet, reportCatch} from "../../common/ajax.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    onMount(() => {

    });

    const getDetail = () => {

    }

    const closePop = () => {
        privacyDetailData.set(JSON.parse(initialPrivacyDetail));
    }

    const handleExcelDownload = () => {
        ajaxGet('/v2/api/Provision/provisionDownloadExcel', false, (res) => {
            try {
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
                openConfirm({
                    icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: "메일로 암호 전송됨", // 제목
                    contents1: '엑셀 파일이 담긴 압축 파일을 다운로드 하였습니다.',
                    contents2: '당신의 이메일로 전송된 암호를 통해 압축을 해제하세요.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
            } catch (e) {
                reportCatch('temp140', e);
            }
        });
    }

</script>

<!-- [D] 상세보기 팝업 -->
<div class="koko_popup open_dlinkPop" data-popup="open_dlinkPop" style="display: block" >
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">상세보기</h3>
            </div>
            <div class="prilistpop">
                <div class="pritopgr marB36">
                    <ul>
                        <li class="borB porR">
                            <span>제공 현황</span>
                            <dl>본인 제공</dl>
                        </li>
                        <li class="porB">
                            <span>담당자(제공자)</span>
                            <dl>김무무</dl>
                        </li>
                        <li class="porR">
                            <span>만든 날짜</span>
                            <dl>23. 01. 01</dl>
                        </li>
                        <li>
                            <span>제공 기간</span>
                            <dl>03. 03 ~ 23. 04. 04</dl>
                        </li>
                    </ul>
                </div>
                <div class="memseaBox marB24">
                    <div class="pridownBtn" on:click={handleExcelDownload}>
                        개인정보 다운로드
                    </div>
                </div>
            </div>
        </div>
        <div class="koko-popup-close dlinkPop_close" data-popup-close="dlinkPop_close" on:click={closePop}></div>
    </div>
</div>
<!-- // [D] 상세보기 팝업 -->