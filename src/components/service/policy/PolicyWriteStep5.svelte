<script>

    import { fade } from 'svelte/transition'
    import {backBtn,policyInfoData,piId} from "../../../lib/store.js";
    import restapi from "../../../lib/api.js";

    export let stateChange;

    const policyThirdDeleteIdList = [];
    const createThirdItem = () => {
        policyInfoData.update(obj => {
            obj.thirdDataList = [
                ...obj.thirdDataList, {
                    pitId: 0,
                    pitRecipient: '',
                    pitPurpose: '',
                    pitInfo: '',
                    pitPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeThirdItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.thirdDataList[index].pitId) {
                policyThirdDeleteIdList.push(obj.thirdDataList[index].pitId);
            }
            obj.thirdDataList.splice(index, 1);
            return obj;
        });
    }

    const policyThirdOverseasDeleteIdList = [];
    const createThirdOverseasItem = () => {
        policyInfoData.update(obj => {
            obj.thirdOverseasDataList = [
                ...obj.thirdOverseasDataList, {
                    pitoId: 0,
                    pitoRecipient: '',
                    pitoLocation: '',
                    pitoPurpose: '',
                    pitoInfo: '',
                    pitoPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeThirdOverseasItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.thirdOverseasDataList[index].pitoId) {
                policyThirdOverseasDeleteIdList.push(obj.thirdOverseasDataList[index].pitoId);
            }
            obj.thirdOverseasDataList.splice(index, 1);
            return obj;
        });
    }

    let policyThirdYn = !!$policyInfoData.thirdDataList.length;
    let policyThirdOverseasYn = !!$policyInfoData.thirdOverseasDataList.length;

    const fifthDepthSave = (goToState) => {
        console.log('저장전데이터', $policyInfoData);
        let url = "/v2/api/Policy/privacyPolicyFifthSave";
        let sendData = {
            piId : $piId,
            policyThirdSaveDtoList: $policyInfoData.thirdDataList,
            policyThirdYn: !!$policyInfoData.thirdDataList.length,
            policyThirdDeleteIdList: policyThirdDeleteIdList,
            policyThirdOverseasSaveDtoList: $policyInfoData.thirdOverseasDataList,
            policyThirdOverseasYn: !!$policyInfoData.thirdOverseasDataList.length,
            policyThirdOverseasDeleteIdList: policyThirdOverseasDeleteIdList,
        }
        restapi('v2', 'post', url, "body", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    // 완료후
                    stateChange(goToState);
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        );
    }
</script>

<div in:fade>
    <!------------ No.6 ------------>
    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">4. 개인정보 제3자 제공에 관한 사항
            <span class="tiptool" id="tool_btn14">
                <div class="layerToolType pmtool_02" id="tool_box14">
                    <div class="tipContents">
                        <p>
                            개인정보를 제3자에 제공하는 고객사만 작성합니다. 개인정보 처리 위탁에 관한 사항은 5. 개인정보 처리 업무의 위탁에 관한 사항에 작성합니다.
                        </p>
                    </div>
                </div>
            </span>
        </div>
        <div class="prinortext marB24">
            회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 개인정보보호법에 근거해 정보주체의 별도 동의나 관련 법령에 의해 개인정보 제출의 의무가 있는 경우, 또는 정보주체의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한 경우에 한하여 개인정보를 제공합니다.
        </div>
        <div class="prtextTablethBox colum4Line borT">
            <div class="prtti">제공받는 자</div>
            <div class="prtti">제공받는 자의 이용 목적</div>
            <div class="prtti">제공하는 개인정보 항목</div>
            <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
        </div>
        <div class="prcontainer6">
            {#each $policyInfoData.thirdDataList as {pitRecipient, pitPurpose, pitInfo, pitPeriod}, i}
                <div class="addelement">
                    <div class="prtextTableBox">
                        <div class="prtextTable colum4">
                            <div class="prtt_area"><textarea type="text" bind:value={pitRecipient} placeholder="예) 김코코"></textarea></div>
                        </div>
                        <div class="prtextTable colum4">
                            <div class="prtt_area"><textarea type="text" bind:value={pitPurpose} placeholder="예) 보험 권유"></textarea></div>
                        </div>
                        <div class="prtextTable colum4">
                            <div class="prtt_area"><textarea type="text" bind:value={pitInfo} placeholder="예) 이름, 휴대전화번호"></textarea></div>
                        </div>
                        <div class="prtextTable colum4">
                            <div class="prtt_area"><textarea type="text" bind:value={pitPeriod} placeholder="예) 1년"></textarea></div>
                        </div>
                    </div>
                    <a on:click={()=>{removeThirdItem(i)}} class="pr_delete"></a>
                </div>
            {/each}
        </div>
        <div class="pr_fieldBtnInner">
            <button type="button" on:click={createThirdItem} class="add_pr_field6 pr_fieldBtn"></button>
        </div>
    </div>

    <!------------ No.6-1 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">4-1. 개인정보의 국외 제3자 제공에 관한 사항
            <span class="tiptool" id="tool_btn15">
                <div class="layerToolType pmtool_02" id="tool_box15">
                    <div class="tipContents">
                        <p>
                            개인정보를 국외의 업체에 제3자 제공 방식으로 이전할 때 작성합니다.
                        </p>
                    </div>
                </div>
            </span>
        </div>
        <div class="prtextTablethBox colum5Line borT">
            <div class="prtti">제공받는 자</div>
            <div class="prtti">제공받는 자의 이용 목적</div>
            <div class="prtti">제공하는 개인정보 항목</div>
            <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
            <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
        </div>
        <div class="prcontainer7">
            {#each $policyInfoData.thirdOverseasDataList as {pitoRecipient, pitoLocation, pitoPurpose, pitoInfo, pitoPeriod}, i}
                <div class="addelement">
                    <div class="prtextTableBox">
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pitoRecipient} placeholder="예) 김코코"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pitoLocation} placeholder="예) 보험 권유"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pitoPurpose} placeholder="예) 이름, 휴대전화번호"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pitoInfo} placeholder="예) 1년"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pitoPeriod} placeholder="예) 1년"></textarea></div>
                        </div>
                    </div>
                    <a on:click={()=>{removeThirdOverseasItem(i)}} class="pr_delete"></a>
                </div>
            {/each}
        </div>
        <div class="pr_fieldBtnInner">
            <button on:click={createThirdOverseasItem} class="add_pr_field7 pr_fieldBtn"></button>
        </div>
    </div>

</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 75%"></div>
                </div>
            </div>

            <div class="pri_bottomBtnBox marT32">
                <button type="button" on:click="{() => {fifthDepthSave(4)}}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>5</span> / 7</dl>
                </div>

                <button type="button" on:click="{() => {fifthDepthSave(6)}}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
