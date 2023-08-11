<script>
    import jQuery from 'jquery';

    jQuery(window).scroll(function() {
        var scroll = jQuery(window).scrollTop();
        if (scroll >= 100) {
            jQuery(".main_Num").removeClass("here");
            jQuery(".main_Num.two").addClass("here");
            jQuery(".text1").addClass("hidn");

            jQuery(".text2").addClass("show");

        } else {
            jQuery(".text1").removeClass("hidn");
            jQuery(".text2").removeClass("show");

            jQuery(".main_Num").removeClass("here");
            jQuery(".main_Num.one").addClass("here");
        }
    });
</script>

<!-- 메인 비주얼 -->
<div id="main_v">
    <div class="mainInner">
        <div class="stickyBox">
            <div class="stickyInner">
                <div class="mv_titleBox">
                    <div class="main_NumBox">
                        <p class="main_Num one here">01</p>
                        <p class="main_Num two">02</p>
                    </div>
                    <h1 class="text1">
                        <div class="mv_title line_1"><p class="wow AFadeInUp" data-wow-duration="0.8s">복잡한 개인정보보호를<br> 쉽게하는 가장 좋은 방법</p></div>
                        <div class="text2">
                            <div class="mv_title"><p>B2B SaaS<br> 개인정보보호 서비스<br>코코넛</p></div>
                        </div>
                    </h1>
                </div>
                <div class="slideWrap">
                    <div class="slide">
                        <div class="blackBox blackBox01"></div>
                        <div class="blackBox blackBox02 down"></div>
                    </div>
                </div>
                <div class="scrollDown">
                    <p>Scroll Down</p>
                    <div class="scrollstick"></div>
                </div>
            </div>
        </div>
    </div>
</div>