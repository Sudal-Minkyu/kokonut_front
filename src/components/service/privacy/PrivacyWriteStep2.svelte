
<script>
    import { fade } from 'svelte/transition'
    import {pageTransitionData, providePrivacyWriteData} from "../../../lib/store.js";
    import { onMount } from "svelte";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {push} from "svelte-spa-router";
    import {openConfirm} from "../../common/ui/DialogManager.js";
    import {ajaxGet, reportCatch} from "../../common/ajax.js";

    export let stateChange;
    let isMasterCheckBoxChecked = false;

    onMount(async => {
        getProvideTargetAdminList();
    });

    const getProvideTargetAdminList = () => {
        let sendData = {
            type: $providePrivacyWriteData.step1.proProvide,
        }

        ajaxGet('/v2/api/Provision/offerAdminList', sendData, (res) => {
            try {
                providePrivacyWriteData.update(obj => {
                    obj.step2.offerList = res.data.sendData.offerList;
                    filterAdminList();
                    return obj;
                });
            } catch (e) {
                reportCatch('t23082205', e);
            }
        });
    }

    const updateByCheckedState = () => {
        providePrivacyWriteData.update(obj => {
            obj.step2.selectedAdminObjList = [];
            for (const adminId of obj.step2.selectedAdminIdList) {
                obj.step2.selectedAdminObjList.push(...obj.step2.offerList.filter(item => item.adminId === adminId));
            }
            return obj;
        });

        const filteredOfferIdList = $providePrivacyWriteData.step2.filteredOfferList.map(item => item.adminId);
        isMasterCheckBoxChecked = filteredOfferIdList.every(item => $providePrivacyWriteData.step2.selectedAdminIdList.includes(item));

        setTimeout(() => {
            const itemCheckList = document.getElementsByName('itemCheck');
            for (const el of itemCheckList) {
                el.checked = $providePrivacyWriteData.step2.selectedAdminIdList.includes(Number(el.value));
            }
        }, 0);
    }

    const removeSelectedAdmin = (index) => {
        providePrivacyWriteData.update(obj => {
            obj.step2.selectedAdminIdList.splice(index, 1);
            return obj;
        });
        updateByCheckedState();
    };

    const resetSelectedAdmin = () => {
        providePrivacyWriteData.update(obj => {
            obj.step2.selectedAdminIdList = [];
            return obj;
        });
        updateByCheckedState();
    };

    const handleMasterCheckBoxChange = (e) => {
        providePrivacyWriteData.update(obj => {
            if (e.target.checked) {
                obj.step2.selectedAdminIdList = obj.step2.filteredOfferList.map(item => item.adminId);
            } else {
                obj.step2.selectedAdminIdList = [];
            }
            return obj;
        });
        updateByCheckedState();
    }

    const handleItemCheckBoxChange = (e) => {
        providePrivacyWriteData.update(obj => {
            if (e.target.checked) {
                obj.step2.selectedAdminIdList = [...obj.step2.selectedAdminIdList, Number(e.target.value)];
            } else {
                obj.step2.selectedAdminIdList = obj.step2.selectedAdminIdList.filter(adminIdNumber => adminIdNumber !== Number(e.target.value));
            }
            return obj;
        });
        updateByCheckedState();
    }

    const filterAdminList = () => {
        let result = [];
        result.push(...$providePrivacyWriteData.step2.offerList
            .filter(item => item.knEmail.includes($providePrivacyWriteData.step2.searchCondition.email)));
        if (!result.length && $providePrivacyWriteData.step2.searchCondition.email) {
            result = $providePrivacyWriteData.step2.filteredOfferList;
        } else if (!$providePrivacyWriteData.step2.searchCondition.email) {
            result = $providePrivacyWriteData.step2.offerList;
        }
        if ($providePrivacyWriteData.step2.searchCondition.managerRating) {
            result = result.filter(item => item.knRoleDesc
                === $providePrivacyWriteData.step2.searchCondition.managerRating);
        }
        providePrivacyWriteData.update(obj => {
            obj.step2.filteredOfferList = result;
            return obj;
        });
        updateByCheckedState();
    };

    const handleOnSelectBox = (el) => {
        providePrivacyWriteData.update(obj => {
            obj.step2.searchCondition.managerRating = el.dataset.rating;
            return obj;
        });
        filterAdminList();
    }

    const handleGoToRegisterAdmin = () => {
        pageTransitionData.update(obj => {
            if ($providePrivacyWriteData.step1.proProvide === 0) {
                obj.createTarget = 'ROLE_USER';
            } else if ($providePrivacyWriteData.step1.proProvide === 1) {
                obj.createTarget = 'ROLE_GUEST';
            }
            return obj;
        });
        push('/service/adminManagement');
    }

    const handleNext = () => {
        const confirmProps = {
            icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '', // 제목
            contents1: '', // 내용
            contents2: '',
            btnCheck: '확인', // 확인 버튼의 텍스트
        };
        if ($providePrivacyWriteData.step1.proProvide === 0 && $providePrivacyWriteData.step2.provideTargetType === '') {
            confirmProps.title = '제공 대상 선택';
            confirmProps.contents1 = '제공받을 대상을 선택해 주세요.';
        } else if (($providePrivacyWriteData.step2.provideTargetType === 'teammate' || $providePrivacyWriteData.step1.proProvide === 1) && !$providePrivacyWriteData.step2.selectedAdminObjList.length) {
            confirmProps.title = '팀원 선택';
            confirmProps.contents1 = '팀원을 선택해 주세요.';
        }
        if (confirmProps.title) {
            openConfirm(confirmProps);
            return;
        }

        stateChange(3);
    }
