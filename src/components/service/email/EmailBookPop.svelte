<script>
    export let closeEmailBookPop;

    const handleCancel = () => {
        closeEmailBookPop();
    }

    const handleConfirm = () => {
        closeEmailBookPop();
    }
</script>

<!-- 이메일 예약 팝업 영역 -->
<div class="mail_reserveBox" style="display: block">
    <div class="mrTopBox">
        <div class="mrTopTitle marB12">발송 예약</div>
        <div class="mrtContent marB12 mrtType01">
            <dl>기준시간</dl>
            <div class="mrtBox">
                <div class="mrtSelBox">
                    <div class="selectBox wid100per nonePad">
                        <div class="label" id="standardTime">전체</div>
                        <ul class="optionList">
                            <li class="optionItem curv">항목1</li>
                            <li class="optionItem curv">항목2</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="mrtContent mrtType02">
            <dl>예약시간</dl>
            <div class="mrtBox">
                <div class="time_input">
                    <input type="text" name="startdate" id="datepicker" placeholder="시작일" autocomplete="off" maxlength="10" value="">
                </div>
                <div class="mrtSelBox">
                    <div class="selectBox wid100per nonePad">
                        <div class="label" id="timeSelection">시간선택</div>
                        <ul class="optionList">
                            <li class="optionItem curv">1시</li>
                            <li class="optionItem curv">2시</li>
                            <li class="optionItem curv">3시</li>
                            <li class="optionItem curv">4시</li>
                            <li class="optionItem curv">5시</li>
                            <li class="optionItem curv">6시</li>
                            <li class="optionItem curv">7시</li>
                            <li class="optionItem curv">8시</li>
                            <li class="optionItem curv">9시</li>
                            <li class="optionItem curv">10시</li>
                            <li class="optionItem curv">11시</li>
                            <li class="optionItem curv">12시</li>
                            <li class="optionItem curv">13시</li>
                            <li class="optionItem curv">14시</li>
                            <li class="optionItem curv">15시</li>
                            <li class="optionItem curv">16시</li>
                            <li class="optionItem curv">17시</li>
                            <li class="optionItem curv">18시</li>
                            <li class="optionItem curv">19시</li>
                            <li class="optionItem curv">20시</li>
                            <li class="optionItem curv">21시</li>
                            <li class="optionItem curv">22시</li>
                            <li class="optionItem curv">23시</li>
                            <li class="optionItem curv">24시</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mrBottomBox">
        <div class="floatBtnBox">
            <div class="del mailreserve_cancal" on:click={handleCancel}>취소</div>
            <div class="add mailreserve_confirm" on:click={handleConfirm}>확인</div>
        </div>
    </div>
</div>