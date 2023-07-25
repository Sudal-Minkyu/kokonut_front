<script>
    import {chart} from 'svelte-apexcharts';
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";
    import {DateRangePicker} from "../../common/action/DatePicker.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";

    let privacyIndexDto = {};

    onMount(() => {
        getPrivacyIndexCount('1'); // api 기간용으로 전환시 반영
    });

    let options = {
        series: [0, 0, 0],
        chart: {
            type: 'pie',
        },
        plotOptions: {
            pie: {
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,

        },
        legend: {
            show: true,
            fontSize: '18px',
            offsetX: -30,
            offsetY: 50,
            onItemHover: {
                highlightDataSeries: true,
            },
            itemMargin: {
                vertical: 3,
            }
        },
        labels: ['활성', '신규', '탈퇴'],
    };

    const getPrivacyIndexCount = (dateType) => {
        const filterCondition = {
            dateType,
        };
        ajaxGet('/v2/api/Index/privacyIndexCount', filterCondition, (res)=> {
            privacyIndexDto = res.data.sendData.privacyIndexDto;
            options.series = [privacyIndexDto.nowUserCount, privacyIndexDto.newUserCount, privacyIndexDto.leaveUserCount];
            console.log('개인정보 현황', privacyIndexDto);
        });
    };

    const handleSelectPeriod = (el) => {
        getPrivacyIndexCount(el.dataset.datatype);
    };

    const handleDatepickerRendered = (periodObj) => {
        console.log('랜더됨', periodObj); // api 기간용으로 전환시 반영
    };

    const dateRangePickerProps = {
        callback: handleSelectPeriod,
        handleRendered: handleDatepickerRendered,
        eraseOnCancel: false,
        periodDays: '0',
    };

</script>
<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle wjsel">
            <div class="wjtitle">
                <dt>개인정보 현황</dt>
            </div>
            <div class="">
                <div class="sc_SelBox">
                    <div class="selectBox" use:SelectBoxManager={{callback: handleSelectPeriod}}>
                        <div class="label">오늘</div>
                        <ul class="optionList">
                            <li class="optionItem" data-datetype="1">오늘</li>
                            <li class="optionItem" data-datetype="2">이번주</li>
                            <li class="optionItem" data-datetype="3">이번달</li>
                        </ul>
                    </div>
                </div>
<!--                <div class="calenderBox" style="padding: 0;">-->
<!--                    <div style="width: 100%; position: relative;">-->
<!--                        <input id="stime" type="text" class="form-control" placeholer="날짜선택"-->
<!--                               aria-describedby="stime_addon" style="width: 170px; font-size: 1.5rem; font-family: Pretendard,sans-serif;" use:DateRangePicker={dateRangePickerProps} readonly />-->
<!--                        <input type="radio" class="radio" name="period" id="radioToday" value="7" style="display: none" checked />-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>
        <div class="wjgrBox marT24" style="align-content: center">
            <div use:chart={options} ></div>
<!--            <div class="wjgr"></div>-->
<!--            <div class="wjgr_tabe">-->
<!--                <div class="grtabe grt_01">활성<span>(2920)</span></div>-->
<!--                <div class="grtabe grt_02">신규 가입<span>(280)</span></div>-->
<!--                <div class="grtabe grt_03">휴면 전환<span>(486)</span></div>-->
<!--                <div class="grtabe grt_04">탈퇴<span>(4)</span></div>-->
<!--            </div>-->
        </div>
    </div>
</div>