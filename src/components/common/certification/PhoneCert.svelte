<script>
    import restapi from "../../../lib/api.js";
    import jQuery from "jquery";

    import { openDiv, findEmail, findPwd, tempPwd, knEmailHeader } from '../../../lib/store'

    jQuery(function() {
        // 나이스 폼열기
        jQuery('#niceForm').submit(function() {
            window.open('', 'niceviewer', 'width=200,height=200,resizeable,scrollbars');
            this.method = 'POST';
            this.target = 'niceviewer';
        });
    })

    let token_version_id = "";
    let integrity_value = "";
    let enc_data = "";
    // 휴대폰인증창 열기 api 호출
    function phoneCheckOpen(state) {
        console.log("휴대폰인증창 클릭!");
        // console.log("state : "+state);
        
        let url = "/v1/api/NiceId/open"

        let sendData = {
            state : state // 잘못된 요청 -> "0", 회원가입 -> "1", 이메일찾기 -> "2", 비밀번호찾기 -> "3", OTP변경 -> "4"
        }

        restapi('v1', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                // console.log(json_success);

                token_version_id = json_success.data.sendData.token_version_id;
                integrity_value = json_success.data.sendData.integrity_value;
                enc_data= json_success.data.sendData.enc_data;

                document.getElementById('token_version_id').value = token_version_id;
                document.getElementById('integrity_value').value = integrity_value;
                document.getElementById('enc_data').value = enc_data;

                jQuery("#niceForm").submit();
            },
            (json_error) => {
                console.log(json_error);
                console.log("휴대폰인증창열기 실패");
            }
        )
    }

    // 휴대폰 인증완료후 처리함수
    window.phoneCertCheck = function (state, keyEmail, otpKey) {
        console.log("휴대폰 본인인증 완료!");

        // console.log("state : "+state);
        // console.log("keyEmail : "+keyEmail);
        // console.log("otpKey : "+otpKey);

        if(state === "1") {
            console.log("회원가입 창으로");
            conditionFun(2, keyEmail, otpKey); // 회원가입 : keyEmail -> joinName, otpKey -> joinPhone
        } else if(state === "2") {
            console.log("폰인증 완료 -> 이메일찾기 시작");
            emailFind(keyEmail)
        } else if(state === "3") {
            console.log("폰인증 완료 -> 비밀번호변경 시작");
            // 입력한 이메일 + 인증한 번호와 일치한 이메일로 임시비밀번호 전송하기
            // 이후 비밀번호찾기 완료 페이지이동
            passwordFind(keyEmail)
        } else if(state === "4") {
            console.log("폰인증 완료 -> OTP변경 창으로");
            // OTP변경 처리 restAPI 호출
            googleOtpSave();
        } else if(state === "5") {
            console.log("폰인증 완료 -> 휴대전화번호 변경시작");
            // 휴대전화번호변경 restAPI 호출
            changePhoneNumber(keyEmail, otpKey); // 휴대전화번호 변경 : keyEmail -> joinName, otpKey -> joinPhone
        } else {
            alert("본인인증 절차에 맞지 않은 행동입니다.")
        }
    };

    export let state = 0;
    export let conditionFun = undefined; // 공통 상태변경 함수

    // export let joinName = undefined;
    // export let joinPhone = undefined;

    export let emailNotForm = undefined; // 이메일 형식에 맞지않음
    // 이메일 존재여부 API 호출
    function emailCheck(email) {
        if($findPwd === "") {
            conditionFun(3, false);
            return false;
        } else {
            conditionFun(3, true);
        }
    
        if(emailNotForm) {
            console.log("이메일 존재여부 체크");

            let url = "/v1/api/Auth/checkKnEmail"
            let sendData = {
                knEmail : email
            }

            restapi('v1', 'get', url, "param", sendData, 'application/json',
                (json_success) => {
                    if(json_success.data.status === 200) {
                        conditionFun(2, json_success.data.sendData.result);
                        if(json_success.data.sendData.result) {
                            phoneCheckOpen(state);
                        }
                    }
                },
                (json_error) => {
                    console.log(json_error);
                    console.log("이메일 존재여부 체크 실패");
                }
            )
        }
    }

    // 이메일 찾기
    function emailFind(keyEmail) {
        // console.log("keyEmail : "+keyEmail);
        if(keyEmail !== null) {
            let url = "/v1/api/Auth/findKnEmail"

            let sendData = {
                keyEmail : keyEmail
            }

            restapi('v1', 'get', url, "param", sendData, 'application/json',
                (json_success) => {
                    $openDiv = 1;
                    $findEmail = json_success.data.sendData.knEmail
                },
                (json_error) => {
                    console.log(json_error);
                }
            )
        }
    }

    // 비밀번호찾기 찾기 -> 임시비밀번호 업데이트
    function passwordFind(knEmail) {
        if($findPwd !== knEmail) {
            alert("입력된 이메일과 일치하지 않습니다.");
            return false;
        }

        let url = "/v1/api/Auth/passwordSendKnEmail"

        let sendData = {
            knEmail : $findPwd
        }

        restapi('v1', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                $openDiv = 2;
                console.log(json_success);
                $tempPwd = json_success.data.sendData.tempPassword;
            },
            (json_error) => {
                console.log(json_error);
            }
        )
    }

    let authOtpKey; // 등록/재등로 할 OTP 인증키
    export let knEmail = undefined; // 재등록하는 이메일
    export let knOtpKey = undefined; // 등록하는 OTP 키
    export let knPassword = undefined;  // OTP변경시 입력한 비밀번호
    export let otpValue = undefined;  // OTP변경시 입력한  OTP인증코드
    export let initValue; // 값 초기화 함수호출
    function otpCheck() {
        // console.log("knPassword : "+knPassword);
        // console.log("otpValue : "+otpValue);
        if(knPassword === "") {
            conditionFun(1, false);
            return false;
        }else {
            conditionFun(1, true);
        }
        if(otpValue === "") {
            conditionFun(2, false);
            return false;
        } else {
            conditionFun(2, true);
        }

        googleOtpAuth();
    }

    // OTP 등록/재등록시 인증 호출함수
    function googleOtpAuth() {
        conditionFun(3, true);
        conditionFun(4, true);

		console.log("OTP 등록/재등록시 인증 호출함수");

		let url = "/v1/api/Auth/checkOTP"
		// console.log("otpValue : "+otpValue);
        // console.log("knOtpKey : "+knOtpKey);

		let sendData = {
			otpValue : otpValue,
			knOtpKey : knOtpKey,
            knEmail : knEmail,
			knPassword : knPassword
		}

        restapi('v1', 'get', url, "param", sendData, 'application/json',
			(json_success) => {
				if(json_success.data.status === 200) {
                    console.log("authOtpKey : "+json_success.data.sendData.authOtpKey);
                    authOtpKey = json_success.data.sendData.authOtpKey // 재등록하는 OTP의 인증키
                    phoneCheckOpen(state);
				} else if (json_success.data.err_code === "KO015" || json_success.data.err_code === "KO012") {
                    conditionFun(3, false); // -> KO012
                    // KO015 => 숫자가 아닌 문자가 왔을 경우 에러 -> 자바스크립트에서 처리함
                } else if(json_success.data.err_code === "KO013") {
                    conditionFun(4, false); // -> KO013
                }
                else {
					console.log("OTP 등록/재등록시 인증 호출 에러");
                    console.log(json_success);
				}
			},
            (json_error) => {
                console.log(json_error);
            }
		)
	}

    // 구글 OTP 등록 및 재등록
	function googleOtpSave() {
		console.log("구글 OTP 등록 및 재등록 시작");
        // console.log("authOtpKey : "+authOtpKey);

		let url = "/v1/api/Auth/saveOTP"
		
		let sendData = {
			authOtpKey : authOtpKey, // 현재 OTP Key
			knOtpKey : knOtpKey,
			knEmail : knEmail
		}
        // console.log(sendData);

		restapi('v1', 'post', url, "param", sendData, 'application/json',
			(json_success) => {
                if(json_success.data.status === 200) {
                    initValue();
                }
			},
            (json_error) => {
                console.log(json_error);
            }
		)
	}

    export let googleOtpPopBtn = undefined;

    // 핸드폰번호 변경
    function changePhoneNumber(name, phone) {
        console.log("핸드폰번호 변경 시작");

        // console.log("name : "+name);
        // console.log("phone : "+phone);

        let url = "/v2/api/Admin/phoneChange"

        let sendData = {
            knName : name,
            knPhoneNumber : phone,
        }

        restapi('v2', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    let filterPhone = phone.substring(0,3) + "-****-" + phone.substring(7,11);
                    initValue(name, filterPhone);
                    knEmailHeader.set(name);
                    conditionFun();
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )
    }

