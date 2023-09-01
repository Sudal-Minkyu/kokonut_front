<script>
	import ServiceHeader from "./ServiceHeader.svelte"
	import Sider from "./Sider.svelte"
    import {
        doChangePwdLater,
        userInfoData, mainScreenBlockerVisibility,
    } from "../../../lib/store.js"
    import {onMount} from "svelte";
    import CustomConfirm from "../../common/ui/CustomConfirm.svelte";
    import Banner from "../../common/ui/Banner.svelte";
    import MyPagePwd from "../environment/mypage/MyPagePwd.svelte";
    import MainScreenBlocker from "../../common/ui/MainScreenBlocker.svelte";

    $: isTimeToChangePassword = !$doChangePwdLater && $userInfoData.csPasswordChangeState === '2';

    const reportURLToBeusable = () => {
        const w = window;
        const d = document;
        const a = "//rum.beusable.net/load/b230714e123446u947";
        w.__beusablerumclient__ = {
            load : function(src){
                var b = d.createElement("script");
                b.src = src; b.async=true; b.type = "text/javascript";
                d.getElementsByTagName("head")[0].appendChild(b);
            }
        };
        w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
    }

    onMount(() => {
        // 뷰저블 서비스 사용하려 한다면 주석해제
        // reportURLToBeusable();
    });
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