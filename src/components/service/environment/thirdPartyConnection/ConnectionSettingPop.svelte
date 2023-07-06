<!-- [D] 연동 변경 팝업 -->
<div class="koko_popup change_pop" data-popup="change_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">연동 설정</h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>사용여부</label>
                    <div class="popRadio">
                        <div class="check poprCheck">
                            <input type="radio" class="radio" name="use_noneuse" id="사용" value="사용" checked="">
                            <label for="사용"><em><dt></dt></em>사용</label>
                        </div>
                        <div class="check poprCheck">
                            <input type="radio" class="radio" name="use_noneuse" id="사용 안 함" value="사용 안 함">
                            <label for="사용 안 함"><em><dt></dt></em>사용 안 함</label>
                        </div>
                    </div>
                </div>
                <div class="kopopinput marB24">
                    <label>Access Key ID</label>
                    <input type="text" placeholder="Access Key ID를 적어주세요.">
                </div>
                <div class="kopopinput marB24">
                    <label>Secret Key</label>
                    <input type="text" placeholder="Secret Key를 적어주세요.">
                </div>
                <div class="kopopinput marB24">
                    <label>카카오톡 채널 ID</label>
                    <input type="text" placeholder="카카오톡 채널 ID를 적어주세요.">
                </div>
                <div class="kopopinput marB24">
                    <label>등록된 서비스 ID</label>
                    <input type="text" placeholder="등록된 서비스 ID를 적어주세요.">
                </div>
                <div class="kopopinput marB24">
                    <label>템플릿 코드</label>
                    <input type="text" placeholder="템플릿 코드를 적어주세요.">
                </div>
                <div class="koko_check">
                    <input type="checkbox" value="1" name="thirdcheck" id="thirdcheck">
                    <label for="thirdcheck">
                        <em></em>
                        <p class="check">코코넛에 보관되어있는 개인정보를 “서드파티명"에 전달하는 것에 동의합니다.<b>자세히보기</b></p>
                    </label>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel change_pop_close">취소</div>
                    <div class="koko_go"><button type="submit">저장</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close change_pop_close" data-popup-close="change_pop_close"></div>
    </div>
</div>
<!-- // [D] 연동 변경 팝업 -->