<script>
    export let prop = {};

    const defaultProp = {
        visible: true, // 팝업 보임의 여부 통제
        type: 'confirm', // 'confirm' 버튼하나, 'ask' 여부 묻기
        callback: () => {}, // 확인버튼시 동작
        icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
        title: '', // 제목
        contents: '', // 내용
        btnCheck: '확인', // 확인 버튼의 텍스트
        btnStart: '실행', // 실행 버튼의 텍스트
        btnCancel: '취소', // 취소 버튼의 텍스트
    }

    // 확인버튼
    function btnCheck() {
        defaultProp.visible = false;
        defaultProp.callback();
    }

    // 시작버튼
    function btnStart() {
        defaultProp.visible = false;
        defaultProp.callback();
    }

    // 취소버튼
    function btnCancel() {
        defaultProp.visible = false;
    }

</script>

{#if defaultProp.visible}
<div class="dim"></div>
<div class="layerPopType dp_b" id="tip_box">
    <header class="popHeader">
        {#if defaultProp.icon === 'success'}
            <img src="/assets/images/common/minipop_pass.png" alt="popIcon">
        {:else if defaultProp.icon === 'warning'}
            <img src="/assets/images/common/minipop_warring.png" alt="popIcon">
        {:else if defaultProp.icon === 'fail'}
            <img src="/assets/images/common/minipop_stop.png" alt="popIcon">
        {:else if defaultProp.icon === 'question'}
            <img src="/assets/images/common/minipop_confuse.png" alt="popIcon">
        {/if}
        <h4 class="popTit">{defaultProp.title}</h4>
    </header>
    <section class="popContents">
        <p>
            {defaultProp.contents}
        </p>
    </section>
    <div class="popcBtnBox">
        {#if defaultProp.type === 'confirm'}
            <button on:click={btnCheck} type="button" class="popCheck">{defaultProp.btnCheck}</button>
        {:else if defaultProp.type === 'ask'}
            <button on:click={btnStart} type="button" class="popStart">{defaultProp.btnStart}</button>
            <button on:click={btnCancel} type="button" class="popCancel">{defaultProp.btnCancel}</button>
        {/if}
    </div>
</div>
{/if}