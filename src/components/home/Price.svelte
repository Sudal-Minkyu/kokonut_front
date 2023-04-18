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
                <p class="pr_stxt">처음 2주는 무료입니다.</p>
            </div>
            <div class="pricTCont">
                <div class="pricTLeft">
                    <div class="pc_titleBox">
                        <p class="gtype">BASIC</p>
                        <p class="btype">베이직 플랜</p>
                        <p class="pc_price">FREE</p>
                        <p class="pc_pricefree">~5,000명 까지 무료</p>
                    </div>
                    <ul class="cus_list">
                        <li>소규모 고객을 보유한 스타트업</li>
                        <li>고객정보를 수집하는 소상공인</li>
                        <li>멤버 관리가 필요한 소모임 및 동아리</li>
                        <li>사업 진행 전 DB 구축 단계의 팀</li>
                    </ul>
                </div>
                <div class="pricTRight">
                    <div class="pc_titleBox">
                        <p class="gtype">STANDARD</p>
                        <p class="btype">스탠다드 플랜</p>
                        <div class="pc_price"><p class="won">&#8361;</p><span>10</span>원</div>
                        <p class="pc_pricefree">개인정보 1건당 / 무제한</p>
                    </div>
                    <ul class="cus_list">
                        <li>소규모 고객을 보유한 스타트업</li>
                        <li>고객정보를 수집하는 소상공인</li>
                        <li>멤버 관리가 필요한 소모임 및 동아리</li>
                        <li>사업 진행 전 DB 구축 단계의 팀</li>
                    </ul>
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
                <div class="consultBox">
                    <p class="">충분한 고민 끝에 결정해 주세요.</p>
                    <div class="consultBtn"><p>컨설팅 신청하기</p></div>
                </div>
            </div>
        </div>
    </div>
</div>