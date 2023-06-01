<script>
    import {privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";
    let columnList = [];
    let valuesList = [];

    onMount(async => {
        refineColumnAndValuesList();
    });

    const refineColumnAndValuesList = () => {
        columnList = [];
        valuesList = [];
        const rawList = $privacySearchData.searchResultList || [];

        if(rawList.length) {
            columnList = Object.keys(rawList[0]);
            valuesList = rawList.map(rawObj => columnList.map(key => rawObj[key]));
        }
    }

    const handleOpenDetail = (idx) => {
        console.log('상세보기클릭', idx);
        ajaxGet('/v2/api/DynamicUser/privacyUserOpen', {idx}, (res) => {
            console.log('상세보기결과', res);
        });
    }
</script>
<div class="contentInnerWrap">
    <div class="seaTitle marB50">
        <dl><span></span>에 대한 검색 결과</dl>
    </div>

    <div class="sea_resultWrap">
        <div>
            <div class="sea_reInner">
                <div class="mu_SelBox wid138">
                    <div class="selectBox wid100per nonePad">
                        <div class="label">전체</div>
                        <ul class="optionList">
                            <li class="optionItem curv all_sel">전체</li>
                            <li class="optionItem curv email_sel">이메일</li>
                            <li class="optionItem curv name_sel">이름</li>
                            <li class="optionItem curv birth_sel">생년월일</li>
                            <li class="optionItem curv phone_sel">휴대폰번호</li>
                        </ul>
                    </div>
                </div>
                <div class="mu_SelBox wid138">
                    <div class="selectBox wid100per nonePad">
                        <div class="label">전체</div>
                        <ul class="optionList">
                            <li class="optionItem curv all_sel">전체</li>
                        </ul>
                    </div>
                </div>
                <div class="koinputshowhideBox">
                    <div class="koinput">
                        <input type="text" name="all" id="all" class="wid360" placeholder="이름, 이메일, 생년월일, 휴대폰번호 검색">
                        <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                    </div>
                </div>

    <!--            <div class="filtetBtn" id="filter_pop">기간 필터</div>-->

            </div>
            <div class="koko_check">
                <input type="checkbox" value="1" name="result_research" id="result_research">
            </div>
        </div>

        <div class="kotable search_result marT50">
            <div class="kt_tableTopBox marB24">
                <div class="kt_total">총 <span>{valuesList.length}</span>건</div>
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
                    {#each columnList as columnName}
                        <th>{columnName}</th>
                    {/each}
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {#each valuesList as values}
                    <tr>
                        {#each values as value}
                            <td>{value}</td>
                        {/each}
                        <td><a class="dlink" on:click={() => {handleOpenDetail(values[0])}}>상세보기</a></td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>

        <div class="paginationBox marT40">
            <ul class="pagination">
                <li class="page-item page-pre disabled"><a class="page-link" aria-label="previous page"></a></li>
                <li class="page-item active"><a class="page-link" aria-label="to page 1">1</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 2">2</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 3">3</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 4">4</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 5">5</a></li>
                <li class="page-item page-last-separator disabled"><a class="page-link" aria-label="">...</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 93">93</a></li>
                <li class="page-item page-next"><a class="page-link" aria-label="next page"></a></li>
            </ul>
        </div>
    </div>
</div>