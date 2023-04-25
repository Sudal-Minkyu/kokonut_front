<script>

    import { fade } from 'svelte/transition'
    export let personalInfoItemProp;

</script>
<style>
    .titleDiv {
        padding: 10px 20px 10px 20px;
        position: absolute;
        top: 100px;
        right: 40%;
        font-size: 22px;
        text-align: center;
    }

    .titleMessage{
        background-color: #27d09f;
        color: white;
        font-weight: 400;
        padding: 10px;
        border-radius: 10px;
    }
</style>

{#if personalInfoItemProp.banner.titleClick}
    <div class="titleDiv" in:fade out:fade>
        <p class="titleMessage">{personalInfoItemProp.banner.titleMessage}</p>
    </div>
{/if}