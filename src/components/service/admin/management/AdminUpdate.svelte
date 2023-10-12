<script>
    import {fade} from "svelte/transition";
    import {SelectBoxManager} from "../../../common/action/SelectBoxManager.js";
    import {userInfoData} from "../../../../lib/store.js";

    export let adminUpdateService;

    const handleSelectRole = (el) => {
        adminUpdateService.adminData.role = el.dataset.value;
    }
</script>

<div class="koko_popup adm_registration_pop" data-popup="adm_registration_pop" in:fade out:fade >
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">관리자 설정</h3>
            </div>

            <div class="kopop_SelBox marB24" style="margin-top: 10px">
                <p>관리자 등급</p>
                <div class="selectBox wid162" use:SelectBoxManager={{callback: handleSelectRole}}>
                    <div class="label" id="createAdminRoleSelect">선택</div>
                    <ul class="optionList">
                        <li class="optionItem anoGrade" data-value="ROLE_ADMIN">최고관리자</li>
                        <li class="optionItem anoGrade" data-value="ROLE_USER">관리자</li>
                        <li class="optionItem anoGrade" data-value="ROLE_GUEST">게스트</li>
                    </ul>
                </div>
            </div>
            <div class="kopopinput marB24">
                <label>활성화 상태</label>
                <div class="popRadio" style="padding: 0;">
                    <div class="check poprCheck">
                        <input type="radio" class="radio" name="period" id="활성화" value="1" bind:group={adminUpdateService.adminData.activeStatus}>
                        <label for="활성화"><em><dt></dt></em>활성화</label>
                    </div>
                    <div class="check poprCheck">
                        <input type="radio" class="radio" name="period" id="비활성화" value="0" bind:group={adminUpdateService.adminData.activeStatus}>
                        <label for="비활성화"><em><dt></dt></em>비활성화</label>
                    </div>
                </div>
            </div>
            {#if adminUpdateService.adminData.knEmail !== $userInfoData.knEmail}
                <div class="kopopinput">
                    <label>인증 및 보안</label>
                    {#if adminUpdateService.adminData.knIsEmailAuth === 'Y'}
                        <div style="text-align: left">
                            <div class="koko_cancel adm_registration_pop_close" on:click={adminUpdateService.sendPwChangeMail} style="width: 17rem;">비밀번호 변경 메일 전송</div>
                        </div>
                    {:else}
                        <div style="text-align: left">
                            <div class="koko_cancel adm_registration_pop_close" on:click={adminUpdateService.sendVerifyMail} style="width: 13rem;">인증메일 재전송</div>
                        </div>
                    {/if}
                </div>
            {/if}
            <div class="kokopopBtnBox">
                <div class="koko_cancel adm_registration_pop_close" on:click={adminUpdateService.close}>취소</div>
                <div class="koko_go">
                    <button type="button" on:click={() => {adminUpdateService.updateAdmin}}>수정</button>
                </div>
            </div>
        </div>
        <div class="koko-popup-close adm_registration_pop_close" data-popup-close="adm_registration_pop_close" on:click={adminUpdateService.close}></div>
    </div>
</div>