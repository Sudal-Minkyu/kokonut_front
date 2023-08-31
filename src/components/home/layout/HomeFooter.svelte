<script>
    const handleOpenAgreement = (agreeNo) => {
        if (agreeNo === 1) {
            window.open('https://kokonut.oopy.io/privacy_policy_service', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=900,height=1000');
        } else if (agreeNo === 2) {
            window.open('https://kokonut.oopy.io/service_agreement', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=900,height=1000');
        }
    }
</script>

<footer>
    <div class="footerInner">
        <div class="footerBox left">
            <ul class="pp_ul pc_only">
                <li style="cursor: pointer;" on:click={() => {handleOpenAgreement(2)}}>이용약관</li>
                <li style="cursor: pointer;" on:click={() => {handleOpenAgreement(1)}}><b>개인정보처리방침</b></li>
<!--            <a href=""><li>임원모집</li></a>-->
            </ul>
            <div class="f_logoBox left">
                <figure class="f_logo"><img src="/assets/images/main/f_logo.png" alt="개인정보보호 서비스 코코넛 로고"></figure>
                <p class="copy">Copyright© 2023 Everyfeb. All Rights Reserved</p>
            </div>
        </div>
        <div class="footerBox right">
            <ul class="notice_ul">
                <li class="width100" style="margin-bottom: 10px">
                    <p class="ul_txt"><b style="font-size: 2rem;">(주)2월대개봉</b></p>
                </li>
                <li>
                    <p class="ul_title">대표</p>
                    <p class="ul_txt">곽호림</p>
                </li>
                <li>
                    <p class="ul_title">사업자등록번호</p>
                    <p class="ul_txt">348-81-01536</p>
                </li>
                <li>
                    <p class="ul_title">이메일주소</p>
                    <p class="ul_txt">contact@kokonut.me</p>
                </li>
                <li>
                    <p class="ul_title">전화번호</p>
                    <p class="ul_txt">0507-1348-6533</p>
                </li>
                <li class="width100">
                    <p class="ul_title">주소</p>
                    <p class="ul_txt">서울시 강남구 역삼로 165, TIPS 타운 3층 (주)2월대개봉
                </li>
            </ul>
        </div>
        <ul class="pp_ul mo_only">
            <li style="cursor: pointer;" on:click={() => {handleOpenAgreement(2)}}>이용약관</li>
            <li style="cursor: pointer;" on:click={() => {handleOpenAgreement(1)}}><b>개인정보처리방침</b></li>
<!--            <a href=""><li>임원모집</li></a>-->
        </ul>
    </div>
</footer>