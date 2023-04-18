<script>
    import { fade } from 'svelte/transition';
    import PhoneCert from '../certification/PhoneCert.svelte'
    import CustumAlert from "../CustumAlert.svelte"

    import { onlyNumber, callCapsLock, popOpenBtn } from '../../../lib/common'

    export let knEmail
    export let otpTitle;
    export let src = "/assets/images/common/otpqrimg.png";
    export let knOtpKey;

    let knPassword = "";
    let otpValue = "";
    let errMsgCheck = true;
    let pwdNot = true;
    let pwdBlank = true;
    let otpBlank = true;
    let capsLockCheck = false;

    // OTP변경의 입력값 조건셋팅 함수
    function conditionFun(num, param) {
        if(num === 1) {
            pwdBlank = param;
        } else if(num === 2) {
            otpBlank = param;
        } else if(num === 3){
            errMsgCheck = param
        } else {
            pwdNot = param
        }
    }

    let imgState;
    export let popTitle;
    // 입력값 초기화 함수
    function initValue() {
        otpValue = "";
        knPassword = "";

        popOpenBtn();
        imgState = 1;
    }

    export let googleOtpPopBtn;

</script>

<div class="koko_popup otp_pop" in:fade out:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">{otpTitle}</h3>
                <div class="koSubInfo">
                    <dl>
                        kokonut 서비스 관리자 로그인을 위해 2단계 인증이 필요합니다.<br>
                        <span>Google OTP</span> 인증을 등록해 주세요.
                    </dl>
                </div>
            </div>
            <div class="otpInfoBox">
                <div class="otpInfotext">
                    <d>1</d><dl>구글 플레이 혹은 애플 앱스토어에서 <span>Google Authenticator</span>를 검색해서 설치해 주세요.</dl>
                </div>
                <div class="otpInfotext">
                    <d>2</d><dl>다운받은 Google OTP앱으로 QR코드를 스캔하거나, 하단의 코드를 직접 입력해 주세요.</dl>
                    <div class="otpqrBox">
                        <div class="otpqrInner">
                            <div class="otpqrImg">
                                <img src={src} alt="QRcode" />
                            </div>
                            <div class="divider_line"></div>
                            <div class="otpqrInfo">
                                <div class="otpqrNum">{knOtpKey}</div>
                                <div class="otpqrNumInfo">
                                    <p>
                                        위 16자리 코드를 반드시 메모해
                                        두세요. 휴대전화의 교체/분실
                                        또는 앱 삭제 시 복구를 위해
                                        필요합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="otpInfotext">
                    <d>3</d><dl>(아래 그림 참고) Google OTP 앱에서 우측 상단 + 를 클릭한 후 Accout에 kokonut 계정이메일 주소를, Keyg항목에는 위에서 복사한 번호를 입력 후 상단 체크를 클릭해 저장해주세요. 홈으로 돌아와 OTP 인증코드를 확인해 주세요.</dl>
                    <div class="otpqrInfoImg">
                        <img src="/assets/images/common/authenticator.png" alt="">
                    </div>
                </div> -->
            </div>
            <div class="kopopinput marB10" style="width: 43%;position:absolute;">
                <label>비밀번호 입력</label>
                <input type="password" bind:value={knPassword} on:keyup={() => capsLockCheck = callCapsLock(window.event)} />
                <p style="text-align: left;" class="{pwdNot === true ? 'notxt not_work' : 'notxt'}">비밀번호가 일치하지 않습니다.</p>
                <p style="text-align: left;" class="{pwdBlank === true ? 'notxt not_work' : 'notxt'}">비밀번호를 입력해주세요.</p>
                <p style="text-align: left;" class="{capsLockCheck === true ? 'notxt' : 'notxt not_work'}">CapsLock이 켜져 있습니다.</p>
            </div>
            <div class="kopopinput marB10" style="width: 50%;left: 51%;">
                <label>구글 OTP 인증번호(6자리)</label>
                <input type="text" maxlength="6" bind:value={otpValue} on:keyup={() => otpValue = onlyNumber(otpValue)} />
                <p style="text-align: left;" class="{otpBlank === true ? 'notxt not_work' : 'notxt'}">OTP 인증코드를 입력해주세요.</p>
                <p style="text-align: left;" class="{errMsgCheck === true ? 'notxt not_work' : 'notxt'}">입력된 구글 OTP 값이 일치하지 않습니다.</p>
            </div>
            <PhoneCert {initValue} {conditionFun} state="{4}" {knEmail} {knPassword} {otpValue} {knOtpKey} {googleOtpPopBtn} />
        </div>
        <div class="koko-popup-close otp_pop_close" on:click={googleOtpPopBtn}></div>
    </div>
</div>
<CustumAlert popType = {1} imgState = {imgState} {popTitle} popCheck = {"확인"} startFun="{googleOtpPopBtn}" />