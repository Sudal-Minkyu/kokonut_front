<script>
    import { onMount } from "svelte";

    let width = window.innerWidth;

    onMount(() => {
        const handleResize = () => {
            width = window.innerWidth;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<style>
    .mobile img {
        width: 100%;
    }
    .desktop img {
        width: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .element-with-black-background::before {
        content: "";
        background-color: black;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;  /* 뒤로 보내기 */
    }
</style>

<div class="element-with-black-background"></div>
{#if width < 768}
    <div class="mobile">
        <img src="/assets/images/main/onbording.png" alt="onbording"/>
    </div>
{:else}
    <div class="desktop">
        <img src="/assets/images/main/onbording_big.png" alt="onbording"/>
    </div>
{/if}

