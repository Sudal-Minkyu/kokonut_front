<script>

    import Login from '../../components/home/login/LoginMain.svelte'


    import { link } from 'svelte-spa-router'
    import { onMount } from 'svelte';



</script>

<div class="login" id="joinWrap">
    <div class="joinCont">
        <div class="joinBg"></div>
        <div class="joinContArea">
            <div class="joinContBox">
                <figure class="j_logo"><img src="/assets/images/join/j_logo.png" alt=""></figure>
                <p class="j_logotxt">새로운 개인정보보호의 시작</p>

                <Login />

            </div>
            <div class="joinmember">
                <a use:link href="/join">아직 회원이 아니신가요?<span>회원가입</span></a>
            </div>
        </div>
    </div>
</div>
