<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import jQuery from 'jquery';

    jQuery(function(){
        //----- 결제수단 변경 OPEN / CLOSE
        jQuery('#method_pop').on('click', function() {
            jQuery('[data-popup="method_pop"]').fadeIn(0);
            jQuery('body').css('overflow','hidden');
        });
        jQuery('.method_pop_close').on('click', function() {
            jQuery('[data-popup="method_pop"]').fadeOut(0);
            jQuery('body').css('overflow','unset');
        });

        //----- 결제 OPEN / CLOSE
        jQuery('#subscribe_pop').on('click', function() {
            jQuery('[data-popup="subscribe_pop"]').fadeIn(0);
            jQuery('body').css('overflow','hidden');
        });
        jQuery('.subscribe_pop_close').on('click', function() {
            jQuery('[data-popup="subscribe_pop"]').fadeOut(0);
            jQuery('body').css('overflow','unset');
        });

        jQuery('#unsubscribe_pop').on('click', function() {
            jQuery('[data-popup="unsubscribe_pop"]').fadeIn(0);
            jQuery('body').css('overflow','hidden');
        });
        jQuery('.unsubscribe_pop_close').on('click', function() {
            jQuery('[data-popup="unsubscribe_pop"]').fadeOut(0);
            jQuery('body').css('overflow','unset');
        });

        //----- 월 평균 개인정보 OPEN / CLOSE
        jQuery('.open_current_pop').on('click', function() {
            jQuery('.month_current_pop').fadeIn(0);
            jQuery('body').css('overflow','hidden');
        });
        jQuery('.current_pop_close').on('click', function() {
            jQuery('.month_current_pop').fadeOut(0);
            jQuery('body').css('overflow','unset');
        });

        jQuery(".tippop").each(function(i){

            var thisId = jQuery(this).attr("id");
            var idNum = thisId.substring(thisId.length-2);

            jQuery('#tip_btn' + idNum).on('click', function(){
                var display = jQuery('#tip_box' + idNum).css('display');
                if(display == 'none'){
                    jQuery('#tip_box' + idNum).addClass('dp_b');
                };
                jQuery('.dim').css('display','block');
                jQuery('.koko_popup').fadeOut(0);
            });

            jQuery('#tip_close' + idNum).on('click', function(){
                jQuery('#tip_box' + idNum).removeClass('dp_b');
                jQuery('.dim').css('display','none');
                jQuery('body').css('overflow','unset');
            });
        });
    });
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>구독관리</h1>
        </div>
        <div class="seaContentBox marB50">
            <div class="seaContentLine borB">
                <div class="seaCont wid50per">
                    <dl>이용중인 상품</dl>
                    <div class="myInfoBox">
                        <div class="top_stand01">Standard1</div>
                        <!--
                        <div class="top_stand02">Standard2</div>
                        <div class="top_stand03">Standard3</div>
                        -->
                    </div>
                </div>
                <div class="seaCont wid50per">
                    <dl>결제일</dl>
                    <div class="myInfoBox">
                        <span>1일~말일 요금, 익월 5일 결제</span>
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB">
                <div class="seaCont wid50per">
                    <dl>결제수단</dl>
                    <div class="myInfoBox">
                        <span>BC카드</span>
                        <button class="myinfoChangeBtn" id="method_pop">변경</button>
                    </div>
                </div>
                <div class="seaCont wid50per">
                    <dl>이번 달 이용요금</dl>
                    <div class="myInfoBox">
                        <span><dd>4,656원</dd></span>
                        <button class="myinfoChangeBtn" id="subscribe_pop">결제</button>
                        <button class="myinfoChangeBtn marL8impor" id="unsubscribe_pop">구독해지</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 테이블 영역 -->
        <div class="kotable subscription">
            <table>
                <caption>1:1문의 리스트</caption>
                <colgroup>
                    <col style="width:16.44%;">
                    <col style="width:24.66%;">
                    <col style="width:13.70%;">
                    <col style="width:13.70%;">
                    <col style="width:12.33%;">
                    <col style="width:9.59%;">
                    <col style="width:9.59%;">
                </colgroup>
                <thead>
                <tr>
                    <th>요금부과 기간</th>
                    <th>이용상품</th>
                    <th>개인정보 현황</th>
                    <th>결제 일시</th>
                    <th>결제 금액</th>
                    <th>결제상태</th>
                    <th>결제방법</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_03">Standard3</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_02">Standard2</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th class="failtext">결제실패</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_01">Standard1</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_03">Standard3</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_02">Standard2</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th class="failtext">결제실패</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_01">Standard1</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_03">Standard3</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_02">Standard2</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th class="failtext">결제실패</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_01">Standard1</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                <tr>
                    <th>2022.02.01 - 02.28</th>
                    <th><div class="stand stand_03">Standard3</div></th>
                    <th><div class="cur_priNum open_current_pop">9,111</div></th>
                    <th>2022-11-23 09:49</th>
                    <th>13,000원</th>
                    <th>결제완료</th>
                    <th>자동결제</th>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- 페이징 영역 -->
        <div class="paginationBox marT24">
            <ul class="pagination">
                <li class="page-item page-pre disabled"><a class="page-link" aria-label="previous page" href="javascript:void(0)"></a></li>
                <li class="page-item active"><a class="page-link" aria-label="to page 1" href="javascript:void(0)">1</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 2" href="javascript:void(0)">2</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 3" href="javascript:void(0)">3</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 4" href="javascript:void(0)">4</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 5" href="javascript:void(0)">5</a></li>
                <li class="page-item page-last-separator disabled"><a class="page-link" aria-label="" href="javascript:void(0)">...</a></li>
                <li class="page-item"><a class="page-link" aria-label="to page 93" href="javascript:void(0)">93</a></li>
                <li class="page-item page-next"><a class="page-link" aria-label="next page" href="javascript:void(0)"></a></li>
            </ul>
        </div>
    </div>
