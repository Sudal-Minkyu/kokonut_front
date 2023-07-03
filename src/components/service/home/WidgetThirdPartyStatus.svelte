<script>
    import {link} from "svelte-spa-router";
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/#/service">서드파티 연동<span></span></a>
        </div>
        <div class="wjthirdBox marT24">
            <div class="wjthird">
                <div class="wjthirdIcon"><img src="/assets/images/common/kakao_icon.png" alt="">카카오톡</div>
                <div class="on_third">연동중</div>
            </div>
            <div class="wjthird">
                <div class="wjthirdIcon"><img src="/assets/images/common/slack_icon.png" alt="">슬랙</div>
                <div class="on_third">연동중</div>
            </div>
            <div class="wjthird">
                <div class="wjthirdIcon"><img src="/assets/images/common/google_forms_icon.png" alt="">Google Forms</div>
                <div class="off_third">연동중지</div>
            </div>
        </div>
    </div>
</div>