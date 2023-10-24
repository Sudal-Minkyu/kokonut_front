
<script>

    import { findPwd } from '../../../lib/store'
    import { emailCheck } from "../../../lib/common.js" // 공통함수

    export let emailErrorState;
    export let emailErrorState_Msg;

    export let conditionFun;

</script>

<div class="findContArea">
    <p class="findEx">
        비밀번호를 찾으실 이메일 ID를 입력 후<br>
        휴대폰 인증을 해주세요.
    </p>
</div>
<figure class="f_emailImg"><img alt="handphone" src="/assets/images/join/f-email.png"></figure>

<div class="j_inputArea">
    <div class="input-field">
        <input type="text" id="knEmail" bind:value={$findPwd} required placeholder="" on:keyup={() => conditionFun(emailCheck($findPwd), "이메일 형식이 올바르지 않습니다.")}>
        <label for="knEmail"><span>이메일 ID</span></label>
    </div>
    <p class="{emailErrorState === true ? 'notxt not_work' : 'notxt'}">{emailErrorState_Msg}</p>
</div>