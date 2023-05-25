<script>
    import jQuery from 'jquery';

    jQuery(window).scroll(function() {
        var j$window = jQuery(window),
            j$koko_s = jQuery('.koko_change'),
            j$add_panel = jQuery('.add');

        var scroll = j$window.scrollTop() + (j$window.height() / 1);

        j$add_panel.each(function () {
            var j$this = jQuery(this);
            if (j$this.position().top <= scroll && j$this.position().top + j$this.height() > scroll) {
                j$koko_s.removeClass(function (index, css) {
                    return (css.match (/(^|\s)secen-\S+/g) || []).join(' ');
                });
                j$koko_s.addClass('secen-' + jQuery(this).data('add'));
            }
        });
    }).scroll();
</script>

<!-- 코코넛은 가능합니다 -->
<div class="" id="koko_sure">
    <div class="koko_change">
        <div class="techTitleBox">
            <div class="Title">
                <p class="managerstitle">코코넛은 가능합니다.</p>
                <div class="hid_02 line"></div>
                <figure class="hid_02"><img src="/assets/images/main/b_koko_logo.png" alt="개인정보보호 서비스 코코넛 로고"></figure>
            </div>
            <div class="koko_textBox">
                <div class="lock"><div class="koko_textBox01">항상 지켜야할<br class="mo_br"> <span>보안</span>부터</div></div>
                <div class="lock02"><div class="koko_textBox02">앞으로 지켜야할<br class="mo_br"> <span>관리</span>까지</div></div>
            </div>
        </div>
        <div class="add" data-add="fisrt"></div>
        <div class="add" data-add="secend"></div>
        <div class="add" data-add="thrid"></div>
    </div>
</div>