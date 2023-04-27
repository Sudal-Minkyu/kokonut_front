<script>
    export let message;
</script>

{#if message}
    <div>
        <p class="error_highlight">{message}</p>
    </div>
{/if}