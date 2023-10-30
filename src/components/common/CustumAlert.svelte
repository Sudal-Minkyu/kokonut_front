<script>
    import jQuery from 'jquery';

    export let startFun;

    export let popType; // 1: 버튼하나, 2: 여부를 묻는 버튼 두개
    export let imgState; // 1 : 성공, 2 : 경고, 3: 실패, 4: 물음표
    export let popTitle = "";
    export let popContents1 = "";
    export let popContents2 = "";
    export let popCheck = "";
    export let popStart = "";
    export let popCancel = "";

    // 확인버튼
    function popCheckBtn() {
        jQuery('#tip_box').removeClass('dp_b');
        jQuery('.dim').css('display','none');
        jQuery('body').css('overflow','unset');
        if(startFun !== undefined) {
            startFun();
        }
    }

    // 시작버튼
    function popStartBtn() {
        jQuery('#tip_box').removeClass('dp_b');
        jQuery('.dim').css('display','none');
        jQuery('body').css('overflow','unset');
        startFun();
    }

    // 취소버튼
    function popCloseBtn() {
        jQuery('#tip_box').removeClass('dp_b');
        jQuery('.dim').css('display','none');
        jQuery('body').css('overflow','unset');
    }

</script>

<div class="dim"></div>

<!--일반 팝업-->

<!--<div class="koko_popup ipdel_pop" data-popup="ipdel_pop" in:fade out:fade>-->
<div class="layerPopType" id="tip_box">
    <header class="popHeader">
        {#if imgState === 1}
            <img src="/assets/images/common/minipop_pass.png" alt="popIcon">
        {:else if imgState === 2}
            <img src="/assets/images/common/minipop_warring.png" alt="popIcon">
        {:else if imgState === 3}
            <img src="/assets/images/common/minipop_stop.png" alt="popIcon">
        {:else }
            <img src="/assets/images/common/minipop_confuse.png" alt="popIcon">
        {/if}
        <h4 class="popTit">{popTitle}</h4>
    </header>
    {#if popContents1 !== "" || popContents2 !== ""}
        <section class="popContents">
            <p>
                {popContents1}
                <br>
                {popContents2}
            </p>
        </section>
    {/if}
    <div class="popcBtnBox">

        {#if popType === 1}
            <button on:click={popCheckBtn} type="button" class="popCheck">{popCheck}</button>
        {:else}
            <button on:click={popCloseBtn} type="button" class="popCancel">{popCancel}</button>
            <button on:click={popStartBtn} type="button" class="popStart">{popStart}</button>
        {/if}

    </div>
</div>