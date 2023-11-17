<script>
	import ServiceHeader from "./ServiceHeader.svelte"
	import Sider from "./Sider.svelte"
    import {
        mainScreenBlockerVisibility,
    } from "../../../lib/store.js"
    import CustomConfirm from "../../common/ui/CustomConfirm.svelte";
    import Banner from "../../common/ui/Banner.svelte";
    import MainScreenBlocker from "../../common/ui/MainScreenBlocker.svelte";

</script>

<!--{#if auth }-->
<ServiceHeader />
<Sider />
<!--{/if}-->

<CustomConfirm />
<Banner />
<MainScreenBlocker  visibility={$mainScreenBlockerVisibility}/>