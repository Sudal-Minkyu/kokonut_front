<script>
    import jQuery from 'jquery';
    import { onlyNumber } from '../../../lib/common'
	import { onMount } from 'svelte'
    import GoogleOTP from '../../common/certification/GoogleOTP.svelte'
    import restapi from "../../../lib/api"

	let otpInput;
    
    onMount(async ()=>{
        await otpInput.focus()
    })

    export let knEmail; // 입력한 이메일
    let otpValue=""; // 입력 OTP값
    export let stageChange; // 가입된 회원이 아니거나, 뒤로 돌아가야 할 경우
    export let googleOtpLogin; // 최종 OTP 로그인
    export let notJoinUser;

    export let otpError;
    export let otp_err_msg;

    let otpTitle = "구글 OTP 2단계 인증 등록/재등록"
    // 엔터키 클릭
    function enterPress(event) {
        if(event.keyCode === 13) {
            googleOtpLogin(otpValue);
        }
    }
   
    let src;
    let knOtpKey;
    function otpCreate() {
        googleOtpPop = true;

        console.log("구글 OTP 등록 및 재등록 클릭!");
        
        let url = "/v1/api/Auth/otpQRcode"
		
		let sendData = {
			knEmail : knEmail,
		}

		restapi('v1', 'get', url, "param", sendData, 'application/json',
			(json_success) => {
				if(json_success.data.status === 200) {
                    src = json_success.data.sendData.url;
                    knOtpKey = json_success.data.sendData.otpKey;
                    // console.log("CSRF_TOKEN : "+json_success.data.sendData.CSRF_TOKEN);
                    // console.log("otpKey : "+json_success.data.sendData.otpKey);
                    // console.log("QRcode url : "+json_success.data.sendData.url);
                    // jQuery('[data-popup="otp_pop"]').fadeIn(0);
                    // jQuery('body').css('overflow','hidden');
                } else {
                    notJoinUser();
                }
			},
			(json_error) => {
				console.log("구글 OTP 등록 및 재등록 실패");
				alert(json_error.data.err_msg);
			}
		)
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
    <button on:click|preventDefault={() => googleOtpLogin(otpValue)} type="button"><p>인증</p></button>
</div>
<div class="checkArea" style="display: block; text-align:center">
    <a on:click={stageChange}><p class="go_find">뒤로가기</p></a>
</div>