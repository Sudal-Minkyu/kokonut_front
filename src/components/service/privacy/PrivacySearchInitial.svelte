<script>
    import {privacySearchData} from "../../../lib/store.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {ajaxBody, ajaxGet} from "../../common/ajax.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";
    import Pagination from "../../common/ui/Pagination.svelte";

    const SEARCH_CONDITION_LIMIT = 5;
    const addSearchCondition = () => {
        if ($privacySearchData.searchConditionList.length < SEARCH_CONDITION_LIMIT) {
            privacySearchData.update(obj => {
                obj.searchConditionList.push({
                    searchTable: obj.tableList[0].ctName,
                    currentTableName: obj.tableList[0].ctDesignation,
                    searchCode: obj.tableList[0].columnList[0].fieldCode,
                    currentColumnName: obj.tableList[0].columnList[0].fieldComment,
                    currentColumnSecrity: obj.tableList[0].columnList[0].fieldComment,
                    searchText: '',
                    currentTableColumnList: obj.tableList[0].columnList,
                    key: Date.now().toString(),
                });
                return obj;
            });
        }
    };

    const removeSearchCondition = (i) => {
        if ($privacySearchData.searchConditionList.length > 1) {
            privacySearchData.update(obj => {
                obj.searchConditionList = [...obj.searchConditionList.filter((_, index) => index !== i)];
                return obj;
            });
        }
    }

    const handleChangeTableBox = (el, i) => {
        privacySearchData.update(obj => {
            obj.searchConditionList[i].searchTable = el.dataset.value;
            obj.searchConditionList[i].currentTableName = el.innerHTML;
            obj.searchConditionList[i].currentTableIndex = el.dataset.tid;
            obj.searchConditionList[i].currentTableColumnList = obj.tableList[el.dataset.tid].columnList;
            obj.searchConditionList[i].searchText = '';

            if (obj.tableList[el.dataset.tid].columnList.length) {
                obj.searchConditionList[i].searchCode = obj.tableList[el.dataset.tid].columnList[0].fieldCode;
                obj.searchConditionList[i].currentColumnName = obj.tableList[el.dataset.tid].columnList[0].fieldComment;
                obj.searchConditionList[i].currentColumnSecrity = obj.tableList[el.dataset.tid].columnList[0].fieldSecrity;
            } else {
                obj.searchConditionList[i].searchCode = '';
                obj.searchConditionList[i].currentColumnName = '';
                obj.searchConditionList[i].searchText = '';
            }
            obj.searchConditionList[i].key = Date.now().toString();
            return obj;
        });
    }

    const handleChangeColumnBox = (el, i) => {
        privacySearchData.update(obj => {
            obj.searchConditionList[i].searchCode = el.dataset.value;
            obj.searchConditionList[i].currentColumnName = el.innerHTML;
            obj.searchConditionList[i].currentColumnSecrity = Number(el.dataset.secrity);
            obj.searchConditionList[i].searchText = '';
            return obj;
        });
    }

    const getUserListByCondition = (page = 1) => {
        const searchCondition = {
            searchTables: $privacySearchData.searchConditionList.map(obj => obj.searchTable),
            searchCodes: $privacySearchData.searchConditionList.map(obj => obj.searchCode),
            searchTexts: $privacySearchData.searchConditionList.map(obj => obj.searchText),
            pageNum: page,
            limitNum: '10',
        };
        console.log('검색조건', searchCondition);
        if (verifySearchCondition(searchCondition).isVerifyFail) {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '검색 대상 중복', // 제목
                contents1: '중복되는 검색 대상이 존재합니다.', // 내용
                contents2: '한 대상당 하나의 조건으로 검색 가능합니다.',
                btnCheck: '확인', // 확인 버튼의 텍스트
            });
            return false;
        }

        ajaxBody('/v2/api/DynamicUser/privacyUserSearch', searchCondition, (res) => {
            console.log('검색결과', res);
            const searchResultList = res.data.sendData.privacyList;
            privacySearchData.update(obj => {
                obj.currentPage = page;
                obj.totalPosts = res.data.sendData.totalCount;
                console.log(obj.currentPage);
                obj.rawResultList = searchResultList || [];
                if (searchResultList.length) {
                    // 결과 페이지의 행에 사용될 값과 값으로 사용될 값을 정제
                    const keyList = Object.keys(obj.rawResultList[0]);
                    const dynamicColumnKeyList = keyList.filter(key => key.includes('%%__%%'));
                    obj.resultColumnList = [ 'kokonut_IDX',
                        'NO',
                        ...dynamicColumnKeyList.map(key => {
                            const keyParts = key.split('%%__%%');
                            return keyParts[1] + `(${keyParts[2]})`;
                        }),
                        '회원가입일시',
                        '마지막로그인일시',
                    ];
                    let i = 1;
                    obj.resultValueList = obj.rawResultList.map(rawObj => {
                        return [
                            rawObj['kokonut_IDX'],
                            i++,
                            ...dynamicColumnKeyList.map(key => rawObj[key]),
                            rawObj['회원가입일시'],
                            rawObj['마지막로그인일시'],
                        ];
                    });
                } else {
                    openConfirm({
                        icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: '검색결과없음', // 제목
                        contents1: '찾으시는 개인정보 검색 결과가 없습니다.', // 내용
                        contents2: '',
                        btnCheck: '확인', // 확인 버튼의 텍스트
                    });
                }
                return obj;
            });
        });
    }

    const verifySearchCondition = (searchCondition) => {
        // 이렇게 하면, 중복되는 값이 있다면 Set의 크기는 원래 배열의 크기보다 작게 됩니다.
        const set = new Set(searchCondition.searchCodes);

        // Set의 크기와 원래 배열의 크기를 비교하여 중복 여부를 반환합니다.
        return {isVerifyFail: set.size < searchCondition.searchCodes.length};
    }

    const handleEnterSearchText = (e) => {
        if (e.key === 'Enter') {
            getUserListByCondition();
        }
    }

    const handleOpenDetail = (kokonut_IDX) => {
        ajaxGet('/v2/api/DynamicUser/privacyUserOpen', {kokonut_IDX}, (res) => {
            const rawDetail = res.data.sendData.privacyInfo;
            console.log('상세보기결과', rawDetail);

            const refinedDetail = [];
            const detailKeyList = Object.keys(rawDetail).sort();
            for (const [i, tableKey] of detailKeyList.entries()) {
                const columnKeyList = rawDetail[tableKey].length ? Object.keys(rawDetail[tableKey][0]).sort() : [];
                refinedDetail[i] = {
                    tableName: tableKey,
                    columnDataset: [],
                };
                for (const [j, rowOfTable] of rawDetail[tableKey].entries()) {
                    refinedDetail[i].columnDataset[j] = [];
                    for (const columnKey of columnKeyList) {
                        refinedDetail[i].columnDataset[j].push({
                            columnName: columnKey,
                            columnValue: rowOfTable[columnKey],
                        });
                    }
                }
            }

            privacySearchData.update(obj => {
                obj.currentDetail = refinedDetail;
                obj.currentState = 'detail';
                console.log('정제된상세보기', refinedDetail);
                return obj;
            });
        });
    }

    const handleChangePage = ({page}) => {
        getUserListByCondition(page);
    }

    const distinguishSearchTextPlaceholder = (targetSearchCondition) => {
        let resultText = '';
        if (targetSearchCondition.currentColumnName === '휴대전화번호') {
            resultText = '휴대전화번호 뒷자리 4자리를 입력해 주세요.';
        } else if (targetSearchCondition.currentColumnSecrity === 1) {
            resultText = '완전히 일치하는 검색어를 입력해 주세요.';
        } else {
            resultText = '검색어를 입력해 주세요.';
        }
        return resultText;
    }

