<script>
    export let autoCompleteBoxController;
</script>

<div class="showcateinBox {autoCompleteBoxController.visible ? 'showon' : ''}">
    <div class="showcateinner">
        {#each autoCompleteBoxController.searchResultItemList as {combinedValue, cddName}, i}
            <div class="cateS_check">
                <input type="checkbox" on:change={autoCompleteBoxController.handleCheckedItemChange} value={combinedValue} id="shcate_{i}">
                <label for="shcate_{i}">
                    <em></em>
                    <p class="check"><span>{cddName}</span></p>
                </label>
            </div>
        {/each}
    </div>
</div>