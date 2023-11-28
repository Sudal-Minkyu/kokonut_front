<script>
    import { link } from 'svelte-spa-router'
    import {
        userInfoData, timeLeftClock,
    } from "../../../lib/store.js"
    import {logout} from "../../common/authActions.js";
</script>

<header id="serviceHeader">
    <div class="topHead">
        <div class="topHeadInner">
            <div class="toplogo">
                <a use:link href="/service">
                    <img src="/assets/images/common/kokonutLogo.png" alt="kokonutLogo">
                </a>
            </div>
            <div class="topmyinfoBox">
                <div class="myinfoBox">
                    <span style="font-size: 1.7rem; font-weight: normal">자동 로그아웃 까지 남은시간 : {$timeLeftClock}</span>
                </div>
                <div class="myinfoBox">
                    <span>{$userInfoData.knName}님</span>
                </div>
                <div class="myinfoBox">
                    <span style="cursor: pointer;" on:click|once={logout}>로그아웃</span>
                </div>
            </div>
        </div>
    </div>
</header>