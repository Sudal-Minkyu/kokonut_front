
<style>
    input[type="checkbox"]{
        display: none;
    }
    input[type="checkbox"] + label{
        display: inline-block;
        width: 20px;
        height: 20px;
        top: 3px;
        margin-right: 5px;
        border: 2px solid #00C389;
        position: relative;
    }
    input[id="check1"]:checked + label::after, input[id="check2"]:checked + label::after{
        content: '';
        background: url(/assets/images/join/pass_check.png);
        font-size: 10px;
        width: 15px;
        height: 23px;
        color: #00C389;
        text-align: center;
        position: absolute;
        background-size: 18px 18px;
        left: 0;
        top: -2px;
    }

</style>
<script>
    import jQuery from "jquery";
    import { push } from 'svelte-spa-router'
    import { emailCheck } from "../../../lib/common.js" // 공통함수
    import {ajaxBody, ajaxGet, reportCatch} from "../../common/ajax.js";
    import ErrorHighlight from "../../common/ui/ErrorHighlight.svelte";

    let cpNameBlank = true;

    let email_error_msg = "";

    // 이메일 조건 변수
    let error_msg = "";
    let emailBlank = true;
    let emailAlreadyJoin = true;
    let emailNotForm = true;
    let existsEmailCheck = false;
    let knEmailNotCheck = false;
    // ~
    
    // 패스워드 조건 변수
    let passwordBlank = true;
    let passwordCheckNum = true;
	let passwordCheckEng = true;
	let passwordCheckSpe = true;
	let passwordCheckLen = true;
	let passwordConfirmCheck = false;
    let passwordCheck = false;
    // ~

    // 인증번호 제한시간 조건 변수
    let numberCheck = false;

    let emailStep = 0; // 해당 값이 "0"일 경우 중복체크하지 않음, "1"일 경우 중복체크시도중, "2"일 경우 중복체크완료함
    
    // 회원가입 이메일 입력값 조건셋팅 함수
    function conditionFun(num, param) {
        if(num === 1) {
            emailNotForm = param;
        } else if(num === 2) {
            emailAlreadyJoin = param;
        } else if(num === 3) {
            emailBlank = param;
        } else if(num === 4) {
            cpNameBlank = param
        }
    }

    // 이메일 중복체크
    function existsEmail() {
        if(knEmail === "") {
            conditionFun(3, false);
        } else {
            conditionFun(3, true);
        }

        if(knEmailCheck) {
            knEmailCheck = false;
        }

        if(!emailAlreadyJoin) {
            emailAlreadyJoin = true;
        }

        if(emailBlank && emailNotForm && emailAlreadyJoin) {
            let url = "/v1/api/Auth/existsByKnEmail"

            let sendData = {
                knEmail : knEmail
            }

            ajaxGet(url, sendData, (res) => {
                try {
                    seconds = 180;
                    timer = "";
                    clearInterval(interval);
                    conditionFun(2, true);
                    emailStep = 1;
                    existsEmailCheck = true;
                    numberSendEmail();
                } catch (e) {
                    reportCatch('temp022', e);
                }
            }, (errCode, errMsg) => {
                try {
                    error_msg = errMsg;
                    conditionFun(2, false);
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp023', e);
                }
            });
        }
    }

    // 인증번호 받기
    function numberSendEmail() {
        jQuery('.email_codeCount').css('display', 'block');
		if (existsEmailCheck) {
			let url = "/v1/api/Auth/numberSendKnEmail"
			let sendData = {
				knEmail : knEmail
			}

            ajaxGet(url, sendData, (res) => {
                try {
                    interval = setInterval(count_down_timer, 1000); // 해당 함수 1초마다 실행
                } catch (e) {
                    reportCatch('temp024', e);
                }
            });
		} else {
            error_msg = '이메일 중복체크 먼저 해주세요.';
            conditionFun(2, false);
		}
	}

    // 카운팅 숫자(3분)
    let timer;
	let seconds;
	let interval;
	// 3분 카운팅
	function count_down_timer() {
		var min = parseInt((seconds)/60);
		var sec = seconds%60;

		if(sec.toString().length === 1) {
			timer = min+" : 0"+sec;
		} else {
			timer = min+" : "+sec;
		}
		seconds--;

		if(seconds === 0) {
            jQuery('.email_codeCount').css('display', 'none');
			seconds = 180;
			numberCheck = true;
            email_error_msg = "3분을 초과했습니다. 인증번호를 다시 받아주세요.";
			clearInterval(interval);
		}
	}

    // 인증번호 확인
    function numberCheckEmail() {
        let url = "/v1/api/Auth/numberCheckKnEmail"
        let sendData = {
            ctNumber : emailCode,
            knEmail : knEmail
        }

        ajaxGet(url, sendData, (res) => {
            try {
                if (knEmailNotCheck) {
                    knEmailNotCheck = false;
                }
                knEmailCheck = true;
                emailStep = 2;
                emailCode = "";
            } catch (e) {
                reportCatch('temp025', e);
            }
        }, (errCode, errMsg) => {
            try {
                numberCheck = true;
                email_error_msg = errMsg;
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp026', e);
            }
        });
    }

    // 비밀번호 검증함수
    function passwordConfirm(val) {
		if(val === 1) {

			if(knPasswordConfirm !== "") {
				if(knPassword !== knPasswordConfirm) {
					passwordConfirmCheck = false;
				} else {
					passwordConfirmCheck = true;
				}
			}

			// 비밀번호 입력
			const num = knPassword.search(/[0-9]/g); // 숫자 체크 정규식
			const eng = knPassword.search(/[a-z]/ig); // 영문 체크 정규식
			const spe = knPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); // 특수문자 체크 정규식

			// 영문,숫자, 특수문자 모두 하나이상을 혼합하여 입력
			if(knPassword.search(/\s/) !== -1) {
				passwordBlank=false;
			} else {
				passwordBlank=true;
			}
			
			if(eng < 0) {
				passwordCheckEng=true;
			}else {
				passwordCheckEng=false;
			}
			
			if(num < 0) {
				passwordCheckNum=true;
			} else {
				passwordCheckNum=false;
			}
			
			if(spe < 0) {
				passwordCheckSpe=true;
			} else {
				passwordCheckSpe=false;
			}
			
			if(knPassword.length < 10 || knPassword.length > 20) {
				passwordCheckLen=true;
			} else {
				passwordCheckLen=false;
			}
			
			if(passwordCheckNum && passwordCheckSpe && passwordCheckEng && passwordCheckLen) {
				passwordCheck=false;
			} else {
				passwordCheck=true;
			}
			
		} else {

			// 비밀번호확인 입력
			if(knPassword !== "") {
				if(knPassword !== knPasswordConfirm) {
					passwordConfirmCheck = false;
				} else {
					passwordConfirmCheck = true;
				}
			}
		}
	}

    export let  joinName = "";
    export let  joinPhone = "";

    let cpName = "";
    let knEmail = "";
    let knPassword = "";
    let knPasswordConfirm = "";
    let emailCode = "";
    let knEmailCheck = false;
    let isFirstAgree = false;
    let isSecondAgree = false;
    let firstAgreeCautionMsg = '';
    let secondAgreeCautionMsg = '';

    // 회원가입 버튼
    function register() {
        if(cpName !== "") {
            conditionFun(4, true)
        } else {
            conditionFun(4, false)
        }

        if(!knEmailCheck) {
            // error_msg = '이메일 중복체크 먼저 해주세요.';
            // conditionFun(2, false);
            knEmailNotCheck = true;
        }

        if (isFirstAgree) {

        }
        firstAgreeCautionMsg = isFirstAgree ? '' : '개인정보 처리방침에 동의해 주세요.';
        secondAgreeCautionMsg = isSecondAgree ? '' : '이용약관에 동의해 주세요.';
        if(cpNameBlank &&passwordCheck && passwordConfirmCheck && emailStep ===2 && knEmailCheck && isFirstAgree && isSecondAgree) {
            let url = "/v1/api/Auth/kokonutSignUp"

			let sendData = {
				cpName : cpName,
                knName : joinName,
                knPhoneNumber : joinPhone,
                knEmail : knEmail,
                knPassword : knPassword,
                knPasswordConfirm : knPasswordConfirm,
                knEmailCheck : knEmailCheck,
			}
            ajaxBody(url, sendData, (res) => {
                try {
                    push('/joinsu');
                } catch (e) {
                    reportCatch('temp027', e);
                }
            }, (errCode, errMsg) => {
                try {
                    alert(errMsg);
                    push('/join');
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp111', e);
                }
            });
        }
    }

    const handleOpenAgreement = (agreeNo) => {
        if (agreeNo === 1) {
            window.open('https://kokonut.oopy.io/privacy_policy_service', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=900,height=1000');
        } else if (agreeNo === 2) {
            window.open('https://kokonut.oopy.io/service_agreement', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=900,height=1000');
        }
    }

</script>

<form>
    <div class="j_inputArea">

        <div class="input-field">
            <input style="margin-bottom: 10px;" type="text" id="cpName" bind:value={cpName} required>
            <label for="cpName" aria-label="{cpName}"><span>회사명(소속)</span></label>
            <p class="{cpNameBlank === true ? 'notxt not_work' : 'notxt'}">소속을 입력해주세요.</p>
        </div>

        <div class="input-field mt20">
            <input type="text" id="knEmail" bind:value={knEmail} on:keyup={() => conditionFun(1, emailCheck(knEmail), conditionFun(3, true))} required>
            <label for="knEmail"><span>이메일</span></label>
            <div class="emailBtn" on:click|preventDefault={existsEmail}>중복체크</div>
            <p class="{emailBlank === true ? 'notxt not_work' : 'notxt'}">이메일을 입력해주세요.</p>
            <p class="{emailAlreadyJoin === true ? 'notxt not_work' : 'notxt'}">{error_msg}</p>
            <p class="{emailNotForm === true ? 'notxt not_work' : 'notxt'}">이메일 형식이 올바르지 않습니다.</p>
            <p class="{knEmailCheck === false ? 'notxt not_work' : 'notxt pass'}">인증이 완료되었습니다.</p>
            <p class="{knEmailNotCheck === false ? 'notxt not_work' : 'notxt'}">이메일 인증이 완료되지 않았습니다.</p>
        </div>
        
        {#if emailStep === 1}
            <div class="input-field mt20">
                <input type="text" bind:value={emailCode} id="emailCheckNum" required> 
                <label for="emailCheckNum"><span>이메일 인증번호</span></label>
                <div class="emailcodeBtn" on:click|preventDefault={numberCheckEmail}>인증번호 확인</div>
                <p class="email_codeCount">{timer}</p>
                <p class="{numberCheck === true ? 'notxt' : 'notxt not_work'}">{email_error_msg}</p>
            </div>
        {/if}

        <div class="input-field mt30">
            <input type="password" autocomplete="off" id="knPassword" bind:value={knPassword} on:keyup={() => passwordConfirm(1)} required>
            <label for="knPassword"><span>비밀번호</span></label>
            <p class="{passwordBlank === false ? 'notxt' : 'notxt not_work'}">공백은 포함할 수 없습니다.</p>
        </div>
        <ul class="j_password">
            <!-- 조건 충족시 p에 pass 추가 -->
            <li><p class="{passwordCheckEng === false ? 'notxt pass' : 'notxt'}">영문 포함</p></li>
            <li><p class="{passwordCheckNum === false ? 'notxt pass' : 'notxt'}">숫자 포함</p></li>
            <li><p class="{passwordCheckSpe === false ? 'notxt pass' : 'notxt'}">특수문자 포함</p></li>
            <li><p class="{passwordCheckLen === false ? 'notxt pass' : 'notxt'}">10~20자</p></li>
        </ul>
        <div class="input-field mt30">
            <input type="password" autocomplete="off" id="knPasswordConfirm" bind:value={knPasswordConfirm} on:keyup={() => passwordConfirm(2)} required>
            <label for="knPasswordConfirm"><span>비밀번호 확인</span></label>
        </div>
        <ul class="j_password">
            <li><p class="{passwordConfirmCheck === false ? 'notxt' : 'notxt pass'}">비밀번호 일치</p></li>
        </ul>

        <div class="input-field mt30" style="padding: 25px 0 0 0;">
            <input type="checkbox" id="check2" style="margin-right: 10px;" bind:checked={isSecondAgree}>
            <label for="check2"></label>
            <span style="font-size: 2rem; font-family: 'Pretendard', sans-serif; color: #9A9A9A" >[필수]&nbsp이용약관 동의<a style="cursor: pointer;text-decoration: underline;margin-left: 10px" on:click={() => {handleOpenAgreement(2)}}>전문보기</a></span>
            <ErrorHighlight bind:message={secondAgreeCautionMsg} />
            <br/>
            <br/>
            <input type="checkbox" id="check1" style="margin-right: 10px" bind:checked={isFirstAgree}>
            <label for="check1"></label>
            <span style="font-size: 2rem; font-family: 'Pretendard', sans-serif; color: #9A9A9A" >[필수]&nbsp개인정보 처리방침 동의<a style="cursor: pointer;text-decoration: underline;margin-left: 10px" on:click={() => {handleOpenAgreement(1)}}>전문보기</a></span>
            <ErrorHighlight bind:message={firstAgreeCautionMsg} />
        </div>

</div>
    <!-- 조건 충족 시 not_work 제거 -->
    <div class="join_bottom">
        <button type="button" on:click|preventDefault={register}><p>완료</p></button>
    </div>
</form>