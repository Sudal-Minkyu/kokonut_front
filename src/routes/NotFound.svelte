
<script>
    import Header from "../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import { is_login } from "../lib/store.js"
</script>

{#if $is_login}
    <Header />
{/if}
<section class="er404Wrap" in:fade>
    <div class="er404Inner" style="{$is_login === true ? 'left:140px' : 'left:0px'}">
        <div class="er404InnerBox">
            <div class="erroe404_illustration"><img src="/assets/images/common/404erroe_illustration.png" alt=""></div>
            <div class="erroe404tbox">
                <dl>
                    <p>요청하신 페이지가 존재하지 않습니다.</p>
                    <span>(ERROR 404)</span>
                </dl>
                {#if is_login}
                    <div class="erroe404btn"><a use:link href="/service">돌아가기</a></div>
                {:else}
                    <div class="erroe404btn"><a use:link href="/">돌아가기</a></div>
                {/if}
            </div>
        </div>
    </div>
</section>