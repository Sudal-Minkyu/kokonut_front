<script>
    export let loadState = 1; // false 계통의 값일 경우 로딩스크린이 보이고, 아닐 경우 본 내용이 슬롯에 보이도록
    export let left = 0;
    export let top = 0;

    $: styleText = (left ? `left: ${left}px;` : '') + (top ? `top: ${top}px;` : '');
</script>

{#if loadState }
    <slot></slot>
{:else}
    <div class="loaderParent" style={styleText}>
        <div class="loader"></div>
    </div>
{/if}