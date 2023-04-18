<script>

    import jQuery from 'jquery';

    // 배경색 변경
    jQuery(window).scroll(function() {
        let body = jQuery('.colorchange');
        const panel = jQuery('.panel');
        let scroll = jQuery(window).scrollTop() + (jQuery(window).height() / 2);
        panel.each(function () {
            const thispanel = jQuery(this);
            if (thispanel.position().top <= scroll && thispanel.position().top + thispanel.height() > scroll) {
                body.removeClass(function (index, css) {
                    return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
                });
                body.addClass('color-' + thispanel.data('color'));
            }
        });
    });

</script>

<div class="" id="managerialGreen">
    <div class="colorchange">
        <div class="panel" data-color="white"></div>
        <div class="panel" data-color="green">
            <div class="mainInner">
                <div class="mgTitleBox">
                    <p class="managertxt">Managerial</p>
                    <p class="managertitle">
                        당연히 해야하지만<br>
                        놓치기 쉬운<br>
                        기본적인 관리
                    </p>
                </div>
                <div class="mgContGroup">
                    <div class="mgContBoxWrap">
                        <div class="mgContBox">
                            <p class="mgContBoxTitle">손쉬운<br>개인정보처리방침 작성</p>
                            <p class="mgContBoxtxt">개인정보보호법에 맞춘 샘플링 제공을 통해<br> 손쉽게 작성이 가능</p>
                            <div class="mgContImgBox"></div>
                        </div>
                        <div class="mgContBox matg10">
                            <p class="mgContBoxTitle">법령에 맞춘<br> 내부 접속 기록 보관</p>
                            <p class="mgContBoxtxt">법이 요구하는 보관 기간을<br class="mo_br"> 서비스 특성에 맞게 적용</p>
                            <div class="mgContImgBox"></div>
                        </div>
                    </div>
                    <div class="mgContBoxWrap">
                        <div class="mgContBox">
                            <p class="mgContBoxTitle">주기적인<br> 개인정보 이용내역 통지</p>
                            <p class="mgContBoxtxt">고객에게 이용내역을 통지해야 할때는<br class="mo_br"> 알아서 딱딱</p>
                            <div class="mgContImgBox"></div>
                        </div>
                        <div class="mgContBox matg10">
                            <p class="mgContBoxTitle">이상행위 모니터링</p>
                            <p class="mgContBoxtxt">해외 로그인 시도 전체 DB 다운로드 등<br class="mo_br"> 이상행위<br class="pc_br"> 모니터링 및 알림</p>
                            <div class="mgContImgBox h66"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

