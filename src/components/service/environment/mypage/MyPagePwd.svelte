
<script>
    import { fade } from 'svelte/transition'
    import restapi from "../../../../lib/api.js";
    import { callCapsLock, popOpenBtn } from '../../../../lib/common'
    import CustumAlert from '../../../../components/common/CustumAlert.svelte'
    import { is_login} from "../../../../lib/store.js";
    import {push} from "svelte-spa-router";

    let pwdBlank = false;
    let pwdNot = false;
    let capsLockCheck = false;

    let oldknPassword = "";
    let newknPassword = "";
    let newknPasswordCheck = "";

    // 패스워드 조건 변수
    let passwordBlank = true;
    let passwordCheckNum = true;
    let passwordCheckEng = true;
    let passwordCheckSpe = true;
    let passwordCheckLen = true;
    let passwordConfirmCheck = false;
    let passwordCheck = false;

    function pwdChageBefore() {
        console.log("비밀번호 변경 클릭!");

        if(passwordBlank && passwordConfirmCheck && passwordCheck
        && !passwordCheckNum && !passwordCheckEng && !passwordCheckSpe && !passwordCheckLen) {
            pwdChageStart();
        }
    }

    function pwdChageStart() {
        if(oldknPassword === "") {
            pwdBlank = true;
            return false;
        }

        console.log("비밀번호 변경 시작!");

        if(pwdBlank) {
            pwdBlank = false;
        }
        if(pwdNot) {
            pwdNot = false;
        }

        let url = "/v2/api/Admin/pwdChange"

        let sendData = {
            oldknPassword : oldknPassword,
            newknPassword : newknPassword,
            newknPasswordCheck : newknPasswordCheck
        }

        restapi('v2', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    popOpenBtn();
                } else if (json_success.data.err_code === "KO013") {
                    oldknPassword = "";
                    pwdNot = true;
                } else if (json_success.data.err_code === "KO083") {
                    alert(json_success.data.err_msg);
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

    // 비밀번호 검증함수
    function passwordConfirm(val) {
        if (val === 1) {

            if (newknPasswordCheck !== "") {
                if (newknPassword !== newknPasswordCheck) {
                    passwordConfirmCheck = false;
                } else {
                    passwordConfirmCheck = true;
                }
            }


            // 비밀번호 입력
            const num = newknPassword.search(/[0-9]/g); // 숫자 체크 정규식
            const eng = newknPassword.search(/[a-z]/ig); // 영문 체크 정규식
            const spe = newknPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); // 특수문자 체크 정규식

            // 영문,숫자, 특수문자 모두 하나이상을 혼합하여 입력
            if (newknPassword.search(/\s/) !== -1) {
                // console.log("비밀번호는 공백 없이 입력해주세요.");
                passwordBlank = false;
            } else {
                passwordBlank = true;
            }

            if (eng < 0) {
                // console.log("영문");
                passwordCheckEng = true;
            } else {
                passwordCheckEng = false;
            }

            if (num < 0) {
                // console.log("숫자");
                passwordCheckNum = true;
            } else {
                passwordCheckNum = false;
            }

            if (spe < 0) {
                // console.log("특수문자");
                passwordCheckSpe = true;
            } else {
                passwordCheckSpe = false;
            }

            if (newknPassword.length < 10 || newknPassword.length > 20) {
                // console.log("10자리 ~ 20자리 이내로 입력해주세요.");
                passwordCheckLen = true;
            } else {
                passwordCheckLen = false;
            }

            if (passwordCheckNum && passwordCheckSpe && passwordCheckEng && passwordCheckLen) {
                passwordCheck = false;
            } else {
                passwordCheck = true;
            }

        } else {

            // 비밀번호확인 입력
            if (newknPassword !== "") {
                if (newknPassword !== newknPasswordCheck) {
                    passwordConfirmCheck = false;
                } else {
                    passwordConfirmCheck = true;
                }
            }
        }
    }

    // 팝업 확인클릭 후 호출할 함수
    function startFun() {
        changeStatePop(0)
    }

    export let changeStatePop;

    let popType = 1;
    let imgState = 1;
    let popTitle = "비밀번호가 변경되었습니다.";
    let popCheck = "확인";

</script>

<div class="koko_popup password_pop" data-popup="password_pop" in:fade out:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">비밀번호 변경</h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>현재 비밀번호</label>
                    <input type="password" autocomplete="off" bind:value={oldknPassword} on:keyup={() => capsLockCheck = callCapsLock(event)} required />
                    <p style="text-align: left" class="{pwdBlank === true ? 'notxt' : 'notxt not_work'}">비밀번호를 입력해주세요.</p>
                    <p style="text-align: left" class="{pwdNot === true ? 'notxt' : 'notxt not_work'}">입력하신 비밀번호가 일치하지 않습니다.</p>
                    <p style="text-align: left" class="{capsLockCheck === true ? 'notxt' : 'notxt not_work'}">CapsLock이 켜져 있습니다.</p>
                </div>
                <div class="kopopinput marB24">
                    <label>새로운 비밀번호</label>
                    <input type="password" autocomplete="off" bind:value={newknPassword} on:keyup={() => passwordConfirm(1)} required />
                    <div class="ps_confirm">
                        <p class="{passwordCheckEng === false ? 'notxt pass' : 'notxt'}">영문 포함</p>
                        <p class="{passwordCheckNum === false ? 'notxt pass' : 'notxt'}">숫자 포함</p>
                        <p class="{passwordCheckSpe === false ? 'notxt pass' : 'notxt'}">특수문자 포함</p>
                        <p class="{passwordCheckLen === false ? 'notxt pass' : 'notxt'}">10~20자</p>
                    </div>
                    <p style="text-align: left" class="{passwordBlank === false ? 'notxt' : 'notxt not_work'}">공백은 포함할 수 없습니다.</p>
                </div>
                <div class="kopopinput">
                    <label>새로운 비밀번호 확인</label>
                    <input type="password" autocomplete="off" bind:value={newknPasswordCheck} on:keyup={() => passwordConfirm(2)} required />
                    <div class="ps_confirm">
                        <p class="{passwordConfirmCheck === false ? 'notxt' : 'notxt pass'}">비밀번호 일치</p>
                    </div>
                </div>
            </form>
            <div class="kokopopBtnBox">
                <div class="koko_go">
                    <button type="button" on:click={pwdChageBefore}>변경</button>
                </div>
                <div class="koko_cancel" on:click={() => changeStatePop(0)}>취소</div>
            </div>
        </div>
        <div class="koko-popup-close password_pop_close" data-popup-close="password_pop_close" on:click={() => changeStatePop(0)}></div>
    </div>
</div>

<CustumAlert popType = {popType} imgState = {imgState} startFun = {startFun} {popTitle} {popCheck} />
