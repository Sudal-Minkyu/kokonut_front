<script>

    import FindEmail from '../../components/home/find/FindEmail.svelte'
    import FindPassword from '../../components/home/find/FindPassword.svelte'
    import PhoneCert from '../../components/common/certification/PhoneCert.svelte'

    import FindEmailSuc from '../../components/home/find/FindEmailSuc.svelte'
    import FindPasswordSuc from '../../components/home/find/FindPasswordSuc.svelte'

    import { link } from 'svelte-spa-router'
    import { openDiv, stateVal } from '../../lib/store.js'
    import { onMount, onDestroy } from 'svelte';
    import CustomConfirm from "../../components/common/ui/CustomConfirm.svelte";

    let emailErrorState = true; // 이메일 공백, 이메일 형식, 이메일 가입여부 등 체크
    let emailErrorState_Msg = ""; // 에러메세지

    // 비밀번호찾기의 입력값 조건셋팅 함수
    function conditionFun(param, msg) {
        emailErrorState = param;
        emailErrorState_Msg = msg
    }

    onMount(async ()=>{
        stateVal.set(2)
    })

    let openNum = 0;

    $: openDiv.set(openNum);

    // 화면단 실시간 변경설정
    const unsubscribe = openDiv.subscribe(value => {
        openNum = value;
    });

    function clickFun(val) {
        $stateVal = val;
    }

    onDestroy(unsubscribe);

</script>

<div class="find_email" id="joinWrap">
    <div class="joinCont">
        <div class="joinBg"></div>
        <div class="joinContArea">
            <div class="joinContBox">
                {#if openNum === 0}
                    <ul class="f_type" style="padding-left: 15px;">
                        <li class="{$stateVal === 2 ? 'active' : ''}" on:click={() => clickFun(2)}><p>ID 찾기</p></li>
                        <li class="{$stateVal === 3 ? 'active' : ''}" on:click={() => clickFun(3)}><p>비밀번호 찾기</p></li>
                    </ul>
                    {#if $stateVal === 2}
                        <FindEmail />
                    {:else}
                        <FindPassword {emailErrorState} {emailErrorState_Msg} {conditionFun} />
                    {/if}
                    <PhoneCert state="{$stateVal}" {conditionFun} />
                    <div class="checkArea" style="display: block; text-align:center">
                        <a use:link href="/login"><p class="go_find">뒤로가기</p></a>
                    </div>
                {:else if openNum === 1}
                    <FindEmailSuc />
                {:else}
                    <FindPasswordSuc />
                {/if}
            </div>
        </div>
    </div>
</div>
<CustomConfirm />