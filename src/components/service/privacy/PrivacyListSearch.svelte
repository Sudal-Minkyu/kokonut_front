<script>
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {DateRangePicker} from "../../common/action/DatePicker.js";
    export let searchCondition;
    export let provisionList;

    const handleFilterOfferType = (el) => {
        searchCondition.filterOfferType = el.dataset.rating;
        provisionList(0);
    }
    const handleFilterState = (el) => {
        searchCondition.filterState = el.dataset.rating;
        provisionList(0);
    }

    const handleSelectPeriod = (result) => {
        provisionList(0);
    }

    const dateRangePickerProps = {
        callback: handleSelectPeriod,
        handleRendered: handleSelectPeriod,
        periodName: 'period',
        eraseOnCancel: false,
    };
</script>

<div class="seaWrap marB28">
<!--            <div class="kotopBtn"><button><img src="/assets/images/common/top_down_arrow.png" alt="" class="top_down_arrow">이력 다운로드</button></div>-->
    <div class="seaContentBox">
        <div class="seaContentLine borB">
            <div class="seaCont wid500">
                <dl>만든 날짜</dl>
                <div class="calenderBox">
                    <div class="calenderInput">
                        <input id="stime" type="text" class="form-control" placeholer="날짜선택"
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
        <div class="seaContentLine">
            <div class="seaCont wid33per">
                <dl>제공 타입</dl>
                <div class="sc_SelBox" >
                    <div class="selectBox wid164" use:SelectBoxManager={{callback: handleFilterOfferType}}>
                        <div class="label" data-rating="">전체</div>
                        <ul class="optionList">
                            <li class="optionItem curv" data-rating="">전체</li>
                            <li class="optionItem curv" data-rating="1">제공함</li>
                            <li class="optionItem curv" data-rating="2">제공받음</li>
                            <li class="optionItem curv" data-rating="3">제공/제공받음</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="seaCont wid33per">
                <dl>상태</dl>
                <div class="sc_SelBox" >
                    <div class="selectBox wid164" use:SelectBoxManager={{callback: handleFilterState}}>
                        <div class="label" data-value="">전체</div>
                        <ul class="optionList">
                            <li class="optionItem curv" data-rating="">전체</li>
                            <li class="optionItem curv" data-rating="0">대기중</li>
                            <li class="optionItem curv" data-rating="1">제공중</li>
                            <li class="optionItem curv" data-rating="2">제공기간 만료</li>
                            <li class="optionItem curv" data-rating="3">제공종료</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>