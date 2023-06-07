<script>
    import {privacySearchData, initialPrivacySearch} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxBody, ajaxGet} from "../../common/ajax.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import Pagenation from "../../common/ui/Pagenation.svelte";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    let columnList = [];
    let valuesList = [];

    export let getTableAndColumnList;

    onMount(async => {
        refineColumnAndValuesList();
    });

    // 구분자를 통해 오는 값의 경우에만 동적 컬럼 리스트에 추가
    // 고정값들은 루프문 바깥에서 직접 추가
    const refineColumnAndValuesList = () => {
        columnList = [];
        valuesList = [];
        const rawList = $privacySearchData.searchResultList || [];

        if(rawList.length) {
            const keyList = Object.keys(rawList[0]);
            const dynamicColumnKeyList = keyList.filter(key => key.includes('%%__%%'));
            columnList = [ 'kokonut_IDX',
                'NO',
                ...dynamicColumnKeyList.map(key => {
                    const keyParts = key.split('%%__%%');
                    return keyParts[1] + `(${keyParts[2]})`;
                }),
                '회원가입일시',
                '마지막로그인일시',
            ];
            let i = 1;
            valuesList = rawList.map(rawObj => {
                return [
                    rawObj['kokonut_IDX'],
                    i++,
                    ...dynamicColumnKeyList.map(key => rawObj[key]),
                    rawObj['회원가입일시'],
                    rawObj['마지막로그인일시'],
                ];
            });
        }
    }

    const handleOpenDetail = (idx) => {
        ajaxGet('/v2/api/DynamicUser/privacyUserOpen', {idx}, (res) => {
            console.log('상세보기결과', res);
            privacySearchData.update(obj => {
                obj.currentDetail = res.data.sendData.privacyInfo;
                return obj;
            });
        });
    }

    const handleToPreviousPage = () => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
        getTableAndColumnList();
    }

    const handleChangeTableBox = (el) => {
        privacySearchData.update(obj => {
            obj.additionalSearchConditionOnResult.searchTable = el.dataset.value;
            obj.additionalSearchConditionOnResult.currentTableIndex = el.dataset.tid;
            obj.additionalSearchConditionOnResult.currentTableColumnList = obj.tableList[el.dataset.tid].columnList;

            if (obj.tableList[el.dataset.tid].columnList.length) {
                obj.additionalSearchConditionOnResult.searchCode = obj.tableList[el.dataset.tid].columnList[0].fieldCode;
                obj.additionalSearchConditionOnResult.currentColumnName = obj.tableList[el.dataset.tid].columnList[0].fieldComment;
            } else {
                obj.additionalSearchConditionOnResult.searchCode = '';
                obj.additionalSearchConditionOnResult.currentColumnName = '';
            }
            return obj;
        });
    }

    const handleChangeColumnBox = (el, i) => {
        privacySearchData.update(obj => {
            obj.additionalSearchConditionOnResult.searchCode = el.dataset.value;
            return obj;
        });
    }

    const getAdditionalUserListByCondition = () => {
        const searchCondition = {
            searchTables: [...$privacySearchData.searchConditionList.map(obj => obj.searchTable)],
            searchCodes: [...$privacySearchData.searchConditionList.map(obj => obj.searchCode)],
            searchTexts: [...$privacySearchData.searchConditionList.map(obj => obj.searchText)],
            pageNum: '1',
            limitNum: '10',
        };
        console.log('검색조건', searchCondition);
        ajaxBody('/v2/api/DynamicUser/privacyUserSearch', searchCondition, (res) => {
            console.log('검색결과', res);
            const searchResultList = res.data.sendData.privacyList;
            privacySearchData.update(obj => {
                obj.searchResultList = searchResultList;
                return obj;
            });
        });
    }

    const handleEnterSearchText = (e) => {
        if (e.key === 'Enter') {
            getAdditionalUserListByCondition();
        }
    }

</script>
<div class="contentInnerWrap">
    <div class="page_backLine marB40">
        <a on:click={handleToPreviousPage}><div class="page_backarrow"></div></a>
    </div>
    <div class="seaTitle marB50">
        <dl><span></span>검색 결과</dl>
    </div>

    <div class="sea_resultWrap">
        <div>
            <div class="sea_reInner">
                <div class="mu_SelBox wid138">
                    <div class="selectBox wid100per nonePad" use:SelectBoxManager={handleChangeTableBox}>
                        <div class="label">전체</div>
                        <ul class="optionList">
                            {#each $privacySearchData.tableList as {ctDesignation, ctName}, j (ctName)}
                                <li class="optionItem curv" data-value="{ctName}" data-tid="{j}">{ctDesignation}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
                <div class="mu_SelBox wid138">
                    <div class="selectBox wid100per nonePad" use:SelectBoxManager={handleChangeColumnBox}>
                        <div class="label">전체</div>
                        <ul class="optionList">
                            {#if $privacySearchData.tableList.length}
                                {#each $privacySearchData.additionalSearchConditionOnResult.currentTableColumnList as {fieldCode, fieldComment, fieldSecurity}, j (fieldCode)}
                                    <li class="optionItem curv" data-value="{fieldCode}">{fieldComment}</li>
                                {/each}
                            {/if}
                        </ul>
                    </div>
                </div>
                <div class="koinputshowhideBox">
                    <div class="koinput">
                        <input type="text" name="all" id="all" class="wid360" placeholder="이름, 이메일, 생년월일, 휴대폰번호 검색"
                               bind:value={$privacySearchData.additionalSearchConditionOnResult.searchText}
                               on:keypress={handleEnterSearchText}>
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
                    {#each columnList as columnName, i}
                        {#if i}
                            <th>{columnName}</th>
                        {/if}
                    {/each}
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {#each valuesList as values}
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
        </div>비
        <Pagenation props={{}}/>
    </div>
</div>