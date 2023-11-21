<script>
    import Router from 'svelte-spa-router';
    import routes from './routes.js';
    import {expireDate, is_login, userInfoData, tracked, refreshStore, timeLeftClock} from "./lib/store.js";
    import {onDestroy, onMount} from "svelte";
    import {location, push} from "svelte-spa-router";
    import {ajaxGet, reportCatch} from "./components/common/ajax.js";
    import {logout} from "./components/common/authActions.js";
    import {get} from "svelte/store";
    import {openConfirm} from "./components/common/ui/DialogManager.js";

    let currentLocation;
    let debounceTimeoutReset; // 자리비움시 로그아웃 되는 기능을 1초간 모아서 실행하도록 한다.

    let autoLogoutInterval;
    onMount(() => {
        setIdleLogoutEvent();
        window.addEventListener('storage', handleRefreshStore);

        // 페이지 변경시마다 실행되도록 하기 위함
        const unsubscribe = location.subscribe((href) => {
            if (currentLocation !== href) {
                currentLocation = href;
                authProcess(href);
            }
        });

        return unsubscribe; // 컴포넌트 파괴시 구독이 중지되도록 함 (굳이 불필요할 수 있음)
    });

    onDestroy(() => {
        window.removeEventListener('storage', handleRefreshStore);
        removeIdleLogoutEvent();
        clearInterval(autoLogoutInterval);
    });

    const authProcess = (href) => {
        const isServiceLocation = href.substring(0, 8) === '/service';
        if (isServiceLocation && $is_login) {
            getUserInfo();
            autoLogoutInterval = setInterval(() => {
                timeLeftClock.set(getRemainingTime());
                if (new Date($expireDate.replaceAll('"', '')) < new Date()) {
                    openConfirm({
                        icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: '자동 로그아웃 됨', // 제목
                        contents1: formatTime(60 * Number($userInfoData.csAutoLogoutSetting)) + ' 동안 사용이 감지되지 않았습니다.', // 내용
                        contents2: '자동 로그아웃 됩니다.',
                        btnCheck: '확인', // 확인 버튼의 텍스트
                    });
                    clearInterval(autoLogoutInterval);
                    logout();
                }
            }, 1000);
        } else if (isServiceLocation) { // 로그인을 하지 않고 서비스 페이지 진입
            clearInterval(autoLogoutInterval);
            push('/login');
        } else { // 사용자 정보 불필요 페이지
            clearInterval(autoLogoutInterval);
        }
    }

    const getUserInfo = () => {
        const pastRole = get(userInfoData).role;

        ajaxGet('/v2/api/Admin/authorityCheck', false, (res) => {
            try {
                const userInfo = res.data.sendData;
                userInfoData.set(userInfo);
                if (userInfo.knActiveStatus === "0") {
                    logout();
                    alert("사용자의 계정이 비활성화되어 로그아웃 되었습니다.");
                }
                if (pastRole && pastRole !== userInfo.role) {
                    logout();
                    alert("사용자의 권한 등급이 변경되어 로그아웃합니다. 다시 로그인 해 주세요.");
                }

                const currentExpireDate = getExpireDate();
                if (currentExpireDate === null || (currentExpireDate > new Date())) {
                    expireDate.set(getFutureDate(Number($userInfoData.csAutoLogoutSetting)).toISOString());
                } else {
                    openConfirm({
                        icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: '자동 로그아웃 됨', // 제목
                        contents1: formatTime(60 * Number($userInfoData.csAutoLogoutSetting)) + ' 동안 사용이 감지되지 않았습니다.', // 내용
                        contents2: '자동 로그아웃 됩니다.',
                        btnCheck: '확인', // 확인 버튼의 텍스트
                    });
                    logout();
                }
            } catch (e) {
                alert('관리자 정보를 수신했지만, 데이터에 문제가 있습니다. 페이지를 새로고침한 후 다시 시도를 해보세요. ' +
                    '계속 같은 문제가 발생하면 관리자에게 문의해 주세요.');
                logout();
                reportCatch('temp037', e);
            }
        }, (errCode, errMsg) => {
            try {
                logout();
            } catch (e) {
                reportCatch('temp038', e);
            }
        });
    }

    // 현재 시각의 분에 인자로 받은 분을 더해 새로운 분으로 설정한 객체 반환
    function getFutureDate(minutesFromNow) {
        let futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + minutesFromNow);
        return futureDate;
    }

    // 자리비움시 로그아웃 이벤트 걸기
    const setIdleLogoutEvent = () => {
        document.addEventListener('click', handleTimeoutReset);
        document.addEventListener('mousemove', handleTimeoutReset);
        document.addEventListener('keydown', handleTimeoutReset);
    }

    // 자리비움시 로그아웃 이벤트 해제
    const removeIdleLogoutEvent = () => {
        document.removeEventListener('click', handleTimeoutReset);
        document.removeEventListener('mousemove', handleTimeoutReset);
        document.removeEventListener('keydown', handleTimeoutReset);
    }

    // 특정 동작 발생시 자동 로그아웃을 리셋하기 위함
    const handleTimeoutReset = () => {
        clearTimeout(debounceTimeoutReset);
        debounceTimeoutReset = setTimeout(checkTimeout, 1000); // 1000ms 동안 추가 이벤트가 없을 때 처리
    }

    const checkTimeout = () => {
        if ($is_login && $location.substring(0, 8) === '/service') {
            const currentExpireDate = getExpireDate();
            if (currentExpireDate === null || (currentExpireDate > new Date())) {
                expireDate.set(getFutureDate(Number($userInfoData.csAutoLogoutSetting)).toISOString());
            } else {
                openConfirm({
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '자동 로그아웃 됨', // 제목
                    contents1: formatTime(60 * Number($userInfoData.csAutoLogoutSetting)) + ' 동안 사용이 감지되지 않았습니다.', // 내용
                    contents2: '자동 로그아웃 됩니다.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
                logout();
            }
        }
    }

    const getExpireDate = () => {
        const expireDateString = localStorage.getItem('expireDate').replaceAll('"', '');
        return expireDateString === 'null' ? null : new Date(expireDateString);
    }

    /**
     * storage 가 변경되는 이벤트가 있을 때 실행되며, 이벤트의 대상키가 store의 추적되는 객체값이면 업데이트를 위함.
     * 이는 본탭에서는 스토어의 정보가 갱신되지만, 다른탭에서 갱신된 로컬스토어 값은 본탭에 반영이 안되는 문제를 해결하기 위함
     * 스토리지 이벤트 발생시 붙는 맨앞, 맨뒤의 "를 제거해줘야 정상 작동을 보장한다.
     * 로그인 여부가 false 로 바뀌면 해당 스토리지를 공유하는 다른 탭과 창도 일제히 다른 페이지도 로그아웃 되도록 함
     * @param event
     */
    function handleRefreshStore(event) {
        const newValue = typeof event.newValue === 'string' ? event.newValue.replace(/^"|"$/g, '') : null;
        if (Object.keys(tracked).includes(event.key)) {
            refreshStore(event.key, newValue);
        }
        if (event.key === 'is_login' && !JSON.parse(newValue)) {
            push('/login');
        }
    }

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

<Router {routes} />