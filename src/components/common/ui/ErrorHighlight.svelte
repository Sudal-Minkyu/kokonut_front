<script>
    import {onMount} from "svelte";

    export let message;
    export let fontSize = 1.4;
    export let style = '';

    let shakeClass = '';
    onMount(async => {
        shakeClass = 'textShake';
    });
</script>

{#if message}
    <div>
        <p class="error_highlight {shakeClass}" style="font-size: {fontSize}rem;{style}">{message}</p>
    </div>
{/if}