<script>
    import {customConfirmData} from "../../../lib/store.js";
    import { fade } from "svelte/transition"
    // 확인버튼
    const btnCheck = () => {
        $customConfirmData.callback();
        $customConfirmData.visible = false;
    }

    // 시작버튼
    const btnStart = () => {
        $customConfirmData.callback();
        $customConfirmData.visible = false;
    }

    // 취소버튼
    const btnCancel = () => {
        $customConfirmData.visible = false;
    }

</script>

{#if $customConfirmData.visible}
    <div class="dim" style="display: block"></div>
    <div class="layerPopType dp_b" id="tip_box" in:fade>
        <header class="popHeader">
            {#if $customConfirmData.icon === 'pass'}
                <img src="/assets/images/common/minipop_pass.png" alt="popIcon">
            {:else if $customConfirmData.icon === 'warning'}
                <img src="/assets/images/common/minipop_warring.png" alt="popIcon">
            {:else if $customConfirmData.icon === 'fail'}
                <img src="/assets/images/common/minipop_stop.png" alt="popIcon">
            {:else if $customConfirmData.icon === 'question'}
                <img src="/assets/images/common/minipop_confuse.png" alt="popIcon">
            {/if}
            <h4 class="popTit">{$customConfirmData.title}</h4>
        </header>
        {#if $customConfirmData.contents1 || $customConfirmData.contents2}
            <section class="popContents">
                <p>
                    {$customConfirmData.contents1}
                    {#if $customConfirmData.contents2}
                        <br>
                        {$customConfirmData.contents2}
                    {/if}
                </p>
            </section>
        {/if}
        <div class="popcBtnBox">
            {#if $customConfirmData.type === 'confirm'}
                <button on:click={btnCheck} type="button" class="popCheck">{$customConfirmData.btnCheck}</button>
            {:else if $customConfirmData.type === 'ask'}
                <button on:click={btnCancel} type="button" class="popCancel">{$customConfirmData.btnCancel}</button>
                <button on:click={btnStart} type="button" class="popStart">{$customConfirmData.btnStart}</button>
            {/if}
        </div>
    </div>
{/if}