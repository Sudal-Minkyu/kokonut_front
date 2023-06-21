<script>
import WidgetPersonalInfoColumns from "./WidgetPersonalInfoColumns.svelte";
import WidgetPersonalInfoProvidedCount from "./WidgetPersonalInfoProvidedCount.svelte";
import WidgetEmailStatus from "./WidgetEmailStatus.svelte";
import WidgetMyAccessLog from "./WidgetMyAccessLog.svelte";
import WidgetSubscriptionManagement from "./WidgetSubscriptionManagement.svelte";
import WidgetThirdPartyStatus from "./WidgetThirdPartyStatus.svelte";
import WidgetPersonalInfoStatus from "./WidgetPersonalInfoStatus.svelte";
import WidgetCalendar from "./WidgetCalendar.svelte";
import WidgetManagerAccessLog from "./WidgetManagerAccessLog.svelte";

const totalComponentList = [WidgetCalendar, WidgetPersonalInfoProvidedCount, WidgetMyAccessLog, WidgetPersonalInfoStatus,
    WidgetSubscriptionManagement, WidgetPersonalInfoColumns, WidgetManagerAccessLog, WidgetEmailStatus, WidgetThirdPartyStatus];

const leftDiv = [WidgetCalendar, WidgetPersonalInfoProvidedCount, WidgetMyAccessLog];

</script>

<div class="wjListBox">

    <div class="wjList">
        <WidgetCalendar year={2023} month={6} />
        <WidgetPersonalInfoProvidedCount />
        <WidgetMyAccessLog />
    </div>
    <div class="wjList">
        <WidgetPersonalInfoStatus />
        <WidgetSubscriptionManagement />
        <WidgetPersonalInfoColumns />
    </div>
    <div class="wjList">
        <WidgetManagerAccessLog />
        <WidgetEmailStatus />
        <WidgetThirdPartyStatus />
    </div>
</div>

<div class="wiLineBox">
    <div class="wibtn" id="wiset"><img src="/assets/images/main/wi_seticon.png" alt="" >위젯 편집</div>
</div>