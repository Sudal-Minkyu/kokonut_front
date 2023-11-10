<script>
    import Router from 'svelte-spa-router';
    import routes from './routes.js';
    import {expireDate, is_login, userInfoData} from "./lib/store.js";
    import {onDestroy, onMount} from "svelte";
    import {location, push} from "svelte-spa-router";
    import {ajaxGet, reportCatch} from "./components/common/ajax.js";
    import {logout} from "./components/common/authActions.js";
    import {get} from "svelte/store";
    import {openConfirm} from "./components/common/ui/DialogManager.js";

    let currentLocation;
    let debounceTimeoutReset; // 자리비움시 로그아웃 되는 기능을 1초간 모아서 실행하도록 한다.

    onMount(() => {
        setIdleLogoutEvent();

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
        removeIdleLogoutEvent();
    });

    const authProcess = (href) => {
        const isServiceLocation = href.substring(0, 8) === '/service';
        if (isServiceLocation && $is_login) {
            getUserInfo();
        } else if (isServiceLocation) { // 로그인을 하지 않고 서비스 페이지 진입
            push('/login');
        } else { // 사용자 정보 불필요 페이지

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
        debounceTimeoutReset = setTimeout(() => {
            if ($is_login) {
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
        }, 1000); // 1000ms 동안 추가 이벤트가 없을 때 처리
    }

    const getExpireDate = () => {
        const expireDateString = localStorage.getItem('expireDate').replaceAll('"', '');
        return expireDateString === 'null' ? null : new Date(expireDateString);
    }
</script>

<Router {routes} />