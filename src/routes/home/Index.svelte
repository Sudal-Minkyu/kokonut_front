<head>
    <!-- Home CSS -->
    <link href='/assets/css/home/maincommon.css' rel='stylesheet'>
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


    import { onMount } from 'svelte';

</script>

<!-- 해더 -->
<HomeHeader />

<div class="mainWrap">

    <!-- 첫번째 댑스 -->
    <FirstIndex />

    <!-- 두번째 댑스 -->
    <SecondIndex />

    <!-- 관리적 보호 관리 -->
    <ThirdIndex />

    <!-- 관리적 보호 서브 -->
    <FourthIndex />

    <!-- 기술적 보호 관리 -->
    <FifthIndex />

</div>

<!-- 푸터 -->
<HomeFooter />