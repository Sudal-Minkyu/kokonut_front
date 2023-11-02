
<script>
    import {serviceSettingData} from "../../../../lib/store.js";
    import ErrorHighlight from "../../../common/ui/ErrorHighlight.svelte";
    import {ajaxParam, reportCatch} from "../../../common/ajax.js";
    import {openBanner} from "../../../common/ui/DialogManager.js";

    export let getServiceSettingDataAndInitializing;

    const closeAddAccessIpPop = () => {
        serviceSettingData.update(obj => {
            obj.addAccessIpPop.visibility = false;
            return obj;
        });
    };

    const setCurrentAccessIp = (e) => {
        if (e.target.checked) {
            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(json => {
                    const ipSplitList = json.ip.split('.');
                    if (ipSplitList.length === 4) {
                        serviceSettingData.update(obj => {
                            obj.addAccessIpPop.ip1 = ipSplitList[0];
                            obj.addAccessIpPop.ip2 = ipSplitList[1];
                            obj.addAccessIpPop.ip3 = ipSplitList[2];
                            obj.addAccessIpPop.ip4 = ipSplitList[3];
                            obj.addAccessIpPop.isIpInputReadonly = true;
                            return obj;
                        });
                    }
                });
        } else {
            serviceSettingData.update(obj => {
                obj.addAccessIpPop.ip1 = '';
                obj.addAccessIpPop.ip2 = '';
                obj.addAccessIpPop.ip3 = '';
                obj.addAccessIpPop.ip4 = '';
                obj.addAccessIpPop.isIpInputReadonly = false;
                return obj;
            });
        }
    }

    const handleKeyupIpInput = (e) => {
        serviceSettingData.update(obj => {
            const numericValue = parseInt(e.target.value.replace(/\D/g, '').substring(0, 3), 10);
            obj.addAccessIpPop[e.target.id] = isNaN(numericValue) ? '' : Math.min(255, numericValue).toString();
            return obj;
        });
    }

    const commitAddAccessIp = () => {
        const isEmptyExist = !$serviceSettingData.addAccessIpPop.ip1 || !$serviceSettingData.addAccessIpPop.ip2
            || !$serviceSettingData.addAccessIpPop.ip3 || !$serviceSettingData.addAccessIpPop.ip4;
        const isOutOfBound = Number($serviceSettingData.addAccessIpPop.ip1) > 255
            || Number($serviceSettingData.addAccessIpPop.ip2) > 255
            || Number($serviceSettingData.addAccessIpPop.ip3) > 255
            || Number($serviceSettingData.addAccessIpPop.ip4) > 255;

        if (isEmptyExist || isOutOfBound) {
            serviceSettingData.update(obj => {
                obj.addAccessIpPop.ipInputErrorMsg = '올바른 IP를 입력해 주세요.';
                return obj;
            });
            return;
        }

        const addData = {
            csipIp: $serviceSettingData.addAccessIpPop.ip1 + '.' + $serviceSettingData.addAccessIpPop.ip2
                + '.' + $serviceSettingData.addAccessIpPop.ip3 + '.' + $serviceSettingData.addAccessIpPop.ip4,
            csipRemarks: $serviceSettingData.addAccessIpPop.csipRemarks,
        }

        if ($serviceSettingData.accessIpList.map(obj => obj.csipIp).includes(addData.csipIp)) {
            serviceSettingData.update(obj => {
                obj.addAccessIpPop.ipInputErrorMsg = '이미 등록된 IP 입니다.';
                return obj;
            });
            return;
        }

        ajaxParam('/v2/api/CompanySetting/accessIpSave', addData, (res) => {
            try {
                openBanner('접속 허용 IP가 추가되었습니다.');
                getServiceSettingDataAndInitializing();
            } catch (e) {
                reportCatch('temp131', e);
            }
        });
    }
</script>

<div class="koko_popup ipadd_pop" data-popup="ipadd_pop" >
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">접속 허용 IP 추가</h3>
            </div>
            <form>
                <div class="marB24">
                    <div class="kopopMuntiinputBox">
                        <label>공인 IP</label>
                        <div class="kopopMuntiinputInner">
                            <div class="kopopMuntiinput">
                                <input type="text" id="ip1" bind:value={$serviceSettingData.addAccessIpPop.ip1}
                                       readonly={$serviceSettingData.addAccessIpPop.isIpInputReadonly}
                                       class={$serviceSettingData.addAccessIpPop.isIpInputReadonly ? 'readOnlyText' : ''}
                                       on:input={handleKeyupIpInput}/>
                            </div>
                            <div class="kopopMuntiinput">
                                <input type="text" id="ip2" bind:value={$serviceSettingData.addAccessIpPop.ip2}
                                       readonly={$serviceSettingData.addAccessIpPop.isIpInputReadonly}
                                       class={$serviceSettingData.addAccessIpPop.isIpInputReadonly ? 'readOnlyText' : ''}
                                       on:input={handleKeyupIpInput}/>
                            </div>
                            <div class="kopopMuntiinput">
                                <input type="text" id="ip3" bind:value={$serviceSettingData.addAccessIpPop.ip3}
                                       readonly={$serviceSettingData.addAccessIpPop.isIpInputReadonly}
                                       class={$serviceSettingData.addAccessIpPop.isIpInputReadonly ? 'readOnlyText' : ''}
                                       on:input={handleKeyupIpInput}/>
                            </div>
                            <div class="kopopMuntiinput">
                                <input type="text" id="ip4" bind:value={$serviceSettingData.addAccessIpPop.ip4}
                                       readonly={$serviceSettingData.addAccessIpPop.isIpInputReadonly}
                                       class={$serviceSettingData.addAccessIpPop.isIpInputReadonly ? 'readOnlyText' : ''}
                                       on:input={handleKeyupIpInput}/>
                            </div>
                        </div>
                    </div>
                    <ErrorHighlight bind:message={$serviceSettingData.addAccessIpPop.ipInputErrorMsg}/>
                    <div class="koko_check">
                        <input type="checkbox" value="1" name="IPcheck" id="IPcheck" on:change={setCurrentAccessIp}>
                        <label for="IPcheck">
                            <em></em>
                            <p class="check">현재 접속한 IP</p>
                        </label>
                    </div>
                </div>
                <div class="kopopinput marB24">
                    <label>메모</label>
                    <input type="text" placeholder="메모를 적어주세요." bind:value={$serviceSettingData.addAccessIpPop.csipRemarks}/>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel ipadd_pop_close" on:click={closeAddAccessIpPop}>취소</div>
                    <div class="koko_go"><button type="button" on:click={commitAddAccessIp}>추가</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close ipadd_pop_close" data-popup-close="ipadd_pop_close" on:click={closeAddAccessIpPop}></div>
    </div>
</div>