<script>

    import JoinUser from './JoinUser.svelte'
    import JoinSuccess from './JoinSuccess.svelte'

    import { link } from 'svelte-spa-router'
    import PhoneCert from '../../common/certification/PhoneCert.svelte'

    let stage = 0;

    function conditionFun(stageNum, nameParam, phoneParam) {
        stage = stageNum;
        joinName = nameParam;
        joinPhone = phoneParam
    }

    let joinName = ""; // 가입하는 회원명
    let joinPhone = ""; // 가입하는 회원번호
   
</script>

<div class="joinContBox">
    <p class="joinmTitle">회원가입</p>
    {#if stage === 0}
        <span class="precessbar1"></span>
    {:else}
        <span class="precessbar2"></span>
    {/if}
    <div class="findContArea">
        {#if stage === 0}
            <p class="findEx">휴대폰인증을 해주세요.</p>
        {:else}
            <p class="findEx">간단한 정보를 적어주세요.</p>
        {/if}
        {#if stage === 0}
            <figure class="f_emailImg"><img alt="handphone" src="/assets/images/join/f-email.png"></figure>
            <PhoneCert state="{1}" {conditionFun} />
            <div class="checkArea" style="display: block; text-align:center">
                <a use:link href="/login"><p class="go_find">뒤로가기</p></a>
            </div>
        {:else}
            <JoinUser mainConditionFun={conditionFun} {joinName} {joinPhone} />
        {/if}
    </div>
</div>