</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <!--{#if $providePrivacyWriteData.step1.proProvide === 0}-->
                <!--    <label class="steplabel">제공받을 사람을 선택해 주세요.</label>-->
                <!--    <div class="step_radioBox">-->
                <!--        <div class="step_radio">-->
                <!--            <input type="radio" class="stradio solo" name="solo_team" id="radioSelf" value="self"-->
                <!--                   bind:group={$providePrivacyWriteData.step2.provideTargetType} />-->
                <!--            <label for="radioSelf">본인</label>-->
                <!--        </div>-->
                <!--        <div class="step_radio">-->
                <!--            <input type="radio" class="stradio team" name="solo_team" id="radioTeammate" value="teammate"-->
                <!--                   bind:group={$providePrivacyWriteData.step2.provideTargetType} />-->
                <!--            <label for="radioTeammate">내부 팀원</label>-->
                <!--        </div>-->
                <!--    </div>-->
                <!--{/if}-->

                {#if $providePrivacyWriteData.step2.provideTargetType === 'teammate' || $providePrivacyWriteData.step1.proProvide === 1 }
                    <div class="teamtable">
                        <label class="steplabel">제공받을 팀원을 선택해 주세요.</label>
                        <div class="tea_ListFlexBox marT24">
                            <div class="tea_ListBox">
                                <div class="teamSeaBox">
                                    <div class="memseaBox marB32">
                                        <div class="koinput">
                                            <input type="text" class="wid236" placeholder="이메일 검색"
                                                   bind:value={$providePrivacyWriteData.step2.searchCondition.email}
                                                   on:keyup={filterAdminList} />
                                            <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                        </div>
                                        <div class="mu_SelBox wid150 noneMarR" style="visibility: {$providePrivacyWriteData.step1.proProvide === 0 ? 'visible' : 'hidden'}">
                                            <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: handleOnSelectBox}}>
                                                <div class="label">관리자 등급</div>
                                                <ul class="optionList">
                                                    <li class="optionItem popanoGrade" data-rating="">전체</li>
                                                    <li class="optionItem popanoGrade" data-rating="최고관리자">최고관리자</li>
                                                    <li class="optionItem popanoGrade" data-rating="관리자">관리자</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tea_listBox">
                                    <div class="kt_tableTopBox marB16">
                                        <div class="kt_total">총 <span>{$providePrivacyWriteData.step2.filteredOfferList.length}</span>건</div>
