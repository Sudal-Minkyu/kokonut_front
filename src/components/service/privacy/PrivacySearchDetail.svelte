<script>
    import {privacySearchData} from "../../../lib/store.js";

    const handleToPreviousPage = () => {
        privacySearchData.update(obj => {
            obj.currentState = 'search';
            return obj;
        });
    }
</script>
<div class="contentInnerWrap sea_detail">
    <div class="page_backLine marB40">
        <a on:click={handleToPreviousPage}><div class="page_backarrow"></div></a>
    </div>
    <div class="seaTitle seaWrap marB50">
        <dl>개인정보 열람</dl>
        <div class="kotopBtn"><button>전체 엑셀 다운로드</button></div>
    </div>

    <div>
        {#each $privacySearchData.currentDetail as {tableName, columnDataset}}
            {#if columnDataset.length}
                <div class="seaPrivacyContentBox">
                    <h2>{tableName}
                        <button class="seapDownBtn">엑셀 다운로드</button>
                    </h2>
                    <div class="seaContentBox">
                        {#each columnDataset as row}
                            {#each row as {columnName, columnValue}}
                                <div class="seaContentLine borB">
                                    <div class="seaCont wid100per">
                                        <dl>{columnName}</dl>
                                        <div class="myInfoBox">
                                            <span>{columnValue}</span>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>