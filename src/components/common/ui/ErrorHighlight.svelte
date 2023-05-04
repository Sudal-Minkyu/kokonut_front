<script>
    import {onMount} from "svelte";

    export let message;
    export let fontSize;

    let shakeClass = '';
    onMount(async => {
        shakeClass = 'textShake';
    });
</script>

{#if message}
    <div>
        <p class="error_highlight {shakeClass}" style="font-size: {fontSize ? fontSize : 1.4 }rem;">{message}</p>
    </div>
{/if}