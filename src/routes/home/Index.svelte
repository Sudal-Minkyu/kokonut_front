<head>
    <!-- Home CSS -->
    <link href='/assets/css/home/maincommon.css' rel='stylesheet'>
    <link href='/assets/css/home/animate.css' rel='stylesheet'>
    <link href='/assets/css/home/main.css' rel='stylesheet'>
    <link href='/assets/css/home/mainprice.css' rel='stylesheet'>
    <link href='/assets/css/home/mainreset.css' rel='stylesheet'>
</head>

<script>
    import HomeHeader from "../../components/home/layout/HomeHeader.svelte"

    import FirstIndex from '../../components/home/index/FirstIndex.svelte';
    import SecondIndex from '../../components/home/index/SecondIndex.svelte';
    import ThirdIndex from '../../components/home/index/ThirdIndex.svelte';
    import FourthIndex from '../../components/home/index/FourthIndex.svelte';
    import FifthIndex from '../../components/home/index/FifthIndex.svelte';

    import HomeFooter from "../../components/home/layout/HomeFooter.svelte"
    import FirstHalfIndex from "../../components/home/index/FirstHalfIndex.svelte";
    import SixthIndex from "../../components/home/index/SixthIndex.svelte";
    import SeventhIndex from "../../components/home/index/SeventhIndex.svelte";
</script>

<!-- 해더 -->
<HomeHeader />
<section class="mainWrap">
    <!-- 첫번째 댑스 -->
    <FirstIndex />

    <!-- 추가된 1.5 댑스 -->
    <FirstHalfIndex />

    <!-- 두번째 댑스 -->
    <SecondIndex />

    <!-- 관리적 보호 조치 -->
    <ThirdIndex />

    <!-- 기술적 보호 조치 -->
    <FourthIndex />

    <!-- 인정받는 서비스 -->
    <FifthIndex />

    <!-- 편의성 -->
    <SixthIndex />

    <!-- 파트너 -->
    <SeventhIndex />
</section>

<!-- 푸터 -->
<HomeFooter />