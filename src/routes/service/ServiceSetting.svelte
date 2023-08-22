
<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import {onDestroy, onMount} from 'svelte';
    import SettingIpDelete from '../../components/service/environment/servicesetting/SettingIpDelete.svelte'
    import SettingIpAdd from '../../components/service/environment/servicesetting/SettingIpAdd.svelte'
    import {SelectBoxManager} from "../../components/common/action/SelectBoxManager.js";
    import {ajaxGet, ajaxParam, reportCatch} from "../../components/common/ajax.js";
    import {backBtn, initialServiceSetting, serviceSettingData, userInfoData} from "../../lib/store.js";
    import {openConfirm} from "../../components/common/ui/DialogManager.js";
    import {link} from "svelte-spa-router";
    import LoadingOverlay from "../../components/common/ui/LoadingOverlay.svelte";
    import { fade } from 'svelte/transition'

    // 서비스설정 가져오기
    onMount(() => {
        getServiceSettingDataAndInitializing();
        setBasicEvents();
    });

    onDestroy(() => {
        removeBasicEvents();
    });

    $: isModifiable = ['ROLE_MASTER', 'ROLE_ADMIN'].includes($userInfoData.role);

    let settingLoadState = 1;
    let csEmailCodeSetting = '';

    const getServiceSettingDataAndInitializing = () => {
        settingLoadState = 1;
        ajaxGet('/v2/api/CompanySetting/settingInfo', false, (res) => {
            try {
                settingLoadState = 1;
                const settingData = res.data.sendData;
                console.log('초기 데이터', settingData);
                serviceSettingData.update(obj => {
                    obj = JSON.parse(initialServiceSetting);
                    obj.accessIpList = settingData.accessIpList;
                    obj.settingInfo = settingData.settingInfo;
                    return obj;
                });
                csEmailCodeSetting = settingData.settingInfo.csEmailCodeSetting;
                setUnbindableInitialData(settingData);
                filterAccessIpList();
                getEmailColumnLIst();
            } catch (e) {
                reportCatch('temp052', e);
            }
        });
    }

    const setUnbindableInitialData = (settingData) => {
        // 장기 미접속 접근제한 체크박스의 기본체크 상태 및 셀렉트박스의 문구설정
        let accessSettings = document.getElementsByName('accessSetting');
        let targetValue = settingData.settingInfo.csLongDisconnectionSetting !== '0' ? '1' : '0';
        for (let radio of accessSettings) {
            radio.checked = (radio.value === targetValue);
        }
        if (settingData.settingInfo.csLongDisconnectionSetting !== '0') {
            document.getElementById('csLongDisconnectionSetting').innerHTML = settingData.settingInfo.csLongDisconnectionSetting + '개월';
        }
        document.getElementById('csPasswordChangeSetting').innerHTML = settingData.settingInfo.csPasswordChangeSetting + '개월';
        document.getElementById('csPasswordErrorCountSetting').innerHTML = settingData.settingInfo.csPasswordErrorCountSetting + '번';
        document.getElementById('csAutoLogoutSetting').innerHTML = settingData.settingInfo.csAutoLogoutSetting + '분';
    }

    function toggleDisableBox(isVisible) {
        const displayValue = isVisible ? "block" : "none";
        document.querySelectorAll(".disableBox").forEach(function (element) {
            element.style.display = displayValue;
        });
    }

    const setBasicEvents = () => {
        document.querySelector(".period").addEventListener("click", function () {
            toggleDisableBox(false);
        });

        document.addEventListener("DOMContentLoaded", function () {
            toggleDisableBox(!document.querySelector(".period").checked);
        });
    }

    const removeBasicEvents = () => {

        document.querySelector(".period").removeEventListener("click", function () {
            toggleDisableBox(false);
        });

        document.removeEventListener("DOMContentLoaded", function () {
            toggleDisableBox(!document.querySelector(".period").checked);
        });
    }

    let serviceIpState = 0;
    function changeStatePop(val) {
        serviceIpState = val;
    }

    const ajaxAgainstEveryChanges = (url, sendObj) => {
        console.log('act', sendObj);
        ajaxParam(url, sendObj, (res) => {
            try {
                console.log(res);
            } catch (e) {
                reportCatch('temp053', e);
            }
        }, (errCode) => {
            try {
                return {
                    action: 'REFRESH',
                    message: '설정 변경 도중 문제가 발생하였습니다. 페이지를 새로고침합니다.',
                }
            } catch (e) {
                reportCatch('temp054', e);
            }
        });
    }

    const handleChangeRadioBtn = (target, value) => {
        switch (target) {
            case 'csOverseasBlockSetting':
                ajaxAgainstEveryChanges('/v2/api/CompanySetting/overseasBlockSetting', {});
                break;
            case 'csAccessSetting':
                ajaxAgainstEveryChanges('/v2/api/CompanySetting/accessSetting', {});
                break;
            case 'csPasswordChangeSetting':
                ajaxAgainstEveryChanges('/v2/api/CompanySetting/passwordChangeSetting', {csPasswordChangeSetting: value});
                break;
            case 'csPasswordErrorCountSetting':
                ajaxAgainstEveryChanges('/v2/api/CompanySetting/passwordErrorCountSetting', {csPasswordErrorCountSetting: value});
                break;
            case 'csAutoLogoutSetting':
                ajaxAgainstEveryChanges('/v2/api/CompanySetting/autoLogoutSetting', {csAutoLogoutSetting: value});
                break;
            case 'csLongDisconnectionSetting':
                serviceSettingData.update(obj => {
                    obj.settingInfo.csLongDisconnectionSetting = value;
                    return obj;
                });
                if (value === "0") {
                    document.getElementById("csLongDisconnectionSetting").textContent = "기간선택";
                } else {
                    document.getElementById("csLongDisconnectionSetting").textContent = value + "개월";
                }

                let accessSettings = document.getElementsByName('accessSetting');
                let targetValue = value !== '0' ? '1' : '0';
                for (let radio of accessSettings) {
                    radio.checked = (radio.value === targetValue);
                }

                ajaxAgainstEveryChanges('/v2/api/CompanySetting/longDisconnectionSetting', {csLongDisconnectionSetting: value});
                break;
            case 'emailSendItemSetting':
                ajaxAgainstEveryChanges('/v2/api/CompanySetting/emailSendItemSetting', {csEmailCodeSetting: value});
                break;
        }
    }

    const openAddAccessIpPop = () => {
        serviceSettingData.update(obj => {
            obj.addAccessIpPop.visibility = true;
            return obj;
        });
    };

    const openRemoveAccessIpPop = () => {
        if ($serviceSettingData.removeAccessIpPop.deleteIpList.length) {
            serviceSettingData.update(obj => {
                obj.removeAccessIpPop.visibility = true;
                return obj;
            });
        } else {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '삭제 IP 선택 필요', // 제목
                contents1: '삭제하실 IP를 선택해 주세요.', // 내용 - 백엔드의 에러 desc
                contents2: '',
                btnCheck: '확인', // 확인 버튼의 텍스트정
            });
        }
    };

    const handleCheckAccessIp = () => {
        if (isModifiable && $serviceSettingData.accessIpSearchResultList.length && $serviceSettingData.accessIpSearchResultList.every(ip => $serviceSettingData.removeAccessIpPop.deleteIpList.includes(ip))) {
            document.getElementById('allcheck').checked = true;
        } else if (isModifiable){
            document.getElementById('allcheck').checked = false;
        }
    };

    const filterAccessIpList = () => {
        serviceSettingData.update(obj => {
            obj.accessIpSearchResultList = obj.accessIpList.filter(ipObj => ipObj.csipIp
                .includes(obj.accessIpSearchText)).map(ipObj => ipObj.csipIp);
            return obj;
        });
        handleCheckAccessIp();
    }

    const handleAllCheck = (e) => {
        serviceSettingData.update(obj => {
                for (const ip of obj.accessIpSearchResultList) {
                    if (e.target.checked) {
                        if (!obj.removeAccessIpPop.deleteIpList.includes(ip)) {
                            obj.removeAccessIpPop.deleteIpList.push(ip);
                        }
                    } else {
                        obj.removeAccessIpPop.deleteIpList = obj.removeAccessIpPop.deleteIpList.filter(ip => !obj.accessIpSearchResultList.includes(ip));
                    }
                }
            return obj;
        });
    }


    const getEmailColumnLIst = () => {
        ajaxGet('/v2/api/DynamicUser/searchColumnCall', false, (res2) => {
            try {
                if (res2.data.sendData.fieldList.length) {
                    serviceSettingData.update(obj => {
                        obj.columnList = res2.data.sendData.fieldList.filter(obj => obj.emailAvailable);
                        return obj;
                    });
                    updateEmailSelectBoxString(csEmailCodeSetting);
                }
            } catch (e) {
                reportCatch('temp055', e);
            }
        });
    }

    const handleEmailColumnSelect = (el) => {
        csEmailCodeSetting = el.dataset.value;
        handleChangeRadioBtn('emailSendItemSetting', el.dataset.value);
    }

    const updateEmailSelectBoxString = (csEmailCodeSetting = csEmailCodeSetting) => {
        const selectedColumnArray = $serviceSettingData.columnList.filter(obj => obj.fieldCode === csEmailCodeSetting);
        console.log($serviceSettingData.columnList);
        document.getElementById('emailColumnLabel').innerHTML = selectedColumnArray.length ? selectedColumnArray[0].fieldComment : '미지정';
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap serviceSetWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a>
            <h1>서비스 설정</h1>
            <dl>
                해당 페이지는 최고관리자만 수정할 수 있습니다.
            </dl>
        </div>

        <LoadingOverlay bind:loadState={settingLoadState}>
            <div class="seaContentBox" in:fade>
            <div class="seaContentLine borB">
                <div class="seaCont wid100per">
                    <dl>해외 로그인 설정</dl>
                    <div class="seaRadio">
                        <div class="flex_sel">
                            <div class="check radioCheck">
                                <input type="radio" class="radio" id="로그인 허용" value="0"
                                       bind:group={$serviceSettingData.settingInfo.csOverseasBlockSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csOverseasBlockSetting', e.target.value)}}
                                       disabled={!isModifiable}>
                                <label for="로그인 허용"><em><dt></dt></em>로그인 허용</label>
                            </div>
                            <div class="check radioCheck noneMarR">
                                <input type="radio" class="radio" id="로그인 차단" value="1"
                                       bind:group={$serviceSettingData.settingInfo.csOverseasBlockSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csOverseasBlockSetting', e.target.value)}}
                                       disabled={!isModifiable}>
                                <label for="로그인 차단"><em><dt></dt></em>로그인 차단</label>
                            </div>
                            <dd class="marL16">*해외에서 로그인을 시도하는 경우 본인확인 후 로그인이 가능합니다.</dd>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB">
                <div class="seaCont wid100per">
                    <dl>접속 허용 IP 설정</dl>
                    <div class="ipContentBox">
                        <div class="seaRadio">
                            <div class="check radioCheck">
                                <input type="radio" class="radio non_activate" name="ipsetting" id="비활성화" value="0"
                                       bind:group={$serviceSettingData.settingInfo.csAccessSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csAccessSetting', e.target.value)}}
                                       disabled={!isModifiable}>
                                <label for="비활성화"><em><dt></dt></em>비활성화</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio activate" name="ipsetting" id="활성화" value="1"
                                       bind:group={$serviceSettingData.settingInfo.csAccessSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csAccessSetting', e.target.value)}}
                                       disabled={!isModifiable}>
                                <label for="활성화"><em><dt></dt></em>활성화</label>
                            </div>
                        </div>
                        <div class="ipContentIner" style={$serviceSettingData.settingInfo.csAccessSetting === '1' ? 'display: block' : 'display: none'}>
                            <div class="ipseaBox marB20">
                                <div class="koinput">
                                    <input type="text" class="wid236" placeholder="IP 검색"
                                           bind:value={$serviceSettingData.accessIpSearchText}
                                           on:input={filterAccessIpList}>
                                    <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                </div>
                                {#if isModifiable}
                                    <div class="floatBtnBox">
                                        <button class="del" id="ipdel_pop" on:click={openRemoveAccessIpPop}>삭제</button>
                                        <button class="add" id="ipadd_pop" on:click={openAddAccessIpPop}>추가</button>
                                    </div>
                                {/if}

                            </div>
                            <div class="iptableWrap">
                                <div class="iptable">
                                    <table>
                                        <caption>공인 ip 리스트</caption>
                                        <thead>
                                        <tr>
                                            {#if isModifiable}
                                                <th>
                                                    <div class="koko_check">
                                                        <input type="checkbox" name="allcheck" id="allcheck" on:change={handleAllCheck}>
                                                        <label for="allcheck"><em></em></label>
                                                    </div>
                                                </th>
                                            {/if}
                                            <th>공인 IP</th>
                                            <th>메모</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {#each $serviceSettingData.accessIpList as {csipIp, csipRemarks}, i (csipIp)}
                                            <tr style="display: {$serviceSettingData.accessIpSearchResultList.includes(csipIp) ? 'table-row' : 'none'}">
                                                {#if isModifiable}
                                                    <td>
                                                        <div class="koko_check">
                                                            <input type="checkbox" value={csipIp} id="ip{i}" class="partcheck"
                                                                bind:group={$serviceSettingData.removeAccessIpPop.deleteIpList} on:change={handleCheckAccessIp}>
                                                            <label for="ip{i}"><em></em></label>
                                                        </div>
                                                    </td>
                                                {/if}
                                                <td>{csipIp}</td>
                                                <td>{csipRemarks}</td>
                                            </tr>
                                        {/each}
                                        {#if $serviceSettingData.accessIpList.length === 0}
                                            <tr style="display: table-row">
                                                <td colspan="99">
                                                    접속 허용 설정된 IP가 없습니다.
                                                </td>
                                            </tr>
                                        {/if}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB">
                <div class="seaCont wid100per">
                    <dl>비밀번호 변경주기</dl>
                    <div class="sc_SelBox">
                        <div class="selectBox wid164" use:SelectBoxManager={{
                            callback: (el) => {handleChangeRadioBtn('csPasswordChangeSetting', el.value)},
                            readOnly: !isModifiable,
                        }}>
                            <div class="label" id="csPasswordChangeSetting">선택</div>
                            <ul class="optionList">
                                <li class="optionItem" value="3">3개월</li>
                                <li class="optionItem" value="6">6개월</li>
                                <li class="optionItem" value="9">9개월</li>
                                <li class="optionItem" value="12">12개월</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB">
                <div class="seaCont wid100per">
                    <dl>비밀번호 오류 접속제한</dl>
                    <div class="sc_SelBox">
                        <div class="selectBox wid164" use:SelectBoxManager={{
                            callback: (el) => {handleChangeRadioBtn('csPasswordErrorCountSetting', el.value)},
                            readOnly: !isModifiable,
                        }}>
                            <div class="label" id="csPasswordErrorCountSetting">선택</div>
                            <ul class="optionList">
                                <li class="optionItem" value="5">5번</li>
                                <li class="optionItem" value="10">10번</li>
                                <li class="optionItem" value="15">15번</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB set_customBox">
                <div class="seaCont wid100per">
                    <dl>자동 로그아웃 시간</dl>
                    <div class="seaRadio">
                        <div class="flex_sel">
                            <p class="marR30">로그인 후</p>
                            <div class="selectBox wid124 nonePad" use:SelectBoxManager={{
                                callback: (el) => {handleChangeRadioBtn('csAutoLogoutSetting', el.value)},
                                readOnly: !isModifiable,
                            }}>
                                <div class="label" id="csAutoLogoutSetting">선택</div>
                                <ul class="optionList">
                                    <li class="optionItem" value="30">30분</li>
                                    <li class="optionItem" value="60">60분</li>
                                    <li class="optionItem" value="90">90분</li>
                                    <li class="optionItem" value="120">120분</li>
                                </ul>
                            </div>
                            <p class="marL30">동안 페이지 전환이 없으면 자동 로그아웃</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaContentLine set_customBox">
                <div class="seaCont wid100per">
                    <dl>장기 미접속 접근제한</dl>
                    <div class="seaRadio">
                        <div class="flex_sel">
                            <div class="check radioCheck">
                                <input type="radio" class="radio nolimit" name="accessSetting" id="제한 없음" value="0"
                                       on:change={(e) => {handleChangeRadioBtn('csLongDisconnectionSetting', e.target.value)}}
                                       disabled={!isModifiable}>
                                <label for="제한 없음"><em><dt></dt></em>제한 없음</label>
                            </div>
                            <div class="check radioCheck noneMarR">
                                <input type="radio" class="radio period" name="accessSetting" id="기간선택" value="1"
                                       on:change={(e) => {handleChangeRadioBtn('csLongDisconnectionSetting', e.target.value)}}
                                       disabled={!isModifiable}>
                                <label for="기간선택"><em><dt></dt></em></label>
                            </div>
                            <div class="selectBox wid124 nonePad" use:SelectBoxManager={{
                                callback: (el) => {handleChangeRadioBtn('csLongDisconnectionSetting', el.value)},
                                readOnly: !isModifiable,
                            }}>
                                <div class="label" id="csLongDisconnectionSetting">기간선택</div>
                                <ul class="optionList">
                                    <li class="optionItem" value="1">1개월</li>
                                    <li class="optionItem" value="3">3개월</li>
                                    <li class="optionItem" value="6">6개월</li>
                                </ul>
                            </div>
                            <p class="marL30">동안 시스템에 접속하지 않은 경우, 로그인 제한</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaContentLine set_customBox">
                <div class="seaCont wid100per">
                    <dl>이메일 발송 항목 지정</dl>
                    <div class="flex_sel">
                        <div class="selectBox wid164" use:SelectBoxManager={{callback: handleEmailColumnSelect, readOnly: !isModifiable}} >
                            <div class="label" id="emailColumnLabel"></div>
                            <ul class="optionList">
                                <li class="optionItem" value="">미지정</li>
                                {#each $serviceSettingData.columnList as {fieldCode, fieldComment}, j (fieldCode)}
                                    <li class="optionItem curv" data-value={fieldCode} >{fieldComment}</li>
                                {/each}
                            </ul>
                        </div>
                        <p class="marR30">설정된 항목을 기준으로 이메일 발송</p>
                    </div>
                </div>
            </div>
        </div>
        </LoadingOverlay>
    </div>
</section>

{#if $serviceSettingData.addAccessIpPop.visibility}
    <SettingIpAdd {getServiceSettingDataAndInitializing} />
{/if}
{#if $serviceSettingData.removeAccessIpPop.visibility}
    <SettingIpDelete {getServiceSettingDataAndInitializing} />
{/if}