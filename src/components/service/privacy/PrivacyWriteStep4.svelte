
<script>
    import { fade } from 'svelte/transition'
    export let stateChange;



</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <label class="steplabel">제공할 개인정보를 선택해 주세요.</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio all" name="porim" id="전체 개인정보" value="전체 개인정보">
                        <label for="전체 개인정보"><em><dt></dt></em>전체 개인정보</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio part" name="porim" id="일부 개인정보" value="일부 개인정보" checked>
                        <label for="일부 개인정보"><em><dt></dt></em>일부 개인정보</label>
                    </div>
                </div>
<!--                <script>-->
<!--                    // 활성 비활성화 체크 여부 스크립트-->
<!--                    $(".all").click(function(){-->
<!--                        $('.teamtable').hide();-->
<!--                    });-->
<!--                    $(".part").click(function(){-->
<!--                        $('.teamtable').show();-->
<!--                    });-->
<!--                    $(document).ready(function(){-->
<!--                        if($(".part").is(":checked")){-->
<!--                            $('.teamtable').show();-->
<!--                        }-->
<!--                        else{-->
<!--                            $('.teamtable').hide();-->
<!--                        }-->
<!--                    });-->
<!--                </script>-->
                <div class="teamtable">
                    <label class="steplabel">어떤 개인정보 항목을 제공하실 건가요? </label>
                    <div class="tea_ListFlexBox marT24">

                        <div class="tea_ListBox">
                            <div class="prslideTabBox">
                                <div class="swiper-container gallery-thumbs" scrollbar-hide="true">
                                    <div class="swiper-wrapper disflextop">
                                        <div class="swiper-slide">
                                            <div class="sl_tab">기본</div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="sl_tab">민감정보</div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="sl_tab">가족정보</div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="sl_tab">비밀번호</div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="sl_tab">신체정보</div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="sl_tab">교육정보</div>
                                        </div>
                                    </div>
                                </div>
                                <!--<button class="addBtn" id="add_tab_pop"></button>-->
                            </div>
                            <div class="boaTabBox">
                                <div class="bo_tabContentBox">
                                    <div class="swiper-container gallery-top">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                                <div class="prtable">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width:8.57%;">
                                                            <col style="width:91.43%;">
                                                        </colgroup>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip01" id="ip01" class="partcheck">
                                                                    <label for="ip01"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="lockicon"></div>
                                                                주민등록번호
                                                                <span class="subElement redtext">민감정보</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip02" id="ip02" class="partcheck">
                                                                    <label for="ip02"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="lockicon"></div>
                                                                휴대전화번호
                                                                <span class="subElement yeltext">휴대전화번호</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip03" id="ip03" class="partcheck">
                                                                    <label for="ip03"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="lockicon"></div>
                                                                생년월일
                                                                <span class="subElement bluetext">전자상거래법</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip04" id="ip04" class="partcheck">
                                                                    <label for="ip04"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="lockicon"></div>
                                                                패스워드
                                                                <span class="subElement bluetext">전자상거래법</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip05" id="ip05" class="partcheck">
                                                                    <label for="ip05"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip06" id="ip06" class="partcheck">
                                                                    <label for="ip06"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip07" id="ip07" class="partcheck">
                                                                    <label for="ip07"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip08" id="ip08" class="partcheck">
                                                                    <label for="ip08"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip09" id="ip09" class="partcheck">
                                                                    <label for="ip09"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip05" id="ip05" class="partcheck">
                                                                    <label for="ip05"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip06" id="ip06" class="partcheck">
                                                                    <label for="ip06"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip07" id="ip07" class="partcheck">
                                                                    <label for="ip07"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip08" id="ip08" class="partcheck">
                                                                    <label for="ip08"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="koko_check">
                                                                    <input type="checkbox" value="" name="ip09" id="ip09" class="partcheck">
                                                                    <label for="ip09"><em></em></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                아이디
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                                <div class="prtable">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width:8.57%;">
                                                            <col style="width:91.43%;">
                                                        </colgroup>
                                                    </table>
                                                    <div class="noneprtable">항목을 추가해 주세요</div>
                                                </div>
                                            </div>
                                            <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                                <div class="prtable">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width:8.57%;">
                                                            <col style="width:91.43%;">
                                                        </colgroup>
                                                    </table>
                                                    <div class="noneprtable">항목을 추가해 주세요</div>
                                                </div>
                                            </div>
                                            <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                                <div class="prtable">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width:8.57%;">
                                                            <col style="width:91.43%;">
                                                        </colgroup>
                                                    </table>
                                                    <div class="noneprtable">항목을 추가해 주세요</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
<!--                                <script>-->
<!--                                    var galleryThumbs = new Swiper('.gallery-thumbs', {-->
<!--                                        spaceBetween: 0,-->
<!--                                        slidesPerView: 'auto',-->
<!--                                        loop: false,-->
<!--                                        freeMode: true,-->
<!--                                        watchSlidesVisibility: true,-->
<!--                                        watchSlidesProgress: true,-->
<!--                                    });-->
<!--                                    var galleryTop = new Swiper('.gallery-top', {-->
<!--                                        effect : 'fade',-->
<!--                                        fadeEffect: {-->
<!--                                            crossFade: true-->
<!--                                        },-->
<!--                                        spaceBetween: 0,-->
<!--                                        slidesPerView: 1,-->
<!--                                        loop:false,-->
<!--                                        touchRatio: 0,-->
<!--                                        thumbs: {-->
<!--                                            swiper: galleryThumbs,-->
<!--                                        },-->
<!--                                    });-->
<!--                                </script>-->
                            </div>
                        </div>



                        <div class="tea_ListBox">
                            <div class="teaMemselBox marT68">
                                <div class="tmResetBtn">초기화</div>
                                <div class="memselBox maxH410impor">
                                    <div class="mspartBox">
                                        <p>기본정보</p>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                    </div>
                                    <div class="mspartBox">
                                        <p>인적정보</p>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                    </div>
                                    <div class="mspartBox">
                                        <p>기본정보</p>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                    </div>
                                    <div class="mspartBox">
                                        <p>인적정보</p>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                        <div class="memName">아이디<button class="memdel"></button></div>
                                        <div class="memName">패스워드<button class="memdel"></button></div>
                                        <div class="memName">휴대전화번호<button class="memdel"></button></div>
                                        <div class="memName">주민등록번호<button class="memdel"></button></div>
                                    </div>
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
                    <div class="Prog_2 prog80"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(3)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>4</span> / 5</dl>
                </div>
                <button on:click={() => stateChange(5)} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>