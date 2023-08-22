<!-- [D] 결제수단 변경 팝업 -->
<div class="koko_popup method_pop" data-popup="method_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">결제수단 변경</h3>
            </div>
            <form>
                <div class="kopopMuntiinputBox marB24">
                    <label>카드번호</label>
                    <div class="kopopMuntiinputInner">
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" maxlength="4">
                        </div>
                    </div>
                </div>
                <div class="kopopMuntiinputBox marB24">
                    <label>유효기간</label>
                    <div class="kopopMuntiinputInner">
                        <div class="kopopMuntiinputType2">
                            <input type="text" placeholder="MM" maxlength="2">
                        </div>
                        <div class="kopopMuntiinputType2">
                            <input type="text" placeholder="YY" maxlength="2">
                        </div>
                    </div>
                </div>
                <div class="kopopinput marB24">
                    <label>사업자번호 또는 생년월일</label>
                    <input type="text">
                </div>
                <div class="kopopinput marB24">
                    <label>카드 비밀번호 앞 두자리</label>
                    <input type="password" maxlength="2">
                </div>
                <div class="otpqrNumInfo">
                    <p>
                        당월 1일~5일 기간 동안 결제정보 변경 시, 지난 달 이용요금은 이전 결제정보로 결제가 진행됩니다.
                    </p>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel method_pop_close">취소</div>
                    <div class="koko_go"><button type="submit">저장</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close method_pop_close" data-popup-close="method_pop_close"></div>
    </div>
</div>
<!-- // [D] 결제수단 변경 팝업 -->