<!--                                        <div class="kt_selbox wid108">-->
<!--                                            <div class="selectBox wid100per nonePad">-->
<!--                                                <div class="label">최근 등록순</div>-->
<!--                                                <ul class="optionList">-->
<!--                                                    <li class="optionItem">최근 등록순</li>-->
<!--                                                    <li class="optionItem">정확도순</li>-->
<!--                                                    <li class="optionItem">오름차순</li>-->
<!--                                                    <li class="optionItem">내림차순</li>-->
<!--                                                </ul>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div>

                                    <div class="emailtableBox">
                                        <div class="prtable crownTable">
                                            <table>
                                                <caption>개인정보 제공 팀원 리스트</caption>
                                                <colgroup>
                                                    <col style="width:7.27%;">
                                                    <col style="width:45%;">
                                                    <col style="width:22.74%;">
                                                    <col style="width:25%;">
                                                </colgroup>
                                                {#if $providePrivacyWriteData.step2.offerList.length}
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <div class="koko_check">
                                                                <input type="checkbox" name="allcheck" id="allcheck"
                                                                       bind:checked={isMasterCheckBoxChecked}
                                                                       on:click={handleMasterCheckBoxChange} >
                                                                <label for="allcheck"><em></em></label>
                                                            </div>
                                                        </th>
                                                        <th>이메일</th>
                                                        <th>이름</th>
                                                        <th>관리자 등급</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {#each $providePrivacyWriteData.step2.filteredOfferList as
                                                        {adminId, knEmail, knName, knRoleDesc, knRoleCode}, i}
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" name="itemCheck" id="mem{i}" class="partcheck"
                                                                           value={adminId}
                                                                           on:change={handleItemCheckBoxChange} />
                                                                    <label for="mem{i}"><em></em></label>
                                                                </div>
                                                            </td>
                                                            {#if i === 0}
                                                                <td style="font-weight: 700;">{knEmail}</td>
                                                                <td style="font-weight: 700;">{knName}(본인)</td>
                                                                {#if knRoleCode === "ROLE_MASTER"}
                                                                    <td style="font-weight: 700;">{knRoleDesc}<div class="mastericon"></div></td>
                                                                {:else}
                                                                    <td style="font-weight: 700;">{knRoleDesc}</td>
                                                                {/if}
                                                            {:else}
                                                                <td>{knEmail}</td>
                                                                <td>{knName}</td>
                                                                {#if knRoleCode === "ROLE_MASTER"}
                                                                    <td>{knRoleDesc}<div class="mastericon"></div></td>
                                                                {:else}
                                                                    <td>{knRoleDesc}</td>
                                                                {/if}
                                                            {/if}
                                                        </tr>
                                                    {/each}
                                                    </tbody>
                                                {:else}
                                                    <tbody>
                                                        <tr style="height: 52.39px; background-color: #F7F8F9;">
                                                            <td colspan="4" class="teaMemselBox" style="font-size: 2rem;cursor: pointer;"
                                                                on:click={handleGoToRegisterAdmin}>
                                                                여기를 눌러 팀원을 추가해 주세요.
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                {/if}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tea_ListBox">
                                <div class="teaMemselBox marT110">
                                    <div class="tmResetBtn" on:click={resetSelectedAdmin}>초기화</div>
                                    <div class="memselBox">
                                        {#each $providePrivacyWriteData.step2.selectedAdminObjList as {knEmail, knName}, i}
                                            <div class="memName">{knName}({knEmail})
                                                <button type="button" class="memdel" on:click={() => {removeSelectedAdmin(i)}}></button>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog40"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(1)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>2</span> / 5</dl>
                </div>
                <button on:click={handleNext} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>