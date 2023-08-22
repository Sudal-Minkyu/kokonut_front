<script>
    import restapi from "../../../../lib/api.js";
    import { fade } from 'svelte/transition'

    import { ipCheck, onlyNumber} from '../../../../lib/common'
    import {ajaxParam, reportCatch} from "../../../common/ajax.js";

    export let apiKeyInfo;
    export let ipChange;
    export let accessIpList;

    let myIpCheck = false;
    let ipChecked = false;
    let ipCheckedMsg = "";
    let ip1 = "";
    let ip2 = "";
    let ip3 = "";
    let ip4 = "";

    let i
    let ipMemo;
    // 허용 IP 등록
    function accessIpAdd() {
        console.log("허용 IP 등록 호출");

        if(ip1 === "" || ip2 === "" || ip3 === "" || ip4 === "") {
            ipChecked = true;
            ipCheckedMsg = "IP를 모두 입력해주세요."
            return false;
        }

        let accessIp = ip1+"."+ip2+"."+ip3+"."+ip4

        if (accessIpList.map(obj => obj.accessIp).includes(accessIp)) {
            ipChecked = true;
            ipCheckedMsg = "이미 등록된 IP 입니다.";
            return false;
        }

        let ipCheckResult = ipCheck(accessIp);

        if(!ipCheckResult) {
            console.log("허용 IP 등록 시작");

            let url = "/v2/api/ApiKey/apiKeyIpSave"

            let sendData = {
                accessIp : accessIp,
                ipMemo : ipMemo,
            }

            ajaxParam(url, sendData, (res) => {
                try {
                    apiKeyInfo();
                    ipChange(0);
                } catch (e) {
                    reportCatch('temp121', e);
                }
            }, (errCode, errMsg) => {
                try {
                    if (errCode === 500) {
                        alert(errMsg);
                        apiKeyInfo();
                        ipChange(0);
                    }
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp122', e);
                }
            });
        } else {
            // IP 형식에 맞지않음
            ipChecked = true;
            ipCheckedMsg = "허용할 IP 형식이 맞지 않습니다."
        }

    }

    export let getMyIp;

    // 현재 접속한 IP 클릭 함수
    function myIp() {
        if(myIpCheck) {
            ip1 = "";
            ip2 = "";
            ip3 = "";
            ip4 = "";
        } else {
            ip1 = getMyIp[0];
            ip2 = getMyIp[1];
            ip3 = getMyIp[2];
            ip4 = getMyIp[3];
        }
        myIpCheck = !myIpCheck
    }

</script>

<style>
    .bottomText {
        display: block;
        font-size: 15px;
        color: red;
    }

    .bottomText.not_work{
        display: none;
    }
</style>

<div class="koko_popup ipdel_pop" data-popup="ipdel_pop" in:fade out:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">접속 허용 IP 추가</h3>
            </div>
            <form>
                <div class="marB24">
                    <div class="kopopMuntiinputBox">
                        <label>공인 IP</label>
                        <div class="kopopMuntiinputInner">
                            <div class="kopopMuntiinput">
                                <input type="text" bind:value={ip1} on:keyup={() => ip1 = onlyNumber(ip1)} maxlength="3" />
                            </div>
                            <div class="kopopMuntiinput">
                                <input type="text" bind:value={ip2} on:keyup={() => ip2 = onlyNumber(ip2)} maxlength="3" />
                            </div>
                            <div class="kopopMuntiinput">
                                <input type="text" bind:value={ip3} on:keyup={() => ip3 = onlyNumber(ip3)} maxlength="3" />
                            </div>
                            <div class="kopopMuntiinput">
                                <input type="text" bind:value={ip4} on:keyup={() => ip4 = onlyNumber(ip4)} maxlength="3"/>
                            </div>
                        </div>
                        <p style="margin-top: 7px;" class="{ipChecked === true ? 'bottomText' : 'bottomText not_work'}">{ipCheckedMsg}</p>
                    </div>
                    <div class="koko_check">
                        <input type="checkbox" on:click={myIp} id="IPcheck">
                        <label for="IPcheck">
                            <em></em>
                            <p class="check">현재 접속한 IP</p>
                        </label>
                    </div>
                </div>
                <div class="kopopinput marB24">
                    <label>메모</label>
                    <input type="text" bind:value={ipMemo} placeholder="메모를 적어주세요."/>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_go">
                        <button type="button" on:click={accessIpAdd}>추가</button>
                    </div>
                    <div class="koko_cancel" on:click={() => ipChange(0)}>취소</div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close ipadd_pop_close" data-popup-close="ipadd_pop_close" on:click={() => ipChange(0)}></div>
    </div>
</div>
