<script>
    import {privacySearchData} from "../../../lib/store.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {ajaxBody} from "../../common/ajax.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    // 컬럼의 Alias 로 이름을 찾아 currentColumnName에 할당한다.
    // 현재는 label 표현에 문제가 있는 상태
    // 컬럼 정보 API가 완성되면 점검하여 개발할 것
    const searchLabelByColumnAlias = (columnAlias) => {

        return '';
    }
    const addSearchCondition = () => {
        privacySearchData.update(obj => {
            obj.searchConditionList.push({
                searchTable: obj.tableList[0].ctName,
                currentTableName: obj.tableList[0].ctDesignation,
                searchCode: obj.tableList[0].columnList[0].fieldCode,
                currentColumnName: obj.tableList[0].columnList[0].fieldComment,
                searchText: '',
                currentTableColumnList: obj.tableList[0].columnList,
                key: Date.now().toString(),
            });
            return obj;
        });
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

            if (obj.tableList[el.dataset.tid].columnList.length) {
                obj.searchConditionList[i].searchCode = obj.tableList[el.dataset.tid].columnList[0].fieldCode;
                obj.searchConditionList[i].currentColumnName = obj.tableList[el.dataset.tid].columnList[0].fieldComment;
            } else {
                obj.searchConditionList[i].searchCode = '';
                obj.searchConditionList[i].currentColumnName = '';
            }
            obj.searchConditionList[i].key = Date.now().toString();
            return obj;
        });
    }

    const handleChangeColumnBox = (el, i) => {
        privacySearchData.update(obj => {
            obj.searchConditionList[i].searchCode = el.dataset.value;
            obj.searchConditionList[i].currentColumnName = el.innerHTML;
            return obj;
        });
    }

    const getUserListByCondition = () => {
        const searchCondition = {
            searchTables: $privacySearchData.searchConditionList.map(obj => obj.searchTable),
            searchCodes: $privacySearchData.searchConditionList.map(obj => obj.searchCode),
            searchTexts: $privacySearchData.searchConditionList.map(obj => obj.searchText),
            pageNum: '1',
            limitNum: '10',
        };
        console.log('검색조건', searchCondition);
        ajaxBody('/v2/api/DynamicUser/privacyUserSearch', searchCondition, (res) => {
            console.log('검색결과', res);
            const searchResultList = res.data.sendData.privacyList;
            privacySearchData.update(obj => {
                obj.searchResultList = searchResultList;
                if (searchResultList.length) {
                    obj.currentPage = 'result';
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

    const handleEnterSearchText = (e) => {
        if (e.key === 'Enter') {
            getUserListByCondition();
        }
    }
</script>

<div class="contentInnerWrap">
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
                    <div class="selectBox wid100per nonePad" use:SelectBoxManager={(e) => {handleChangeTableBox(e, i)}}>
                        <div class="label">{currentTableName}</div>
                        <ul class="optionList">
                            {#each $privacySearchData.tableList as {ctDesignation, ctName}, j (ctName)}
                                <li class="optionItem curv" data-value="{ctName}" data-tid="{j}">{ctDesignation}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
                <div class="mu_SelBox wid180">
                    <div class="selectBox wid100per nonePad" use:SelectBoxManager={(e) => {handleChangeColumnBox(e, i)}}>
                        <div class="label">{currentColumnName}</div>
                        <ul class="optionList">
                            {#if $privacySearchData.tableList.length}
                                {#each currentTableColumnList as {fieldCode, fieldComment, fieldSecurity}, j (fieldCode)}
                                    <li class="optionItem curv" data-value="{fieldCode}">{fieldComment}</li>
                                {/each}
                            {/if}
                        </ul>
                    </div>
                </div>
                <div class="koinputshowhideBox">
                    <div class="koinput">
                        <input type="text" class="wid480" placeholder="검색어를 입력해 주세요."
                               bind:value={$privacySearchData.searchConditionList[i].searchText}
                               on:keypress={handleEnterSearchText} />
                        <button tabindex="-1"><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                    </div>
                </div>
            </div>
            <div style="position: relative; width: 13px; visibility: {$privacySearchData.searchConditionList.length > 1 ? 'visible' : 'hidden'}"
                 on:click={() => {removeSearchCondition(i)}}>
                <a class="pr_delete"></a>
            </div>
        </div>
    {/each}

    <div class="pr_fieldBtnInner">
        <button type="button" class="add_pr_field5 pr_fieldBtn" on:click={addSearchCondition}></button>
    </div>
</div>