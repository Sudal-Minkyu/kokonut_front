<script>

    import { findPwd } from '../../../lib/store'
    import { emailCheck } from "../../../lib/common.js" // 공통함수

    export let emailBlank;
    export let emailNotJoin;
    export let emailNotForm;
    export let conditionFun;

</script>

<div class="findContArea">
    <p class="findEx">
        가입되신 이메일을 입력 후<br>
        휴대폰 인증을 해주세요.
    </p>
</div>
<figure class="f_emailImg"><img alt="handphone" src="/assets/images/join/f-email.png"></figure>

<div class="j_inputArea">
    <div class="input-field">
        <input type="text" id="knEmail" bind:value={$findPwd} required placeholder="" on:keyup={() => conditionFun(1, emailCheck($findPwd), conditionFun(3, true))}>
        <label for="knEmail"><span>이메일</span></label>
    </div>
    <p class="{emailBlank === true ? 'notxt not_work' : 'notxt'}">이메일을 입력해주세요.</p>
    <p class="{emailNotJoin === true ? 'notxt not_work' : 'notxt'}">가입되지 않은 이메일입니다.</p>
    <p class="{emailNotForm === true ? 'notxt not_work' : 'notxt'}">이메일 형식이 올바르지 않습니다.</p>
</div>