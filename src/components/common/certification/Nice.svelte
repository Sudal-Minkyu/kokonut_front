<script>
    import restapi from "../../../lib/api.js";
    import {querystring} from 'svelte-spa-router'
    import {onMount} from "svelte";

    onMount(async () => {

        setTimeout(() => nicePhoneCert(), 1);
    })

    // jQuery(function(){
    //     nicePhoneCert();
    // })

    // 검증
    let searchParams = new URLSearchParams($querystring);
    let encData = searchParams.get("enc_data");
    let encDataCheck = searchParams.has("enc_data");
    let stateVal = searchParams.get("state");

    function nicePhoneCert() {

        if(encData !== null && encDataCheck === true && stateVal !== "0") {

            let url = "/v1/api/NiceId/redirect"

            let sendData = {
                state : stateVal,
                enc_data : encData
            }

            restapi('v1', 'get', url, "param", sendData, 'application/json',
                (json_success) => {
                    if(json_success.data.status === 200) {
                        alert("인증이 완료되었습니다.");
                        if(stateVal === "1" || stateVal === "5") {
                            opener.phoneCertCheck(stateVal, json_success.data.sendData.joinName, json_success.data.sendData.joinPhone);
                        } else {
                            opener.phoneCertCheck(stateVal, json_success.data.sendData.keyEmail, json_success.data.sendData.authOtpKey);
                        }
                    } else {
                        alert(json_success.data.err_msg);
                    }
                    window.close();
                },
                (json_error) => {
                    console.log(json_error)
                    alert("서버 통신이 실패되었습니다.");
                    window.close();
                }
            )
        } else {
            alert("본인인증 실패했습니다.");
            window.close();
        }
    }

</script>