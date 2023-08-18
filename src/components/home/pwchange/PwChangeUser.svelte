
<script>

    import CustumAlert from '../../common/CustumAlert.svelte'
    import { push } from 'svelte-spa-router'
    import { popOpenBtn } from "../../../lib/common.js";
    import {ajaxBody, reportCatch} from "../../common/ajax.js";

    // 패스워드 조건 변수
    let passwordBlank = true;
    let passwordCheckNum = true;
	let passwordCheckEng = true;
	let passwordCheckSpe = true;
	let passwordCheckLen = true;
	let passwordConfirmCheck = false;
    let passwordCheck = false;
    // ~

    // 비밀번호 검증함수
    function passwordConfirm(val) {
		if(val === 1) {

			if(knPasswordConfirm !== "") {
				if(knPassword !== knPasswordConfirm) {
					passwordConfirmCheck = false;
				} else {
					passwordConfirmCheck = true;
				}
			}

			// 비밀번호 입력
			const num = knPassword.search(/[0-9]/g); // 숫자 체크 정규식
			const eng = knPassword.search(/[a-z]/ig); // 영문 체크 정규식
			const spe = knPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); // 특수문자 체크 정규식

			// 영문,숫자, 특수문자 모두 하나이상을 혼합하여 입력
			if(knPassword.search(/\s/) !== -1) {
				// console.log("비밀번호는 공백 없이 입력해주세요.");
				passwordBlank=false;
			} else {
				passwordBlank=true;
			}
			
			if(eng < 0) {
				// console.log("영문");
				passwordCheckEng=true;
			}else {
				passwordCheckEng=false;
			}
			
			if(num < 0) {
				// console.log("숫자");
				passwordCheckNum=true;
			} else {
				passwordCheckNum=false;
			}
			
			if(spe < 0) {
				// console.log("특수문자");
				passwordCheckSpe=true;
			} else {
				passwordCheckSpe=false;
			}
			
			if(knPassword.length < 10 || knPassword.length > 20) {
				// console.log("10자리 ~ 20자리 이내로 입력해주세요.");
				passwordCheckLen=true;
			} else {
				passwordCheckLen=false;
			}
			
			if(passwordCheckNum && passwordCheckSpe && passwordCheckEng && passwordCheckLen) {
				passwordCheck=false;
			} else {
				passwordCheck=true;
			}
			
		} else {

			// 비밀번호확인 입력
			if(knPassword !== "") {
				if(knPassword !== knPasswordConfirm) {
					passwordConfirmCheck = false;
				} else {
					passwordConfirmCheck = true;
				}
			}
		}
	}

    export let userEmail;
    export let stageChange;

    let knPassword = "";
    let knPasswordConfirm = "";

    let popType; // 1: 버튼하나, 2: 여부를 묻는 버튼 두개
    let imgState; // 1 : 성공, 2 : 경고, 3: 실패, 4: 물음표
    let popTitle = ""; // 제목 텍스트
    let popContents1 = "";  // 내용1 텍스트
    let popContents2 = "";  // 내용2 텍스트
    let popCheck = ""; // 확인창 텍스트
    let popStart = ""; // 예 텍스트
    let popCancel = ""; // 아니오 텍스트
    let startFun = undefined;

    function customAlertData(a, b, c, d, e, f, g, h, i) {
        popType = a;
        imgState = b;
        popTitle = c;
        popContents1 = d;
        popContents2 = e;
        popCheck = f;
        popStart = g;
        popCancel = h;
        startFun = i;
    }


    // 비밀번호변경 버튼
    function amdinPwChangeComplete() {

        // console.log("userEmail : "+userEmail);
        // console.log("passwordCheck : "+passwordCheck);
        // console.log("passwordConfirmCheck : "+passwordConfirmCheck);

        if(passwordCheck && passwordConfirmCheck) {
            // console.log("관리자등록 조건 충족 완료 -> 시작!");

            let url = "/v1/api/Auth/passwordChange";

			let sendData = {
                userEmail : userEmail,
                knPassword : knPassword,
                knPasswordConfirm : knPasswordConfirm,
			}

            ajaxBody(url, sendData, (res) => {
                try {
                    link = "/login"
                    customAlertData(1, 1, "비밀번호 변경을 완료했습니다.", "로그인후 이용해주시길 바랍니다.", "", "확인", "", "", linkMove);
                    popOpenBtn();
                } catch (e) {
                    reportCatch('temp030', e);
                }
            }, (errCode, errMsg) => {
                try {
                    customAlertData(1, 3, "에러발생", "알 수 없는 에러가 발생했습니다.", "코코넛으로 문의해주시길 바랍니다.", "확인", "", "", linkMove);
                    popOpenBtn();
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp031', e);
                }
            });
        }
    }

    let link;
    function linkMove() {
        push(link)
    }

</script>

<form>
    <div class="j_inputArea">
        <div class="input-field mt30">
            <input type="password" autocomplete="off" id="knPassword" bind:value={knPassword} on:keyup={() => passwordConfirm(1)} required>
            <label for="knPassword"><span>비밀번호</span></label>
            <p class="{passwordBlank === false ? 'notxt' : 'notxt not_work'}">공백은 포함할 수 없습니다.</p>
        </div>
        <ul class="j_password">
            <!-- 조건 충족시 p에 pass 추가 -->
            <li><p class="{passwordCheckEng === false ? 'notxt pass' : 'notxt'}">영문 포함</p></li>
            <li><p class="{passwordCheckNum === false ? 'notxt pass' : 'notxt'}">숫자 포함</p></li>
            <li><p class="{passwordCheckSpe === false ? 'notxt pass' : 'notxt'}">특수문자 포함</p></li>
            <li><p class="{passwordCheckLen === false ? 'notxt pass' : 'notxt'}">10~20자</p></li>
        </ul>
        <div class="input-field mt30">
            <input type="password" autocomplete="off" id="knPasswordConfirm" bind:value={knPasswordConfirm} on:keyup={() => passwordConfirm(2)} required>
            <label for="knPasswordConfirm"><span>비밀번호 확인</span></label>
        </div>
        <ul class="j_password">
            <li><p class="{passwordConfirmCheck === false ? 'notxt' : 'notxt pass'}">비밀번호 일치</p></li>
        </ul>
    </div>

    <!-- 조건 충족 시 not_work 제거 -->
    <div class="join_bottom">
        <button type="button" on:click|preventDefault={amdinPwChangeComplete}><p>변경</p></button>
    </div>

</form>

<CustumAlert {popType} {imgState} {startFun} {popTitle} {popContents1} {popContents2} {popStart} {popCancel} {popCheck} />