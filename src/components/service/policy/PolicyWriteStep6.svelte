<script>

    import { fade } from 'svelte/transition'
    import {backBtn,policyInfoData,piId} from "../../../lib/store.js";

    export let policyWriting;
    export let stateChange;

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
        <div class="prtextTableBox">
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="김코코" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="CEO" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="privacy@abc.com" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="02-1234-7890" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="보안팀" value=""/></div>
            </div>
        </div>
        <script>
            jQuery(document).ready(function() {
                var max_fields2     = 5;
                var wrapper2        = jQuery(".prcontainer8");
                var add_button2      = jQuery(".add_pr_field8");
                var x = 1;

                jQuery(add_button2).click(function(e){
                    e.preventDefault();
                    if(x < max_fields2){
                        x++;
                        jQuery(wrapper2).append(
                            '<div class="addelement">' +
                            '<div class="prtextTableBox">' +
                            '<div class="prtextTable colum5">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum5">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum5">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum5">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum5">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '</div>' +
                            '<a href="#" class="pr_delete"></a></div>'
                        ); //add input box
                    }
                    else
                    {
                        alert('해당 정보는 4개 입력이 최대입니다.')
                    }
                });

                jQuery(wrapper2).on("click",".pr_delete", function(e){
                    e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                })
            });
        </script>
        <div class="prcontainer8"></div>
        <div class="pr_fieldBtnInner">
            <button class="add_pr_field8 pr_fieldBtn"></button>
        </div>
    </div>

    <!------------ No.10 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">6. 개인정보 처리방침의 변경에 관한 사항</div>
        <div class="prinortext marB16">
            개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 홈페이지 또는 이메일 등 개별 통지 방법을 통해 고지할 것입니다.
        </div>
        <div class="prnor_text">
            <div class="prnort dateinput">
                <dt></dt>
                현 개인정보 처리방침 시행 일자 :
                <div class="koinput wid64 marL8">
                    <input type="text" name="" id="" class="" placeholder="2023">
                </div>
                년
                <div class="koinput wid44 marL16">
                    <input type="text" name="" id="" class="" placeholder="01">
                </div>
                월
                <div class="koinput wid44 marL16">
                    <input type="text" name="" id="" class="" placeholder="01">
                </div>
                일

                <span class="tiptool" id="tool_btn19">
                            <!-- [D] tooltip : 현 개인정보 처리방침 시행 일자 -->
                            <div class="layerToolType pmtool_02" id="tool_box19">
                                <div class="tipContents">
                                    <p>
                                        현 개인정보 처리방침에서 이전 개인정보 처리방침을 찾을 수 있어야 합니다.
                                    </p>
                                </div>
                            </div>
                    <!-- // [D] 현 개인정보 처리방침 시행 일자 -->
                        </span>
            </div>
        </div>
        <div class="prnor_text">
            <div class="prnort"><dt></dt>이전 개인정보 처리방침 시행 일자 : 2022. 12. 12.
                <span class="tiptool" id="tool_btn20">
                            <!-- [D] tooltip : 이전 개인정보 처리방침 시행 일자 -->
                            <div class="layerToolType pmtool_02" id="tool_box20">
                                <div class="tipContents">
                                    <p>
                                        코코넛에 개인정보 처리방침을 저장했다면, 그 링크를 이용할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                    <!-- // [D] 이전 개인정보 처리방침 시행 일자 -->
                        </span>
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
                <button on:click="{() => stateChange(5)}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>6</span> / 7</dl>
                </div>

                <button on:click="{() => stateChange(7)}" class="pri_nextBtn">다음</button>
            </div>

        </div>
    </div>
</div>