</section>



<!-- [D] 결제수단 변경 팝업 -->
<div class="koko_popup method_pop" data-popup="method_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">결제수단 변경</h3>
            </div>
            <form>
                <div class="kopopMuntiinputBox marB24">
                    <label>카드번호</label>
                    <div class="kopopMuntiinputInner">
                        <div class="kopopMuntiinputType2">
                            <input type="text" name="" id="" class="" placeholder="" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" name="" id="" class="" placeholder="" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" name="" id="" class="" placeholder="" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" name="" id="" class="" placeholder="" maxlength="4">
                        </div>
                    </div>
                </div>
                <div class="kopopMuntiinputBox marB24">
                    <label>유효기간</label>
                    <div class="kopopMuntiinputInner">
                        <div class="kopopMuntiinputType2">
                            <input type="text" name="" id="" class="" placeholder="MM" maxlength="2">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" name="" id="" class="" placeholder="YY" maxlength="2">
                        </div>
                    </div>
                </div>
                <!-- 셀렉트 박스 선택
                <div class="kopopMuntiselectBox marB24">
                    <label>유효기간</label>
                    <div class="kopopMuntiselectInner">
                        <div class="mu_SelBox">
                            <div class="selectBox wid100per">
                                <div class="label" id="">연도선택</div>
                                <ul class="optionList">
                                    <li class="optionItem curv">2014년</li>
                                    <li class="optionItem curv">2015년</li>
                                    <li class="optionItem curv">2016년</li>
                                    <li class="optionItem curv">2017년</li>
                                    <li class="optionItem curv">2018년</li>
                                    <li class="optionItem curv">2019년</li>
                                    <li class="optionItem curv">2020년</li>
                                    <li class="optionItem curv">2021년</li>
                                    <li class="optionItem curv">2022년</li>
                                    <li class="optionItem curv">2023년</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mu_SelBox">
                            <div class="selectBox wid100per">
                                <div class="label" id="">월 선택</div>
                                <ul class="optionList">
                                    <li class="optionItem curv">1월</li>
                                    <li class="optionItem curv">2월</li>
                                    <li class="optionItem curv">3월</li>
                                    <li class="optionItem curv">4월</li>
                                    <li class="optionItem curv">5월</li>
                                    <li class="optionItem curv">6월</li>
                                    <li class="optionItem curv">7월</li>
                                    <li class="optionItem curv">8월</li>
                                    <li class="optionItem curv">9월</li>
                                    <li class="optionItem curv">10월</li>
                                    <li class="optionItem curv">11월</li>
                                    <li class="optionItem curv">12월</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <div class="kopopinput marB24">
                    <label>사업자번호 또는 생년월일</label>
                    <input type="text" name="" id="" class="" placeholder="" />
                </div>
                <div class="kopopinput marB24">
                    <label>카드 비밀번호 앞 두자리</label>
                    <input type="password" name="" id="" class="" placeholder="" maxlength="2" />
                </div>
                <div class="otpqrNumInfo">
                    <p>
                        당월 1일~5일 기간 동안 결제정보 변경 시, <br>지난 달 이용요금은 이전 결제정보로 결제가 진행됩니다.
                    </p>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel method_pop_close">취소</div>
                    <div class="koko_go"><button type="submit">저장</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close method_pop_close" data-popup-close="method_pop_close"></div>
    </div>
