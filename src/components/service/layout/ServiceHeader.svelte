<script>
    import { link } from 'svelte-spa-router'
    import {
        page,
        userInfoData,
        expireDate,
    } from "../../../lib/store.js"
    import {openConfirm} from "../../common/ui/DialogManager.js";
    import {onDestroy, onMount} from "svelte";
    import {logout} from "../../common/authActions.js";

    let autoLogoutInterval;
    onMount(() => {
        document.addEventListener('click', handleTimeoutReset);
        document.addEventListener('mousemove', handleTimeoutReset);
        document.addEventListener('keydown', handleTimeoutReset);
        autoLogoutInterval = setInterval(() => {
            timeLeftClock = getRemainingTime();
            if (new Date(localStorage.getItem('expireDate').replaceAll('"', '')) < new Date()) {
                openConfirm({
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '자동 로그아웃 됨', // 제목
                    contents1: formatTime(60 * Number($userInfoData.csAutoLogoutSetting)) + ' 동안 사용이 감지되지 않았습니다.', // 내용
                    contents2: '자동 로그아웃 됩니다.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
                logout();
                clearInterval(autoLogoutInterval);
            }
        }, 1000);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleTimeoutReset);
        document.removeEventListener('mousemove', handleTimeoutReset);
        document.removeEventListener('keydown', handleTimeoutReset);
        clearInterval(autoLogoutInterval);
    });

    let debouncingTime;
    const handleTimeoutReset = () => {
        clearTimeout(debouncingTime);
        debouncingTime = setTimeout(() => {
            expireDate.set(getFutureDate(Number($userInfoData.csAutoLogoutSetting)).toISOString());
        }, 1000); // 1000ms 동안 추가 이벤트가 없을 때 처리
    }

    // 현재 시각의 분에 인자로 받은 분을 더해 새로운 분으로 설정한 객체 반환
    function getFutureDate(minutesFromNow) {
        let futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + minutesFromNow);
        return futureDate;
    }

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

        // 만료 시각과 현재 시각의 차이를 밀리초로 계산
        let remainingTimeInMilliseconds = new Date(localStorage.getItem('expireDate').replaceAll('"', '')) - now;

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

</script>

<header id="serviceHeader">
    <div class="topHead">
        <div class="topHeadInner">
            <div class="toplogo">
                <a use:link href="/service" on:click="{() => {$page = 0}}">
                    <img src="/assets/images/common/kokonutLogo.png" alt="kokonutLogo">
                </a>
            </div>
            <div class="topmyinfoBox">
                <div class="myinfoBox">
                    <span style="font-size: 1.7rem; font-weight: normal">자동 로그아웃 까지 남은시간 : {timeLeftClock}</span>
                </div>
                <div class="myinfoBox">
                    <div class="myinfoIcon"></div>
                    <span>{$userInfoData.knName}</span>
                </div>
                <div class="myinfoBox">
                    <span style="cursor: pointer;" on:click|once={logout}>로그아웃</span>
                </div>
                <div class="myinfoMenu">
                    <div class="notiText">알림</div>
                    <div class="notiBoxInner">
                        <div class="notiBox">
                            <ul>
                                <li>
                                    <div class="no_new">NEW</div>
                                    <dl>알림내용을 알려드립니다.</dl>
                                    <span>2023. 4. 14</span>
                                </li>
                                <li>
                                    <div class="no_new">NEW</div>
                                    <dl>알림내용을 알려드립니다. 알림내용을</dl>
                                    <span>2023. 4. 14</span>
                                </li>
                                <li>
                                    <dl>알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. </dl>
                                    <span>2023. 4. 14</span>
                                </li>
                            </ul>
                            <div class="notiallBtn">
                                <a href="">전체보기</a>
                            </div>
                        </div>
                    </div>
                </div>
<!--                <div class="myinfoMenu">알림</div>-->
            </div>
        </div>
    </div>
</header>