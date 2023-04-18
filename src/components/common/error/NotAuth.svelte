
<script>
    import { link } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { is_login } from "../../../lib/store.js"

    onMount(async () => {
        if(is_login) {

        } else {

        }
    });

    export let pageErrMsg;
    export let pageErrUrl;
</script>

<section class="er404Wrap" in:fade>
    <div class="er404Inner" style="left:140px">
        <div class="er404InnerBox">
            <div class="erroe404_illustration"><img src="/assets/images/common/404erroe_illustration.png" alt=""></div>
            <div class="erroe404tbox">
                <dl>
                    <span>{pageErrMsg}</span>
                </dl>
                <div class="erroe404btn"><a use:link href="{pageErrUrl}">돌아가기</a></div>
            </div>
        </div>
    </div>
</section>