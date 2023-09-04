<script>
    import {EMAIL_SEARCH_CONDITION_LIMIT, addSearchCondition, removeSearchCondition, handleChangeColumnBox,
        getUserListByCondition, handleEnterSearchText, handleChangePage,
        distinguishSearchTextPlaceholder, getColumnList} from "../../common/privacySearch/privacySearchFullData.js";
    import {emailSendData, privacySearchData} from "../../../lib/store.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import Pagination from "../../common/ui/Pagination.svelte";
    import LoadingOverlay from "../../common/ui/LoadingOverlay.svelte";
    import {fade} from "svelte/transition";
    import {ajaxGet, reportCatch} from "../../common/ajax.js";
    import {onMount} from "svelte";

    onMount(() => {
        getColumnList();
        getCsEmailCodeSetting();
        backupExistingCondition();
        determineChkSelectAllInfo();
    });
    export let closeEmailPersonSelectPop;


    let backupEmailSendData;
    let backupPrivacySearchData;
    const backupExistingCondition = () => {
        backupEmailSendData = JSON.parse(JSON.stringify($emailSendData));
        backupPrivacySearchData = JSON.parse(JSON.stringify($privacySearchData));
    }

    let csEmailCodeSetting = '';
    const getCsEmailCodeSetting = () => {
        ajaxGet('/v2/api/CompanySetting/settingInfo', false, (res) => {
            try {
                csEmailCodeSetting = res.data.sendData.settingInfo.csEmailCodeSetting;
            } catch (e) {
                reportCatch('temp120', e);
            }
        });
    }

    const handleTargetChkChange = (e) => {
        emailSendData.update(obj => {
            if (e.target.checked) {
                obj.emailSendChoseList.push(e.target.value);
                if (!obj.emailSendChoseListFinal.includes(e.target.value)) {
                    obj.emailSendChoseListFinal = [...obj.emailSendChoseListFinal, e.target.value];
                }
            } else {
                obj.emailSendChoseList = obj.emailSendChoseList.filter(email => email !== e.target.value);
                if (obj.emailSendChoseListFinal.includes(e.target.value)) {
                    obj.emailSendChoseListFinal = obj.emailSendChoseListFinal.filter(email => email !== e.target.value);
                }
            }
            return obj;
        });
        setTimeout(() => {
            determineChkSelectAllInfo();
        }, 0);
    }

    const determineChkSelectAllInfo = () => {
        if ($privacySearchData.searchResultState === 1) {
            const checkboxes = document.querySelectorAll('.visibleInfoChk');
            const emailSendChoseList = $emailSendData.emailSendChoseList;
            const selectAllCheckbox = document.getElementById('chkSelectAllInfo');

            for (let checkbox of checkboxes) {
                if (!emailSendChoseList.includes(checkbox.value)) {
                    selectAllCheckbox.checked = false;
                    return;
                }
            }
            selectAllCheckbox.checked = true;
        }
    }

    const handleChkSelectAllInfoChange = (e) => {
        const checkboxes = document.querySelectorAll('.visibleInfoChk');
        const emailSendChoseList = $emailSendData.emailSendChoseList;
        const emailSendChoseListFinal = $emailSendData.emailSendChoseListFinal;

        if (e.target.checked) {
            checkboxes.forEach((checkbox) => {
                if (!emailSendChoseList.includes(checkbox.value)) {
                    emailSendChoseList.push(checkbox.value);
                    if (!emailSendChoseListFinal.includes(checkbox.value)) {
                        emailSendChoseListFinal.push(checkbox.value);
                    }
                }
            });
        } else {
            checkboxes.forEach((checkbox) => {
                const index = emailSendChoseList.indexOf(checkbox.value);
                if (index > -1) {
                    emailSendChoseList.splice(index, 1);
                }
                const finalIndex = emailSendChoseListFinal.indexOf(checkbox.value);
                if (finalIndex > -1) {
                    emailSendChoseListFinal.splice(finalIndex, 1);
                }
            });
        }

        emailSendData.update(obj => {
            obj.emailSendChoseList = emailSendChoseList;
            obj.emailSendChoseListFinal = emailSendChoseListFinal;
            return obj;
        });
    }

    const handleCancel = () => {
        emailSendData.set(backupEmailSendData);
        privacySearchData.set(backupPrivacySearchData);
        closeEmailPersonSelectPop();
    }

    const handleConfirm = () => {
        closeEmailPersonSelectPop();
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            emailSendData.update(obj => {
                obj.emailSendChoseList = [];
                return obj;
            });
        }
        handleEnterSearchText(e, [csEmailCodeSetting], 10000, handleRefreshCheckBoxOnOff);
    }

    const handleClickSearch = () => {
        emailSendData.update(obj => {
            obj.emailSendChoseList = [];
            return obj;
        });
        getUserListByCondition(1, 10000, [csEmailCodeSetting], handleRefreshCheckBoxOnOff);
    }

    const handleRefreshCheckBoxOnOff = () => {
        emailSendData.update(obj => {
            for (const values of $privacySearchData.visibleValueList) {
                if (obj.emailSendChoseListFinal.includes(values[0])) {
                    obj.emailSendChoseList.push(values[0]);
                }
            }
            for (const values of $privacySearchData.invisibleValueList) {
                if (obj.emailSendChoseListFinal.includes(values[0])) {
                    obj.emailSendChoseList.push(values[0]);
                }
            }
            return obj;
        });
        setTimeout(determineChkSelectAllInfo, 0);
    }

    const handleReset = () => {
        emailSendData.update(obj => {
            obj.emailSendChoseList = [];
            obj.emailSendChoseListFinal = [];
            return obj;
        });
        setTimeout(determineChkSelectAllInfo, 0);
    }

    const handlePage = ({detail}) => {
        privacySearchData.update(obj => {
            obj.currentPage = detail.page;
            return obj;
        });
        handleChangePage({
            page: detail.page,
            limitNum: 10,
        });
        setTimeout(determineChkSelectAllInfo, 0);
    }
