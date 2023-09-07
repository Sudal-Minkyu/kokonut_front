<script>
    import {openDiv, findPwd, tempPwd} from '../../../lib/store'
    import CustionAlert from "../../common/CustumAlert.svelte"
    import { popOpenBtn } from "../../../lib/common.js"

    import { push } from 'svelte-spa-router'
    import {ajaxBody, reportCatch} from "../../common/ajax.js";

    let tempPassword = ""
    let knPassword = "";

    let passwordTemp = true;
    let passwordBlank = true;
    let passwordCheckNum = false;
    let passwordCheckEng = false;
    let passwordCheckSpe = false;
    let passwordCheckLen = false;
    let passwordCheck = false;
    let passwordConfirmCheck = false;
    let knPasswordConfirm = "";

    let imgState;
    let popTitle;
    let popContents1 = "";
    function pwdChange() {
        if($tempPwd !== tempPassword) {
            passwordTemp = false;
            return false;
        }else {
            passwordTemp = true;
        }

        // 세가지 조간 충족할 경우 변경시작
        if($findPwd !== '' && passwordTemp && passwordCheck && !passwordConfirmCheck) {
            let url = "/v1/api/Auth/passwordUpdate"

            let sendData = {
                knEmail : $findPwd,
                tempPwd : tempPassword,
                knPassword : knPassword,
                knPasswordConfirm : knPasswordConfirm,
            }

            ajaxBody(url, sendData, (res) => {
                try {
                    popOpenBtn();
                    imgState = 1;
                    popTitle = "비밀번호가 변경되었습니다.";
                    popContents1 = "변경된 정보로 로그인해주시길 바랍니다."
                } catch (e) {
                    reportCatch('temp020', e);
                }
            }, (errCode, errMsg) => {
                try {
                    popOpenBtn();
                    imgState = 3;
                    popTitle = errMsg;
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp021', e);
                }
            });
        }
    }

    // 팝업버튼이후 처리하는 함수
    function startFun() {
        $openDiv = 0;
        $findPwd = '';
        $tempPwd = '';
        push('/login');
    }

    // 비밀번호 검증 함수
    function psswordConfirm(val) {
        if(val === 1) {

            if(knPasswordConfirm !== "") {
                if(knPassword !== knPasswordConfirm) {
                    passwordConfirmCheck = true;
                } else {
                    passwordConfirmCheck = false;
                }
            }

            // 비밀번호 입력
            const num = knPassword.search(/[0-9]/g); // 숫자 체크 정규식
            const eng = knPassword.search(/[a-z]/ig); // 영문 체크 정규식
            const spe = knPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); // 특수문자 체크 정규식

            // 영문,숫자, 특수문자 모두 하나이상을 혼합하여 입력
            if(knPassword.search(/\s/) !== -1) {
                passwordBlank=false;
            } else {
                passwordBlank=true;
            }

            if(eng < 0) {
                passwordCheckEng=false;
            }else {
                passwordCheckEng=true;
            }

            if(num < 0) {
                passwordCheckNum=false;
            } else {
                passwordCheckNum=true;
            }

            if(spe < 0) {
                passwordCheckSpe=false;
            } else {
                passwordCheckSpe=true;
            }

            if(knPassword.length < 10 || knPassword.length > 20) {
                passwordCheckLen=false;
            } else {
                passwordCheckLen=true;
            }

            if(passwordBlank && passwordCheckNum && passwordCheckSpe && passwordCheckEng && passwordCheckLen) {
                passwordCheck=true;
            } else {
                passwordCheck=false;
            }

        } else {

            // 비밀번호확인 입력
            if(knPassword !== "") {
                if(knPassword !== knPasswordConfirm) {
                    passwordConfirmCheck = true;
                } else {
                    passwordConfirmCheck = false;
                }
            }
        }
    }

</script>

<figure class="j_logo"><img src="/assets/images/join/j_logo.png" alt=""></figure>
<p class="j_logotxt">새로운 개인정보보호의 시작</p>
<div class="findContArea">
    <p class="findEx">
        입력하신 이메일로 임시 비밀번호가 전송됐습니다.<br>
        임시비밀번호 입력 후 사용하실 비밀번호를 입력해세요.
    </p>
</div>
<div class="j_inputArea">
    <div class="input-field">
        <input type="password" id="t_password" bind:value="{tempPassword}" required placeholder="">
        <label for="t_password"><span>임시 비밀번호</span></label>
    </div>
    <p class="{passwordTemp === false ? 'notxt' : 'notxt not_work'}">임시비밀번호가 일치하지 않습니다.</p>
    <div class="input-field mt20">
        <input type="password" bind:value="{knPassword}" id="new_password" required placeholder="" on:keyup={() => psswordConfirm(1)}>
        <label for="new_password"><span>새로운 비밀번호</span></label>
    </div>
    <ul class="pswdEx">
        <!-- 조건 충족시 pass 추가 -->
        <li><p class="{passwordCheckEng === false ? 'notxt' : 'notxt pass'}">영문 포함</p></li>
        <li><p class="{passwordCheckNum === false ? 'notxt' : 'notxt pass'}">숫자 포함</p></li>
        <li><p class="{passwordCheckSpe === false ? 'notxt' : 'notxt pass'}">특수문자 포함</p></li>
        <li><p class="{passwordCheckLen === false ? 'notxt' : 'notxt pass'}">10~20자</p></li>
    </ul>
    <p class="{passwordBlank === false ? 'notxt' : 'notxt not_work'}">공백은 포함할 수 없습니다.</p>
    <div class="input-field mt20">
        <input type="password" bind:value="{knPasswordConfirm}" id="new_password_check" required placeholder="" on:keyup={() => psswordConfirm(2)}>
        <label for="new_password_check"><span>새로운 비밀번호 확인</span></label>
    </div>
    <p class="{passwordConfirmCheck === false ? 'notxt not_work' : 'notxt'}">입력하신 비밀번호와 일치하지 않습니다.</p>
</div>
<div class="join_bottom">
    <button type="button" on:click={pwdChange}>완료</button>
</div>
<CustionAlert popType = {1} {startFun} imgState = {imgState} {popTitle} {popContents1} popCheck={"확인"} />