<script>
    import Router from 'svelte-spa-router'
    import routes from './routes.js'
    import {expireDate, is_login, userInfoData} from "./lib/store.js";
    import {onMount} from "svelte";
    import {location, push} from "svelte-spa-router";
    import {ajaxGet, reportCatch} from "./components/common/ajax.js";
    import {logout} from "./components/common/authActions.js";

    let isReadyToShow;
    let currentLocation;

    onMount(() => {
        // 페이지 변경시마다 실행되도록 하기 위함
        const unsubscribe = location.subscribe((href) => {
            if (currentLocation !== href) {
                currentLocation = href;
                authProcess(href);
            }
        });

        return unsubscribe; // 컴포넌트 파괴시 구독이 중지되도록 함 (굳이 불필요할 수 있음)
    });

    const authProcess = (href) => {
        isReadyToShow = false;
        const isServiceLocation = href.substring(0, 8) === '/service';
        if (isServiceLocation && $is_login) {
            if ($userInfoData.knEmail === '' || true) { // 사용자 정보 필요, 임시 통과조치
                getUserInfo();
            } else { // 사용자 정보 있음
                // 향후 로그인 정보 특정조건 갱신 필요의 경우 여기에 작성
                isReadyToShow = true;
            }
        } else if (isServiceLocation) { // 로그인을 하지 않고 서비스 페이지 진입
            push('/login');
        } else { // 사용자 정보 불필요 페이지
            isReadyToShow = true;
        }
    }

    const getUserInfo = () => {
        ajaxGet('/v2/api/Admin/authorityCheck', false, (res) => {
            try {
                const userInfo = res.data.sendData;
                is_login.set(true);
                userInfoData.set(userInfo);
                expireDate.set(getFutureDate(Number(userInfo.csAutoLogoutSetting)).toISOString());
                isReadyToShow = true;
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

    function getFutureDate(minutesFromNow) {
        let futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + minutesFromNow);
        return futureDate;
    }
</script>

{#if isReadyToShow}
    <Router {routes} />
{/if}