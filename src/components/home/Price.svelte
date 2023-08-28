<head>
    <!-- Home CSS -->
    <link href='/assets/css/home/maincommon.css' rel='stylesheet'>
    <link href='/assets/css/home/main.css' rel='stylesheet'>
    <link href='/assets/css/home/mainprice.css' rel='stylesheet'>
    <link href='/assets/css/home/mainreset.css' rel='stylesheet'>
</head>

<script>
    import HomeHeader from "../home/layout/HomeHeader.svelte"

</script>

<!-- 해더 -->
<HomeHeader />

<div class="priceWrap">
    <div class="priceTop">
        <div class="priceInner">
            <div class="pricTTileBox">
                <p class="pr_gtitle">PRICE</p>
                <p class="pr_title">가격 정책</p>
                <p class="pr_stxt">서비스 가입 이후 API 연동 및 시스템 구축에 걸리는 첫 한달은 무료입니다.<br>*단 AWS 서버 실비는 청구</p>
            </div>
            <div class="pricTCont" style="padding-left: 25%; padding-right: 25%;">
                <div class="pricTLeft"  style="width: 100%;">
                    <div class="pc_titleBox">
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <p class="pc_price" style="font-size: 5rem;margin-top: 1rem;">월 99,000원 부터</p>
                        <br /><br />
                        <p class="btype">기업이 보유한 개인정보 볼륨에<br>따라 요금이 변동됩니다.<br>자세한 요금 정책은 문의 바랍니다.</p>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </div>
                </div>
            </div>
        </div>
        <div class="worklist">
            <div class="priceInner">
                <div class="worklistGroup">
                    <div class="wlBox">
                        <p class="workTitle">보호기능</p>
                        <ul>
                            <li>개인정보 암호화</li>
                            <li>안전한 암호 키 관리</li>
                            <li>네트워크 보안</li>
                            <li>개인정보 파기</li>
                            <li>재해 재난 대비 보호조치</li>
                            <li>최대 접속 시간제한</li>
                            <li>2단계 인증</li>
                            <li>해외 로그인 차단</li>
                            <li>구간 암호화(TLS)</li>
                            <li>접속 기록 보호</li>
                        </ul>
                    </div>
                    <div class="wlBox">
                        <p class="workTitle">관리기능</p>
                        <ul>
                            <li>관리자별 최소 권한 부여</li>
                            <li>고객별 개인정보 동의 증빙 관리</li>
                            <li>개인정보 처리 위탁 관리</li>
                            <li>제 3자 제공 관리</li>
                            <li>제 3자 제공 동의 이력 관리</li>
                            <li>관리자 접속 기록 관리</li>
                            <li>개인정보 마스킹</li>
                            <li>휴먼회원 관리</li>
                            <li>개인정보처리방침 이력 관리</li>
                        </ul>
                    </div>
                    <div class="wlBox">
                        <p class="workTitle">편의기능</p>
                        <ul>
                            <li>대시보드 제공</li>
                            <li>테스트 API 제공</li>
                            <li>개인정보 항목 생성</li>
                            <li>주기적 백업</li>
                            <li>관리자 활동 통지</li>
                            <li>고객별 DM 발송</li>
                            <li>엑셀 업로드</li>
                            <li>자동 결제</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>