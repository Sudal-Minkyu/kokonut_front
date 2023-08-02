<script>
    import { push, link } from 'svelte-spa-router'

    import LoginOTP from './LoginOTP.svelte'
    import {
        is_login,
        accessToken,
        emailSave,
        keyBufferSto,
        ivSto, doChangePwdLater, serviceSettingData, mainScreenBlockerVisibility,
    } from '../../../lib/store'
    import { callCapsLock, encryptData } from '../../../lib/common'
    import {openAsk, openConfirm} from "../../common/ui/DialogManager.js";
    import { ajaxParam } from "../../common/ajax.js";
    import jQuery from "jquery";
    import MainScreenBlocker from "../../common/ui/MainScreenBlocker.svelte";
    import axios from "axios";

    jQuery(function() {
        // 나이스 폼열기
        jQuery('#niceForm').submit(function() {
            window.open('', 'niceviewer', 'width=200,height=200,resizeable,scrollbars');
            this.method = 'POST';
            this.target = 'niceviewer';
        });
    })

    let emailBlank;
    let pwdBlank;
    let notRegister = false;
    let capsLockCheck = false;

    let knEmail = "";
    let knPassword = "";

    let notErrPwd_msg = "";
    let notErrPwd = false;

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

    // 비밀번호 오류횟수 초과시 실행 함수
    function notErrPwdFun() {
        stage = 0;
        notErrPwd = true;
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

    const kk = () => {
        axios.post(import.meta.env.VITE_SERVER_URL + '/v1/api/Auth/kokonutSignUp', {
            cpName: '우디베타',
            knName: '김민규',
            knPhoneNumber: '01020450716',
            knEmail: 'woody@kokonut.me',
            knPassword: '!Kokonut123456',
            knPasswordConfirm: '!Kokonut123456',
            knEmailCheck: true
        }, {
            headers: {
                'Content-Type': 'application/json',
                'keyBufferSto': '',
                'ivSto': ''
            },
            withCredentials: true
        })
            .then(response => {
                console.log('res', response);
            })
            .catch(error => {
                console.log('err', error);
            });
    }

    let ahId;
    let knPhoneNumber;
    let knName;
    let otpError = false;
    let otp_err_msg = "";
    // 로그인시작
	function googleOtpLogin(otpValue, knEmail, encryptedPassword) {
        mainScreenBlockerVisibility.set(true);
        document.activeElement.blur();

        let url = "/v1/api/Auth/authToken"

		let sendData = {
			otpValue : otpValue,
			knEmail : knEmail,
			knPassword : encryptedPassword
		}

        ajaxParam(url, sendData, (res) => {
            mainScreenBlockerVisibility.set(false);
            $accessToken = res.data.sendData.jwtToken;
            if(res.data.sendData.blockAbroad !== undefined) {
                // console.log("해외로그인차단 : "+json_success.data.sendData.blockAbroadMsg);
                ahId = res.data.sendData.blockAbroad;
                knPhoneNumber = res.data.sendData.knPhoneNumber;
                knName = res.data.sendData.knName;
                openAsk({
                    callback: () => {phoneCheckOpenLogin(6)},
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: res.data.sendData.blockAbroadMsg, // 제목
                    contents1: "",
                    btnStart: '본인인증', // 실행 버튼의 텍스트
                    btnCancel: '취소', // 취소 버튼의 텍스트
                })
            } else {
                is_login.set(true);
                keyBufferSto.set('');
                ivSto.set('');
                doChangePwdLater.set(false);
                knPassword= "";
                push("/service");
            }
        }, (errCode, errMsg) => {
            mainScreenBlockerVisibility.set(false);
            if (errCode === "KO012" || errCode === "KO011" || errCode === "KO010"
                || errCode === "KO094") {
                // console.log("로그인실패");
                otpError = true;
                otp_err_msg = errMsg;
            } else if (errCode === "KO096" || errCode === "KO095") {
                openConfirm({
                    icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: "비밀번호 오류횟수 초과", // 제목
                    contents1: errMsg,
                    btnCheck: '확인', // 확인 버튼의 텍스트
                })
                notErrPwd_msg = errMsg;
                notErrPwdFun();
                knPassword= "";
            } else if (errCode === "KO016") {
                // console.log("가입된회원이 아님 or 아이디/비밀번호가 일치하지 않음");
                knPassword= "";
                notJoinUser();
            } else {
                console.log("로그인 에러");
                knPassword= "";
            }
            return {action: 'NONE'};
        });
    }

    let token_version_id = "";
    let integrity_value = "";
    let enc_data = "";
    // 휴대폰인증창 열기 api 호출
    function phoneCheckOpenLogin(state) {
        let url = "/v1/api/NiceId/open"

        let sendData = {
            state : state // 해외로그인본인인증 -> "6"
        }

        ajaxParam(url, sendData, (res) => {
            token_version_id = res.data.sendData.token_version_id;
            integrity_value = res.data.sendData.integrity_value;
            enc_data= res.data.sendData.enc_data;

            document.getElementById('token_version_id').value = token_version_id;
            document.getElementById('integrity_value').value = integrity_value;
            document.getElementById('enc_data').value = enc_data;

            jQuery("#niceForm").submit();
        });
    }

    // 휴대폰 인증완료후 처리함수
    window.phoneCertCheck = function (state, joinName, joinPhone) {
        // console.log("휴대폰 본인인증 완료!");

        // console.log("state : "+state);
        // console.log("joinName : "+joinName);
        // console.log("joinPhone : "+joinPhone);
        if(state === "6") {
            // console.log("해외로그인 -> 로그인완료처리");
            if(joinPhone === knPhoneNumber && joinName === knName) {
                overseasLogin();
            } else {
                alert("등록된 핸드폰번호와 일치하지 않습니다.");
            }
        } else {
            alert("본인인증 절차에 맞지 않은 행동입니다.")
        }
    };

    // 해외 로그인처리
    function overseasLogin() {
        // console.log("해외 로그인처리");
        let sendData = {
            ahId : ahId,
        }
        ajaxParam('/v2/api/History/activityUpdate', sendData, (json_success) => {
            // 기본값 초기화처리
            $is_login = true;
            $keyBufferSto = "";
            $ivSto = "";
            knPassword= "";
            // push("/service");
        });
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            loginBtn();
        }
    }
