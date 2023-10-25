<script>

    import { fade } from 'svelte/transition'
    import {policyInfoData,piId} from "../../../lib/store.js";
    import {ajaxBody, reportCatch} from "../../common/ajax.js";

    export let stateChange;
    export let policyWriting;

    const outRemoveIdList = [];
    const createOutItem = () => {
        policyInfoData.update(obj => {
            obj.outDataList = [
                ...obj.outDataList, {
                    pioId: 0,
                    pioOutsourcingCompany: '',
                    pioChose: '',
                    pioConsignmentCompany: '',
                    pioPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeOutItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.outDataList[index].pioId) {
                outRemoveIdList.push(obj.outDataList[index].pioId);
            }
            obj.outDataList.splice(index, 1);
            return obj;
        });
    }

    const outDetailRemoveIdList = [];
    const createOutDetailItem = () => {
        policyInfoData.update(obj => {
            obj.outDetailDataList = [
                ...obj.outDetailDataList, {
                    piodId: 0,
                    piodCompany: '',
                    piodLocation: '',
                    piodMethod: '',
                    piodContact: '',
                    piodInfo: '',
                    piodDetail: '',
                    piodPeriod: '',
                }
            ];
            return obj;
        });
    }
    const removeOutDetailItem = (index) => {
        policyInfoData.update((obj) => {
            if (obj.outDetailDataList[index].piodId) {
                outDetailRemoveIdList.push(obj.outDetailDataList[index].piodId);
            }
            obj.outDetailDataList.splice(index, 1);
            return obj;
        });
    }

    const fourthDepthSave = (goToState) => {
        let url = "/v2/api/Policy/privacyPolicyFourthSave";
        let sendData = {
            piId : $piId,
            policyOutSaveDtoList : $policyInfoData.outDataList,
            policyOutDeleteIdList: outRemoveIdList,
            policyOutDetailSaveDtoList: $policyInfoData.outDetailDataList,
            policyOutDetailDeleteIdList: outDetailRemoveIdList,
            policyOutDetailYn: !!$policyInfoData.outDetailDataList.length,
        }
        ajaxBody(url, sendData, (res) => {
            try {
                policyWriting(goToState);
            } catch (e) {
                reportCatch('t23082305', e);
            }
        });
    }

</script>

<div in:fade>

    <!------------ No.5 ------------>
    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">3. 개인정보 처리 업무의 위탁에 관한 사항
            <span class="tiptool" id="tool_btn10">
                <div class="layerToolType pmtool_02" id="tool_box10">
                    <div class="tipContents">
                        <p>
                            개인정보 업무를 위탁 처리하는 사항에 관해서 작성합니다.
                        </p>
                    </div>
                </div>
            </span>
        </div>
        <div class="prtextTableBox borT">
            <div class="prtextTable wid25per">
                <div class="prtti">수탁 업체
                    <span class="tiptool" id="tool_btn11">
                                <!-- [D] tooltip : 위탁 업무 -->
                                <div class="layerToolType pmtool_02" id="tool_box11">
                                    <div class="tipContents">
                                        <p>
                                            코코넛을 제공하는 (주)2월대개봉은 필<br>수로 포함합니다.
                                        </p>
                                    </div>
                                </div>
                        <!-- // [D] 위탁 업무 -->
                            </span>
                </div>
            </div>
            <div class="prtextTable wid25per">
                <div class="prtti">필수 / 선택</div>
            </div>
            <div class="prtextTable wid25per">
                <div class="prtti">위탁 업무
                    <span class="tiptool" id="tool_btn12">
                        <!-- [D] tooltip : 위탁 업무 -->
                        <div class="layerToolType pmtool_02" id="tool_box12">
                            <div class="tipContents">
                                <p>
                                    개인정보 처리 업무 위탁에 관해서 작성합니다. ex) 물품 배송, IT 개발 및 운영, 콜센터 업무 등
                                </p>
                            </div>
                        </div>
                        <!-- // [D] 위탁 업무 -->
                        </span>
                </div>
            </div>
            <div class="prtextTable wid25per">
                <div class="prtti">처리 및 보유 기간</div>
            </div>
        </div>
        <div class="prcontainer4">
            {#each $policyInfoData.outDataList as {pioOutsourcingCompany, pioChose, pioConsignmentCompany, pioPeriod}, i}
                <div class="addelement">
                    <div class="prtextTableBox">
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pioOutsourcingCompany} placeholder="예) (주)2월대개봉"></textarea></div>
                        </div>
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pioChose} placeholder="예) 필수"></textarea></div>
                        </div>
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pioConsignmentCompany} placeholder="예) 서비스 이용 시 생성, 수집"></textarea></div>
                        </div>
                        <div class="prtextTable wid25per">
                            <div class="prtt_area"><textarea type="text" bind:value={pioPeriod} placeholder="예) 탈퇴 또는 계약 종료 시까지"></textarea></div>
                        </div>
                    </div>
                    <a on:click={()=>{removeOutItem(i)}} class="pr_delete"></a>
                </div>
            {/each}
        </div>
        <div class="pr_fieldBtnInner">
            <button type="button" on:click={createOutItem} class="add_pr_field4 pr_fieldBtn"></button>
        </div>
    </div>

    <!------------ No.5-1 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">3-1. 개인정보 처리 업무의 국외 위탁에 관한 사항
            <span class="tiptool" id="tool_btn13">
                <div class="layerToolType pmtool_02" id="tool_box13">
                    <div class="tipContents">
                        <p>
                            개인정보의 국외 처리위탁이 있을 경우에만 작성합니다.
                        </p>
                    </div>
                </div>
            </span>
        </div>
        <div class="prtextTablethBox colum7Line borT">
            <div class="prtti">수탁 업체</div>
            <div class="prtti">수탁업체의 위치(국가, 도시 등 구체적 주소 작성)</div>
            <div class="prtti">위탁 일시 및 방법</div>
            <div class="prtti">정보관리책임자의 연락처</div>
            <div class="prtti">위탁하는 개인정보 항목</div>
            <div class="prtti">위탁 업무 내용</div>
            <div class="prtti">위탁 업무 내용개인정보의 보유 및 이용기간</div>
        </div>

        <div class="prcontainer5">
            {#each $policyInfoData.outDetailDataList as {piodCompany, piodLocation, piodMethod, piodContact, piodInfo, piodDetail, piodPeriod}, i}
                <div class="addelement">
                    <div class="prtextTableBox">
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodCompany} placeholder="예) (주)2월대개봉"></textarea></div>
                        </div>
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodLocation} placeholder="예) ○국가 ○시 ○구 ○동 건물명"></textarea></div>
                        </div>
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodMethod} placeholder="예) ○년 ○월 ○일 인터넷을 이용한 원격지 전송"></textarea></div>
                        </div>
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodContact} placeholder="예) 010-0000-0000"></textarea></div>
                        </div>
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodInfo} placeholder="예) 이름, 주소, 이메일"></textarea></div>
                        </div>
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodDetail} placeholder="예) 데이터 보호를 위한 국가간 데이터 백업(보관)"></textarea></div>
                        </div>
                        <div class="prtextTable colum7">
                            <div class="prtt_area"><textarea type="text" bind:value={piodPeriod} placeholder="예) 탈퇴 또는 보유기간 만료까지"></textarea></div>
                        </div>
                    </div>
                    <a on:click={()=>{removeOutDetailItem(i)}} class="pr_delete"></a>
                </div>
            {/each}
        </div>
        <div class="pr_fieldBtnInner">
            <button type="button" on:click={createOutDetailItem} class="add_pr_field5 pr_fieldBtn"></button>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 60%"></div>
                </div>
            </div>

            <div class="pri_bottomBtnBox marT32">
                <button type="button" on:click="{() => {fourthDepthSave(3)}}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>4</span> / 7</dl>
                </div>

                <button type="button" on:click="{() => {fourthDepthSave(5)}}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
