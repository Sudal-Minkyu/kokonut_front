<script>
    import {emailSendData, privacySearchData} from "../../../lib/store.js";
    import LoadingOverlay from "../../common/ui/LoadingOverlay.svelte";
    import {fade} from "svelte/transition";
    import {ajaxGet, reportCatch} from "../../common/ajax.js";
    import {onMount} from "svelte";
    import {handleChangeColumnBox} from "../../common/privacySearch/privacySearchFullData.js";

    let adminList = [];
    let searchText = "";
    onMount(() => {
        backupExistingCondition();
        getAdminList();
    });
    export let closeEmailPersonSelectPop;

    let backupEmailSendData;
    let backupPrivacySearchData;
    let searchResultState = 0;
    const backupExistingCondition = () => {
        backupEmailSendData = JSON.parse(JSON.stringify($emailSendData));
        backupPrivacySearchData = JSON.parse(JSON.stringify($privacySearchData));
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
        if (searchResultState === 1) {
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
    }

    const handleClickSearch = () => {
        emailSendData.update(obj => {
            obj.emailSendChoseList = [];
            return obj;
        });
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

    const getAdminList = () => {
        ajaxGet('/v4/api/Email/systemSendAdminList', false, (res) => {
            adminList = res.data.sendData.adminList;
            searchResultState = 1;
            setTimeout(() => {
                determineChkSelectAllInfo();
            }, 0);
            console.log(adminList);
        });
    };

    const roleNameDict = {
        ROLE_SYSTEM: '코코넛어드민',
        ROLE_MASTER: '왕관관리자',
        ROLE_ADMIN: '최고관리자',
        ROLE_USER: '관리자',
        ROLE_GUEST: '게스트',
    }

    const getRoleName = (roleCode) => {
        return roleNameDict[roleCode] || roleCode
    };
</script>

<!-- [D] 회원선택 팝업 -->
<div class="koko_popup email_member_pop" data-popup="email_member_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">관리자선택 <span>{$emailSendData.emailSendChoseListFinal.length}</span></h3>
            </div>
<!--            <div class="memseaBox marB8" style="justify-content: center;height: 40px;">-->
<!--                <div class="memselBox wid400">-->
<!--                    <div class="koinput wid100per">-->
<!--                        <input type="text" class="wid400"-->
<!--                               placeholder="회사명, 관리자명, 이메일 검색"-->
<!--                               bind:value={searchText}-->
<!--                               on:keypress={handleEnterSearch} />-->
<!--                        <button on:click={handleClickSearch}><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="memselBox marT20 marB36">-->
<!--                <div class="memName">김코코(인사팀)<button class="memdel"></button></div>-->
<!--                <div class="memName">정코코(인사팀)<button class="memdel"></button></div>-->
<!--                <div class="memName">최코코(인사팀)<button class="memdel"></button></div>-->
<!--                <div class="memName">박코코(인사팀)<button class="memdel"></button></div>-->
<!--            </div>-->

            <LoadingOverlay loadState={searchResultState} top={80} >
                <div class="sea_resultWrap" in:fade>
                    <div class="kotable search_result">
                        <div class="kt_tableTopBox marB24">
                            <div class="kt_total">총 <span>{adminList.length}</span>건</div>
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
                        <div class="iptableWrap">
                        <table>
                            <caption>개인정보 검색결과 테이블</caption>
                            <thead>
                            <tr>
                                <th><input type="checkbox" id="chkSelectAllInfo" class="partcheck"
                                           on:click={handleChkSelectAllInfoChange}></th>
                                <th>IDX</th>
                                <th>회사명</th>
                                <th>관리자명</th>
                                <th>이메일</th>
                                <th>권한</th>
                                <th>활성화 상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            <!--검색된 관리자 키값에 따른 고정화된 표출-->
                            {#each adminList as {adminId, cpName, knName, knEmail, knRoleCode, knActiveStatus} (adminId)}
                                <tr>
                                    <td>
                                        <input type="checkbox" name="chkInfo" class="partcheck visibleInfoChk" value={knEmail}
                                               bind:group={$emailSendData.emailSendChoseList}
                                               on:click={handleTargetChkChange} >
                                    </td>
                                    <td>{adminId}</td>
                                    <td>{cpName}</td>
                                    <td>{knName}</td>
                                    <td>{knEmail}</td>
                                    <td>{getRoleName(knRoleCode)}</td>
                                    <td>{knActiveStatus ? '활성' : '비활성'}</td>
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>

            <div class="kokopopBtnBox">
                <div class="koko_cancel email_member_pop_close" on:click={handleReset}>초기화</div>
                <div class="koko_go"><button type="button" on:click={handleConfirm} >선택</button></div>
            </div>
        </div>
        <div class="koko-popup-close email_member_pop_close" data-popup-close="email_member_pop_close" on:click={handleCancel}></div>
    </div>
</div>
<!-- // [D] 회원선택 팝업 -->