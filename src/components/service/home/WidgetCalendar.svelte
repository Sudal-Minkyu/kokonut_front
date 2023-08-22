<script>
    export let year = new Date().getFullYear();
    export let month = new Date().getMonth() + 1;

    $: calendarData = generateCalendarData(year, month);
    const today = new Date().getDate();

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

        return calendarArray;
    }

    function padWithZero(number) {
        var numberString = number.toString();

        if (numberString.length === 1) {
            return '0' + numberString;
        } else {
            return numberString;
        }
    }
</script>

<div class="wjItem">
    <div class="wjcalBox">
        <div class="wjcMonth">{padWithZero(month)}</div>
        <div class="wjcal">
            <table>
                <caption>위젯 캘린더</caption>
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
                            <td> <!--point 를 class 로 부여해 날짜 아래에 초록색 점을 표시할 수 있음. -->
                                {#if calendarData[rowIndex * 7 + colIndex].day}
                                    <span class={Number(calendarData[rowIndex * 7 + colIndex].day) === today ? 'onSuc' : ''}>
                                        {calendarData[rowIndex * 7 + colIndex].day}
                                    </span>
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
<!--        <div class="wjcTextBox">-->
<!--            <div class="wjcText">접속 기록 점검일</div>-->
<!--            <div class="wjcText">이용내역 통지메일 발송일</div>-->
<!--        </div>-->
    </div>
</div>