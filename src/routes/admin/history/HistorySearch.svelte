<script>
    import {DateRangePicker} from "../../../components/common/action/DatePicker.js";

    export let searchCondition;
    export let activityList;

    const handleSelectPeriod = () => {
        activityList(0);
    }

    const dateRangePickerProps = {
        callback: handleSelectPeriod,
        handleRendered: handleSelectPeriod,
        periodName: 'period',
        eraseOnCancel: false,
    };

</script>

<!-- 상단 검색 영역 -->
<div class="seaWrap marB28">
    <div class="seaContentBox">
        <div class="seaContentLine borB">
            <div class="seaCont wid500">
                <dl>활동 날짜</dl>
                <div class="calenderBox">
                    <div class="calenderInput">
                        <input id="stime" type="text" class="form-control" placeholder="날짜선택"
                               aria-describedby="stime_addon" readonly use:DateRangePicker={dateRangePickerProps} />
                        <img src="/assets/images/common/callendericon.png" alt="">
                    </div>
                </div>
            </div>
            <div class="seaRadioBox borL">
                <div class="seaRadio">
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="당일" value="1">
                        <label for="당일"><em><dt></dt></em>당일</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 1주일" value="7" >
                        <label for="최근 1주일"><em><dt></dt></em>최근 1주일</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 한 달" value="30" checked>
                        <label for="최근 한 달"><em><dt></dt></em>최근 한 달</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 3개월" value="90">
                        <label for="최근 3개월"><em><dt></dt></em>최근 3개월</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 6개월" value="180">
                        <label for="최근 6개월"><em><dt></dt></em>최근 6개월</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="사용자 지정" value="0">
                        <label for="사용자 지정"><em><dt></dt></em>사용자 지정</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>