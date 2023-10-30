<script>
    import {afterUpdate, onMount} from "svelte";

    export let message;
    export let fontSize = 1.4;
    export let style = '';

    let element; // 구현될 요소 스스로를 참조하기 위함
    let shakeClass = '';

    afterUpdate(() => {
        if (message) {
            // 컴포넌트의 높이를 획득
            const top = element.getBoundingClientRect().top;
            // 페이지의 스크롤 위치를 계산
            const offset = window.pageYOffset || document.documentElement.scrollTop;
            const scrollTo = offset + top;
            window.scroll({
                top: scrollTo - 300,
                behavior: 'smooth'
            });

            setTimeout(() => {
                shakeClass = 'textShake';
            }, 500);
        }
    })
</script>

{#if message}
    <div bind:this={element}>
        <p class="error_highlight {shakeClass}" style="font-size: {fontSize}rem;{style}">{message}</p>
    </div>
{/if}