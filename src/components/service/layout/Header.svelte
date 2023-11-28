<script>
	import ServiceHeader from "./ServiceHeader.svelte"
	import Sider from "./Sider.svelte"
    import {
        doChangePwdLater,
        userInfoData, mainScreenBlockerVisibility,
    } from "../../../lib/store.js"
    import CustomConfirm from "../../common/ui/CustomConfirm.svelte";
    import Banner from "../../common/ui/Banner.svelte";
    import MyPagePwd from "../environment/mypage/MyPagePwd.svelte";
    import MainScreenBlocker from "../../common/ui/MainScreenBlocker.svelte";
    $: isTimeToChangePassword = !$doChangePwdLater && $userInfoData.csPasswordChangeState === '2';
</script>

<!--{#if auth }-->
<ServiceHeader />
<Sider />
<!--{/if}-->

<CustomConfirm />
<Banner />
<MainScreenBlocker  visibility={$mainScreenBlockerVisibility}/>

<!-- 비밀번호 변경 기간 도래에 따른 팝업 -->
<MyPagePwd bind:visible={isTimeToChangePassword} regularChangeRoutine={true} />