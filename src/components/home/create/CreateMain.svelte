<script>

    import CreateUser from './CreateUser.svelte'
    import PhoneCert from '../../common/certification/PhoneCert.svelte'

    let stage = 0;

    function conditionFun(stageNum, nameParam, phoneParam) {
        stage = stageNum;
        joinName = nameParam;
        joinPhone = phoneParam
    }

    function stageChange() {
        stage = 0;
    }

    let joinName = ""; // 가입하는 회원명
    let joinPhone = ""; // 가입하는 회원번호
    export let userEmail;

    export let pagetext;
</script>

<div class="joinContBox">
    <p class="joinmTitle">{pagetext}</p>
    {#if stage === 0}
        <span class="precessbar1"></span>
    {:else}
        <span class="precessbar2"></span>
    {/if}
    <div class="findContArea">
        {#if stage === 0}
            <p class="findEx">휴대폰인증을 해주세요.</p>
        {:else}
            <p class="findEx">사용하실 비밀번호를 입력해주세요.</p>
        {/if}
        {#if stage === 0}
            <figure class="f_emailImg"><img alt="handphone" src="/assets/images/join/f-email.png"></figure>
            <PhoneCert state="{1}" {conditionFun} />
        {:else}
            <CreateUser {stage} {joinName} {joinPhone} {userEmail} {stageChange} />
        {/if}
    </div>
</div>