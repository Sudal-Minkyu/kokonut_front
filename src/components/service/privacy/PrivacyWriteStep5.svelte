
<script>
    import { fade } from 'svelte/transition'
    import { providePrivacyWriteData } from "../../../lib/store.js";
    export let stateChange;
    function savePrivacy() {
        console.log("개인정보 제공 완료");
    }
</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <label class="steplabel">개인정보를 제공할 회원을 선택해 주세요.</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio all" name="porim" id="radioEveryone" value="everyone"
                               bind:group={$providePrivacyWriteData.step5.provideTargetMemberScope} />
                        <label for="radioEveryone"><em><dt></dt></em>전체 회원</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio part" name="porim" id="radioSomeone" value="someone"
                               bind:group={$providePrivacyWriteData.step5.provideTargetMemberScope} />
                        <label for="radioSomeone"><em><dt></dt></em>일부 회원</label>
                    </div>
                </div>
                <div class="teamtable">
                    <label class="steplabel">회원을 선택해 주세요.<span>4명</span></label>
                    <div class="tea_ListFlexBox marT24">
                        <div class="tea_ListBox">
                            <div class="teamSeaBox">
                                <div class="memseaBox marB32 hei40">
                                    <div class="koinput">
                                        <input type="text" name="" id="" class="wid236" placeholder="아이디, 이메일 검색">
                                        <button><img src="/kokonut/member/public/img/common/icon_search_ver2.png" alt=""></button>
                                    </div>
                                    <div class="filtetBtn" id="filter_pop">기간 필터</div>
                                </div>
                            </div>
                            <div class="tea_listBox">
                                <div class="kt_tableTopBox marB16">
                                    <div class="kt_total">총 <span>86</span>건</div>
                                    <div class="kt_selbox wid108">
                                        <div class="selectBox wid100per nonePad">
                                            <div class="label">최근 등록순</div>
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
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem02" id="mem02" class="partcheck">
                                                        <label for="mem02"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem03" id="mem03" class="partcheck">
                                                        <label for="mem03"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem04" id="mem04" class="partcheck">
                                                        <label for="mem04"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem05" id="mem05" class="partcheck">
                                                        <label for="mem05"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem06" id="mem06" class="partcheck">
                                                        <label for="mem06"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem07" id="mem07" class="partcheck">
                                                        <label for="mem07"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem08" id="mem08" class="partcheck">
                                                        <label for="mem08"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem09" id="mem09" class="partcheck">
                                                        <label for="mem09"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem10" id="mem10" class="partcheck">
                                                        <label for="mem10"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="mem11" id="mem11" class="partcheck">
                                                        <label for="mem11"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>koko1@kokonut.me</td>
                                                <td>김코코</td>
                                                <td>인사팀</td>
                                                <td>최고관리자</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <script>
                                            // 체크박스 스크립트
                                            $("#allcheck").click(function(){
                                                if($("#allcheck").is(":checked")){
                                                    $(".partcheck").prop("checked",true);
                                                }
                                                else{
                                                    $(".partcheck").prop("checked",false);
                                                }
                                            });
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tea_ListBox">
                            <div class="teaMemselBox marT110">
                                <div class="tmResetBtn">초기화</div>
                                <div class="memselBox">
                                    <div class="memName">김코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">정코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">최코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">이코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">오코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">한코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">강코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">장코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">주코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">김코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">정코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">최코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">이코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">오코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">한코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">강코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">장코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">주코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">김코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">정코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">최코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">이코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">오코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">한코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">강코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">장코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">주코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">김코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">정코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">최코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">이코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">오코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">한코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">강코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">장코코(인사팀)<button class="memdel"></button></div>
                                    <div class="memName">주코코(인사팀)<button class="memdel"></button></div>
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
                    <div class="Prog_2 prog100"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(4)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>5</span> / 5</dl>
                </div>
                <button on:click={savePrivacy} class="pri_nextBtn">완료</button>
            </div>
        </div>
    </div>
</div>