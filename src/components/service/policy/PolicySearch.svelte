<script>
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {DateRangePicker} from "../../common/action/DatePicker.js";

    export let searchCondition;
    export let policyList;

    const handleSelectPeriod = (result) => {
        policyList(0);
    }

    const dateRangePickerProps = {
        callback: handleSelectPeriod,
        handleRendered: handleSelectPeriod,
        periodName: 'period',
        eraseOnCancel: false,
    };

    const handleFilterType = (el) => {
        searchCondition.filterDate = el.dataset.value;
        policyList(0);
    }
</script>
<!-- 상단 검색 영역 -->
<div class="seaWrap marB28">
    <div class="seaContentBox">
        <div class="seaContentLine borB">
            <div class="seaCont wid662">
                <dl>날짜 선택</dl>
                <div class="seaflexBox">
                    <div class="sc_SelBox">
                        <div class="selectBox wid162"  use:SelectBoxManager={{callback: handleFilterType}} >
                            <div class="label" id="policySelect" ></div>
                            <ul class="optionList">
                            </ul>
                        </div>
                    </div>
                    <div class="calenderBox borL">
                        <div class="calenderInput">
                            <input id="stime" type="text" class="form-control" placeholer="날짜선택"
                                   aria-describedby="stime_addon" readonly use:DateRangePicker={dateRangePickerProps}/>
                            <img src="/assets/images/common/callendericon.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="seaRadioBox borL">
                <div class="seaRadio">
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="당일" value="1" />
                        <label for="당일"><em><dt></dt></em>당일</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 1주일" value="7" />
                        <label for="최근 1주일"><em><dt></dt></em>최근 1주일</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 한 달" value="30" checked />
                        <label for="최근 한 달"><em><dt></dt></em>최근 한 달</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 3개월" value="90" />
                        <label for="최근 3개월"><em><dt></dt></em>최근 3개월</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 6개월" value="180" />
                        <label for="최근 6개월"><em><dt></dt></em>최근 6개월</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="사용자 지정" value="0" />
                        <label for="사용자 지정"><em><dt></dt></em>사용자 지정</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>