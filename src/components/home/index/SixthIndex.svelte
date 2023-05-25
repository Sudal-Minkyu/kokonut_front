<script>
    import jQuery from "jquery";

    jQuery(window).scroll(function() {
        var j$window = jQuery(window),
            j$tech = jQuery('#funjs'),
            j$techCont = jQuery('#funjs .section');

        var windowTop = jQuery(window).scrollTop();
        var scroll = j$window.scrollTop() + (j$window.height() / 2);
        var area = jQuery(window).scrollTop();

        j$techCont.each(function () {
            var j$this = jQuery(this);
            if (j$this.position().top <= scroll && j$this.position().top + j$this.height() > scroll) {
                j$tech.addClass("titleUp");
                j$tech.addClass('showArea-' + jQuery(this).data('show'));
            }
        });
    }).scroll();
</script>

<div id="funjs">
    <div class="sstic">
        <div class="ssticInner">
            <div class="s_Title">
                <div class="s_TitleBox wow AFadeInUp">
                    <p class="greenTxt">Powerful <span>Convenience</span></p>
                    <p class="boldTxt">보호에만<br class="mo_br"> 그치지 않는<br class="mo_br"> <span>강력한 편의성</span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="sc_cont_area">
        <!-- api 제공 -->
        <div class="section" id="fa" data-show="show01">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple wow TitleUp">API 제공</p>
                        <p class="mContTitle wow TitleUp">코코넛의 다양한 기능의 API 제공으로 쉬운 커스터마이징</p>
                    </div>
                    <div class="f_ContBoxCont wow m_ConttxtBoxUp">
                        <figure class="fa_figure01"><img src="/assets/images/main/Power_1-1.png"></figure>
                        <figure class="fa_figure02"><img src="/assets/images/main/Power_1-2.png"></figure>
                    </div>
                </div>
            </div>
        </div>
        <!-- 외부 서비스 연동 -->
        <div class="section" id="fb" data-show="show02">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple wow TitleUp">외부 서비스 연동</p>
                        <p class="mContTitle wow TitleUp">안전한 환경에서 기존 실무는 그대로</p>
                        <p class="mContsTxt wow TitleUp">BI 툴, 알림톡, CRM 툴 등 기존에 활용하던 툴들은 자연스럽게 연동하세요.</p>
                    </div>
                    <div class="f_ContBoxCont wow m_ConttxtBoxUp">
                        <figure class="fb_figure01 wow siteImgUp"><img src="/assets/images/main/Power_2-1.png"></figure>
                        <figure class="fb_figure02 wow siteImgUpCenter"><img src="/assets/images/main/Power_2-2.png"></figure>
                    </div>
                </div>
            </div>
        </div>
        <!-- 스마트한 외부 제공 -->
        <div class="section" id="fc" data-show="show03">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple wow TitleUp">스마트한 외부 제공</p>
                        <p class="mContTitle wow TitleUp">더 이상 이메일로 개인정보 보내지 마세요.</p>
                        <p class="mContsTxt wow TitleUp">외부 제공 시 제공받는 담당자를 코코넛으로 초대해서 정보를 안전하게 전달합니다.</p>
                    </div>
                    <div class="f_ContBoxCont wow m_ConttxtBoxUp">
                        <figure class="fc_figure01"><img src="/assets/images/main/Power_3-1.png"></figure>
                        <figure class="fc_figure02 wow siteImgUpCenter"><img src="/assets/images/main/Power_3-2.png"></figure>
                        <figure class="fc_figure03 wow siteImgUp"><img src="/assets/images/main/Power_3-3.png"></figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>