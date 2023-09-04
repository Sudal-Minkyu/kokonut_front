<script>
    import {onMount} from "svelte";

    export let message;
    export let fontSize;
    export let style = '';

    let shakeClass = '';
    onMount(async => {
        shakeClass = 'textShake';
    });
</script>

{#if message}
    <div>
        <p class="error_highlight {shakeClass}" style="font-size: {fontSize ? fontSize : 1.4 }rem;{style}">{message}</p>
    </div>
{/if}