
<script>

    import { fade } from 'svelte/transition';
    import { getToday } from "../../../../lib/common.js" // 공통함수

    export let excelPopClick;
    export let total;

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
                    <label>파일</label>
                    <input type="text" class="excelfile" value="관리자활동이력_{getToday()}.xls ({total} data)" readonly />
                </div>
                <div class="kopopinput marB24">
                    <label>사유</label>
                    <textarea placeholder="사유를 적어주세요."></textarea>
                </div>
                <div class="kopopinput marB24">
                    <label>OTP</label>
                    <input type="text" placeholder="OTP를 적어주세요."  />
                </div>
                <div class="popcaseInfoBox">
                    <p>주의사항</p>
                    <dl>다운로드 파일은 배포가 금지되어 있습니다.</dl>
                    <dl>다운로드 사유 외에 다른 사유로 해당 파일을 사용 시, 법적인 모든 책임을 물을 수 있습니다.</dl>
                </div>
                <div class="koko_check">
                    <input type="checkbox" value="1" name="pricheck" id="pricheck">
                    <label for="pricheck">
                        <em></em>
                        <p class="check">주의사항에 대해 확인했습니다.</p>
                    </label>
                </div>

                <div class="kokopopBtnBox">
                    <div class="koko_cancel excel_download_pop_close" on:click={excelPopClick}>취소</div>
                    <div class="koko_go"><button>다운로드</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close excel_download_pop_close" data-popup-close="excel_download_pop_close" on:click={excelPopClick} ></div>
    </div>
</div>
<!-- // [D] 엑셀 다운로드 팝업 -->