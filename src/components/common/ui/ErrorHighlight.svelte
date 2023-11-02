<script>
    import {afterUpdate, onMount} from "svelte";
    import {debouncedTopScroll} from "./DebouncedTopScroll.js";

    export let message;
    export let fontSize = 1.4;
    export let style = '';

    let element; // 구현될 요소 스스로를 참조하기 위함
    let shakeClass = '';
    let tempMsg = '';
    let lastActivated = new Date().getTime() + 1000;
    $: displayMsg = tempMsg ? tempMsg : '';

    const changeMsg = (msg) => {
        if (lastActivated < new Date().getTime()) {
            lastActivated = new Date().getTime() + 1000;
            tempMsg = msg;

            setTimeout(() => {
                if (tempMsg) {
                    // 컴포넌트의 높이를 획득
                    const top = element.getBoundingClientRect().top;
                    // 페이지의 스크롤 위치를 계산
                    const offset = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollTo = offset + top;
                    debouncedTopScroll(scrollTo);
                    shakeClass = '';

                    setTimeout(() => {
                        shakeClass = 'textShake';
                        message = '';
                    }, 700);
                }
            }, 0);
        }
    };

    afterUpdate(() => {
        changeMsg(message);
    });
</script>

{#if displayMsg}
    <div bind:this={element}>
        <p class="error_highlight {shakeClass}" style="font-size: {fontSize}rem;{style}">{displayMsg}</p>
    </div>
{/if}