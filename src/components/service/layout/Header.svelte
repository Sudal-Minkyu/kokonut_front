<script>
	import ServiceHeader from "./ServiceHeader.svelte"
	import Sider from "./Sider.svelte"
    import {
        is_login,
        knNameHeader,
        knEmailHeader,
        cpNameSider,
        role,
        electronic,
        knPhoneNumber,
        csPasswordChangeState,
        csAutoLogoutSetting, doChangePwdLater,
    } from "../../../lib/store.js"
    import restapi from "../../../lib/api.js";
    import {beforeUpdate} from "svelte";
    import CustomConfirm from "../../common/ui/CustomConfirm.svelte";
    import Banner from "../../common/ui/Banner.svelte";
    import MyPagePwd from "../environment/mypage/MyPagePwd.svelte";

    let isMyPagePwdVisible = false;

    // let auth = false;
    //
    // // 화면단 실시간 변경설정
    beforeUpdate(async () => {
        is_login.subscribe(value => {
            // auth = value;
            if (value === true) {
                let url = "/v2/api/Admin/authorityCheck"

                restapi('v2', 'get', url, "", {}, 'application/json',
                    (json_success) => {
                        const userInfo = json_success.data.sendData;
                        console.log('사용자 정보', userInfo);
                        is_login.set(true);
                        knNameHeader.set(userInfo.knName);
                        knEmailHeader.set(userInfo.knEmail);
                        knPhoneNumber.set(userInfo.knPhoneNumber);
                        cpNameSider.set(userInfo.cpName);
                        role.set(userInfo.role);
                        electronic.set(userInfo.electronic);
                        csPasswordChangeState.set(userInfo.csPasswordChangeState);
                        csAutoLogoutSetting.set({minute: userInfo.csAutoLogoutSetting});

                        if (!$doChangePwdLater && userInfo.csPasswordChangeState === '2') {
                            isMyPagePwdVisible = true;
                        }
                    },
                    (json_error) => {
                        console.log(json_error);
                        is_login.set(false);
                    }
                )
            } else {
                // alert("세션이 종료되어 로그아웃됩니다.");
                console.log("로그아웃 하였습니다.");
                is_login.set(false);
                location.href = '/#/login';
            }
        });
    })

</script>

<!--{#if auth }-->
<ServiceHeader />
<Sider />
<!--{/if}-->

<CustomConfirm />
<Banner />

<!-- 비밀번호 변경 기간 도래에 따른 팝업 -->
<MyPagePwd bind:visible={isMyPagePwdVisible} regularChangeRoutine={true} />