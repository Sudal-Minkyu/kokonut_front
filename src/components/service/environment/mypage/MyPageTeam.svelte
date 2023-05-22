
<script>
    import { fade } from 'svelte/transition'
    import { callCapsLock } from '../../../../lib/common'
    import restapi from "../../../../lib/api.js";
    import { is_login} from "../../../../lib/store.js";
    import {push} from "svelte-spa-router";

    let knDepartment = "";
    let knPassword = "";

    function knDepartmentChageStart() {
        console.log("부서명 변경/등록 클릭!");

        if(knDepartment === "" || knDepartment.search(/\s/) !== -1) {
            knDepartmentBlank = true;
            return false;
        }
        if(knPassword === "") {
            pwdBlank = true;
            return false;
        }
        if(pwdBlank) {
            pwdBlank = false;
        }
        if(pwdNot) {
            pwdNot = false;
        }

        let url = "/v2/api/Admin/cpChange"

        let sendData = {
            cpContent : knDepartment,
            knPassword : knPassword,
            state : 2
        }

        restapi('v2', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    contentsChange(2, knDepartment);
                    if(knDepartmentState === "등록") {
                        contentsChange(3, "변경");
                    }
                    changeStatePop(0);
                } else if (json_success.data.err_code === "KO013") {
                    pwdNot = true;
                    knPassword = "";
                } else {
                    // 회사가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);


                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )
    }

    let knDepartmentBlank = false;
    let pwdBlank = false;
    let pwdNot = false;
    let capsLockCheck = false;

    export let knDepartmentState;
    export let changeStatePop;
    export let contentsChange;

</script>

<div class="koko_popup belong_pop" data-popup="belong_pop" in:fade out:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">부서 {knDepartmentState}</h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>{knDepartmentState}할 부서 명</label>
                    <input type="text" bind:value={knDepartment} />
                    <p style="text-align: left" class="{knDepartmentBlank === true ? 'notxt' : 'notxt not_work'}">{knDepartmentState}할 부서 명을 입력해주세요.</p>
                </div>
                <div class="kopopinput">
                    <label>비밀번호</label>
                    <input bind:value={knPassword} autocomplete="off" type="password" required on:keyup={() => capsLockCheck = callCapsLock(event)} />
                    <p style="text-align: left" class="{pwdBlank === true ? 'notxt' : 'notxt not_work'}">비밀번호를 입력해주세요.</p>
                    <p style="text-align: left" class="{pwdNot === true ? 'notxt' : 'notxt not_work'}">입력하신 비밀번호가 일치하지 않습니다.</p>
                    <p style="text-align: left" class="{capsLockCheck === true ? 'notxt' : 'notxt not_work'}">CapsLock이 켜져 있습니다.</p>
                </div>
            </form>
            <div class="kokopopBtnBox">
                <div class="koko_go">
                    <button type="button" on:click={knDepartmentChageStart}>변경</button>
                </div>
                <div class="koko_cancel" on:click={() => changeStatePop(0)}>취소</div>
            </div>
        </div>
        <div class="koko-popup-close belong_pop_close" data-popup-close="belong_pop_close" on:click={() => changeStatePop(0)}></div>
    </div>
</div>