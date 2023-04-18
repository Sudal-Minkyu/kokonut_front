<script>

    import jQuery from 'jquery';

    // 관리적 보호 조치
    jQuery(window).scroll(function() {
        const manage = jQuery('#managerial');
        const manageCont = jQuery('#managerial section');
        let scroll = jQuery(window).scrollTop() + (jQuery(window).height() / 2);
        manageCont.each(function () {
            const thismanageCont = jQuery(this);
            if (thismanageCont.position().top <= scroll && thismanageCont.position().top + thismanageCont.height() > scroll) {
                manage.addClass("titleUp");
                manage.addClass('showArea-' + thismanageCont.data('show'));
            }
        });
    });

</script>

<div id="managerial">
    <div class="sstic">
        <div class="ssticInner">
            <div class="s_Title">
                <div class="s_TitleBox">
                    <p class="greenTxt"><span>Managerial</span> Safeguards</p>
                    <p class="boldTxt"><span>관리적</span> 보호조치</p>
                </div>
                <figure class="imgBox">
                    <img src="/assets/images/main/imgBox.jpg">
                </figure>
            </div>
        </div>
    </div>
    <div class="sc_cont_area">
        <section id="ma">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen">수집 관리</p>
                        <p class="mContTitle">모든 개인정보는 수집부터 철저하게</p>
                        <p class="mContsTxt">수집 목적, 항목, 보유 기간을 명확하게 관리하세요.</p>
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

                                <li>
                                    <span class="gnum">02</span>
                                    <p class="gTxt">이름, 전화번호 등 텍스트는 물론<br>개인정보가 담긴 이미지, 영상까지</p>
                                </li>

                                <li>
                                    <span class="gnum">03</span>
                                    <p class="gTxt">정해진 양식에 업로드만 한다면<br>일괄적으로 수기 입력 가능</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section><!-- active01 -->
        <section id="mb">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen">파기</p>
                        <p class="mContTitle">모든 개인정보는 수집부터 철저하게</p>
                        <p class="mContsTxt">수집 목적, 항목, 보유 기간을 명확하게 관리하세요.</p>
                    </div>
                    <div class="m_ContBoxCont">
                        <div class="m_ContImgBox">
                            <img src="">
                        </div>
                        <div class="m_ConttxtBox">
                            <ul class="">
                                <li>
                                    <span class="gnum">01</span>
                                    <p class="gTxt">수집 목적이 달성된 개인정보</p>
                                </li>
                                <li>
                                    <span class="gnum">02</span>
                                    <p class="gTxt">보유 기간이 경과된 개인정보</p>
                                </li>

                                <li>
                                    <span class="gnum">03</span>
                                    <div class="">
                                        <p class="gTxt">완전한 파기</p>
                                        <p class="gsTxt">별도 법령에 따라 보존이 필요할 시 별도 보관</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section><!-- active02 -->
        <section id="mc">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen">제공 관리</p>
                        <p class="mContTitle">모든 개인정보는 수집부터 철저하게</p>
                        <p class="mContsTxt">수집 목적, 항목, 보유 기간을 명확하게 관리하세요.</p>
                    </div>
                    <div class="m_ContBoxCont">
                        <div class="m_ContImgBox">
                            <img src="">
                        </div>
                        <div class="m_ConttxtBox">
                            <ul class="">
                                <li>
                                    <span class="gnum">01</span>
                                    <p class="gTxt">위탁, 수탁, 3자 제공에 맞춰<br> 체계적으로 대상 관리</p>
                                </li>
                                <li>
                                    <span class="gnum">02</span>
                                    <p class="gTxt">제공 방법에 따른 책임 소재, 필요 사항 등을 한 눈에 정리해 혼선없는 관리</p>
                                </li>
                                <li>
                                    <span class="gnum">03</span>
                                    <p class="gTxt">교육 및 증빙에 필요한<br> 문서화 기능 제공</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="md">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContGreen">관리자 관리</p>
                        <p class="mContTitle">모든 개인정보는 수집부터 철저하게</p>
                        <p class="mContsTxt">수집 목적, 항목, 보유 기간을 명확하게 관리하세요.</p>
                    </div>
                    <div class="m_ContBoxCont">
                        <div class="m_ContImgBox">
                            <img src="">
                        </div>
                        <div class="m_ConttxtBox">
                            <ul class="">
                                <li>
                                    <span class="gnum">01</span>
                                    <p class="gTxt">위탁, 수탁, 3자 제공에 맞춰<br> 체계적으로 대상 관리</p>
                                </li>
                                <li>
                                    <span class="gnum">02</span>
                                    <p class="gTxt">제공 방법에 따른 책임 소재, 필요 사항 등을 한 눈에 정리해 혼선없는 관리</p>
                                </li>
                                <li>
                                    <span class="gnum">03</span>
                                    <p class="gTxt">교육 및 증빙에 필요한<br> 문서화 기능 제공</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

