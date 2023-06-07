<script>
    import {privacySearchData} from "../../../lib/store.js";
    import {ajaxGet} from "../../common/ajax.js";
    import Pagination from "../../common/ui/Pagination.svelte";

    const handleOpenDetail = (idx) => {
        ajaxGet('/v2/api/DynamicUser/privacyUserOpen', {idx}, (res) => { // 향후 kokonut_IDX로 수정필
            console.log('상세보기결과', res);
            privacySearchData.update(obj => {
                obj.currentDetail = res.data.sendData.privacyInfo;
                return obj;
            });
        });
    }

</script>
<div class="sea_resultWrap">
    <div class="kotable search_result marT50">
        <div class="kt_tableTopBox marB24">
            <div class="kt_total">총 <span>{$privacySearchData.resultValueList.length}</span>건</div>
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
    <Pagination props={{}}/>
</div>