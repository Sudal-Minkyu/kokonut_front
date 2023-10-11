<script>
    import {fade} from "svelte/transition";
    import {SelectBoxManager} from "../../../common/action/SelectBoxManager.js";

    export let adminUpdateService;


    const adminForm = {
        role: '',
        activeStatus: '',
    }

    const handleSelectRole = (el) => {
        adminForm.role = el.dataset.value;
    }

    const updateAdmin = () => {
        adminUpdateService.updateAdmin(adminForm);
    };
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
                        <input type="radio" class="radio" name="period" id="활성화" value="1" bind:group={adminForm.activeStatus}>
                        <label for="활성화"><em><dt></dt></em>활성화</label>
                    </div>
                    <div class="check poprCheck">
                        <input type="radio" class="radio" name="period" id="비활성화" value="0" bind:group={adminForm.activeStatus}>
                        <label for="비활성화"><em><dt></dt></em>비활성화</label>
                    </div>
                </div>
            </div>
            <div class="kopopinput">
                <label>보안 메일 전송</label>
                <div style="text-align: left">
                    <div class="koko_cancel adm_registration_pop_close" on:click={()=>{}} style="width: 13rem;">비밀번호 변경</div>
                </div>
            </div>
            <div class="kokopopBtnBox">
                <div class="koko_cancel adm_registration_pop_close" on:click={adminUpdateService.close}>취소</div>
                <div class="koko_go">
                    <button type="button" on:click={updateAdmin}>수정</button>
                </div>
            </div>
        </div>
        <div class="koko-popup-close adm_registration_pop_close" data-popup-close="adm_registration_pop_close" on:click={adminUpdateService.close}></div>
    </div>
</div>