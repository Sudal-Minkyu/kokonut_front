<script>
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";
    import {link} from "svelte-spa-router";

    let adminConnectInfo = {
        adminConnectList: [],
        todayConnectCount: '',
    };

    onMount(() => {
        getManagerAccessLog();
    });

    const getManagerAccessLog = () => {
        ajaxGet('/v2/api/Index/adminConnectInfo', false, (res) => {
            adminConnectInfo = res.data.sendData;
            console.log('관리자 활동 이력', adminConnectInfo);
        });
    };
</script>
<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/service/adminActivity">관리자 활동 이력<span></span></a>
            <div class="wj_adminCurBox"><img src="/assets/images/main/wj_admin_icon.png" alt=""><span>{adminConnectInfo.todayConnectCount}</span></div>
        </div>
        <div class="wj_adminContentBox marT24">
            {#each adminConnectInfo.adminConnectList as {connectState, connectTime, knName, roleName, roleCode}}
                <div class="wj_admin">
                    <div class="wjCircleBox">
                        <div class="wjCircle {roleCode}">{knName.substring(0,1)}</div>
                        <div class="{connectState === '1' ? 'wjdot_on' : 'wjdot_off'}"></div>
                    </div>
                    <div class="wjaText">
                        <span>{roleName}</span>
                        <dl>{knName}</dl>
                    </div>
                    <div class="wjaTime">{connectTime}</div>
                </div>
            {/each}
        </div>
    </div>
</div>