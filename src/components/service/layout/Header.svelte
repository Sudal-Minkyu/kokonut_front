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
        knPhoneNumber
    } from "../../../lib/store.js"
    import restapi from "../../../lib/api.js";
    import {beforeUpdate} from "svelte";
    import CustomConfirm from "../../common/ui/CustomConfirm.svelte";
    import Banner from "../../common/ui/Banner.svelte";

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
                        is_login.set(true);
                        knNameHeader.set(json_success.data.sendData.knName);
                        knEmailHeader.set(json_success.data.sendData.knEmail);
                        knPhoneNumber.set(json_success.data.sendData.knPhoneNumber);
                        cpNameSider.set(json_success.data.sendData.cpName);
                        role.set(json_success.data.sendData.role);
                        electronic.set(json_success.data.sendData.electronic)
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