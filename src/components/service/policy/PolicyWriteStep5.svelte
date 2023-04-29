<script>

    import { fade } from 'svelte/transition'
    import {backBtn,policyInfoData,piId} from "../../../lib/store.js";

    export let policyWriting;
    export let stateChange;

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
            <div class="title_check" style="top: 0">
                <input type="checkbox" value="1" name="pr6_involve" id="pr6_involve" checked>
                <label for="pr6_involve">
                    <p class="check">포함여부</p>
                    <em></em>
                </label>
            </div>
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
        <div class="prtextTableBox">
            <div class="prtextTable colum4">
                <div class="prtt_area"><input type="text" name="" placeholder="김코코" value=""/></div>
            </div>
            <div class="prtextTable colum4">
                <div class="prtt_area"><input type="text" name="" placeholder="보험 권유" value=""/></div>
            </div>
            <div class="prtextTable colum4">
                <div class="prtt_area"><input type="text" name="" placeholder="이름, 휴대전화번호" value=""/></div>
            </div>
            <div class="prtextTable colum4">
                <div class="prtt_area"><input type="text" name="" placeholder="1년" value=""/></div>
            </div>
        </div>
        <script>
            jQuery(document).ready(function() {
                var max_fields2     = 5;
                var wrapper2        = jQuery(".prcontainer6");
                var add_button2      = jQuery(".add_pr_field6");
                var x = 1;

                jQuery(add_button2).click(function(e){
                    e.preventDefault();
                    if(x < max_fields2){
                        x++;
                        jQuery(wrapper2).append(
                            '<div class="addelement">' +
                            '<div class="prtextTableBox">' +
                            '<div class="prtextTable colum4">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum4">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum4">' +
                            '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                            '</div>' +
                            '<div class="prtextTable colum4">' +
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
        <div class="prcontainer6"></div>
        <div class="pr_fieldBtnInner">
            <button class="add_pr_field6 pr_fieldBtn"></button>
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
            <div class="title_check">
                <input type="checkbox" value="1" name="pr6-1_involve" id="pr6-1_involve" checked>
                <label for="pr6-1_involve">
                    <p class="check">포함여부</p>
                    <em></em>
                </label>
            </div>
        </div>
        <div class="prtextTablethBox colum5Line borT">
            <div class="prtti">제공받는 자</div>
            <div class="prtti">제공받는 자의 이용 목적</div>
            <div class="prtti">제공하는 개인정보 항목</div>
            <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
            <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
        </div>
        <div class="prtextTableBox">
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="김코코" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="미국, 샌프란시스코, www.xyz.com" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="마케팅 제휴" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="이름, 이메일, 성별, 생년월일" value=""/></div>
            </div>
            <div class="prtextTable colum5">
                <div class="prtt_area"><input type="text" name="" placeholder="1년" value=""/></div>
            </div>
        </div>
        <script>
            jQuery(document).ready(function() {
                var max_fields2     = 5;
                var wrapper2        = jQuery(".prcontainer7");
                var add_button2      = jQuery(".add_pr_field7");
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
        <div class="prcontainer7"></div>
        <div class="pr_fieldBtnInner">
            <button class="add_pr_field7 pr_fieldBtn"></button>
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
                <button on:click="{() => stateChange(4)}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>5</span> / 7</dl>
                </div>

                <button on:click="{() => stateChange(6)}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
