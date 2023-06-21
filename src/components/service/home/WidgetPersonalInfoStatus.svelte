<script>
    import {chart} from 'svelte-apexcharts';

    let options = {
        series: [2920, 280, 486, 4],
        chart: {
            width: 300,
            type: 'pie',
        },
        labels: ['활성', '신규가입', '휴면전환', '탈퇴'],
        responsive: [{
            breakpoint: 480,
            options: {
                dataLabels: {
                    enabled: false,
                },
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
</script>
<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a href="/kokonut/member/privacy/search-list.html">개인정보 현황<span></span></a>
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