</script>

{#if state === 3}
    <div class="join_bottom" on:click|preventDefault="{() => emailCheck($findPwd)}">
        <button type="submit">
            <p>휴대폰 인증하기</p>
        </button>
    </div>
{:else if state === 4}
    <div class="kokopopBtnBox" style="margin-top: 3rem;">
        <div class="koko_cancel otp_pop_close" on:click={googleOtpPopBtn}>취소</div>
        <div class="koko_go" on:click|preventDefault="{() => otpCheck()}">
            <button type="submit">변경</button>
        </div>
    </div>
{:else if state === 5}
    <button class="myinfoChangeBtn" on:click|preventDefault="{() => phoneCheckOpen(state)}">변경하기</button>
{:else}
    <div class="join_bottom" on:click|preventDefault="{() => phoneCheckOpen(state)}">
        <button type="submit">
            <p>휴대폰 인증하기</p>
        </button>
    </div>
{/if}
<form style="height: 0;" name="niceForm" id="niceForm" action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb">
    <input type="hidden"  id="m" name="m" value="service" /> <br/>
    <input type="hidden" id="token_version_id" name="token_version_id" /> <br/>
    <input type="hidden" id="enc_data" name="enc_data" /> <br/>
    <input type="hidden" id="integrity_value" name="integrity_value" /> <br/>
</form>