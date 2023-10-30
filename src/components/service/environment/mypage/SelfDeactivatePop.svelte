<script>
    import { fade } from 'svelte/transition'
    import ErrorHighlight from "../../../common/ui/ErrorHighlight.svelte";
    import {onlyNumber} from "../../../../lib/common.js";
    export let deactivateAccountService;

</script>

<!-- [D] 개인정보 선택 항목 삭제 팝업 -->
<div class="koko_popup delete_pr_pop" data-popup="delete_pr_pop" in:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_titleh4 marB70">
                <h4 class="">
                    본인의 계정을 <span>비활성화</span> 하시겠습니까?
                </h4>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>구글 OTP 인증번호(6자리)</label>
                    <input type="text" bind:value={deactivateAccountService.sendData.otpValue} maxlength="6"
                           on:keyup={() => deactivateAccountService.sendData.otpValue = onlyNumber(deactivateAccountService.sendData.otpValue)} placeholder="OTP를 입력해 주세요." />
                    <ErrorHighlight message="{deactivateAccountService.otpValueErrMsg}" />
                </div>
                <div class="popcaseInfoBox pi_noneicon">
                    <p>주의사항</p>
                    <dl>비활성화시 <span>이 계정으로 더 이상 서비스를 이용하실 수 없습니다.</span></dl>
                    <dl>계정을 다시 활성화하기 위해서는 관리자에게 문의를 하셔야 합니다.</dl>
                </div>
                <div class="koko_check">
                    <input type="checkbox" name="selcheck" id="selcheck" bind:checked={deactivateAccountService.doAgree} />
                    <label for="selcheck">
                        <em></em>
                        <p class="check">주의사항에 대해 확인했습니다.</p>
                    </label>
                </div>
                <ErrorHighlight message="{deactivateAccountService.agreeErrMsg}" />
                <div class="kokopopBtnBox">
                    <div class="koko_cancel delete_pr_pop_close" on:click={deactivateAccountService.hide} >취소</div>
                    <div class="koko_go"><button type="button" on:click={deactivateAccountService.deactivateAccount}>확인</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close delete_pr_pop_close" data-popup-close="delete_pr_pop_close" on:click={deactivateAccountService.hide} ></div>
    </div>
</div>