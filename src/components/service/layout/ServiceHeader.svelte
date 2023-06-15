<script>
    import { link } from 'svelte-spa-router'
    import {
        is_login,
        accessToken,
        page,
        knNameHeader,
        knEmailHeader,
        cpNameSider,
        knPhoneNumber, csAutoLogoutSetting
    } from "../../../lib/store.js"
    import { ajaxParam } from "../../common/ajax.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    function logout() {
        let sendData = {
            accessToken : $accessToken,
        }

        ajaxParam('/v1/api/Auth/logout', sendData, (json_success) => {
            // 기본값 초기화처리
            knNameHeader.set('');
            knEmailHeader.set('');
            knPhoneNumber.set('');
            cpNameSider.set('');
            is_login.set(false);
            accessToken.set('');
            page.set(0);
            location.href='/login';
        }, (errorCode) => {
            return {
                action: 'ERRORDO',
                message: `로그아웃중 (${errorCode}) 에러 발생하였으나 로그아웃 처리`,
            }
        });
    }

    $: timeLeft = 60 * Number($csAutoLogoutSetting.minute); // 60초 * 로그아웃만료설정

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

    const autoLogoutInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 1) {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '자동 로그아웃 됨', // 제목
                contents1: formatTime(60 * Number($csAutoLogoutSetting)) + ' 동안 사용이 감지되지 않았습니다.', // 내용
                contents2: '자동 로그아웃 됩니다.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: logout,
            });
            clearInterval(autoLogoutInterval);
        }
    }, 1000);

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
                    <span style="font-size: 1.7rem; font-weight: normal">자동 로그아웃 까지 남은시간 : {formatTime(timeLeft)}</span>
                </div>
                <div class="myinfoBox">
                    <div class="myinfoIcon"></div>
                    <span>{$knNameHeader}</span>
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