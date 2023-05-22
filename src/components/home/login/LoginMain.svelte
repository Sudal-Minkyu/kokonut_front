<script>
    import { push, link } from 'svelte-spa-router'
    import restapi from "../../../lib/api"

    import LoginOTP from './LoginOTP.svelte'
    import { is_login, emailSave, keyBufferSto, ivSto } from '../../../lib/store'
    import { callCapsLock, encryptData } from '../../../lib/common'
    import {ajaxGet} from "../../common/ajax.js";

    let emailBlank;
    let pwdBlank;
    let notRegister = false;
    let capsLockCheck = false;

    let knEmail = "";
    let knPassword = "";

    let stage = 0;

    // 로그인 버튼
    function loginBtn() {

        if(knEmail === "") {
            emailBlank = true;
        } else {
            emailBlank = false;
        }
        if(knPassword === "") {
            pwdBlank = true;
        } else {
            pwdBlank = false;
        }
        
        if(emailSaveCheckBox) {
            $emailSave = knEmail
        } else {
            $emailSave = ""
        }

        if(!emailBlank && !pwdBlank) {
            stage=1;
        }
    }

    // 이메일이 존재하지않거나, 비밀번호가 틀렸을 경우 돌아가는 함수
    function stageChange() {
        stage = 0;
    }

    // 가입되지 않은 회원 함수
    function notJoinUser() {
        stage = 0;
        notRegister = true;
    }

    let emailSaveCheckBox;
    if($emailSave === "") {
        emailSaveCheckBox = false;
    } else {
        knEmail = $emailSave;
        emailSaveCheckBox = true;
    }

    function checkBox(){
        emailSaveCheckBox = !emailSaveCheckBox;
    }

    // Google OTP 제출
    async function initiateGoogleOtpLogin(otpValue) {
        console.log("구글OTP 제출 클릭!");

        try {
            const encryptedPassword = await processData(knPassword);
            googleOtpLogin(otpValue, knEmail, encryptedPassword);
        } catch (error) {
            console.error("Error during password encryption: ", error);
        }
    }

    // 암호화처리
    async function processData(knPassword) {
        try {
            return await encryptData(knPassword);
        } catch (error) {
            console.error("Error during encryption: ", error);
        }
    }

    let otpError = false;
    let otp_err_msg = "";
    let login_err_msg = "";
    // 로그인시작
	function googleOtpLogin(otpValue, knEmail, encryptedPassword) {

        let url = "/v1/api/Auth/authToken"

		let sendData = {
			otpValue : otpValue,
			knEmail : knEmail,
			knPassword : encryptedPassword
		}

        restapi('login', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    // console.log("로그인성공");
                    knPassword= "";
                    // $ = json_success.data.sendData.jwtToken;
                    $is_login = true;
                    $keyBufferSto = "";
                    $ivSto = "";

                    // alert("로그인 완료");
                    push("/service");
                } else if (json_success.data.err_code === "KO012" || json_success.data.err_code === "KO011" || json_success.data.err_code === "KO010") {
                    // console.log("로그인실패");
                    otpError = true;
                    otp_err_msg = json_success.data.err_msg;
                }  else if (json_success.data.err_code === "KO016") {
                    // console.log("가입된회원이 아님 or 아이디/비밀번호가 일치하지 않음");
                    knPassword= "";
                    notJoinUser();
                }
                else {
                    console.log("로그인 에러");
                    knPassword= "";
                    console.log(json_success);
                }
            },
            (json_error) => {
                console.log("에러");
                knPassword= "";
                console.log(json_error);
            }
        )


    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            loginBtn()
        }
    }

    const ajaxTest = () => {

        ajaxGet('/v1/api/Auth/checkKnEmail', {knEmail: 'joffrey@kokonut.me'}, (success) => {
            alert('API 호출 성공입니다.');
            console.log('성공콘솔', success);
        }, (fail) => {
            alert('API 호출 실패입니다. 콘솔참조');
            console.log('실패콘솔', fail);
        });
        //
        // const xhr = new XMLHttpRequest();
        // const url = '/v1/api/Auth/checkKnEmail';
        // const params = 'knEmail=' + encodeURIComponent('joffrey@kokonut.me');
        //
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //             alert('API 호출 성공입니다.');
        //             console.log('성공콘솔', xhr);
        //         } else {
        //             alert('API 호출 실패입니다. 콘솔참조');
        //             console.log('실패콘솔', xhr);
        //         }
        //     }
        // };
        //
        // xhr.open('GET', url + '?' + params, true);
        // xhr.send();

    }

</script>

{#if stage === 0}
<!--    <form>-->
        <div class="j_inputArea">
            <div class="input-field">
                <input bind:value={knEmail} id="knEmail" type="text"  required placeholder="">
                <label for="knEmail"><span>이메일</span></label>
                <p class="{emailBlank === true ? 'notxt' : 'notxt not_work'}">이메일을 입력해주세요.</p>
                <p class="{notRegister === true ? 'notxt' : 'notxt not_work'}">아이디 또는 비밀번호가 일치하지 않습니다.</p>
            </div>
            <div class="input-field mt30">
                <!-- type="password"는 autocomplete="off" 셋팅 : 자동완성을 막아줌. 그치만 저장된 데이터는 막기힘들다고함. 콘솔 워닝 이슈 -->
                <input bind:value={knPassword} autocomplete="off" id="knPassword" type="password" required on:keyup={() => capsLockCheck = callCapsLock(window.event)} on:keypress={() => enterPress(window.event)} />
                <label for="knPassword"><span>비밀번호</span></label>
                <p class="{pwdBlank === true ? 'notxt' : 'notxt not_work'}">비밀번호를 입력해주세요.</p>
                <p class="{capsLockCheck === true ? 'notxt' : 'notxt not_work'}">CapsLock이 켜져 있습니다.</p>
            </div>
        </div>
<!--    </form>-->
    <div class="checkArea">
        <div class="id_re">
            <input type="checkbox" bind:checked={emailSaveCheckBox}>
            <label>
                <p on:click={checkBox} class="check">이메일 기억하기</p>
            </label>
        </div>
        <a use:link href="/find"><p class="go_find">로그인이 안되시나요?</p></a>
    </div>
    <div class="join_bottom login">
        <button type="button" on:click={loginBtn}><p>로그인</p></button>
        <button type="button" on:click={ajaxTest}><p>통신테스트</p></button>
    </div>
{:else}
    <LoginOTP {stageChange} {notJoinUser} {initiateGoogleOtpLogin} {knEmail} {otpError} {otp_err_msg} />
{/if}