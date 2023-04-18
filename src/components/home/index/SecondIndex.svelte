<script>

    import jQuery from 'jquery';

    // 인덱스
    jQuery(window).scroll(function() {
        const sa = jQuery('#a').position().top;
        const sb = jQuery('#b').position().top;
        const sc = jQuery('#c').position().top;
        const sd = jQuery('#d').position().top;

        let scroll = jQuery(window).scrollTop();

        if (scroll < sa)
        {
            jQuery("#sure .sstic").removeClass("active01");
        }
        if (sa <= scroll && scroll< sb)
        {
            jQuery("#sure .sstic").removeClass("active01");
            jQuery("#sure .sstic").removeClass("active02");
        }
        else if (sb <= scroll && scroll < sc)
        {
            jQuery("#sure .sstic").addClass("active01");
            jQuery("#sure .sstic").removeClass("active02");
        }
        else if (sc <= scroll && scroll < sd )
        {
            jQuery("#sure .sstic").addClass("active02");
            jQuery("#sure .sstic").removeClass("active01");
            jQuery("#sure .sstic").removeClass("active03");
        }
        else if (sd <= scroll)
        {
            jQuery("#sure .sstic").addClass("active03");
        }
    });

</script>

<!-- 두번째 댑스 -->
<section id="sure">
    <div class="sstic">
        <div class="ssticInner">
            <div class="s_Title">
                <div class="s_TitleBox">
                    <p>코코넛은 가능합니다.</p>
                    <span class="hid_02"></span>
                    <figure class="hid_02"><img src="/assets/images/main/b_koko_logo.png" alt="logo"></figure>
                </div>
                <div class="show02">
                    <div class="showTitle">
                        <div class="st02">항상 지켜야할 <span>보안</span>부터</div>
                        <div class="st03">앞으로 지켜야할 <span>관리</span>까지</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sc_cont_area">
        <section id="a"></section>
        <section id="b" ></section>
        <section id="c"></section>
        <section id="d"></section>
    </div>
</section>