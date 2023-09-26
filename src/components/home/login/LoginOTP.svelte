<script>
    import { onlyNumber } from '../../../lib/common'
	import { onMount } from 'svelte'
    import GoogleOTP from '../../common/certification/GoogleOTP.svelte'
    import {ajaxGet, reportCatch} from "../../common/ajax.js";

	let otpInput;
    
    onMount(async ()=>{
        await otpInput.focus()
    })

    export let knEmail; // 입력한 이메일
    let otpValue=""; // 입력 OTP값
    export let stageChange; // 가입된 회원이 아니거나, 뒤로 돌아가야 할 경우
    export let initiateGoogleOtpLogin; // 최종 OTP 로그인
    export let notJoinUser;

    export let otpError;
    export let otp_err_msg;

    let otpTitle = "구글 OTP 2단계 인증 등록/재등록"
    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            initiateGoogleOtpLogin(otpValue,2);
        }
    }
   
    let src;
    let knOtpKey;
    function otpCreate() {
        googleOtpPop = true;
        let url = "/v1/api/Auth/otpQRcode"
		
		let sendData = {
			knEmail : knEmail,
		}

        ajaxGet(url, sendData, (res) => {
            try {
                src = res.data.sendData.url;
                knOtpKey = res.data.sendData.otpKey;
            } catch (e) {
                reportCatch('temp028', e);
            }
        }, (errCode, errMsg) => {
            try {
                notJoinUser();
                alert(errMsg);
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp029', e);
            }
        });
    }

    // 구글 OTP 팝업
    let googleOtpPop = false;
    function googleOtpPopBtn() {
        googleOtpPop = !googleOtpPop;
    }

</script>

<div class="j_inputArea">
    <div class="input-field">
        <input type="text" id="opt" bind:this={otpInput} bind:value={otpValue} required placeholder="" maxlength="6" on:keyup={() => otpValue = onlyNumber(otpValue)} on:keypress={enterPress}>
        <label for="opt"><span>Google OTP 입력</span></label>
        <p class="{otpError === true ? 'notxt' : 'notxt not_work'}">{otp_err_msg}</p>
    </div>
</div>
{#if googleOtpPop}
<GoogleOTP popTitle="{'구글 OTP 등록을 완료했습니다.'}" {otpTitle} {knEmail} {src} {knOtpKey} {googleOtpPopBtn} />
{/if}
<div class="checkArea" style="display: block; text-align:center">
    <a on:click|preventDefault={otpCreate}><p class="go_find">구글 OTP 2단계 인증 등록/재등록</p></a>
</div>
<div class="join_bottom login">
    <button on:click|preventDefault={() => initiateGoogleOtpLogin(otpValue,2)} type="button"><p>인증</p></button>
</div>
<div class="checkArea" style="display: block; text-align:center">
    <a on:click={stageChange}><p class="go_find">뒤로가기</p></a>
</div>