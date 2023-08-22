<script>
    import restapi from "../../../lib/api.js";
    import {querystring} from 'svelte-spa-router'
    import {onMount} from "svelte";
    import {ajaxGet, reportCatch} from "../ajax.js";

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

            ajaxGet(url, sendData, (res) => { // 차후 인증실패시 에러메시지를 ajax.js 기본기능으로 사용하여 표출할 수 있도록 할 것
                try {
                    alert("인증이 완료되었습니다.");
                    if (stateVal === "1" || stateVal === "5" || stateVal === "6" || stateVal === "7") {
                        opener.phoneCertCheck(stateVal, res.data.sendData.joinName, res.data.sendData.joinPhone);
                    } else {
                        opener.phoneCertCheck(stateVal, res.data.sendData.keyEmail, res.data.sendData.authOtpKey);
                    }
                    window.close();
                } catch (e) {
                    reportCatch('temp011', e);
                }
            }, (errCode, errMsg) => {
                try {
                    if (errMsg) {
                        alert(errMsg);
                    } else {
                        alert("통신문제로 인해 실패 하였습니다.");
                        console.log('실패내용', errMsg);
                    }
                    window.close();
                    return {action: 'NONE'}
                } catch (e) {
                    reportCatch('temp012', e);
                }
            });
        } else {
            alert("본인인증 실패했습니다.");
            window.close();
        }
    }

</script>