</div>

<!-- [D] 결제 팝업 -->
<div class="koko_popup subscribe_pop" data-popup="subscribe_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title marB40">
                <h3 class="">이번 달 이용요금</h3>
            </div>
            <div class="seaContentBox marB24">
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이용상품</dl>
                        <div class="myInfoBox">
                            <div class="stand stand_01">Standard1</div>
                            <div class="stand stand_02">Standard2</div>
                            <div class="stand stand_03">Standard3</div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이용기간</dl>
                        <div class="myInfoBox">
                            <span>2023-02-01 ~ 2023-02-19</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>요금산정</dl>
                        <div class="myInfoBox">
                            <span>개인정보 28건*10원 + 트래픽 비용 1,823원</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>미결제 요금</dl>
                        <div class="myInfoBox">
                            <span><dd>4,620원</dd> (원단위 절삭)</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>결제수단</dl>
                        <div class="myInfoBox">
                            <span>BC카드</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="koko_checkDoubleBox">
                <div class="koko_check">
                    <input type="checkbox" value="1" name="selcheck02" id="selcheck02">
                    <label for="selcheck02">
                        <em></em>
                        <p class="check">미결제 요금을 확인하였고, 등록된 카드로 결제를 진행하는데 동의합니다.</p>
                    </label>
                </div>
            </div>
            <div class="payBtnBox">
                <div class="koko_pay"><button class="tippop" id="tip_btn01">결제</button></div><!-- 결제 성공 -->
                <div class="koko_pay"><button class="tippop" id="tip_btn02">결제</button></div><!-- 결제 실패 -->
            </div>
        </div>
        <div class="koko-popup-close subscribe_pop_close" data-popup-close="subscribe_pop_close"></div>
    </div>
</div>
<!-- // [D] 결제 팝업 -->


<!-- [D] 구독 해지 팝업 -->
<div class="koko_popup unsubscribe_pop" data-popup="unsubscribe_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">구독해지</h3>
                <div class="koSubInfo">
                    <dl>
                        해지 전에 주의사항을 꼭 확인하세요.
                    </dl>
                </div>
            </div>
            <div class="popcaseInfoBox marB40">
                <p>주의사항</p>
                <dl>자동결제 해지 시 사용중인 kokonut 서비스 이용계약도 해지됩니다.</dl>
                <dl>해지일 기준 7일 후 kokonut 서비스에 저장된 회원정보 및 모든 데이터 또는 일괄 삭제되며, 복원할 수 없습니다.</dl>
                <dl>회원정보 별도 저장을 원할 경우, <dd>kokonut 관리자 → 회원정보 DB 관리 페이지</dd>에서 DB 데이터 전체 다운로드 요청 후 해지를 진행해 주세요.</dl>
            </div>
            <div class="koko_checkDoubleBox">
                <div class="koko_check">
                    <input type="checkbox" value="1" name="selcheck" id="selcheck">
                    <label for="selcheck">
                        <em></em>
                        <p class="check">주의사항을 모두 확인하였으며, 해지 후 모든 데이터가 삭제되는 것에 동의합니다.</p>
                    </label>
                </div>
            </div>
            <div class="payBtnBox">
                <div class="koko_pay"><button class="tippop" id="tip_btn03">해지</button></div><!-- 구독해지 성공 -->
                <div class="koko_pay"><button class="tippop" id="tip_btn04">해지</button></div><!-- 구독해지 실패 -->
            </div>
        </div>
        <div class="koko-popup-close unsubscribe_pop_close" data-popup-close="unsubscribe_pop_close"></div>
    </div>
</div>
<!-- // [D] 구독 해지 팝업 -->



