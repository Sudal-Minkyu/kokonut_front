<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {onMount} from "svelte";
    import {Bootpay} from "@bootpay/client-js";
    import {knNameHeader} from "../../lib/store.js";

    onMount(() => {
        applyBasicEvents();
    });

    const applyBasicEvents = () => {
        // 미니 팝업 스크립트
        document.querySelectorAll(".tippop").forEach(function(el, i) {
            const thisId = el.getAttribute("id");
            const idNum = thisId.slice(-2);

            document.querySelector('#tip_btn' + idNum).addEventListener('click', function() {
                const display = window.getComputedStyle(document.querySelector('#tip_box' + idNum)).display;
                if (display === 'none') {
                    document.querySelector('#tip_box' + idNum).classList.add('dp_b');
                }
                document.querySelector('.dim').style.display = 'block';
                document.querySelector('.koko_popup').style.display = 'none';
            });

            document.querySelector('#tip_close' + idNum).addEventListener('click', function() {
                document.querySelector('#tip_box' + idNum).classList.remove('dp_b');
                document.querySelector('.dim').style.display = 'none';
                document.body.style.overflow = 'unset';
            });
        });


        //----- 결제수단 변경 OPEN / CLOSE
        document.querySelector('#method_pop').addEventListener('click', function() {
            document.querySelector('[data-popup="method_pop"]').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.method_pop_close').addEventListener('click', function() {
            document.querySelector('[data-popup="method_pop"]').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        //----- 결제 OPEN / CLOSE
        document.querySelector('#subscribe_pop').addEventListener('click', function() {
            document.querySelector('[data-popup="subscribe_pop"]').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.subscribe_pop_close').addEventListener('click', function() {
            document.querySelector('[data-popup="subscribe_pop"]').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        //----- 구독 해지 OPEN / CLOSE
        document.querySelector('#unsubscribe_pop').addEventListener('click', function() {
            document.querySelector('[data-popup="unsubscribe_pop"]').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.unsubscribe_pop_close').addEventListener('click', function() {
            document.querySelector('[data-popup="unsubscribe_pop"]').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        //----- 월 평균 개인정보 OPEN / CLOSE
        document.querySelector('.open_current_pop').addEventListener('click', function() {
            document.querySelector('.month_current_pop').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.current_pop_close').addEventListener('click', function() {
            document.querySelector('.month_current_pop').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        /* 커스텀 select 박스 스크립트 */
        document.querySelectorAll('.label').forEach(function(label) {
            label.addEventListener('click', function() {
                const optionList = label.nextElementSibling;
                const optionItems = optionList.querySelectorAll('.optionItem');
                const isActive = label.parentNode.classList.contains('active');

                label.parentNode.classList.toggle('active', !isActive);

                optionItems.forEach((optionItem) => {
                    optionItem[isActive ? 'removeEventListener' : 'addEventListener']('click', () => {
                        label.innerHTML = optionItem.textContent;
                        label.parentNode.classList.remove('active');
                    });
                });
            });
        });


        /* 커스텀 select 박스 외부 영역 클릭 시 사라지는 스크립트 */
        document.addEventListener('click', function(event) {
            const container = document.querySelector(".selectBox");
            if (container && !container.contains(event.target)) {
                container.classList.remove('active');
            }
        });

        /* 팝업 검은색 배경 영역 클릭 시 사라지는 스크립트 */
        document.addEventListener('mouseup', function(event) {
            const LayerPopup = document.querySelector(".koko_popup");
            if (LayerPopup && !LayerPopup.contains(event.target)) {
                LayerPopup.style.display = 'none';
                document.body.style.overflow = 'unset';
            }
        });
    }

    // 부트페이 정기결제 카드등록
    window.bootpayBilling = () => {
        console.log('테스트', $knNameHeader);
        Bootpay.requestSubscription({
            application_id: import.meta.env.VITE_BOOT_PAY_SECRET,
            pg: '나이스페이',
            // price: 1000,
            // tax_free: 0,
            order_name: '코코넛 정기결제 등록',
            subscription_id: (new Date()).getTime(),
            user: {
                username: $knNameHeader,
                phone: '01000000000',
                email: 'email@gmail.com'
            },
            extra: {
                subscription_comment: '매월 사용료에 따라 결제됩니다.\n 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
                subscribe_test_payment: true
            }
        }).then(
            function (response) {
                console.log(response)
                if (response.event === 'done') {
                    console.log("빌링키 : "+response.data.receipt_id);
                    alert('빌링키 발급이 완료되었습니다.');
                }
            },
            function (error) {
                console.log(error.message)
            }
        )
    }
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
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_03">Standard3</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_02">Standard2</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td class="failtext">결제실패</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_01">Standard1</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_03">Standard3</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_02">Standard2</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td class="failtext">결제실패</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_01">Standard1</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_03">Standard3</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_02">Standard2</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td class="failtext">결제실패</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_01">Standard1</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_03">Standard3</div></td>
                    <td><div class="cur_priNum open_current_pop">9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
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
                            <input type="text" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                    </div>
                </div>
                <div class="kopopMuntiinputBox marB24">
                    <label>유효기간</label>
                    <div class="kopopMuntiinputInner">
                        <div class="kopopMuntiinputType2">
                            <input type="text" placeholder="MM" maxlength="2">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" placeholder="YY" maxlength="2">
                        </div>
                    </div>
                </div>
                <div class="kopopinput marB24">
                    <label>사업자번호 또는 생년월일</label>
                    <input type="text">
                </div>
                <div class="kopopinput marB24">
                    <label>카드 비밀번호 앞 두자리</label>
                    <input type="password" maxlength="2">
                </div>
                <div class="otpqrNumInfo">
                    <p>
                        당월 1일~5일 기간 동안 결제정보 변경 시, 지난 달 이용요금은 이전 결제정보로 결제가 진행됩니다.
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
<!-- // [D] 결제수단 변경 팝업 -->

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
                <div class="koko_cancel subscribe_pop_close">취소</div>
                <div class="koko_go"><button class="tippop" id="tip_btn01">결제</button></div><!-- 결제 성공 -->
                <div class="koko_go"><button class="tippop" id="tip_btn02">결제</button></div><!-- 결제 실패 -->
            </div>
        </div>
        <div class="koko-popup-close subscribe_pop_close" data-popup-close="subscribe_pop_close"></div>
    </div>
</div>


<!-- [D] 구독 해지 팝업 -->
<div class="koko_popup unsubscribe_pop" data-popup="unsubscribe_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">구독해지</h3>
                <div class="koSubInfo ks_noneicon">
                    <dl>
                        해지 전에 주의사항을 꼭 확인하세요.
                    </dl>
                </div>
            </div>
            <div class="popcaseInfoBox pi_noneicon marB32">
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
                <div class="koko_cancel unsubscribe_pop_close">취소</div>
                <div class="koko_go"><button class="tippop" id="tip_btn03">해지</button></div><!-- 구독해지 성공 -->
                <div class="koko_go"><button class="tippop" id="tip_btn04">해지</button></div><!-- 구독해지 실패 -->
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
<!-- // [D] 월 평균 개인정보 팝업 -->



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
<!-- // [D] 미니 팝업 : 해지 실패 팝업 -->


<div class="dim"></div>