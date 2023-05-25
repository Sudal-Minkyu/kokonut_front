
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {privacySearchData} from "../../../lib/store.js";
    import {SelectBoxManager} from "../../../components/common/action/SelectBoxManager.js";
    import {onMount} from "svelte";

    onMount(async => {
        privacySearchData.update(obj => {
            obj.searchConditionList[0].currentLabel = searchLabelByColumnAlias();
            return obj;
        });
    });

    // 컬럼의 Alias 로 이름을 찾아 currentLabel에 할당한다.
    // 현재는 label 표현에 문제가 있는 상태
    // 컬럼 정보 API가 완성되면 점검하여 개발할 것
    const searchLabelByColumnAlias = (columnAlias) => {

        return '';
    }
    const addSearchCondition = () => {
        privacySearchData.update(obj => {
            obj.searchConditionList.push({
                searchColumn: '1_ID',
                searchValue: '',
                currentLabel: searchLabelByColumnAlias('1_ID'),
            });
            return obj;
        });
    };

    const removeSearchCondition = (i) => {
        if ($privacySearchData.searchConditionList.length > 1) {
            privacySearchData.update(obj => {
                obj.searchConditionList = [...obj.searchConditionList.filter((_, index) => index !== i)];
                console.log(obj);
                return obj;
            });
        }
    }

    const handleChangeSelectBox = (el, i) => {
        privacySearchData.update(obj => {
            obj.searchConditionList[i].searchColumn = el.dataset.value;
            obj.searchConditionList[i].currentLabel = el.innerHTML;
            return obj;
        });
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보 검색</h1>
            <dl>
                개인정보 조회 및 열람 시 기록이 남습니다.
            </dl>
        </div>

        <div class="pr_seaIliustBox">
            <img src="/assets/images/common/search_lilust.png" alt="">
        </div>
        <!--                <div class="filtetBtn" id="filter_pop">기간 필터</div>-->

        {#each $privacySearchData.searchConditionList as {searchColumn, searchValue, currentLabel}, i}
            <div class="pr_seaWrap" style="margin-top: 5px">
                <div class="pr_seaInner">
                    <div class="mu_SelBox wid180">
                        <div class="selectBox wid100per nonePad" use:SelectBoxManager={(e) => {handleChangeSelectBox(e, i)}}>
                            <div class="label">{currentLabel}</div>
                            <ul class="optionList">
                                <li class="optionItem curv email_sel" data-value="1_1">이메일</li>
                                <li class="optionItem curv name_sel" data-value="1_2">이름</li>
                                <li class="optionItem curv birth_sel" data-value="2_3">생년월일</li>
                                <li class="optionItem curv phone_sel" data-value="3_4">휴대폰번호</li>
                            </ul>
                        </div>
                    </div>
                    <div class="koinputshowhideBox">
                        <div class="koinput">
                            <input type="text" class="wid480" placeholder="검색어를 입력해 주세요."
                                   bind:value={$privacySearchData.searchConditionList[i].searchValue} />
                            <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
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
</section>
