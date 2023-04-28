<script>
    export let prop = {};

    if (typeof prop !== 'object') {
        prop = {};
    }

    const defaultProp = {
        visible: false, // 팝업 보임의 여부 통제
        type: 'confirm', // 'confirm' 버튼하나, 'ask' 여부 묻기
        callback: () => {}, // 확인버튼시 동작
        icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
        title: '제목 미설정', // 제목
        contents1: '내용 미설정', // 내용
        contents2: '',
        btnCheck: '확인', // 확인 버튼의 텍스트
        btnStart: '실행', // 실행 버튼의 텍스트
        btnCancel: '취소', // 취소 버튼의 텍스트
    }

    $: actualProp = {...defaultProp, ...prop};

    // 확인버튼
    function btnCheck() {
        actualProp.callback();
        prop.visible = false;
    }

    // 시작버튼
    function btnStart() {
        actualProp.callback();
        prop.visible = false;
    }

    // 취소버튼
    function btnCancel() {
        prop.visible = false;
    }

</script>

{#if actualProp.visible}
<div class="dim"></div>
<div class="layerPopType dp_b" id="tip_box">
    <header class="popHeader">
        {#if actualProp.icon === 'success'}
            <img src="/assets/images/common/minipop_pass.png" alt="popIcon">
        {:else if actualProp.icon === 'warning'}
            <img src="/assets/images/common/minipop_warring.png" alt="popIcon">
        {:else if actualProp.icon === 'fail'}
            <img src="/assets/images/common/minipop_stop.png" alt="popIcon">
        {:else if actualProp.icon === 'question'}
            <img src="/assets/images/common/minipop_confuse.png" alt="popIcon">
        {/if}
        <h4 class="popTit">{actualProp.title}</h4>
    </header>
    <section class="popContents">
        <p>
            {actualProp.contents1}
            <br>
            {actualProp.contents2}
        </p>
    </section>
    <div class="popcBtnBox">
        {#if actualProp.type === 'confirm'}
            <button on:click={btnCheck} type="button" class="popCheck">{actualProp.btnCheck}</button>
        {:else if actualProp.type === 'ask'}
            <button on:click={btnStart} type="button" class="popStart">{actualProp.btnStart}</button>
            <button on:click={btnCancel} type="button" class="popCancel">{actualProp.btnCancel}</button>
        {/if}
    </div>
</div>
{/if}