<script>
    import { fade } from 'svelte/transition'
    import {personalInfoTableData} from "../../../../lib/store.js";
    import ErrorHighlight from "../../../common/ui/ErrorHighlight.svelte";
    import {onlyNumber} from "../../../../lib/common.js";
    export let personalInfoTableService;

</script>

<!-- [D] 개인정보 선택 항목 삭제 팝업 -->
<div class="koko_popup delete_pr_pop" data-popup="delete_pr_pop" in:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_titleh4">
                <h4 class="">
                    선택하신<br>
                    <span>{$personalInfoTableData.checkedColumnTitleString}</span><br>
                    항목을 삭제하시겠습니까?
                </h4>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>구글 OTP 인증번호(6자리)</label>
                    <input type="text" bind:value={$personalInfoTableData.removeColumnPop.otpValue} maxlength="6"
                           on:keyup={() => $personalInfoTableData.removeColumnPop.otpValue = onlyNumber($personalInfoTableData.removeColumnPop.otpValue)} placeholder="OTP를 적어주세요." />
                    <ErrorHighlight message="{$personalInfoTableData.removeColumnPop.otpErrorMsg}" />
                </div>
                <div class="popcaseInfoBox pi_noneicon">
                    <p>주의사항</p>
                    <dl>삭제할 경우 <span>해당 항목의 개인정보 데이터가 모두 삭제됩니다.</span></dl>
                    <dl>개인정보 데이터가 많을 경우 최대 3일까지 소요될 수 있습니다.</dl>
                    <dl><span>삭제하면 다시 복구 할 수 없습니다.</span></dl>
                </div>
                <div class="koko_check">
                    <input type="checkbox" name="selcheck" id="selcheck" bind:checked={$personalInfoTableData.removeColumnPop.checkPreCautionAgree} />
                    <label for="selcheck">
                        <em></em>
                        <p class="check">주의사항에 대해 확인했습니다.</p>
                    </label>
                </div>
                <ErrorHighlight message="{$personalInfoTableData.removeColumnPop.cautionAgreeErrorMsg}" />
                <div class="kokopopBtnBox">
                    <div class="koko_cancel delete_pr_pop_close" on:click={personalInfoTableService.removeColumnPop.hide} >취소</div>
                    <div class="koko_go"><button type="button" on:click={personalInfoTableService.removeColumnPop.removeUserTableColumnByColumnNameList}>확인</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close delete_pr_pop_close" data-popup-close="delete_pr_pop_close" on:click={personalInfoTableService.removeColumnPop.hide} ></div>
    </div>
</div>