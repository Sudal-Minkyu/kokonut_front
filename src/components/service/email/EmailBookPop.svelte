<script>
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {singleDatePicker} from "../../common/action/DatePicker.js";
    import {onMount} from "svelte";
    import ErrorHighlight from "../../common/ui/ErrorHighlight.svelte";
    import {emailSendData} from "../../../lib/store.js";

    let selectedDate;
    let selectedHour;
    let highlightMsg;

    onMount(() => {
        const baseDate = $emailSendData.emReservationDate ? new Date($emailSendData.emReservationDate) : new Date();
        // 미리 선택한 시간이 있으면 인풋에 반영할 것
        selectedHour = $emailSendData.emReservationDate? baseDate.getHours() : null;
        highlightMsg = '';

        singleDatePicker('datepicker', (result) => {
            selectedDate = result.toDate();
        }, {
            startDate: baseDate,
            minDate: new Date(),
        });

        selectedDate = new Date(document.getElementById('datepicker').value);

        if (selectedHour) {
            document.getElementById('timeSelection').innerHTML = selectedHour + ' 시';
        }
    });

    export let closeEmailBookPop;

    const handleCancel = () => {
        closeEmailBookPop();
    }

    const handleConfirm = () => {
        if (!selectedHour) {
            highlightMsg = '발송시간을 선택해 주세요';
            return;
        }

        emailSendData.update(obj => {
            obj.emReservationDate = selectedDate.setHours(selectedHour);
            obj.emType = '2';
            return obj;
        });

        closeEmailBookPop();
    }


    const handleSelectHour = (el) => {
        selectedHour = Number(el.dataset.value);
    }

    const handleClickCalendarBtn = () => {
        document.getElementById('datepicker').click();
    }
</script>

<!-- 이메일 예약 팝업 영역 -->
<div class="mail_reserveBox" style="display: block">
    <div class="mrTopBox">
        <div class="mrTopTitle marB12">발송 예약</div>
        <div class="mrtContent mrtType02">
            <dl>예약시간</dl>
            <div class="mrtBox">
                <div class="time_input">
                    <input type="text" name="startdate" id="datepicker" placeholder="발송시작일" autocomplete="off" maxlength="10" value="">
                    <img class="ui-datepicker-trigger" src="/assets/images/common/callendericon.png" alt="선택" title="선택" on:click={handleClickCalendarBtn}>
                </div>
                <div class="mrtSelBox">
                    <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: handleSelectHour}}>
                        <div class="label" id="timeSelection">시간선택</div>
                        <ul class="optionList">
                            <li class="optionItem curv" data-value="1">1 시</li>
                            <li class="optionItem curv" data-value="2">2 시</li>
                            <li class="optionItem curv" data-value="3">3 시</li>
                            <li class="optionItem curv" data-value="4">4 시</li>
                            <li class="optionItem curv" data-value="5">5 시</li>
                            <li class="optionItem curv" data-value="6">6 시</li>
                            <li class="optionItem curv" data-value="7">7 시</li>
                            <li class="optionItem curv" data-value="8">8 시</li>
                            <li class="optionItem curv" data-value="9">9 시</li>
                            <li class="optionItem curv" data-value="10">10 시</li>
                            <li class="optionItem curv" data-value="11">11 시</li>
                            <li class="optionItem curv" data-value="12">12 시</li>
                            <li class="optionItem curv" data-value="13">13 시</li>
                            <li class="optionItem curv" data-value="14">14 시</li>
                            <li class="optionItem curv" data-value="15">15 시</li>
                            <li class="optionItem curv" data-value="16">16 시</li>
                            <li class="optionItem curv" data-value="17">17 시</li>
                            <li class="optionItem curv" data-value="18">18 시</li>
                            <li class="optionItem curv" data-value="19">19 시</li>
                            <li class="optionItem curv" data-value="20">20 시</li>
                            <li class="optionItem curv" data-value="21">21 시</li>
                            <li class="optionItem curv" data-value="22">22 시</li>
                            <li class="optionItem curv" data-value="23">23 시</li>
                            <li class="optionItem curv" data-value="24">24 시</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <ErrorHighlight message={highlightMsg} />
    </div>
    <div class="mrBottomBox">
        <div class="floatBtnBox">
            <div class="del mailreserve_cancal" on:click={handleCancel}>취소</div>
            <div class="add mailreserve_confirm" on:click={handleConfirm}>확인</div>
        </div>
    </div>
</div>