</script>

{#if stage === 0}
    <div class="j_inputArea">
        <div class="input-field">
            <input bind:value={knEmail} id="knEmail" type="text"  required placeholder="">
            <label for="knEmail"><span>이메일</span></label>
            <p class="{emailBlank === true ? 'notxt' : 'notxt not_work'}">이메일을 입력해주세요.</p>
            <p class="{notRegister === true ? 'notxt' : 'notxt not_work'}">아이디 또는 비밀번호가 일치하지 않습니다.</p>
            <p class="{notErrPwd === true ? 'notxt' : 'notxt not_work'}">{notErrPwd_msg}</p>
        </div>
        <div class="input-field mt30">
            <!-- type="password"는 autocomplete="off" 셋팅 : 자동완성을 막아줌. 그치만 저장된 데이터는 막기힘들다고함. 콘솔 워닝 이슈 -->
            <input bind:value={knPassword} autocomplete="off" id="knPassword" type="password" required on:keyup={() => capsLockCheck = callCapsLock(window.event)} on:keypress={() => enterPress(window.event)} />
            <label for="knPassword"><span>비밀번호</span></label>
            <p class="{pwdBlank === true ? 'notxt' : 'notxt not_work'}">비밀번호를 입력해주세요.</p>
            <p class="{capsLockCheck === true ? 'notxt' : 'notxt not_work'}">CapsLock이 켜져 있습니다.</p>
        </div>
    </div>
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
    </div>
<!--    <div class="join_bottom login">-->
<!--        <button type="button" on:click={kk}><p>테스트</p></button>-->
<!--    </div>-->
{:else}
    <LoginOTP {stageChange} {notJoinUser} {initiateGoogleOtpLogin} {knEmail} {otpError} {otp_err_msg} />
{/if}

<form style="height: 0;" name="niceForm" id="niceForm" action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb">
    <input type="hidden" id="m" name="m" value="service" /> <br/>
    <input type="hidden" id="token_version_id" name="token_version_id" /> <br/>
    <input type="hidden" id="enc_data" name="enc_data" /> <br/>
    <input type="hidden" id="integrity_value" name="integrity_value" /> <br/>
</form>


<!-- 스크린 블로커 -->
<MainScreenBlocker visibility={$mainScreenBlockerVisibility} />