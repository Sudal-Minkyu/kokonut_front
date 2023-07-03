<script>
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";
    import {link} from "svelte-spa-router";

    onMount(() => {
        // getPrivacyItemCount();
    });

    const getPrivacyItemCount = () => {
        ajaxGet('/v2/api/Index/privacyItemCount', false, (res) => {
            console.log('개인정보 항목', res);
        });
    }

</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/#/service/environment/personalInfoItem">개인정보 항목<span></span></a>
        </div>
        <div class="wj_total marT20">총 개인정보 항목<span>10</span></div>
        <div class="wjcountBox marT12">
            <div class="wjcount">
                <span>암호화 된 항목</span>
                <dl>7</dl>
            </div>
            <div class="wjcount">
                <span>민감정보 항목</span>
                <dl>3</dl>
            </div>
            <div class="wjcount">
                <span>고유식별 정보</span>
                <dl>1</dl>
            </div>
        </div>
    </div>
</div>