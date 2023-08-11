<script>
    import {ajaxGet} from "../../../common/ajax.js";

    export let calendarService;

    $: calendarData = generateCalendarData(calendarService.year, calendarService.month);

    // 달력 배열의 생성
    // 향후 달력에 들어가야할 데이터가 필요한 경우 여기에 로직 추가
    function generateCalendarData(year, month) {
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
        const lastDateOfMonth = new Date(year, month, 0).getDate();
        const calendarArray = [];

        for (let i = 0; i < (firstDayOfMonth) % 7; i++) {
            calendarArray.push({ day: '' });
        }
        for (let i = 1; i <= lastDateOfMonth; i++) {
            calendarArray.push({ day: i.toString() });
        }
        while (calendarArray.length % 7 !== 0) {
            calendarArray.push({ day: '' });
        }

        getCalendarPersonalInfoCount(year, month);

        return calendarArray;
    }

    const getCalendarPersonalInfoCount = (targetYear, targetMonth) => {
        ajaxGet('/v2/api/Company/paymentPrivacyCount',
            {choseDate: targetYear + '.' + targetMonth.toString().padStart(2, '0')}, (res) => {
            const personalInfoCountList = {};
            res.data.sendData.dayList.map(obj => {
                personalInfoCountList[obj.ppcDate] = obj.ppcCount;
            });
            if (calendarService.year === targetYear && calendarService.month === targetMonth) {
                calendarData = calendarData.map(obj => {
                    obj.count = personalInfoCountList[obj.day] ? personalInfoCountList[obj.day] : '';
                    return obj;
                });
            }
        });
    }
    function checkFutureMonth(checkYear, checkMonth) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // 검사할 년월이 현재 날짜보다 미래인지 확인
        return (checkYear <= currentYear && (checkYear !== currentYear || checkMonth <= currentMonth));
    }

    $: isEnableIncrementMonthBtn = checkFutureMonth(calendarService.year, calendarService.month);

    function handleIncrementMonth() {
        if (isEnableIncrementMonthBtn) {
            calendarService.month++;
            if (calendarService.month === 13) {
                calendarService.year++;
                calendarService.month = 1;
            }
        }
    }
    // 월이 바뀔 때 마다 데이터 호출에 대한 동작이 추가되어야 할 것
    function handleDecrementMonth() {
        calendarService.month--;
        if (calendarService.month === 0) {
            calendarService.year--;
            calendarService.month = 12;
        }
    }

</script>

<!-- [D] 월 평균 개인정보 팝업 -->
<div class="koko_popup month_current_pop" data-popup="month_current_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">개인정보 현황</h3>
            </div>
            <div class="calframe marT40">
                <div class="calframeTop">
                    <div class="clafprev" on:click={handleDecrementMonth}></div>
                    <div class="claf_num"><span>{calendarService.year}</span>년 <span>{calendarService.month}</span>월</div>
                    <div class="clafnext {isEnableIncrementMonthBtn ? '' : 'dont'}" on:click={handleIncrementMonth}></div>
                </div>
                <table>
                    <caption>월 평균 개인정보 현황 캘린더</caption>
                    <colgroup>
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                        <col style="width:14.285%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                    </thead>
                    <tbody>
                        {#each Array(Math.ceil(calendarData.length / 7)) as _, rowIndex}
                            <tr>
                                {#each Array(7).fill(0) as __, colIndex}
                                    <td>
                                        {#if calendarData[rowIndex * 7 + colIndex]}
                                            {calendarData[rowIndex * 7 + colIndex].day}
                                        {/if}
                                        {#if calendarData[rowIndex * 7 + colIndex].count}
                                            <span>{calendarData[rowIndex * 7 + colIndex].count}</span>
                                        {/if}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="koko-popup-close current_pop_close" data-popup-close="current_pop_close" on:click={calendarService.close}></div>
    </div>
</div>
<!-- // [D] 월 평균 개인정보 팝업 -->