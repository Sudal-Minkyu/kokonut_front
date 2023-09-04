<script>
    import {link} from "svelte-spa-router";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";

    let thirdPartyOnOffStatus = {
        bizmUseType: '',
    }

    onMount(() => {
        getThirdPartyStatusInfo();
    });

    const getThirdPartyStatusInfo = () => {
        ajaxGet('/v2/api/Index/thirdPartyInfo', false, (res) => {
            console.log('서드파티 연동', res.data.sendData);
            thirdPartyOnOffStatus = res.data.sendData;
        });
    }
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/service/environment/thirdpartyconnection">서드파티 연동<span></span></a>
        </div>
        <div class="wjthirdBox marT24">
            <div class="wjthird">
                <div class="wjthirdIcon"><img src="/assets/images/common/bizmlogo.png" alt="">비즈엠</div>
                <div class="{thirdPartyOnOffStatus.bizmUseType === '1' ? 'on_third' : 'off_third'}">{thirdPartyOnOffStatus.bizmUseType === '1' ? '사용중' : '사용안함'}</div>
            </div>
        </div>
    </div>
</div>