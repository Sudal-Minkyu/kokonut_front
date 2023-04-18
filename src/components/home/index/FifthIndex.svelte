<script>

    import jQuery from 'jquery';

    // 기술적 보호 조치
    jQuery(window).scroll(function() {
        const tech = jQuery('#technical');
        const techCont = jQuery('#technical section');
        let scroll = jQuery(window).scrollTop() + (jQuery(window).height() / 1);
        techCont.each(function () {
            const thistechCont = jQuery(this);
            if (thistechCont.position().top <= scroll && thistechCont.position().top + thistechCont.height() > scroll) {
                tech.addClass("titleUp");
                tech.addClass('showArea-' + thistechCont.data('show'));
            }
        });
    });

</script>

<div id="technical">
    <div class="sstic">
        <div class="ssticInner">
            <div class="s_Title">
                <div class="s_TitleBox">
                    <p class="greenTxt"><span>Technical</span> Safeguards</p>
                    <p class="boldTxt"><span class="color">기술적</span> 보호조치</p>
                </div>
            </div>
        </div>
    </div>
    <div class="sc_cont_area">
        <section id="ta" data-show="show01">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple">보안</p>
                        <p class="mContTitle">클라우드 기반 철저한 보안 체계 구축</p>
                        <p class="mContsTxt">외부 공격으로부터 접근을 통제하고, 안전한 알고리즘과 키관리로 개인정보를 암호화합니다.</p>
                    </div>
                    <div class="t_ContBoxCont">
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">접근 통제</p>
                                <ul>
                                    <li><p class="t_CBTxt">방화벽, 2단계 인증, 최대 접속시간 제한</p></li>
                                    <li><p class="t_CBTxt">로그 모니터링, 탐지, 대응</p></li>
                                    <li><p class="t_CBTxt">취약점 점검</p></li>
                                </ul>
                            </div>
                            <div class="t_CBImg"></div>
                        </div>

                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">안전 조치</p>
                                <ul>
                                    <li><p class="t_CBTxt">소프트웨어 안전조치</p></li>
                                    <li><p class="t_CBTxt">DDOS 대응</p></li>
                                </ul>
                            </div>
                            <div class="t_CBImg"></div>
                        </div>
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">권한 관리</p>
                                <ul>
                                    <li><p class="t_CBTxt">취급자별 계정 할당</p></li>
                                    <li><p class="t_CBTxt">비밀번호 규칙 고도화</p></li>
                                </ul>
                            </div>
                            <div class="t_CBImg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="tb" data-show="show02">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple">암호화</p>
                        <p class="mContTitle">정교한 알고리즘과 키관리를 통한 개인정보 암호화</p>
                    </div>
                    <div class="t_ContBoxCont">
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">접근 통제</p>
                                <p class="t_CBTxt">국제 표준 알고리즘, 솔트(Salt)를 이용한 해시 등 안전한 알고리즘으로 보호<p>
                            </div>
                            <div class="t_CBImg"></div>
                        </div>

                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">안전 조치</p>
                                <p class="t_CBTxt">하드웨어 보안모듈(HSM)을<br> 이용하여 암호화 키를 안전하게 관리<p>
                            </div>
                            <div class="t_CBImg"></div>
                        </div>
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">권한 관리</p>
                                <p class="t_CBTxt">고유식별정보, 금융정보 등 법규에서 규정한 개인정보 이외에도 고객이 암호화 대상으로 설정한 모든 개인정보를 암호화</p>
                            </div>
                            <div class="t_CBImg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="tc" data-show="show03">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple">재난대비</p>
                        <p class="mContTitle">정교한 알고리즘과 키관리를 통한 개인정보 암호화</p>
                        <p class="mContsTxt">원격에 개인정보를 백업하고 문제 발생 시 신속하게 복구합니다.</p>
                    </div>
                    <div class="m_ContBoxCont">
                        <div class="m_ContImgBox">
                            <img src="">
                        </div>
                        <div class="m_ConttxtBox">
                            <ul class="">
                                <li>
                                    <span class="gnum">01</span>
                                    <p class="gTxt">회원가입 시 기입 정보와 연동하여<br> 고객 개인정보 알아서 착착 수집</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

<div class="" id="techBlue">
    <div class="colorchange">
        <div class="panel" data-color="white"></div>
        <div class="panel" data-color="blue">
            <div class="mainInner">
                <div class="techTitleBox">
                    <p class="managertxt">Managerial</p>
                    <p class="managertitle">
                        안전성을 공식적으로<br>
                        인정받는 서비스로 나아갑니다.
                    </p>
                    <p class="managerstitle">국내 최고 수준의 개인정보보호 전문가와 함께 글로벌 인증 등을 통해 보안을 강화합니다.</p>
                </div>
                <div class="techContGroup">
                    <div class="techContBox">
                        <figure class="techserImg">
                            <img src="/assets/images/main/ISOIEC27001.png" alt="iso27001" />
                        </figure>
                        <p class="techserTxt">ISO/IEC 27001<p>
                        <p class="techserTxt" style="margin-top: 1px">개인정보보호법<p>
                    </div>
                    <div class="techContBox">
                        <figure class="techserImg">
                            <img src="/assets/images/main/ISOIEC27017.png" alt="iso27017" />
                        </figure>
                        <p class="techserTxt">ISO/IEC 27017<p>
                    </div>
                    <div class="techContBox">
                        <figure class="techserImg">
                            <img src="/assets/images/main/ISOIEC27018.png" alt="iso27018" />
                        </figure>
                        <p class="techserTxt">ISO/IEC 27018<p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>