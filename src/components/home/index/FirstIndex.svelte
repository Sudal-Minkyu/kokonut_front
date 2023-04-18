<script>

    import jQuery from 'jquery';

    // Scroll
    jQuery(window).scroll(function() {
        const scroll = jQuery(window).scrollTop();
        if (scroll >= 80) {
            jQuery(".main_Num").removeClass("here");
            jQuery(".main_Num.two").addClass("here");
            jQuery(".text1").addClass("hidn");
            jQuery(".slideImgBox.second").addClass("show");
            jQuery(".slideImgBox.first").addClass("hidn");
            jQuery(".text2").addClass("show");
            jQuery(".main_vImgBox").addClass("rolling");
        } else {
            jQuery(".text1").removeClass("hidn");
            jQuery(".text2").removeClass("show");
            jQuery(".slideImgBox.second").removeClass("show");
            jQuery(".slideImgBox.first").removeClass("hidn");
            jQuery(".main_Num").removeClass("here");
            jQuery(".main_Num.one").addClass("here");
            jQuery(".main_vImgBox").removeClass("rolling");
        }
    });

</script>

<section id="main_v">
    <div class="mainInner">
        <div class="stickyBox">
            <div class="stickyInner">
                <div class="mv_titleBox">
                    <div class="main_NumBox">
                        <p class="main_Num one here">01</p>
                        <p class="main_Num two">02</p>
                    </div>
                    <h1 class="text1">
                        <div class="mv_title line_1"><p class="wow AFadeInUp" data-wow-duration="1.2s">복잡한 개인정보보호를<br> 쉽게하는 가장 좋은</p></div>
                        <div class="text2">
                            <div class="mv_title"><p>SaaS 형 개인정보보호 <br>서비스 코코넛</p></div>
                        </div>
                    </h1>
                </div>
                <div class="slideWrap">
                    <div class="slide">
                        <div class="slideImgBox first wow AFadeInRight" data-wow-duration="1.2s"><img src="/assets/images/main/b_mainV01.jpg" alt="kokonutUXUI"></div>
                        <div class="slideImgBox second wow AFadeInRightsec" data-wow-duration="1.2s"><img src="/assets/images/main/b_mainV02.jpg" alt="kokonutUXUI"></div>
                    </div>
                </div>
                <div class="scrollDown">
                    <p>Scroll Down</p>
                    <div class="scrollstick"></div>
                </div>
            </div>
        </div>
    </div>
</section>