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
import {onMount} from "svelte";

onMount(() => {
    placeComponentList();
});

const totalComponentList = [
    {
        component: WidgetCalendar,
        height: 303,
    },
    {
        component: WidgetPersonalInfoProvidedCount,
        height: 145,
    },
    {
        component: WidgetMyAccessLog,
        height: 249,
    },
    {
        component: WidgetPersonalInfoStatus,
        height: 228,
    },
    {
        component: WidgetSubscriptionManagement,
        height: 187,
    },
    {
        component: WidgetPersonalInfoColumns,
        height: 176,
    },
    {
        component: WidgetManagerAccessLog,
        height: 276,
    },
    {
        component: WidgetEmailStatus,
        height: 145,
    },
    {
        component: WidgetThirdPartyStatus,
        height: 231,
    },
];

let leftDiv = [];
let centerDiv = [];
let rightDiv = [];

// 주어진 Div 의 높이값을 계산
const getDivHeight = (div) => {
    return div.reduce((total, obj) => total + obj.height, 0);
}

const placeComponentList = () => {
    for (const componentInfo of totalComponentList) {
        const leftHeight = getDivHeight(leftDiv);
        const centerHeight = getDivHeight(centerDiv);
        const rightHeight = getDivHeight(rightDiv);

        // 높이가 가장 낮은 div를 찾아 컴포넌트를 분배
        if (leftHeight <= centerHeight && leftHeight <= rightHeight) {
            leftDiv = [...leftDiv, componentInfo];
        } else if (centerHeight <= leftHeight && centerHeight <= rightHeight) {
            centerDiv = [...centerDiv, componentInfo];
        } else {
            rightDiv = [...rightDiv, componentInfo];
        }
    }
}

</script>

<div class="wjListBox">
    <div class="wjList">
        {#each leftDiv as {component}}
            <svelte:component this={component} />
        {/each}
    </div>
    <div class="wjList">
        {#each centerDiv as {component}}
            <svelte:component this={component} />
        {/each}
    </div>
    <div class="wjList">
        {#each rightDiv as {component}}
            <svelte:component this={component} />
        {/each}
    </div>
</div>

{#if false}
    <div class="wiLineBox">
        <div class="wibtn" id="wiset"><img src="/assets/images/main/wi_seticon.png" alt="" >위젯 편집</div>
    </div>
{/if}