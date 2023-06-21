<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import WidgetSwiperNews from "../../components/service/home/WidgetSwiperNews.svelte";
    import WidgetTodayStatus from "../../components/service/home/WidgetTodayStatus.svelte";
    import DynamicComponentPlacer from "../../components/service/home/DynamicComponentPlacer.svelte";


</script>
<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="maincontent">
            <WidgetSwiperNews />
            <WidgetTodayStatus />

            <DynamicComponentPlacer />
        </div>
    </div>
</section>