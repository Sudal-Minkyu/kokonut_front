<script>
    import { link } from 'svelte-spa-router'
    import {
        userInfoData,
    } from "../../../lib/store.js"
    import {logout} from "../../common/authActions.js";

    let timeLeftClock = '00:00';
    // 초 단위를 문자형 시간으로 변환
    function formatTime(seconds) {
        if (typeof seconds !== 'number' || seconds <= 0) {
            return '00:00';
        }

        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        let result = '';

        if (hrs > 0) {
            result += hrs + ':';
        }

        if (mins < 10 && hrs > 0) {
            result += '0';
        }
        result += mins + ':';

        if (secs < 10) {
            result += '0';
        }
        result += secs;

        return result;
    }

    const getRemainingTime = () => {
        const now = new Date();

        const currentExpireDate = getExpireDate();
        // 만료 시각과 현재 시각의 차이를 밀리초로 계산
        let remainingTimeInMilliseconds = currentExpireDate ? currentExpireDate - now : 0;

        // 시각이 0 이하이면 "00:00" 반환
        if (remainingTimeInMilliseconds <= 0) {
            return "00:00";
        }

        // 밀리초를 초 단위로 변환
        let remainingTimeInSeconds = Math.floor(remainingTimeInMilliseconds / 1000);

        // 시간, 분, 초 계산
        const hours = Math.floor(remainingTimeInSeconds / 3600);
        remainingTimeInSeconds %= 3600;
        const minutes = Math.floor(remainingTimeInSeconds / 60);
        const seconds = remainingTimeInSeconds % 60;

        // 문자열로 반환. 시간이 0일 경우 시간은 생략
        if (hours > 0) {
            return `${hours}:${            minutes.toString().padStart(2, '0')
            }:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    const getExpireDate = () => {
        const expireDateString = localStorage.getItem('expireDate').replaceAll('"', '');
        return expireDateString === 'null' ? null : new Date(expireDateString);
    }

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