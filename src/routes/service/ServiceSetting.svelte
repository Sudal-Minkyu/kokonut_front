
<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import {onDestroy, onMount} from 'svelte';
    import SettingIpDelete from '../../components/service/environment/servicesetting/SettingIpDelete.svelte'
    import SettingIpAdd from '../../components/service/environment/servicesetting/SettingIpAdd.svelte'
    import {SelectBoxManager} from "../../components/common/action/SelectBoxManager.js";
    import {ajaxGet, ajaxParam} from "../../components/common/ajax.js";
    import {serviceSettingData} from "../../lib/store.js";

    // 서비스설정 가져오기
    onMount(() => {
        setTimeout(() => serviceSettingLayout = 1, 500);
        getServiceSettingData();
        setBasicEvents();
    });

    onDestroy(() => {
        removeBasicEvents();
    });

    const getServiceSettingData = () => {
        ajaxGet('/v2/api/Company/settingInfo', false, (res) => {
            const settingData = res.data.sendData;
            console.log('초기 데이터', settingData);
            serviceSettingData.set(settingData);
            setUnbindableInitialData(settingData);
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


    // ip 접속허용 설정 상자 on off
    function toggleIpContentDisplay(displayValue) {
        document.querySelectorAll('.ipContentIner').forEach(function(element) {
            element.style.display = displayValue;
        });
    }

    function toggleDisableBox(isVisible) {
        const displayValue = isVisible ? "block" : "none";
        document.querySelectorAll(".disableBox").forEach(function (element) {
            element.style.display = displayValue;
        });
    }

    const setBasicEvents = () => {
        document.querySelector(".non_activate").addEventListener('click', function() {
            toggleIpContentDisplay('none');
        });

        document.querySelector(".activate").addEventListener('click', function() {
            toggleIpContentDisplay('block');
        });

        document.querySelector(".period").addEventListener("click", function () {
            toggleDisableBox(false);
        });

        document.addEventListener("DOMContentLoaded", function () {
            toggleDisableBox(!document.querySelector(".period").checked);
        });

        document.querySelector("#allcheck").addEventListener("click", function () {
            const isChecked = document.querySelector("#allcheck").checked;
            document.querySelectorAll(".partcheck").forEach(function (checkbox) {
                checkbox.checked = isChecked;
            });
        });
    }

    const removeBasicEvents = () => {
        document.querySelector(".non_activate").removeEventListener('click', function() {
            toggleIpContentDisplay('none');
        });

        document.querySelector(".activate").removeEventListener('click', function() {
            toggleIpContentDisplay('block');
        });

        document.querySelector(".period").removeEventListener("click", function () {
            toggleDisableBox(false);
        });

        document.removeEventListener("DOMContentLoaded", function () {
            toggleDisableBox(!document.querySelector(".period").checked);
        });

        document.querySelector("#allcheck").removeEventListener("click", function () {
            const isChecked = document.querySelector("#allcheck").checked;
            document.querySelectorAll(".partcheck").forEach(function (checkbox) {
                checkbox.checked = isChecked;
            });
        });
    }

    let serviceSettingLayout = 0;

    let serviceIpState = 0;
    function changeStatePop(val) {
        serviceIpState = val;
    }

    window.kk = () => {
        console.log($serviceSettingData);
    }

    const ajaxWhenEveryChange = (url, sendObj) => {
        console.log('act', sendObj);
        ajaxParam(url, sendObj, (res) => {
            console.log(res);
        }, (errCode) => {
            return {
                action: 'REFRESH',
                message: '설정 변경 도중 문제가 발생하였습니다. 페이지를 새로고침합니다.',
            }
        });
    }

    const handleChangeRadioBtn = (target, value) => {
        switch (target) {
            case 'csOverseasBlockSetting':
                ajaxWhenEveryChange('/v2/api/Company/overseasBlockSetting', {});
                break;
            case 'csAccessSetting':
                ajaxWhenEveryChange('/v2/api/Company/accessSetting', {});
                break;
            case 'csPasswordChangeSetting':
                ajaxWhenEveryChange('/v2/api/Company/passwordChangeSetting', {csPasswordChangeSetting: value});
                break;
            case 'csPasswordErrorCountSetting':
                ajaxWhenEveryChange('/v2/api/Company/passwordErrorCountSetting', {csPasswordErrorCountSetting: value});
                break;
            case 'csAutoLogoutSetting':
                ajaxWhenEveryChange('/v2/api/Company/autoLogoutSetting', {csAutoLogoutSetting: value});
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

                ajaxWhenEveryChange('/v2/api/Company/longDisconnectionSetting', {csLongDisconnectionSetting: value});
                break;
        }
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap serviceSetWrap">
        <div class="pageTitleBtn marB50">
            <h1>서비스 설정</h1>
            <dl>
                해당 페이지는 최고관리자만 수정할 수 있습니다.
            </dl>
        </div>

        <div class="seaContentBox">
            <div class="seaContentLine borB">
                <div class="seaCont wid100per">
                    <dl>해당 로그인 설정</dl>
                    <div class="seaRadio">
                        <div class="flex_sel">
                            <div class="check radioCheck">
                                <input type="radio" class="radio" id="로그인 허용" value="0"
                                       bind:group={$serviceSettingData.settingInfo.csOverseasBlockSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csOverseasBlockSetting', e.target.value)}}>
                                <label for="로그인 허용"><em><dt></dt></em>로그인 허용</label>
                            </div>
                            <div class="check radioCheck noneMarR">
                                <input type="radio" class="radio" id="로그인 차단" value="1"
                                       bind:group={$serviceSettingData.settingInfo.csOverseasBlockSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csOverseasBlockSetting', e.target.value)}}>
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
                                       on:change={(e)=>{handleChangeRadioBtn('csAccessSetting', e.target.value)}}>
                                <label for="비활성화"><em><dt></dt></em>비활성화</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio activate" name="ipsetting" id="활성화" value="1"
                                       bind:group={$serviceSettingData.settingInfo.csAccessSetting}
                                       on:change={(e)=>{handleChangeRadioBtn('csAccessSetting', e.target.value)}}>
                                <label for="활성화"><em><dt></dt></em>활성화</label>
                            </div>
                        </div>
                        <div class="ipContentIner">
                            <div class="ipseaBox marB20">
                                <div class="koinput">
                                    <input type="text" name="" id="" class="wid236" placeholder="IP 검색">
                                    <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                </div>
                                <div class="floatBtnBox">
                                    <button class="del" id="ipdel_pop">삭제</button>
                                    <button class="add" id="ipadd_pop">추가</button>
                                </div>
                            </div>
                            <div class="iptableWrap">
                                <div class="iptable">
                                    <table>
                                        <caption>공인 ip 리스트</caption>
                                        <colgroup>
                                            <col style="width:8%;">
                                            <col style="width:46%;">
                                            <col style="width:46%;">
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" name="allcheck" id="allcheck">
                                                    <label for="allcheck"><em></em></label>
                                                </div>
                                            </th>
                                            <th>공인 IP</th>
                                            <th>메모</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip07" id="ip07" class="partcheck">
                                                    <label for="ip07"><em></em></label>
                                                </div>
                                            </td>
                                            <td>121.134.227.161</td>
                                            <td>2월대개봉_오피스IP</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip08" id="ip08" class="partcheck">
                                                    <label for="ip08"><em></em></label>
                                                </div>
                                            </td>
                                            <td>121.134.227.161</td>
                                            <td>2월대개봉_오피스IP</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip09" id="ip09" class="partcheck">
                                                    <label for="ip09"><em></em></label>
                                                </div>
                                            </td>
                                            <td>121.134.227.161</td>
                                            <td>2월대개봉_오피스IP</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip10" id="ip10" class="partcheck">
                                                    <label for="ip10"><em></em></label>
                                                </div>
                                            </td>
                                            <td>121.134.227.161</td>
                                            <td>2월대개봉_오피스IP</td>
                                        </tr>
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
                        <div class="selectBox wid164" use:SelectBoxManager={(el) => {handleChangeRadioBtn('csPasswordChangeSetting', el.value)}}>
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
                        <div class="selectBox wid164" use:SelectBoxManager={(el) => {handleChangeRadioBtn('csPasswordErrorCountSetting', el.value)}}>
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
                            <div class="selectBox wid124 nonePad" use:SelectBoxManager={(el) => {handleChangeRadioBtn('csAutoLogoutSetting', el.value)}}>
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
                                       on:change={(e) => {handleChangeRadioBtn('csLongDisconnectionSetting', e.target.value)}}>
                                <label for="제한 없음"><em><dt></dt></em>제한 없음</label>
                            </div>
                            <div class="check radioCheck noneMarR">
                                <input type="radio" class="radio period" name="accessSetting" id="기간선택" value="1"
                                       on:change={(e) => {handleChangeRadioBtn('csLongDisconnectionSetting', e.target.value)}}>
                                <label for="기간선택"><em><dt></dt></em></label>
                            </div>
                            <div class="selectBox wid124 nonePad" use:SelectBoxManager={(el) => {handleChangeRadioBtn('csLongDisconnectionSetting', el.value)}}>
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
        </div>
    </div>
</section>

{#if serviceIpState === 1}
<SettingIpAdd />
{:else if serviceIpState === 2}
<SettingIpDelete />
{/if}