</script>

<div class="pageTitleBtn marB50">
    <h1>개인정보 검색</h1>
    <dl>
        개인정보 조회 및 열람 시 기록이 남습니다.
    </dl>
</div>

{#each $privacySearchData.searchConditionList as {searchTable, currentTableName, currentTableIndex,
    currentTableColumnList, searchCode, currentColumnName, searchText, key}, i (key)}
    <div class="pr_seaWrap" style="margin-top: 5px">
        <div class="pr_seaInner">
            <div class="mu_SelBox wid180">
                <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: (e) => {handleChangeTableBox(e, i)}}}>
                    <div class="label">{currentTableName}</div>
                    <ul class="optionList">
                        {#each $privacySearchData.tableList as {ctDesignation, ctName}, j (ctName)}
                            <li class="optionItem curv" data-value="{ctName}" data-tid="{j}">{ctDesignation}</li>
                        {/each}
                    </ul>
                </div>
            </div>
            <div class="mu_SelBox wid180">
                <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: (e) => {handleChangeColumnBox(e, i)}}}>
                    <div class="label">{currentColumnName}</div>
                    <ul class="optionList">
                        {#if $privacySearchData.tableList.length}
                            {#each currentTableColumnList as {fieldCode, fieldComment, fieldSecrity}, j (fieldCode)}
                                <li class="optionItem curv" data-value={fieldCode} data-secrity={fieldSecrity}>{fieldComment}</li>
                            {/each}
                        {/if}
                    </ul>
                </div>
            </div>
            <div class="koinputshowhideBox">
                <div class="koinput">
                    <input type="text" class="wid480"
                           placeholder={distinguishSearchTextPlaceholder($privacySearchData.searchConditionList[i])}
                           bind:value={$privacySearchData.searchConditionList[i].searchText}
                           on:keypress={handleEnterSearchText} />
                    <button tabindex="-1" on:click={getUserListByCondition}>
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



{#if $privacySearchData.rawResultList.length}
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
        <Pagination bind:currentPage={$privacySearchData.currentPage}
                    bind:totalPosts={$privacySearchData.totalPosts}
                    on:change={handleChangePage} />
    </div>
{/if}