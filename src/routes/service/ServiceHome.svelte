<!--<svelte:head>-->
<!--	<title>코코넛</title>-->
<!--	<meta name="description" content="코코넛 서비스 인덱스" />-->
<!--</svelte:head>-->

<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
	import { link } from 'svelte-spa-router'
    import {onMount} from "svelte";

    onMount(async () => {

    })

    var dragSrcEl = null;

    function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
    }
    function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
    }

    function handleDragEnter(e) {
    // this / e.target is the current hover target.
    }

    function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl !== this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        //alert(this.outerHTML);
        //dragSrcEl.innerHTML = this.innerHTML;
        //this.innerHTML = e.dataTransfer.getData('text/html');
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin',dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);
        
    }
    this.classList.remove('over');
    return false;
    }

    function handleDragEnd(e) {
    // this/e.target is the source node.
    this.classList.remove('over');

    /*[].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });*/
    }

    function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

    }

    const cols = document.querySelectorAll('#columns .column');
    [].forEach.call(cols, addDnDHandlers);

    const swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {   // 버튼
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="maincontent">
            <div class="pageH1_type01">
                <h1><span>코코넛</span>님, 안녕하세요!</h1>
            </div>

            <div class="currentWrap">
                <div class="curTitmeInfoBox">
                    <span>23. 03. 31</span>
                    <dl>오후 5시 30분</dl>
                </div>
                <div class="currentSlideBox">
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="cursItem">금일 파기된(될) 개인정보 <span class="curCou">32</span><dt>건</dt></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cursItem">오늘의 개인정보 다운로드 <span class="curCou">32</span><dt>건</dt>, <span class="curCou">50</span><dt>회</dt>, <span class="curCou">김코코</span></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cursItem">개인정보 제공건수 : 외부 <span class="curCou">32</span><dt>건</dt>, 내부 <span class="curCou">50</span><dt>건</dt></div>
                            </div>
                        </div>
                        <div class="curs_btnBox">
                            <div class="curs_btnInner">
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="curUpdateBox">
                    <button>새로고침</button>
                    <dl>30분 간격 자동 업데이트</dl>
                </div>
            </div>

            <div class="main_status_board">
                <div class="today_gr_Inner">
                    <h2 class="board_title">오늘의 서비스 현황</h2>
                    <div class="tg_categoryBox">
                        <div class="tg_category"><span style="background: #00C389"></span>API 호출 수</div>
                        <div class="tg_category"><span style="background: #4070E0"></span>트래픽 사용량</div>
                        <div class="tg_category"><span style="background: #FF6752"></span>암복호화 수</div>
                    </div>
                    <div class="today_gr_box">
                        <img src="/assets/images/main/today_gr.png" alt="" style="max-width:100%;">
                    </div>
                </div>
            </div>


            <div class="wjListBox">
                <div class="wjList">
                    <!-- [D] 위젯 캘린더 -->
                    <div class="wjItem">
                        <div class="wjcalBox">
                            <div class="wjcMonth">03</div>
                            <div class="wjcal">
                                <table>
                                    <caption>위젯 캘린더</caption>
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
                                        <td class="point"><span>1</span></td>
                                        <td class="point"><span>2</span></td>
                                        <td class="point"><span>3</span></td>
                                        <td><span>4</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>5</span></td>
                                        <td><span>6</span></td>
                                        <td class="point"><span>7</span></td>
                                        <td><span>8</span></td>
                                        <td><span>9</span></td>
                                        <td class="point"><span>10</span></td>
                                        <td><span>11</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>12</span></td>
                                        <td><span>13</span></td>
                                        <td><span>14</span></td>
                                        <td class="point"><span class="onSuc">15</span></td>
                                        <td><span>16</span></td>
                                        <td><span>17</span></td>
                                        <td><span>18</span></td>
                                    </tr>
                                    <tr>
                                        <td class="point"><span>19</span></td>
                                        <td><span>20</span></td>
                                        <td><span>21</span></td>
                                        <td><span>22</span></td>
                                        <td><span>23</span></td>
                                        <td><span>24</span></td>
                                        <td><span>25</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>26</span></td>
                                        <td><span>27</span></td>
                                        <td><span>28</span></td>
                                        <td><span>29</span></td>
                                        <td><span>30</span></td>
                                        <td><span>31</span></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="wjcTextBox">
                                <div class="wjcText">접속 기록 점검일</div>
                                <div class="wjcText">이용내역 통지메일 발송일</div>
                            </div>
                        </div>
                    </div>
                    <!-- // [D] 위젯 캘린더 -->

                    <!-- [D] 위젯 개인정보 제공 건 -->
                    <div class="wjItem">
                        <div class="wj_contentBox wjpcount">
                            <div class="wjtitle">
                                <a href="/kokonut/member/privacy/privacy-list.html">개인정보 제공 건<span></span></a>
                                <span class="tiptool" id="tool_btn01">
										<!-- [D] tooltip : 개인정보 제공 건 -->
										<div class="layerToolType wjtool_01" id="tool_box01">
											<div class="tipContents">
												<p>
													제공기간 내에 있는 건수
												</p>
											</div>
										</div>
                                    <!-- // [D] 개인정보 제공 건 -->
									</span>
                            </div>
                            <div class="wjcountBox marT20">
                                <div class="wjcount">
                                    <span>받은 건수</span>
                                    <dl>91</dl>
                                </div>
                                <div class="wjcount">
                                    <span>내부 제공</span>
                                    <dl>10</dl>
                                </div>
                                <div class="wjcount">
                                    <span>외부 제공</span>
                                    <dl>34</dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 개인정보 제공 건 -->

                    <!-- [D] 위젯 나의 접속 현황 -->
                    <div class="wjItem">
                        <div class="wj_contentBox">
                            <div class="wjtitle">
                                <dt>나의 접속 현황</dt>
                            </div>
                            <div class="wjcurrentBox marT24">
                                <div class="wjcurBox">
                                    <div class="wjcurTime">
                                        <p>23. 12. 22</p>
                                        <dl>3:36 <span>PM</span></dl>
                                    </div>
                                    <div class="wjcur_loBox login">
                                        <span>로그인</span>
                                        <dl>192.168.0.1</dl>
                                    </div>
                                </div>
                                <div class="wjcurBox">
                                    <div class="wjcurTime">
                                        <p>23. 01. 16</p>
                                        <dl>2:36 <span>PM</span></dl>
                                    </div>
                                    <div class="wjcur_loBox login">
                                        <span>로그인</span>
                                        <dl>192.168.0.1</dl>
                                    </div>
                                </div>
                                <div class="wjcurBox">
                                    <div class="wjcurTime">
                                        <dl>9:10 <span>AM</span></dl>
                                    </div>
                                    <div class="wjcur_loBox loginFail">
                                        <span>로그인 실패</span>
                                        <dl>192.168.0.1</dl>
                                    </div>
                                </div>
                                <div class="wjcurBox">
                                    <div class="wjcurTime">
                                        <p>23. 01. 15</p>
                                        <dl>5:13 <span>PM</span></dl>
                                    </div>
                                    <div class="wjcur_loBox login">
                                        <span>로그인</span>
                                        <dl>192.168.0.1</dl>
                                    </div>
                                </div>
                                <div class="wjcurBox">
                                    <div class="wjcurTime">
                                        <dl>12:20 <span>PM</span></dl>
                                    </div>
                                    <div class="wjcur_loBox login">
                                        <span>로그인</span>
                                        <dl>192.168.0.1</dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 나의 접속 현황 -->
                </div>
                <div class="wjList">
                    <!-- [D] 위젯 개인정보 현황 -->
                    <div class="wjItem">
                        <div class="wj_contentBox">
                            <div class="wjtitle">
                                <a href="/kokonut/member/privacy/search-list.html">개인정보 현황<span></span></a>
                            </div>
                            <div class="wjgrBox marT24">
                                <div class="wjgr"></div>
                                <div class="wjgr_tabe">
                                    <div class="grtabe grt_01">활성<span>(2920)</span></div>
                                    <div class="grtabe grt_02">신규 가입<span>(280)</span></div>
                                    <div class="grtabe grt_03">휴면 전환<span>(486)</span></div>
                                    <div class="grtabe grt_04">탈퇴<span>(4)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 개인정보 현황 -->

                    <!-- [D] 위젯 구독관리 -->
                    <div class="wjItem">
                        <div class="wjItem">
                            <div class="wj_contentBox">
                                <div class="wjtitle wjsel">
                                    <a href="/kokonut/member/setting/management.html">구독관리<span></span></a>
                                    <div class="">
                                        <div class="sc_SelBox">
                                            <div class="selectBox">
                                                <div class="label" id="">이번달</div>
                                                <ul class="optionList">
                                                    <li class="optionItem">이번달</li>
                                                    <li class="optionItem">지난달</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="wjsubcTitle marT20 marB12">
                                    <span>실시간 사용량</span>
                                    <dl>23. 04. 01 ~ 23. 04. 15</dl>
                                </div>
                                <div class="wjsubcBox">
                                    <div class="wjsubc">
                                        <p>평균 개인정보 수</p>
                                        <div class="wjsubcLine subc_01" style="width:60%"></div>
                                        <dl><span>23,982</span>명</dl>
                                    </div>
                                    <div class="wjsubc">
                                        <p>사용 데이터</p>
                                        <div class="wjsubcLine subc_02" style="width:80%"></div>
                                        <dl><span>11.43</span>GB</dl>
                                    </div>
                                    <div class="wjsubc">
                                        <p>이메일 발송량</p>
                                        <div class="wjsubcLine subc_03" style="width:40%"></div>
                                        <dl><span>22</span>건</dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 구독관리 -->

                    <!-- [D] 위젯 개인정보 항목 -->
                    <div class="wjItem">
                        <div class="wj_contentBox">
                            <div class="wjtitle">
                                <a href="/kokonut/member/setting/personal-information-management.html">개인정보 항목<span></span></a>
                            </div>
                            <div class="wj_total marT20">총 개인정보 항목<span>10</span></div>
                            <div class="wjcountBox marT12">
                                <div class="wjcount">
                                    <span>암호화 된 항목</span>
                                    <dl>7</dl>
                                </div>
                                <div class="wjcount">
                                    <span>민감정보 항목</span>
                                    <dl>3</dl>
                                </div>
                                <div class="wjcount">
                                    <span>고유식별 정보</span>
                                    <dl>1</dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 개인정보 항목 -->
                </div>
                <div class="wjList">
                    <!-- [D] 위젯 관리자 접속 현황 -->
                    <div class="wjItem">
                        <div class="wj_contentBox">
                            <div class="wjtitle">
                                <a href="">관리자 접속 현황<span></span></a>
                                <div class="wj_adminCurBox">
                                    오늘<img src="/assets/images/main/wj_admin_icon.png" alt=""><span>14</span>
                                </div>
                            </div>
                            <div class="wj_adminContentBox marT24">
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle toppest_admin">김</div>
                                        <div class="wjdot_on"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>최고관리자</span>
                                        <dl>김코코</dl>
                                    </div>
                                    <div class="wjaTime">46분</div>
                                </div>
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle top_admin">최</div>
                                        <div class="wjdot_on"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>최고관리자</span>
                                        <dl>최코코</dl>
                                    </div>
                                    <div class="wjaTime">2시간 17분</div>
                                </div>
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle guest">박</div>
                                        <div class="wjdot_off"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>게스트</span>
                                        <dl>박코코</dl>
                                    </div>
                                    <div class="wjaTime">3분</div>
                                </div>
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle admin">이</div>
                                        <div class="wjdot_off"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>관리자</span>
                                        <dl>이코코</dl>
                                    </div>
                                    <div class="wjaTime">1시간 3분</div>
                                </div>
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle top_admin">최</div>
                                        <div class="wjdot_on"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>최고관리자</span>
                                        <dl>최코코</dl>
                                    </div>
                                    <div class="wjaTime">2시간 17분</div>
                                </div>
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle guest">박</div>
                                        <div class="wjdot_off"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>게스트</span>
                                        <dl>박코코</dl>
                                    </div>
                                    <div class="wjaTime">3분</div>
                                </div>
                                <div class="wj_admin">
                                    <div class="wjCircleBox">
                                        <div class="wjCircle admin">이</div>
                                        <div class="wjdot_off"></div>
                                    </div>
                                    <div class="wjaText">
                                        <span>관리자</span>
                                        <dl>이코코</dl>
                                    </div>
                                    <div class="wjaTime">1시간 3분</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 관리자 접속 현황 -->

                    <!-- [D] 위젯 이메일 발송 -->
                    <div class="wjItem">
                        <div class="wjItem">
                            <div class="wj_contentBox">
                                <div class="wjtitle wjsel">
                                    <a href="/kokonut/member/email/history.html">이메일 발송<span></span></a>
                                    <div class="">
                                        <div class="sc_SelBox">
                                            <div class="selectBox">
                                                <div class="label" id="">오늘</div>
                                                <ul class="optionList">
                                                    <li class="optionItem">오늘</li>
                                                    <li class="optionItem">이번주</li>
                                                    <li class="optionItem">이번달</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="wjcountBox marT20">
                                    <div class="wjcount">
                                        <span>발송 완료</span>
                                        <dl>177</dl>
                                    </div>
                                    <div class="wjcount">
                                        <span>예약 건수</span>
                                        <dl>27</dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 이메일 발송 -->

                    <!-- [D] 위젯 서드파티 연동 -->
                    <div class="wjItem">
                        <div class="wj_contentBox">
                            <div class="wjtitle">
                                <a href="/kokonut/member/setting/third-party.html">서드파티 연동<span></span></a>
                            </div>
                            <div class="wjthirdBox marT24">
                                <div class="wjthird">
                                    <div class="wjthirdIcon"><img src="/assets/images/common/kakao_icon.png" alt="">카카오톡</div>
                                    <div class="on_third">연동중</div>
                                </div>
                                <div class="wjthird">
                                    <div class="wjthirdIcon"><img src="/assets/images/common/slack_icon.png" alt="">슬랙</div>
                                    <div class="on_third">연동중</div>
                                </div>
                                <div class="wjthird">
                                    <div class="wjthirdIcon"><img src="/assets/images/common/google_forms_icon.png" alt="">Google Forms</div>
                                    <div class="off_third">연동중지</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [D] // 위젯 서드파티 연동 -->

                </div>
            </div>

            <div class="wiLineBox">
                <div class="wibtn" id="wiset"><img src="/assets/images/main/wi_seticon.png" alt="" >위젯 편집</div>
            </div>

        </div>
    </div>
</section>

