<script>
    import {backBtn, privacySearchData} from "../../../lib/store.js";
    import {fade} from "svelte/transition";
    import ExcelDownloadPop from "../../common/ui/ExcelDownloadPop.svelte";

    const handleToPreviousPage = () => {
        privacySearchData.update(obj => {
            obj.currentState = 'search';
            return obj;
        });
    }

    const excelDownloadPopService = {
        visibility: false,
        requestURL: '/v2/api/DynamicUser/privacyUserDownloadExcel',
        requestData: {
            paramMap: $privacySearchData.currentDetail,
        },
        close: () => {
            excelDownloadPopService.visibility = false;
        },
        open: () => {
            excelDownloadPopService.visibility = true;
        },
    }
</script>
<div class="contentInnerWrap sea_detail">
    <div class="pageTitleBtn seaTitle seaWrap marB50">
        <a on:click={handleToPreviousPage}>{$backBtn}</a>
        <dl>개인정보 열람</dl>
        <div class="kotopBtn"><button type="button" on:click={excelDownloadPopService.open}>엑셀 다운로드</button></div>
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

{#if excelDownloadPopService.visibility}
    <ExcelDownloadPop {excelDownloadPopService} />
{/if}