<script>
    import {backBtn, privacySearchData} from "../../../lib/store.js";
    import {fade} from "svelte/transition";

    export let excelDownloadPopService;
    const handleToPreviousPage = () => {
        privacySearchData.update(obj => {
            obj.currentState = 'search';
            return obj;
        });
    }


</script>
<div class="contentInnerWrap sea_detail">
    <div class="pageTitleBtn seaTitle seaWrap marB50">
        <a style="cursor: pointer" on:click={handleToPreviousPage}>{$backBtn}</a>
        <dl>개인정보 열람</dl>
        <div class="kotopBtn"><button type="button" on:click={excelDownloadPopService.open}>개인정보 엑셀 다운로드</button></div>
    </div>

    <div in:fade>
        <div class="seaContentBox">
            {#each $privacySearchData.currentDetail as {columnName, columnValue}}
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>{columnName}</dl>
                        <div class="myInfoBox">
                            <span>{columnValue}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

