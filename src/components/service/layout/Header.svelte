<script>
	import ServiceHeader from "./ServiceHeader.svelte"
	import Sider from "./Sider.svelte"
    import {
        is_login,
        doChangePwdLater,
        userInfoData, expireDate, mainScreenBlockerVisibility,
    } from "../../../lib/store.js"
    import {beforeUpdate} from "svelte";
    import CustomConfirm from "../../common/ui/CustomConfirm.svelte";
    import Banner from "../../common/ui/Banner.svelte";
    import MyPagePwd from "../environment/mypage/MyPagePwd.svelte";
    import {logout} from "../../common/authActions.js";
    import {ajaxGet} from "../../common/ajax.js";
    import MainScreenBlocker from "../../common/ui/MainScreenBlocker.svelte";

    let isMyPagePwdVisible = false;

    // let auth = false;
    //
    // // 화면단 실시간 변경설정
    beforeUpdate(async () => {
        is_login.subscribe(value => {
            // auth = value;
            if (value === true) {
                let url = "/v2/api/Admin/authorityCheck"

                ajaxGet(url, false, (res) => {
                    const userInfo = res.data.sendData;
                    is_login.set(true);
                    userInfoData.set(userInfo);
                    expireDate.set(getFutureDate(Number(userInfo.csAutoLogoutSetting)).toISOString());

                    if (!$doChangePwdLater && userInfo.csPasswordChangeState === '2') {
                        isMyPagePwdVisible = true;
                    }
                }, (errCode, errMsg) => {
                    logout();
                });
            } else {
                // alert("세션이 종료되어 로그아웃됩니다.");
                console.log("로그아웃 하였습니다.");
                logout();
            }
        });
    });

    function getFutureDate(minutesFromNow) {
        let futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + minutesFromNow);
        return futureDate;
    }

</script>

<!--{#if auth }-->
<ServiceHeader />
<Sider />
<!--{/if}-->

<CustomConfirm />
<Banner />
<MainScreenBlocker  visibility={$mainScreenBlockerVisibility}/>

<!-- 비밀번호 변경 기간 도래에 따른 팝업 -->
<MyPagePwd bind:visible={isMyPagePwdVisible} regularChangeRoutine={true} />