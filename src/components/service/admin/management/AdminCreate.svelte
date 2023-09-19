
<script>
    import { fade } from 'svelte/transition'
    import { onMount } from "svelte";
    import { setCustomSelectBox, setOptionItem } from "../../../../lib/libSearch.js";
    import { emailCheck, popOpenBtn} from "../../../../lib/common.js";
    import jQuery from "jquery";
    import CustumAlert from '../../../../components/common/CustumAlert.svelte';
    import {ajaxGet, ajaxParam, reportCatch} from "../../../common/ajax.js";

    export let adminSavePopChange;
    export let adminList;

    onMount(async ()=>{
        await setCustomSelectBox();
        await setOptionItem(customSelectBoxOpt);
    })

    let customSelectBoxOpt = [
        {id : "createAdminRoleSelect", use_all : false, codeName : "admin_create_role_code"},
    ]; // 선택 박스 옵션

    let knEmail = "";

    // 이메일 조건 변수
    let error_msg = "";
    let emailConfirm = false;
    let emailNotForm = true;
    let emailPass = false;

    // 이메일 중복체크
    function existsEmail() {
        if(!emailPass) {
            if(knEmail === "" || knEmail.search(/\s/) !== -1) {
                error_msg = '이메일을 입력해주세요.';
                emailConfirm = true;
                return false;
            } else {
                emailConfirm = false;
            }

            if(emailConfirm) {
                emailConfirm = false;
            }
            let url = "/v1/api/Auth/existsByKnEmail"

            let sendData = {
                knEmail : knEmail
            }

            ajaxGet(url, sendData, (res) => {
                try {
                    const inputElement = document.getElementById("knEmail");
                    inputElement.readOnly = true;
                    inputElement.style.backgroundColor = "#E9EBED";
                    emailPass = true;
                } catch (e) {
                    reportCatch('temp116', e);
                }
            }, (errCode, errMsg) => {
                try {
                    emailConfirm = true;
                    error_msg = errMsg;
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp117', e);
                }
            });
        }
    }

    // 관리자 등록 함수
    function adminCreate() {
        if(!emailPass) {
            emailConfirm = true;
            error_msg = "이메일 인증을 해주시길 바랍니다."
            return false;
        } else {
            emailConfirm = false;
        }

        // 사용중인 이메일이 아닐경우 해당 이메일로 이메일확인전송 -> 확인 후 해당 관리자 로그인 가능
        let url = "/v2/api/Admin/create"

        let sendData = {
            userEmail : knEmail,
            choseRole : jQuery("#createAdminRoleSelect").text(),
        }

        ajaxParam(url, sendData, (res) => {
            try {
                popType = 1;
                imgState = 1;
                popTitle = "관리자 등록완료";
                popContents1 = "안내에 따라 이어서 가입을 해주세요."
                popContents2 = "이메일인증후 등록은 24시간동안만 유효합니다."
                popCheck = "확인";
                startFun = adminSavePopChange;
                adminList(0);
                popOpenBtn();
            } catch (e) {
                reportCatch('temp118', e);
            }
        }, (errCode, errMsg) => {
            try {
                if (errCode === "KO041") {
                    popType = 1;
                    imgState = 2;
                    popTitle = "메일 전송실패";
                    popContents1 = "메일 전송에 실패했습니다."
                    popContents2 = "관리자에게 1:1 문의하세요."
                    popCheck = "확인";
                    startFun = undefined
                } else {
                    popType = 1;
                    imgState = 2;
                    popTitle = "접근권한 없음";
                    popContents1 = errMsg;
                    popContents2 = ""
                    popCheck = "확인";
                    startFun = undefined
                }
                popOpenBtn();
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp119', e);
            }
        });
    }

    let popType; // 1: 버튼하나, 2: 여부를 묻는 버튼 두개
    let imgState; // 1 : 성공, 2 : 경고, 3: 실패, 4: 물음표
    let popTitle = ""; // 제목 텍스트
    let startFun;
    let popContents1 = "";  // 내용1 텍스트
    let popContents2 = "";  // 내용2 텍스트
    let popCheck = ""; // 확인창 텍스트

</script>

<div class="koko_popup adm_registration_pop" data-popup="adm_registration_pop" in:fade out:fade >
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">관리자 등록</h3>
            </div>
            <div class="kopopinput padR108">
                <label>이메일 검색</label>
                <input type="text" id="knEmail" bind:value={knEmail} placeholder="등록할 이메일 검색" on:keyup={() => emailNotForm = emailCheck(knEmail)} required>
                <button on:click={existsEmail}>중복확인</button>
            </div>
            <p class="{emailNotForm === false ? 'notxt' : 'notxt not_work'}" style="text-align: left;margin-bottom: 10px">이메일 형식이 올바르지 않습니다.</p>
            <p class="{emailConfirm === false ? 'notxt not_work' : 'notxt'}" style="text-align: left;margin-bottom: 10px">{error_msg}</p>
            <p class="{emailPass === false ? 'notxt not_work' : 'notxt pass'}" style="text-align: left;margin-bottom: 10px">사용하실 수 있는 이메일입니다.</p>

            <div class="kopop_SelBox" style="margin-top: 10px">
                <p>관리자 등급</p>
                <div class="selectBox wid162">
                    <div class="label" id="createAdminRoleSelect"></div>
                    <ul class="optionList">
                    </ul>
                </div>
            </div>
            <div class="kokopopBtnBox">
                <div class="koko_cancel adm_registration_pop_close" on:click={adminSavePopChange}>취소</div>
                <div class="koko_go">
                    <button type="button" on:click={adminCreate}>등록</button>
                </div>
            </div>
        </div>
        <div class="koko-popup-close adm_registration_pop_close" data-popup-close="adm_registration_pop_close" on:click={adminSavePopChange}></div>
    </div>
</div>

<CustumAlert {popType} {imgState} startFun = {startFun} {popTitle} {popContents1} {popContents2} {popCheck} />