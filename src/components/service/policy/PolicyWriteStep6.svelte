<script>

    import {fade} from 'svelte/transition'
    import {piId, policyInfoData} from "../../../lib/store.js";
    import {ajaxBody, reportCatch} from "../../common/ajax.js";

    export let stateChange;
    export let policyWriting;

    const policyResponsibleDeleteIdList = [];
    const createResponsibleItem = () => {
        policyInfoData.update(obj => {
            obj.reponsibleDataList = [
                ...obj.reponsibleDataList, {
                    pirId: 0,
                    pirName: '',
                    pirPosition: '',
                    pirEmail: '',
                    pirContact: '',
                    pirDepartment: '',
                }
            ];
            return obj;
        });
    }
    const removeResponsibleItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.reponsibleDataList[index].pirId) {
                policyResponsibleDeleteIdList.push(obj.reponsibleDataList[index].pirId);
            }
            obj.reponsibleDataList.splice(index, 1);
            return obj;
        });
    }

    const sixthDepthSave = (goToState) => {
        let url = "/v2/api/Policy/privacyPolicySixthSave";
        let sendData = {
            piId : $piId,
            policyResponsibleSaveDtoList: $policyInfoData.reponsibleDataList,
            policyResponsibleDeleteIdList: policyResponsibleDeleteIdList,
            piYear: $policyInfoData.policyData3.piYear,
            piMonth: $policyInfoData.policyData3.piMonth,
            piDay: $policyInfoData.policyData3.piDay,
            piChangeChose: !!($policyInfoData.policyData3.piYear && $policyInfoData.policyData3.piMonth && $policyInfoData.policyData3.piDay),
        }
        ajaxBody(url, sendData, (res) => {
            try {
                policyWriting(goToState);
            } catch (e) {
                reportCatch('t23082301', e);
            }
        });
    }

        // 숫자와 제어키를 제외한 입력을 입력단계에서 막음
    function handleOnlyNum(e) {
        const charCode = e.which ? e.which : e.keyCode;

        if (
            (charCode < 48 || charCode > 57) &&   // 숫자 키
            (charCode < 96 || charCode > 105) &&  // 숫자 패드
            charCode !== 8 &&                     // 백스페이스
            charCode !== 9 &&                     // 탭
            charCode !== 37 &&                    // 좌 화살표
            charCode !== 39 &&                    // 우 화살표
            charCode !== 35 &&                    // End
            charCode !== 36 &&                    // Home
            charCode !== 46                       // Delete
        ) {
            e.preventDefault();
        }
    }
</script>

<div in:fade>
    <!------------ No.9 ------------>
    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">5. 개인정보보호 책임자에 관한 사항
            <span class="tiptool" id="tool_btn17">
                        <!-- [D] tooltip : 개인정보보호 책임자에 관한 사항 -->
                        <div class="layerToolType pmtool_02" id="tool_box17">
                            <div class="tipContents">
                                <p>
                                    개인정보보호책임자(CPO)는 반드시 임원으로 선임해야 합니다. 선임하지 않으면 CEO가 개인정보보호책임자(CPO)인 것으로 간주됩니다. 반드시 한 명일 필요는 없습니다.
                                </p>
                            </div>
                        </div>
                <!-- // [D] 개인정보보호 책임자에 관한 사항 -->
                    </span>
        </div>
        <div class="prinortext marB24">
            정보주체는 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호 책임자에게 문의하실 수 있습니다. 개인정보보호 책임자는 이용자의 문의에 대해 지체없이 답변 및 처리해 드릴 것입니다.
        </div>
        <div class="prtextTablethBox colum5Line borT">
            <div class="prtti">성명</div>
            <div class="prtti">직책</div>
            <div class="prtti">이메일</div>
            <div class="prtti">연락처
                <span class="tiptool" id="tool_btn18">
                            <!-- [D] tooltip : 연락처 -->
                            <div class="layerToolType pmtool_02" id="tool_box18">
                                <div class="tipContents">
                                    <p>
                                        실제 연락 가능한 연락처를 작성합니다.
                                    </p>
                                </div>
                            </div>
                    <!-- // [D] 연락처 -->
                        </span>
            </div>
            <div class="prtti">담당부서</div>
        </div>
        <div class="prcontainer8">
            {#each $policyInfoData.reponsibleDataList as {pirName, pirPosition, pirEmail, pirContact, pirDepartment}, i}
                <div class="addelement">
                    <div class="prtextTableBox">
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pirName} placeholder="예) 김코코"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pirPosition} placeholder="예) CEO"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pirEmail} placeholder="예) privacy@abc.com"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pirContact} placeholder="예) 02-1234-7890"></textarea></div>
                        </div>
                        <div class="prtextTable colum5">
                            <div class="prtt_area"><textarea type="text" bind:value={pirDepartment} placeholder="예) 보안팀"></textarea></div>
                        </div>
                    </div>
                    <a on:click={()=>{removeResponsibleItem(i)}} class="pr_delete"></a>
                </div>
            {/each}
        </div>
        <div class="pr_fieldBtnInner">
            <button type="button" on:click={createResponsibleItem} class="add_pr_field8 pr_fieldBtn"></button>
        </div>
    </div>

    <!------------ No.10 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">6. 개인정보 처리방침의 변경에 관한 사항
        </div>
        <div class="prinortext marB16">
            개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 홈페이지 또는 이메일 등 개별 통지 방법을 통해 고지할 것입니다.
        </div>
        <div class="prnor_text">
            <div class="prnort dateinput">
                <dt></dt>
                이전 개인정보 처리방침 시행 일자 :
                <div class="koinput wid64 marL8">
                    <input type="text" bind:value={$policyInfoData.policyData3.piYear} data-cat="piYear"
                           placeholder="2023" maxlength="4" on:keypress={handleOnlyNum}>
                </div>
                년
                <div class="koinput wid44 marL16">
                    <input type="text" bind:value={$policyInfoData.policyData3.piMonth} data-cat="piMonth"
                           placeholder="01" maxlength="2" on:keypress={handleOnlyNum}>
                </div>
                월
                <div class="koinput wid44 marL16">
                    <input type="text" bind:value={$policyInfoData.policyData3.piDay} data-cat="piDay"
                           placeholder="01" maxlength="2" on:keypress={handleOnlyNum}>
                </div>
                일
            </div>
        </div>
    </div>

</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 88%"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button type="button" on:click="{() => {sixthDepthSave(5)}}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>6</span> / 7</dl>
                </div>

                <button type="button" on:click="{() => {sixthDepthSave(7)}}" class="pri_nextBtn">다음</button>
            </div>

        </div>
    </div>
</div>
