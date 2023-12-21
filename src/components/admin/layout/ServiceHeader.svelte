<script>
    import { link } from 'svelte-spa-router'
    import {
        userInfoData,
    } from "../../../lib/store.js"
    import {logout} from "../../common/authActions.js";

    let timeLeftClock = '00:00';

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
                    <span style="font-size: 1.7rem; font-weight: normal">자동 로그아웃 까지 남은시간 : {timeLeftClock}</span>
                </div>
                <div class="myinfoBox">
<!--                    <div class="myinfoIcon"></div>-->
                    <span>{$userInfoData.knName}님</span>
                </div>
                <div class="myinfoBox">
                    <span style="cursor: pointer;" on:click|once={logout}>로그아웃</span>
                </div>
<!--                <div class="myinfoMenu">-->
<!--                    <div class="notiText">알림</div>-->
<!--                    <div class="notiBoxInner">-->
<!--                        <div class="notiBox">-->
<!--                            <ul>-->
<!--                                <li>-->
<!--                                    <div class="no_new">NEW</div>-->
<!--                                    <dl>알림내용을 알려드립니다.</dl>-->
<!--                                    <span>2023. 4. 14</span>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <div class="no_new">NEW</div>-->
<!--                                    <dl>알림내용을 알려드립니다. 알림내용을</dl>-->
<!--                                    <span>2023. 4. 14</span>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <dl>알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. </dl>-->
<!--                                    <span>2023. 4. 14</span>-->
<!--                                </li>-->
<!--                            </ul>-->
<!--                            <div class="notiallBtn">-->
<!--                                <a href="">전체보기</a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="myinfoMenu">알림</div>-->
            </div>
        </div>
    </div>
</header>