</script>

<!-- [D] 회원선택 팝업 -->
<div class="koko_popup email_member_pop" data-popup="email_member_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">회원선택 <span>{$emailSendData.emailSendChoseListFinal.length}</span></h3>
            </div>
            {#if $privacySearchData.columnList.length}
                {#each $privacySearchData.searchConditionList as {searchCode, currentColumnName, key}, i (key)}
                    <div class="memseaBox marB8" style="justify-content: center;">
                        <div class="mu_SelBox wid130">
                            <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: (e) => {handleChangeColumnBox(e, i)}}}>
                                <div class="label">{currentColumnName}</div>
                                <ul class="optionList" style="z-index: 21;">
                                    {#each $privacySearchData.columnList as {fieldCode, fieldComment, fieldSecrity}, j (fieldCode)}
                                        <li class="optionItem curv" data-value={fieldCode} data-secrity={fieldSecrity}>{fieldComment}</li>
                                    {/each}
                                </ul>
                            </div>
                        </div>
                        <div class="memselBox wid320">
                            <div class="koinput wid100per">
                                <input type="text" class="wid320"
                                       placeholder={distinguishSearchTextPlaceholder($privacySearchData.searchConditionList[i])}
                                       bind:value={$privacySearchData.searchConditionList[i].searchText}
                                       on:keypress={handleEnterSearch} />
                                <button on:click={handleClickSearch}><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                            </div>
                        </div>
                        <div style="position: relative; width: 13px; visibility: {$privacySearchData.searchConditionList.length > 1 ? 'visible' : 'hidden'}"
                             on:click={() => {removeSearchCondition(i)}}>
                            <a class="pr_delete"></a>
                        </div>
                    </div>
                {/each}
                {#if $privacySearchData.searchConditionList.length < EMAIL_SEARCH_CONDITION_LIMIT}
                    <button type="button" class="pr_fieldBtn" on:click={addSearchCondition}></button>
                {/if}
            {/if}


<!--            <div class="memselBox marT20 marB36">-->
<!--                <div class="memName">김코코(인사팀)<button class="memdel"></button></div>-->
<!--                <div class="memName">정코코(인사팀)<button class="memdel"></button></div>-->
<!--                <div class="memName">최코코(인사팀)<button class="memdel"></button></div>-->
<!--                <div class="memName">박코코(인사팀)<button class="memdel"></button></div>-->
<!--            </div>-->

            {#if $privacySearchData.searchResultState !== -1}
                <LoadingOverlay bind:loadState={$privacySearchData.searchResultState} >
                    <div class="sea_resultWrap" in:fade>
                        <div class="kotable search_result">
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
                                    <th><input type="checkbox" id="chkSelectAllInfo" class="partcheck"
                                               on:click={handleChkSelectAllInfoChange}></th>
                                    {#each $privacySearchData.visibleColumnList as columnName, i}
                                        {#if i}
                                            <th>{columnName}</th>
                                        {/if}
                                    {/each}
                                </tr>
                                </thead>
                                <tbody>
                                {#each $privacySearchData.visibleValueList as values (values[0])}
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="chkInfo" class="partcheck visibleInfoChk" value={values[0]}
                                                   bind:group={$emailSendData.emailSendChoseList}
                                                   on:click={handleTargetChkChange} >
                                        </td>
                                        {#each values as value, i}
                                            {#if i}
                                                <td>{value}</td>
                                            {/if}
                                        {/each}
                                    </tr>
                                {/each}
                                </tbody>
                            </table>
                            <div style="display: none">
                                {#each $privacySearchData.invisibleValueList as values (values[0])}
                                    <input type="checkbox" name="chkInfo" class="partcheck" value={values[0]}
                                           bind:group={$emailSendData.emailSendChoseList} >
                                {/each}
                            </div>
                        </div>
                        <Pagination bind:currentPage={$privacySearchData.currentPage}
                                    bind:totalPosts={$privacySearchData.totalPosts}
                                    on:change={handlePage} />
                    </div>
                </LoadingOverlay>
            {/if}

            <div class="kokopopBtnBox">
                <div class="koko_cancel email_member_pop_close" on:click={handleReset}>초기화</div>
                <div class="koko_go"><button type="button" on:click={handleConfirm} >선택</button></div>
            </div>
        </div>
        <div class="koko-popup-close email_member_pop_close" data-popup-close="email_member_pop_close" on:click={handleCancel}></div>
    </div>
</div>
<!-- // [D] 회원선택 팝업 -->