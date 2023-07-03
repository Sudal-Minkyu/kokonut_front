<script>
    import { fade } from 'svelte/transition'
    import { onlyNumber } from '../../../../lib/common'
    import {ajaxBody} from "../../../common/ajax.js";

    export let deleteIpListInit;
    export let apiKeyInfo;
    export let ipChange;

    let otpValue = "";
    export let deleteIpList = "";

    let otpError = false;
    let otp_err_msg ="";

    // 허용 IP 삭제
    function accessIpDelete() {
        if(wanningChecked) {
            if(wanningText){
                wanningText = false;
            }

            if(deleteIpList.length !== 0) {
                if(otpValue === "") {
                    otpError = true;
                    otp_err_msg = "구글 OTP 값이 존재하지 않습니다.";
                    return false;
                }

                console.log("허용 IP 삭제 시작");

                let url = "/v2/api/ApiKey/apiKeyIpDelete"

                let sendData = {
                    otpValue : otpValue,
                    deleteIpList : deleteIpList,
                }

                ajaxBody(url, sendData, (res) => {
                    deleteIpListInit(); // 값 초기화
                    apiKeyInfo();
                    ipChange(0);
                }, (errCode, errMsg) => {
                    if (errCode === "KO010" || errCode === "KO011" || errCode === "KO012") {
                        otpError = true;
                        otp_err_msg = errMsg;
                    } else {
                        alert(errMsg);
                    }
                    return {action: 'NONE'};
                });
            }
        } else {
            // 주의사항 체크해야함
            wanningText = true;
        }
    }

    let wanningChecked = false;
    let wanningText = false;
    function handleClick(event) {
        wanningChecked = !wanningChecked;
        setTimeout(() => event.target.checked = wanningChecked, 0);
    }

</script>

<style>
    .ipListText {
        font-size: 20px;
        color: #00C389;
        text-align: center;
    }

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
            <div class="koko_popup_titleh4">
                <h4 class="">선택하신 IP를 정말 삭제하실 건가요?</h4>
            </div>
            <div class="kopopinput marB16">
                <label>선택하신 IP 목록</label>
                {#if deleteIpList.length !== 0}
                    <ul class="ipListText">
                    {#each deleteIpList as deleteIp, i}
                        <li>{deleteIp}</li>
                    {/each}
                    </ul>
                {:else}
                    <p class="bottomText">삭제하실 IP를 하나라도 선택해주세요.</p>
                {/if}
            </div>
            <div class="kopopinput marB24">
                <label>구글 OTP</label>
                <input type="text" id="opt" bind:value={otpValue} maxlength="6" on:keyup={() => otpValue = onlyNumber(otpValue)} placeholder="구글 OTP를 적어주세요." />
                <p style="margin-top: 7px;" class="{otpError === true ? 'bottomText' : 'bottomText not_work'}">{otp_err_msg}</p>
            </div>
            <div class="popcaseInfoBox">
                <p>주의사항</p>
                <dl>해당 IP로 사용중인 관리자는 더이상 사용하실 수 없습니다.</dl>
            </div>
            <div class="koko_check">
                <input type="checkbox" bind:checked={wanningChecked} on:click|preventDefault={handleClick} id="checkcation">
                <label for="checkcation">
                    <em></em>
                    <p class="check">주의사항에 대해 확인했습니다.</p>
                </label>
                <p style="margin-left: 7px;" class="{wanningText === true ? 'bottomText' : 'bottomText not_work'}">주의사항을 체크해주세요.</p>
            </div>
            <div class="kokopopBtnBox">
                <div class="koko_go">
                    <button type="button" on:click={accessIpDelete}>확인</button>
                </div>
                <div class="koko_cancel" on:click={() => ipChange(0)}>취소</div>
            </div>
        </div>
        <div class="koko-popup-close ipdel_pop_close" data-popup-close="ipdel_pop_close" on:click={() => ipChange(0)}></div>
    </div>
</div>