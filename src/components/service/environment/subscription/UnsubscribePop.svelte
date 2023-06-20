<script>
    export let unsubscribeService;
</script>

<!-- [D] 구독 해지 팝업 -->
<div class="koko_popup unsubscribe_pop" data-popup="unsubscribe_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">구독해지</h3>
                <div class="koSubInfo ks_noneicon">
                    <dl>
                        해지 전에 주의사항을 꼭 확인하세요.
                    </dl>
                </div>
            </div>
            <div class="popcaseInfoBox pi_noneicon marB32">
                <p>주의사항</p>
                <dl>자동결제 해지 시 사용중인 kokonut 서비스 이용계약도 해지됩니다.</dl>
                <dl>해지일 기준 7일 후 kokonut 서비스에 저장된 회원정보 및 모든 데이터 또는 일괄 삭제되며, 복원할 수 없습니다.</dl>
                <dl>회원정보 별도 저장을 원할 경우, <dd>kokonut 관리자 → 회원정보 DB 관리 페이지</dd>에서 DB 데이터 전체 다운로드 요청 후 해지를 진행해 주세요.</dl>
            </div>
            <div class="koko_checkDoubleBox">
                <div class="koko_check">
                    <input type="checkbox" value="1" name="selcheck" id="selcheck">
                    <label for="selcheck">
                        <em></em>
                        <p class="check">주의사항을 모두 확인하였으며, 해지 후 모든 데이터가 삭제되는 것에 동의합니다.</p>
                    </label>
                </div>
            </div>
            <div class="payBtnBox">
                <div class="koko_cancel unsubscribe_pop_close" on:click={unsubscribeService.close}>취소</div>
                <div class="koko_go"><button class="tippop" id="tip_btn03">해지</button></div>
            </div>
        </div>
        <div class="koko-popup-close unsubscribe_pop_close" data-popup-close="unsubscribe_pop_close" on:click={unsubscribeService.close}></div>
    </div>
</div>
<!-- // [D] 구독 해지 팝업 -->