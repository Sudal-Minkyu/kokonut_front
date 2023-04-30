
<script>
    import { fade } from 'svelte/transition'
    import jQuery from "jquery";
    
    // 활성 비활성화 체크 여부 스크립트
    jQuery(".solo").click(function(){
        jQuery('.teamtable').hide();
    });
    jQuery(".team").click(function(){
        jQuery('.teamtable').show();
    });
    jQuery(document).ready(function(){
        if(jQuery(".team").is(":checked")){
            jQuery('.teamtable').show();
        }
        else{
            jQuery('.teamtable').hide();
        }
    });

    jQuery('.popmasterSel').on('click', function() {
        jQuery('.popgrade').addClass('popmaster');
    });
    jQuery('.popanoGrade').on('click', function() {
        jQuery('.popgrade').removeClass('popmaster');
    });

    // 체크박스 스크립트
    jQuery("#allcheck").click(function(){
        if(jQuery("#allcheck").is(":checked")){
            jQuery(".partcheck").prop("checked",true);
        }
        else{
            jQuery(".partcheck").prop("checked",false);
        }
    });


    export let stateChange;

</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <label class="steplabel">제공받을 사람을 선택해 주세요.</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio solo" name="solo_team" id="본인" value="본인">
                        <label for="본인">본인</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio team" name="solo_team" id="내부 팀원" value="내부 팀원" checked>
                        <label for="내부 팀원">내부 팀원</label>
                    </div>
                </div>
                <div class="teamtable">
                    <label class="steplabel">팀원을 선택해 주세요.</label>
                    <div class="tea_ListFlexBox marT24">
                        <div class="tea_ListBox">
                            <div class="teamSeaBox">
                                <div class="memseaBox marB32">
                                    <div class="koinput">
                                        <input type="text" class="wid236" placeholder="이메일 검색">
                                        <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                    </div>
                                    <div class="mu_SelBox wid150 noneMarR">
                                        <div class="selectBox wid100per nonePad">
                                            <div class="label popgrade" id="">관리자 등급</div>
                                            <ul class="optionList">
                                                <li class="optionItem popanoGrade">최고관리자</li>
                                                <li class="optionItem popanoGrade">일반관리자</li>
                                                <li class="optionItem popanoGrade">임시관리자</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tea_listBox">
                                <div class="kt_tableTopBox marB16">
                                    <div class="kt_total">총 <span>86</span>건</div>
                                    <div class="kt_selbox wid108">
                                        <div class="selectBox wid100per nonePad">
                                            <div class="label" id="">최근 등록순</div>
                                            <ul class="optionList">
                                                <li class="optionItem">최근 등록순</li>
                                                <li class="optionItem">정확도순</li>
                                                <li class="optionItem">오름차순</li>
                                                <li class="optionItem">내림차순</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="emailtableBox">
                                    <div class="prtable">
                                        <table>
                                            <caption>개인정보 제공 팀원 리스트</caption>
                                            <colgroup>
                                                <col style="width:7.27%;">
                                                <col style="width:41.82%;">
                                                <col style="width:14.55%;">
                                                <col style="width:14.55%;">
                                                <col style="width:21.82%;">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>
                                                    <div class="koko_check">
                                                        <input type="checkbox" name="allcheck" id="allcheck">
                                                        <label for="allcheck"><em></em></label>
                                                    </div>
                                                </th>
                                                <th>아이디</th>
                                                <th>이름</th>
                                                <th>부서</th>
                                                <th>관리자 등급</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem01" id="mem01" class="partcheck">
                                                        <label for="mem01"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tea_ListBox">
                            <div class="teaMemselBox marT110">
                                <div class="tmResetBtn">초기화</div>
                                <div class="memselBox">
                                    <div class="memName">김코코(인사팀)<button class="memdel"></button></div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog40"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(1)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>2</span> / 5</dl>
                </div>
                <button on:click={() => stateChange(3)} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>