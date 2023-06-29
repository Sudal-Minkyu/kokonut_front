<script>
    import {chart} from 'svelte-apexcharts';
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";

    let privacyIndexDto = {};

    onMount(() => {
        getPrivacyIndexCount('1');
    });

    let options = {
        series: [0, 0, 0],
        chart: {
            width: 300,
            type: 'pie',
        },
        plotOptions: {
            pie: {
                customScale: 0.9,
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
            console.log('개인정보 현황 차트 데이터', privacyIndexDto);
        });
    };

    const handleSelectPeriod = (el) => {
        getPrivacyIndexCount(el.dataset.value);
    }
</script>
<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle wjsel">
            <a href="/kokonut/member/privacy/search-list.html">개인정보 현황<span></span></a><div class="">
            <div class="sc_SelBox">
                <div class="selectBox" use:SelectBoxManager={{callback:handleSelectPeriod}}>
                    <div class="label">오늘</div>
                    <ul class="optionList">
                        <li class="optionItem" data-dateType="1">오늘</li>
                        <li class="optionItem" data-dateType="2">이번주</li>
                        <li class="optionItem" data-dateType="3">이번달</li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
        <div class="wjgrBox marT24">
            <div use:chart={options}></div>
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