
<script>
    import { link } from 'svelte-spa-router'
    import { openDiv, stateVal, findEmail } from '../../../lib/store'
</script>

<figure class="j_logo"><img src="/assets/images/join/j_logo.png" alt=""></figure>
<p class="j_logotxt">새로운 개인정보보호의 시작</p>
<div class="findContArea">
    <div class="findBox">
        <p class="user_email">{$findEmail}</p>
    </div>
    <p class="findBoxEx">
        고객님의 이메일을 찾았습니다.<br>
        확인 후 로그인을 진행해 주세요.
    </p>
</div>
<div class="find_bottom login">
    <a use:link href="/login" on:click="{() => {$openDiv = 0, $findEmail = '이메일 찾는중...'}}"><p>로그인 하기</p></a>
</div>
<a class="go_fpassword" on:click="{() => {$openDiv = 0, $stateVal = 3, $findEmail = '이메일 찾는중...'}}"><p>비밀번호 찾기</p></a>
