<script>
    import { fade } from 'svelte/transition'
    import {bannerMessage} from "../../../lib/store.js";
    import {afterUpdate} from "svelte";

    // 배너가 구현되고 나서 2초 후에 배너를 사라지게 한다.
    // 동시에 여러개의 배너가 뜰 경우 마지막 배너를 기준으로 2초 뒤 사라진다.
    afterUpdate(() => {
        const msgWhenStart = $bannerMessage;
        setTimeout(() => {
            if (msgWhenStart === $bannerMessage) {
                bannerMessage.set('');
            }
        }, 2000);
    });
</script>

<style>
    .titleDiv {
        padding: 10px 20px 10px 20px;
        position: fixed;
        top: 100px;
        right: 40%;
        font-size: 22px;
        text-align: center;
        z-index: 1500;
    }

    .titleMessage{
        background-color: #27d09f;
        color: white;
        font-weight: 400;
        padding: 10px;
        border-radius: 10px;
    }
</style>

{#if $bannerMessage}
    <div class="titleDiv" in:fade out:fade>
        <p class="titleMessage">{$bannerMessage}</p>
    </div>
{/if}