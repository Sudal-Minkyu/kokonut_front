<script>
    export let message;
    export let fontSize;
</script>

{#if message}
    <div>
        <p class="error_highlight" style="font-size: {fontSize ? fontSize : 1.4 }rem;">{message}</p>
    </div>
{/if}