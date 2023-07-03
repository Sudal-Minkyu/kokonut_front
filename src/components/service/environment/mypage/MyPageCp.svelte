
<script>
    import { fade } from 'svelte/transition'
    import { callCapsLock } from '../../../../lib/common'
    import {userInfoData} from "../../../../lib/store.js"
    import {logout} from "../../../common/authActions.js";
    import {ajaxParam} from "../../../common/ajax.js";

    let cpName = "";
    let knPassword = "";

    function cpNameChageStart() {
        console.log("소속명 변경 클릭!");
        if(cpName === ""  || cpName.search(/\s/) !== -1) {
            cpNameBlank = true;
            return false;
        }

        if(knPassword === "") {
            pwdBlank = true;
            return false;
        }

        if(pwdBlank) {
            pwdBlank = false;
        }
        if(pwdBlank) {
            pwdBlank = false;
        }
        if(pwdNot) {
            pwdNot = false;
        }

        let url = "/v2/api/Admin/cpChange"

        let sendData = {
            cpContent : cpName,
            knPassword : knPassword,
            state : 1
        }

        ajaxParam(url, sendData, (res) => {
            contentsChange(1, cpName);
            userInfoData.update(obj => {
                obj.cpName = cpName;
                return obj;
            });
            changeStatePop(0);
        }, (errCode, errMsg) => {
            if (errCode === "KO013") {
                pwdNot = true;
                knPassword = "";
            } else {
                // 회사가 존재하지 않을 시 로그인페이지로 이동시킴
                alert(errMsg);
                logout();
            }
            return {action: 'NONE'};
        });
    }

    let cpNameBlank = false;
    let pwdBlank = false;
    let pwdNot = false;
    let capsLockCheck = false;

    export let changeStatePop;
    export let contentsChange;
</script>

<div class="koko_popup belong_pop" data-popup="belong_pop" in:fade out:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">소속 변경</h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>변경할 소속 명</label>
                    <input type="text" bind:value={cpName} />
                    <p style="text-align: left" class="{cpNameBlank === true ? 'notxt' : 'notxt not_work'}">변경할 소속명을 입력해주세요.</p>
                </div>
                <div class="kopopinput">
                    <label>비밀번호</label>
                    <input bind:value={knPassword} autocomplete="off" type="password" required on:keyup={() => capsLockCheck = callCapsLock(event)} />
                    <p style="text-align: left" class="{pwdBlank === true ? 'notxt' : 'notxt not_work'}">비밀번호를 입력해주세요.</p>
                    <p style="text-align: left" class="{pwdNot === true ? 'notxt' : 'notxt not_work'}">입력하신 비밀번호가 일치하지 않습니다.</p>
                    <p style="text-align: left" class="{capsLockCheck === true ? 'notxt' : 'notxt not_work'}">CapsLock이 켜져 있습니다.</p>
                </div>
            </form>
            <div class="kokopopBtnBox">
                <div class="koko_cancel belong_pop_close" on:click={() => changeStatePop(0)}>취소</div>
                <div class="koko_go">
                    <button type="button" on:click={cpNameChageStart}>변경</button>
                </div>
            </div>
        </div>
        <div class="koko-popup-close belong_pop_close" data-popup-close="belong_pop_close" on:click={() => changeStatePop(0)}></div>
    </div>
</div>