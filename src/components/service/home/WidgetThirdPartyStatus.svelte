<script>
    import {link} from "svelte-spa-router";
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/service">서드파티 연동<span></span></a>
        </div>
        <div class="wjthirdBox marT24">
            <div class="wjthird">
                <div class="wjthirdIcon"><img src="/assets/images/common/bizmlogo.png" alt="">비즈엠</div>
                <div class="on_third">사용중</div>
            </div>
            <div class="wjthird">
                <div class="wjthirdIcon"><img src="/assets/images/common/bizmlogo.png" alt="">비즈엠</div>
                <div class="off_third">사용안함</div>
            </div>
        </div>
    </div>
</div>