<!-- [D] 월 평균 개인정보 팝업 -->
<div class="koko_popup month_current_pop" data-popup="month_current_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">월 평균 개인정보 현황</h3>
            </div>
            <div class="calframe marT40">
                <div class="calframeTop">
                    <div class="clafprev"></div>
                    <div class="claf_num"><span>2023</span>년 <span>3</span>월</div>
                    <div class="clafnext dont"></div>
                </div>
                <table>
                    <caption>월 평균 개인정보 현황 캘린더</caption>
                    <colgroup>
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1<span>31</span></td>
                        <td>2<span>30</span></td>
                        <td>3<span>29</span></td>
                        <td>4<span>28</span></td>
                    </tr>
                    <tr>
                        <td>5<span>27</span></td>
                        <td>6<span>26</span></td>
                        <td>7<span>25</span></td>
                        <td>8<span>24</span></td>
                        <td>9<span>23</span></td>
                        <td>10<span>21</span></td>
                        <td>11<span>20</span></td>
                    </tr>
                    <tr>
                        <td>12<span>24</span></td>
                        <td>13<span>19</span></td>
                        <td>14<span>18</span></td>
                        <td>15<span>17</span></td>
                        <td>16<span>16</span></td>
                        <td>17<span>15</span></td>
                        <td>18<span>14</span></td>
                    </tr>
                    <tr>
                        <td>19<span>13</span></td>
                        <td>20<span>12</span></td>
                        <td>21<span>11</span></td>
                        <td>22<span>10</span></td>
                        <td>23<span>9</span></td>
                        <td>24<span>8</span></td>
                        <td>25<span>7</span></td>
                    </tr>
                    <tr>
                        <td>26<span>6</span></td>
                        <td>27<span>5</span></td>
                        <td>28<span>4</span></td>
                        <td>29<span>3</span></td>
                        <td>30<span>2</span></td>
                        <td>31<span>1</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="koko-popup-close current_pop_close" data-popup-close="current_pop_close"></div>
    </div>
</div>

<!-- [D] 미니 팝업 : 결제 성공 팝업 -->
<div class="layerPopType" id="tip_box01">
    <header class="popHeader">
        <img src="/assets/images/common/minipop_pass.png" alt="">
        <h4 class="popTit">결제가 완료되었습니다.</h4>
    </header>
    <section class="popContents">
        <p>
            이후 추가 결제 유도하는 안내 멘트가<br>
            들어가면 좋겠습니다.
        </p>
    </section>
    <div class="popcBtnBox">
        <button type="button" id="tip_close01" class="layerBtn">확인</button>
    </div>
</div>
<!-- // [D] 미니 팝업 : 결제 성공 팝업 -->

<!-- [D] 미니 팝업 : 결제 실패 팝업 -->
<div class="layerPopType" id="tip_box02">
    <header class="popHeader">
        <img src="/assets/images/common/minipop_warring.png" alt="">
        <h4 class="popTit">결제 실패 안내</h4>
    </header>
    <section class="popContents">
        <p>
            카드 정보 인증에 실패했습니다.<br>
            잠시 후 다시 시도해 주세요.
        </p>
    </section>
    <div class="popcBtnBox">
        <button type="button" id="tip_close02" class="layerBtn">확인</button>
    </div>
</div>
<!-- // [D] 미니 팝업 : 결제 실패 팝업 -->

<!-- [D] 미니 팝업 : 해지 완료 팝업 -->
<div class="layerPopType" id="tip_box03">
    <header class="popHeader">
        <img src="/assets/images/common/minipop_pass.png" alt="">
        <h4 class="popTit">해지가 완료되었습니다.</h4>
    </header>
    <section class="popContents">
        <p>
            이후 추가 결제 유도하는 안내 멘트가<br>
            들어가면 좋겠습니다.
        </p>
    </section>
    <div class="popcBtnBox">
        <button type="button" id="tip_close03" class="layerBtn">확인</button>
    </div>
</div>
<!-- // [D] 미니 팝업 : 해지 완료 팝업 -->

<!-- [D] 미니 팝업 : 해지 실패 팝업 -->
<div class="layerPopType" id="tip_box04">
    <header class="popHeader">
        <img src="/assets/images/common/minipop_stop.png" alt="">
        <h4 class="popTit">이번 달 요금을 결제해 주세요</h4>
    </header>
    <section class="popContents">
        <p>
            결제 후에 구독해지를 진행할 수 있습니다.
        </p>
    </section>
    <div class="popcBtnBox">
        <button type="button" id="tip_close04" class="layerBtn">확인</button>
    </div>
</div>
<div class="dim"></div>
<!-- // [D] 미니 팝업 : 해지 실패 팝업 -->
