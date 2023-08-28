<script>

    import jQuery from 'jquery';

    // 제공 관리
    jQuery(window).scroll(function() {
        var j$window = jQuery(window),
            j$koko_s = jQuery('.ko_test .koko_change'),
            j$add_panel = jQuery('.ko_test .add');

        var scroll = j$window.scrollTop() + (j$window.height() / 0.8);

        j$add_panel.each(function () {
            var j$this = jQuery(this);
            if (j$this.position().top <= scroll && j$this.position().top + j$this.height() > scroll) {
                j$koko_s.removeClass(function (index, css) {
                    return (css.match (/(^|\s)secen-\S+/g) || []).join(' ');
                });
                j$koko_s.addClass('secen-' + jQuery(this).data('add'));
                j$koko_s.addClass('stop');
            }
        });
    }).scroll();

</script>

<!-- 관리적 보호조치 -->
<div id="managerial" class="titleUp showArea-undefined">
    <div class="sstic">
        <div class="ssticInner">
            <div class="s_Title">
                <div class="s_TitleBox wow AFadeInUp" data-wow-delay="0.0s">
                    <p class="boldTxt"><span>관리</span> 기능</p>
                </div>
            </div>
        </div>
    </div>
    <div class="sc_cont_area">
        <!-- 수집 관리-->
        <div class="section" id="ma">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen wow TitleUp" data-wow-delay="0.1s">수집 관리</p>
                        <p class="mContTitle wow TitleUp" data-wow-delay="0.2s">모든 개인정보는 수집부터 철저하게</p>
                    </div>
                    <div class="m_ContBoxCont">
                        <div class="m_ContImgBox">
                            <figure class="ma_figure01 wow siteImgUp" data-wow-delay="0.3s"><img src="/assets/images/main/Managerial_1-1.png" alt="코코넛 | 기업 개인정보보호법 | 관리적 보호조치 | 개인정보,회원가입정보,이름,전화번호 철저 관리"></figure><!-- 모든 img 태그에 alt태그를 넣어주시고 alt태그안에 이미지 설명글을 넣어주세요. 하나의 타입을 참고용으로 작성해놓겠습니다. -->
                            <figure class="ma_figure02 wow siteImgUp" data-wow-delay="0.4s"><img src="/assets/images/main/Managerial_1-2.png" alt="코코넛 | 기업 개인정보보호법 | 관리적 보호조치 | 개인정보,회원가입정보,이름,전화번호 철저 관리"></figure>
                        </div>
                        <div class="m_ConttxtBox wow m_ConttxtBoxUp" data-wow-delay="0.5s">
                            <ul class="">
                                <li>
                                    <span class="gnum">01</span>
                                    <p class="gTxt">고객이 회원가입 시 기입한<br class="pc_only">개인정보 항목들을 자동으로 연동</p>
                                </li>
                                <li>
                                    <span class="gnum">02</span>
                                    <p class="gTxt">운영하는 서비스에 딱 맞게,<br class="pc_only">개인정보 항목 커스터마이징</p>
                                </li>
                                <li>
                                    <span class="gnum">03</span>
                                    <p class="gTxt">정해진 양식에 업로드만 한다면<br class="pc_only">일괄적으로 수기 입력 가능</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 파기 - active01 -->
        <div class="section" id="mb">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen TitleUp">파기</p>
                        <p class="mContTitle TitleUp">더 이상 필요없는 개인정보는 알아서 파기</p>
                    </div>
                    <div class="m_ContBoxCont">
                        <div class="m_ContImgBox">
                            <div class="center">
                                <ul>
                                    <li>홍길동</li>
                                    <li>010-1234-5678</li>
                                    <li>contact@kokonut.me</li>
                                    <li>서울시 강남구 역삼로 165</li>
                                </ul>
                            </div>
                        </div>
                        <div class="m_ConttxtBox wow m_ConttxtBoxUp" data-wow-delay="0.4s">
                            <ul class="" style="height: 100%;">
                                <li style="height: 100%; padding-top: 10rem;">
                                    <p class="gTxt">
                                        <span style="font-size: 2.1rem;">아래 개인정보를<br class="pc_br">자동적으로 완전히 파기합니다.</span><br><br>
                                        <span class="gnum">1.</span><span style="font-size: 1.9rem;">&nbsp; 수집 목적이 달성된 개인정보</span><br><br>
                                        <span class="gnum">2.</span><span style="font-size: 1.9rem;">&nbsp; 보유 기간이 경과된 개인정보</span><br><br>
                                        <span style="font-size: 1.3rem;">*별도 법령에 따라 보존이 필요할 시 별도 보관</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 제공 관리 - active02-->
        <div class="section" id="mc">
            <div class="ko_test" id="koko_sure">
                <div class="koko_change">
                    <div class="mInner">
                        <div class="Title">
                            <div class="m_ContTitleBox">
                                <p class="mContGreen wow TitleUp" data-wow-delay="0.2s">내부 제공</p>
                                <p class="mContTitle wow TitleUp" data-wow-delay="0.2s">절차에 맞게 업무상 내부에서 개인정보를 주고받을 수 있도록</p>
                            </div>
                        </div>
                        <div class="m_ContBoxCont">
                            <div class="m_ContImgBox wow m_ConttxtBoxUp" data-wow-delay="0.2s">
                                <figure class="mc_figure01">
                                    <img src="/assets/images/main/Managerial_3-1.png" alt="">
                                </figure>
                                <figure class="mc_figure02">
                                    <img src="/assets/images/main/Managerial_3-2.png" alt="">
                                </figure>
                                <figure class="mc_figure03">
                                    <img src="/assets/images/main/Managerial_3-3.png" alt="">
                                </figure>
                            </div>
                            <div class="m_ConttxtBox wow m_ConttxtBoxUp" style="visibility: visible;" data-wow-delay="0.4s">
                                <ul class="">
                                    <li>
                                        <span class="gnum">01</span>
                                        <p class="gTxt">제공할 항목과 필요한 팀원을 분명하게<br class="pc_br"> 지정하여 안전하게 제공</p>
                                    </li>
                                    <li>
                                        <span class="gnum">02</span>
                                        <p class="gTxt">제공 및 다운로드 이력을 남겨<br class="pc_br"> 내부 실수를 최소화</p>
                                    </li>
                                    <li>
                                        <span class="gnum">03</span>
                                        <p class="gTxt">스스로에게도 제공할 수 있는 기능을 통해 안전한 관리는 나부터</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="add" data-add="fisrt"></div>
                    <div class="add" data-add="secend"></div>
                    <div class="add" data-add="three"></div>
                </div>
            </div>
        </div>
        <!-- 관리자 관리 - active03 -->
        <div class="section" id="md">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen wow TitleUp" data-wow-delay="0.2s">관리자 관리</p>
                        <p class="mContTitle wow TitleUp" data-wow-delay="0.2s">개인정보보호의 시작은 내부 관리부터</p>
                        <p class="mContsTxt wow TitleUp" data-wow-delay="0.2s">권한 분리를 통해 권한이 있는 내부 관리자만 접근할 수 있어요.</p>
                    </div>
                    <div class="m_ContBoxCont wow m_ConttxtBoxUp" data-wow-delay="0.2s">
                        <div class="m_ContImgBox">
                            <figure class="md_figure01" style="visibility: visible;">
                                <img src="/assets/images/main/Managerial_4-1.png" alt="">
                            </figure>
                            <figure class="md_figure02 wow pop" style="visibility: visible;" data-wow-delay="0.2s">
                                <img src="/assets/images/main/Managerial_4-2.png" alt="">
                            </figure>
                        </div>
                        <div class="m_ConttxtBox wow m_ConttxtBoxUp" data-wow-delay="0.4s">
                            <ul class="">
                                <li>
                                    <span class="gnum">01</span>
                                    <p class="gTxt">관리자 등급을 3개로 나뉘어<br class="pc_br"> 등급에 맞게 권한 부여</p>
                                </li>
                                <li>
                                    <span class="gnum">02</span>
                                    <p class="gTxt">등록된 관리자의 활동 내역을<br class="pc_br"> 까다롭게 기록하여 사고를 미연에 방지</p>
                                </li>
                                <li>
                                    <span class="gnum">03</span>
                                    <p class="gTxt">임시관리자 등급을 통해<br class="pc_br"> 불가피하게 외부로 정보 제공할 시<br class="pc_br"> 안전하게 담당자를 초대할 수 있는 기능 지원</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Managerial -->
        <div class="section" id="managerialGreen">
            <div class="">
                <div class="panel" data-color="white"></div>
                <div class="" data-color="">
                    <div class="mainInner">
                        <div class="mgTitleBox">
                            <p class="managertitle wow TitleUp" data-wow-delay="0.0s">
                                당연히 해야하지만<br>
                                놓치기 쉬운
                                기본적인 관리
                            </p>
                        </div>
                        <div class="mgContGroup">
                            <div class="mgContBoxWrap">
                                <div class="mgContBox">
                                    <p class="mgContBoxTitle">손쉬운 개인정보처리방침 작성</p>
                                    <p class="mgContBoxtxt">개인정보보호법에 맞춘 샘플링 제공을 통해 손쉽게 작성이 가능</p>
                                    <div class="mgContImgBox">
                                        <div class="Imglong wow ImgScrollUp02" data-wow-delay="0.0s">
                                            <img src="/assets/images/main/Managerial_5-1.png" class="ph_none" alt="">
                                            <img src="/assets/images/main/Managerial_5-1_mo.png" class="ph_only" alt="">
                                        </div>
                                        <div class="alretGroup">
                                            <div class="alret alret01 wow Apop" data-wow-delay="0.1s"><img alt="" src="/assets/images/main/Managerial_5-1-1.png"></div>
                                            <div class="alret alret02 wow Apop" data-wow-delay="0.2s"><img alt="" src="/assets/images/main/Tooltip2.png"></div>
                                            <div class="alret alret03 wow Apop" data-wow-delay="0.2s"><img alt="" src="/assets/images/main/Tooltip3.png"></div>
                                            <div class="alret alret04 wow Apop" data-wow-delay="0.3s"><img alt="" src="/assets/images/main/Tooltip4.png"></div>
                                            <div class="alret alret05 wow Apop" data-wow-delay="0.3s"><img alt="" src="/assets/images/main/Tooltip5.png"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mgContBoxWrap two">
                                <div class="mgContBox wow AFadeInUp" data-wow-delay="0.0s">
                                    <p class="mgContBoxTitle">내부 접속 기록 보관</p>
                                    <p class="mgContBoxtxt mo_only">법이 요구하는 보관 기간을 서비스 특성에 맞게 적용</p>
                                    <div class="mgContImgBox"><img src="/assets/images/main/managerialm_02.png"></div>
                                </div>
                                <div class="mgContBox wow AFadeInUp" data-wow-delay="0.2s">
                                    <p class="mgContBoxTitle">이용내역 통지</p>
                                    <p class="mgContBoxtxt mo_only">고객에게 이용내역을 통지해야 할때는 알아서 딱딱</p>
                                    <div class="mgContImgBox">
                                        <img src="/assets/images/main/email.png" class="pc_only">
                                        <img src="/assets/images/main/email_mo.png" class="mo_only">
                                    </div>
                                </div>
                                <div class="mgContBox wow AFadeInUp" data-wow-delay="0.4s">
                                    <p class="mgContBoxTitle">이상행위 모니터링</p>
                                    <p class="mgContBoxtxt mo_only">해외 로그인 시도 전체 DB 다운로드 등 이상행위 모니터링 및 알림</p>
                                    <div class="mgContImgBox"><img src="/assets/images/main/managerialm_04.png"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

