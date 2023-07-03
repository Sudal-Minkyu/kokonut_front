<script>
    import {chart} from 'svelte-apexcharts';
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";

    onMount(() => {
        getTodayChartData();
    });

    const options = {
        series: [{
            name: 'API 호출',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
            name: '암호화',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
            name: '복호화',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
        chart: {
            height: 220,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },
        xaxis: {
            type: 'category',
            categories: ['0시', '1시', '2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시', '10시', '11시', '12시'
                , '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시', '22시', '23시', '24시'],
        },
        tooltip: {
            x: {
                show: false,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
    };

    const getTodayChartData = () => {
        ajaxGet('/v2/api/Index/todayIndexGraph', false, (res) => {
            const chartData = res.data.sendData;
            console.log('오늘의 서비스 현황', chartData);
            options.series[0].data = chartData.apiCallIndexList;
            options.series[1].data = chartData.encryptionIndexList;
            options.series[2].data = chartData.decryptionIndexList;
        });
    };
</script>

<div class="main_status_board" style="padding-bottom: 0;">
    <div class="today_gr_Inner">
        <h2 class="board_title">오늘의 서비스 현황</h2>
        <div use:chart={options}></div>
<!--        <div class="tg_categoryBox">-->
<!--            <div class="tg_category"><span style="background: #00C389"></span>API 호출 수</div>-->
<!--            <div class="tg_category"><span style="background: #4070E0"></span>트래픽 사용량</div>-->
<!--            <div class="tg_category"><span style="background: #FF6752"></span>암복호화 수</div>-->
<!--        </div>-->
<!--        <div class="today_gr_box">-->
<!--            <img src="/assets/images/main/today_gr.png" alt="" style="max-width:100%;">-->
<!--        </div>-->
    </div>
</div>