<script>
    import {ajaxGet, reportCatch} from "../../common/ajax.js";
    import {onMount} from "svelte";
    import {link} from "svelte-spa-router";

    onMount(() => {
        getPrivacyItemCount();
    });

    let privacyItemCount = {
        totalAddCount: '',
        securityCount: '',
        sensitiveCount: '',
        uniqueCount: '',
    }

    const getPrivacyItemCount = () => {
        ajaxGet('/v2/api/Index/privacyItemCount', false, (res) => {
            try {
                privacyItemCount = res.data.sendData.privacyItemCount;
            } catch (e) {
                reportCatch('temp136', e);
            }
        });
    }

</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/service/environment/personalInfoItem">개인정보 항목<span></span></a>
        </div>
        <div class="wj_total marT20">총 개인정보 항목<span>{privacyItemCount.totalAddCount}</span></div>
        <div class="wjcountBox marT12">
            <div class="wjcount">
                <span>암호화 된 항목</span>
                <dl>{privacyItemCount.securityCount}</dl>
            </div>
            <div class="wjcount">
                <span>민감정보 항목</span>
                <dl>{privacyItemCount.sensitiveCount}</dl>
            </div>
            <div class="wjcount">
                <span>고유식별 정보</span>
                <dl>{privacyItemCount.uniqueCount}</dl>
            </div>
        </div>
    </div>
</div>