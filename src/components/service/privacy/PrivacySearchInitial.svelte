<script>
    import {privacySearchData} from "../../../lib/store.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import Pagination from "../../common/ui/Pagination.svelte";
    import {fade} from "svelte/transition";
    import LoadingOverlay from "../../common/ui/LoadingOverlay.svelte";
    import {SEARCH_CONDITION_LIMIT, addSearchCondition, removeSearchCondition, handleChangeColumnBox,
        getUserListByCondition, handleEnterSearchText, handleOpenDetail, handleChangePage,
        distinguishSearchTextPlaceholder} from "../../common/privacySearch/privacySearch.js";

const handlePage = ({detail}) => {
        handleChangePage({
            page: detail.page,
            limitNum: 10,
        });
    }

</script>
<div class="spcontWrap">
    <div class="pageTitleBtn marB50">
        <h1>개인정보 검색</h1>
        <dl>
            💡 개인정보 검색 및 상세보기 클릭 시 '개인정보 처리 이력' 에 기록이 남습니다.
        </dl>
    </div>
</div>

{#each $privacySearchData.searchConditionList as {searchCode, currentColumnName, key}, i (key)}
    <div class="pr_seaWrap" style="margin-top: 5px">
        <div class="pr_seaInner">
            <div class="mu_SelBox wid180">
                <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: (e) => {handleChangeColumnBox(e, i)}}}>
                    <div class="label">{currentColumnName}</div>
                    <ul class="optionList">
                        {#each $privacySearchData.columnList as {fieldCode, fieldComment, fieldSecrity}, j (fieldCode)}
                            <li class="optionItem curv" data-value={fieldCode} data-secrity={fieldSecrity}>{fieldComment}</li>
                        {/each}
                    </ul>
                </div>
            </div>
            <div class="koinputshowhideBox">
                <div class="koinput">
                    <input type="text" class="wid480"
                           placeholder={distinguishSearchTextPlaceholder($privacySearchData.searchConditionList[i])}
                           bind:value={$privacySearchData.searchConditionList[i].searchText}
                           on:keypress={handleEnterSearchText} />
                    <button tabindex="-1" on:click={() => {getUserListByCondition()}}>
                        <img src="/assets/images/common/icon_search_ver2.png" alt="">
                    </button>
                </div>
            </div>
        </div>
        <div style="position: relative; width: 13px; visibility: {$privacySearchData.searchConditionList.length > 1 ? 'visible' : 'hidden'}"
             on:click={() => {removeSearchCondition(i)}}>
            <a class="pr_delete"></a>
        </div>
    </div>
{/each}

{#if $privacySearchData.searchConditionList.length < SEARCH_CONDITION_LIMIT}
    <div class="pr_fieldBtnInner">
        <button type="button" class="add_pr_field5 pr_fieldBtn" on:click={addSearchCondition}></button>
    </div>
{/if}

{#if $privacySearchData.searchResultState !== -1}
    <LoadingOverlay bind:loadState={$privacySearchData.searchResultState} top={140} >
        <div class="sea_resultWrap" in:fade>
            <div class="kotable search_result marT50">
                <div class="kt_tableTopBox marB24">
                    <div class="kt_total">총 <span>{$privacySearchData.totalPosts}</span>건</div>
                    <div class="kt_selbox wid120">
                        <!--                <div class="selectBox wid100per nonePad">-->
                        <!--                    <div class="label" id="">최근 등록순</div>-->
                        <!--                    <ul class="optionList">-->
                        <!--                        <li class="optionItem curv">최근 등록순</li>-->
                        <!--                        <li class="optionItem curv">정확도순</li>-->
                        <!--                        <li class="optionItem curv">오름차순</li>-->
                        <!--                        <li class="optionItem curv">내림차순</li>-->
                        <!--                    </ul>-->
                        <!--                </div>-->
                    </div>
                </div>
                <table>
                    <caption>개인정보 검색결과 테이블</caption>
                    <thead>
                    <tr>
                        {#each $privacySearchData.resultColumnList as columnName, i}
                            {#if i}
                                <th>{columnName}</th>
                            {/if}
                        {/each}
                        <th>상세보기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $privacySearchData.resultValueList as values}
                        <tr>
                            {#each values as value, i}
                                {#if i}
                                    <td>{value}</td>
                                {/if}
                            {/each}
                            <td><a class="dlink" on:click={() => {handleOpenDetail(values[0])}}>상세보기</a></td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
            <Pagination bind:currentPage={$privacySearchData.currentPage}
                        bind:totalPosts={$privacySearchData.totalPosts}
                        on:change={handlePage} />
        </div>
    </LoadingOverlay>
{/if}