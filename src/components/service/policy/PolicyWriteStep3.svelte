<script>
    import { fade } from 'svelte/transition'
    import {policyInfoData,piId} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import ErrorHighlight from "../../common/ui/ErrorHighlight.svelte";
    import {ajaxBody, reportCatch} from "../../common/ajax.js";

    export let stateChange;

    const beforeRemoveIdList = [];
    const createBeforeItem = () => {
        policyInfoData.update(obj => {
            obj.beforeDataList = [
                ...obj.beforeDataList, {
                    pibId: 0,
                    pibPurpose: '',
                    pibInfo: '',
                    pibChose: '',
                    pibPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeBeforeItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.beforeDataList[index].pibId) {
                beforeRemoveIdList.push(obj.beforeDataList[index].pibId);
            }
            obj.beforeDataList.splice(index, 1);
            return obj;
        });
    }

    const afterRemoveIdList = [];
    const createAfterItem = () => {
        policyInfoData.update(obj => {
            obj.afterDataList = [
                ...obj.afterDataList, {
                    piaId: 0,
                    piaPurpose: '',
                    piaInfo: '',
                    piaChose: '',
                    piaPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeAfterItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.afterDataList[index].pibId) {
                afterRemoveIdList.push(obj.afterDataList[index].pibId);
            }
            obj.afterDataList.splice(index, 1);
            return obj;
        });
    }

    const serviceAutoRemoveIdList = [];
    const createServiceAutoItem = () => {
        policyInfoData.update(obj => {
            obj.serviceAutoDataList = [
                ...obj.serviceAutoDataList, {
                    pisaId: 0,
                    pisaPurpose: '',
                    pisaInfo: '',
                    pisaMethodology: '',
                    pisaPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeServiceAutoItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.serviceAutoDataList[index].pibId) {
                serviceAutoRemoveIdList.push(obj.serviceAutoDataList[index].pibId);
            }
            obj.serviceAutoDataList.splice(index, 1);
            return obj;
        });
    }

    onMount(async () => {
        // 툴팁 아이콘 클릭시 툴팁을 보이고 숨기기 위함.

    });

    let beforeDataListErrorMsg = '';
    const thirdDepthSave = (goToState) => {
        if (!$policyInfoData.beforeDataList.length) {
            beforeDataListErrorMsg = '서비스 가입 시 수집하는 개인정보는 최소 1개 이상 작성하여 주세요.';
            return;
        }

        console.log('저장전데이터', $policyInfoData);
        let url = "/v2/api/Policy/privacyPolicyThirdSave";

        let sendData = {
            piId : $piId,
            policyBeforeSaveDtoList: $policyInfoData.beforeDataList,
            policyBeforeDeleteIdList: beforeRemoveIdList,
            policyAfterSaveDtoList: $policyInfoData.afterDataList,
            policyAfterDeleteIdList: afterRemoveIdList,
            policyServiceAutoSaveDtoList: $policyInfoData.serviceAutoDataList,
            policyServiceAutoDeleteIdList: serviceAutoRemoveIdList,
            piInternetChose: $policyInfoData.policyData2.piInternetChose,
            piContractChose: $policyInfoData.policyData2.piContractChose,
            piPayChose: $policyInfoData.policyData2.piPayChose,
            piConsumerChose: $policyInfoData.policyData2.piConsumerChose,
            piAdvertisementChose: $policyInfoData.policyData2.piAdvertisementChose,
        }

        ajaxBody(url, sendData, (res) => {
            try {
                stateChange(goToState);
            } catch (e) {
                reportCatch('t23082304', e);
            }
        });
    }

</script>

<div in:fade>
    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">2. 수집하는 개인정보의 항목 및 수집방법</div>
        <div class="prtextaddbox marB40">
            <dl>(1) 서비스 가입 시 수집하는 개인정보</dl>
            <div class="prtextTableBox">
                <div class="prtextTable wid25per">
                    <div class="prtti">처리목적
                        <span class="tiptool" id="">
                            <div class="layerToolType pmtool_01" id="">
                                <div class="tipContents">
                                    <p>
                                        다른 처리 목적이 있으면 변경합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">수집 항목
                        <span class="tiptool" id="tool_btn01">
                            <div class="layerToolType pmtool_01" id="tool_box01">
                                <div class="tipContents">
                                    <p>
                                        회사가 수집하는 모든 개인정보 항목을 작성합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">필수 / 선택</div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">처리 및 보유 기간
                        <span class="tiptool" id="tool_btn01">
                            <div class="layerToolType pmtool_01" id="tool_box01">
                                <div class="tipContents">
                                    <p>
                                        별도 보유기간이 있다면 ‘1년', ‘3년' 등 기간을 작성합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div class="prcontainer3">
                {#each $policyInfoData.beforeDataList as {pibPurpose, pibInfo, pibChose, pibPeriod}, i}
                    <div class="addelement">
                    <div class="prtextTableBox">
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pibPurpose} placeholder="예) 서비스 제공 및 운영"></textarea></div>
                            </div>
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pibInfo} placeholder="예) IP 주소, 기기 정보, 서비스 접속 및 이용 기록"></textarea></div>
                            </div>
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pibChose} placeholder="예) 필수 / 선택"></textarea></div>
                            </div>
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pibPeriod} placeholder="예) 처리 및 보유 기간"></textarea></div>
                            </div>
                        </div>
                    <a on:click={()=>{removeBeforeItem(i)}} class="pr_delete"></a></div>
                {/each}
            </div>
            <div class="pr_fieldBtnInner">
                <button on:click={createBeforeItem} class="add_pr_field3 pr_fieldBtn"></button>
            </div>
            <ErrorHighlight message={beforeDataListErrorMsg} />
            <div class="prdot_text marT16">기기 정보를 수집하는 경우에는 일방향 암호화(Hash)를 통해 기기를 식별할 수 없는 방법으로 변환하여 보관합니다.</div>
        </div>
        <div class="prtextaddbox marB40">
            <dl>(2) 서비스 가입 후 수집하는 개인정보</dl>
            <div class="prtextTableBox">
                <div class="prtextTable wid25per">
                    <div class="prtti">처리목적
                        <span class="tiptool" id="">
                            <div class="layerToolType pmtool_01" id="">
                                <div class="tipContents">
                                    <p>
                                        다른 처리 목적이 있으면 변경합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">수집 항목
                        <span class="tiptool" id="tool_btn01">
                            <div class="layerToolType pmtool_01" id="tool_box01">
                                <div class="tipContents">
                                    <p>
                                        회사가 수집하는 모든 개인정보 항목을 작성합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">필수 / 선택</div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">처리 및 보유 기간
                        <span class="tiptool" id="tool_btn01">
                            <div class="layerToolType pmtool_01" id="tool_box01">
                                <div class="tipContents">
                                    <p>
                                        별도 보유기간이 있다면 ‘1년', ‘3년' 등 기간을 작성합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div class="prcontainer3">
                {#each $policyInfoData.afterDataList as {piaPurpose, piaInfo, piaChose, piaPeriod}, i}
                    <div class="addelement">
                        <div class="prtextTableBox">
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={piaPurpose} placeholder="예) 서비스 제공 및 운영"></textarea></div>
                            </div>
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={piaInfo} placeholder="예) IP 주소, 기기 정보, 서비스 접속 및 이용 기록"></textarea></div>
                            </div>
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={piaChose} placeholder="예) 필수 / 선택"></textarea></div>
                            </div>
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={piaPeriod} placeholder="예) 탈퇴 또는 계약 종료 시까지"></textarea></div>
                            </div>
                        </div>
                        <a on:click={()=>{removeAfterItem(i)}} class="pr_delete"></a></div>
                {/each}
            </div>
            <div class="pr_fieldBtnInner">
                <button on:click={createAfterItem} class="add_pr_field3 pr_fieldBtn"></button>
            </div>
        </div>
        <div class="prtextaddbox marB40">
            <dl>(3) 서비스 이용 중 자동 생성 및 수집하는 정보
                <span class="tiptool" id="tool_btn04">
                    <div class="layerToolType pmtool_02" id="tool_box04">
                        <div class="tipContents">
                            <p>
                                이용자가 서비스를 사용할 때 자동으로 수집하는 정보입니다.
                            </p>
                        </div>
                    </div>
                </span>
            </dl>
            <div class="prtextTableBox">
                <div class="prtextTable wid25per">
                    <div class="prtti">처리목적</div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">수집 항목</div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">수집 방법</div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">처리 및 보유 기간</div>
                </div>
            </div>
            <div class="prcontainer3">
                {#each $policyInfoData.serviceAutoDataList as {pisaPurpose, pisaInfo, pisaMethodology, pisaPeriod}, i}
                    <div class="addelement">
                        <div class="prtextTableBox">
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={pisaPurpose} placeholder="예) 서비스 제공 및 운영"></textarea></div>
                            </div>
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={pisaInfo} placeholder="예) IP 주소, 기기 정보, 서비스 접속 및 이용 기록"></textarea></div>
                            </div>
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={pisaMethodology} placeholder="예) 서비스 이용 시 생성, 수집"></textarea></div>
                            </div>
                            <div class="prtextTable wid25per">
                                <div class="prtt_area"><textarea type="text" bind:value={pisaPeriod} placeholder="예) 탈퇴 또는 계약 종료 시까지"></textarea></div>
                            </div>
                        </div>
                        <a on:click={()=>{removeServiceAutoItem(i)}} class="pr_delete"></a>
                    </div>
                {/each}
            </div>
            <div class="pr_fieldBtnInner">
                <button on:click={createServiceAutoItem} class="add_pr_field3 pr_fieldBtn"></button>
            </div>
            <div class="prdot_text marT16">기기 정보를 수집하는 경우에는 일방향 암호화(Hash)를 통해 기기를 식별할 수 없는 방법으로 변환하여 보관합니다.</div>
        </div>
        <div class="prtextaddbox marB40">
            <dl>(4) 법령에 따른 개인정보의 보유기간
                <span class="tiptool" id="tool_btn05">
                    <div class="layerToolType pmtool_02" id="tool_box05">
                        <div class="tipContents">
                            <p>
                                해당하는 수집 항목이 있으면, 근거법을 확인하고, 보유기간을 선택합니다.
                            </p>
                        </div>
                    </div>
                </span>
            </dl>
            <div class="prarea_table">
                <table>
                    <colgroup>
                        <col style="width:5.48%;">
                        <col style="width:31.51%;">
                        <col style="width:31.51%;">
                        <col style="width:31.51%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th class="praLeft">수집항목</th>
                        <th class="praLeft">근거법</th>
                        <th class="praLeft">보유기간</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div class="prarea">
                                <input type="checkbox" name="prt01" id="prt01"
                                       bind:checked={$policyInfoData.policyData2.piInternetChose} />
                                <label for="prt01"><em></em></label>
                            </div>
                        </td>
                        <td class="praLeft">인터넷 접속 로그</td>
                        <td class="praLeft">통신비밀보호법 제15조의2, 시행령 제41조</td>
                        <td class="praLeft">3개월</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="prarea">
                                <input type="checkbox" name="prt02" id="prt02"
                                       bind:checked={$policyInfoData.policyData2.piContractChose} />
                                <label for="prt02"><em></em></label>
                            </div>
                        </td>
                        <td class="praLeft">개인정보취급자의 서비스 접속 및 이용 기록</td>
                        <td class="praLeft">개인정보보호법 제29조, 개인정보의 안전성 확보조치 기준 고시 제8조</td>
                        <td class="praLeft">2년</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="prarea">
                                <input type="checkbox" name="prt03" id="prt03"
                                       bind:checked={$policyInfoData.policyData2.piPayChose} />
                                <label for="prt03"><em></em></label>
                            </div>
                        </td>
                        <td class="praLeft">대금결제 및 재화 등의 공급에 관한 기록</td>
                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                        <td class="praLeft">5년</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="prarea">
                                <input type="checkbox" name="prt04" id="prt04"
                                       bind:checked={$policyInfoData.policyData2.piConsumerChose} />
                                <label for="prt04"><em></em></label>
                            </div>
                        </td>
                        <td class="praLeft">소비자의 불만 또는 분쟁처리에 관한 기록</td>
                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                        <td class="praLeft">3년</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="prarea">
                                <input type="checkbox" name="prt05" id="prt05"
                                       bind:checked={$policyInfoData.policyData2.piAdvertisementChose} />
                                <label for="prt05"><em></em></label>
                            </div>
                        </td>
                        <td class="praLeft">표시·광고에 관한 기록</td>
                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                        <td class="praLeft">6개월</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="prtextaddbox nonebor">
            <dl>(5) 개인정보를 자동으로 수집하는 장치의 설치운영 및 그 거부에 관한 사항
                <span class="tiptool" id="tool_btn06">
                    <div class="layerToolType pmtool_03" id="tool_box06">
                        <div class="tipContents">
                            <p>
                                ‘쿠키'에 관한 조항입니다.
                            </p>
                        </div>
                    </div>
                </span>
            </dl>
            <div class="prnor_text">
                <div class="pttext"><dt>1.</dt>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용할 수 있습니다.</div>
            </div>
            <div class="prnor_text">
                <p class="marB4"><span>2.</span>쿠키는 웹사이트를 운영하는데 이용되는 웹서버가 이용자의 웹브라우저에게 보내는 소량의 정보이며 웹브라우저가 실행되는 이용자 기기의 저장장치에 저장되기도 합니다.</p>
                <dd><span></span>쿠키의 사용목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공 또는 서비스 개선을 위해 사용됩니다.</dd>
            </div>
            <div class="prnor_text">
                <div class="pttext">
                    <dt>3.</dt>
                    회사는 이용자에게 적합하고 보다 유용한 서비스를 제공하기 위해 구글(알파벳)의 Google Analytics를 이용하고 있습니다. Google Analytics 쿠키를 통하여 당사 웹사이트 이용자의 행태정보를 수집하게 되며, 이 경우 이용자 개인을 식별할 수 없는 비식별정보만이 수집됩니다.
                    <span class="tiptool" id="tool_btn07">
                        <div class="layerToolType pmtool_02" id="tool_box07">
                            <div class="tipContents">
                                <p>
                                     Google Analytics, Pixel 등 쿠키를 활용하는 툴을 사용할 때만 작성합니다.
                                </p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div class="prnor_text">
                <p class="marB4"><span>4.</span>이용자는 다음과 같은 방법으로 쿠키 사용을 거부할 수 있습니다.</p>
                <dd><span></span>브라우저에서 쿠키를 차단하는 방법</dd>
            </div>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 45%"></div>
                </div>
            </div>

            <div class="pri_bottomBtnBox marT32">
                <button on:click="{() => {thirdDepthSave(2)}}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>3</span> / 7</dl>
                </div>

                <button on:click="{() => {thirdDepthSave(4)}}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
