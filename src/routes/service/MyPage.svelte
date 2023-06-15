
<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { backBtn } from '../../lib/store'
    import { onMount } from 'svelte';
    import restapi from "../../lib/api"
    import { is_login, cpNameSider} from "../../lib/store.js"
    import { push } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import CustumAlert from "../../components/common/CustumAlert.svelte"
    import { popOpenBtn, }from '../../lib/common'

    import MyPagePwd from "../../components/service/environment/mypage/MyPagePwd.svelte";
    import MyPageCp from "../../components/service/environment/mypage/MyPageCp.svelte";
    import MyPageTeam from "../../components/service/environment/mypage/MyPageTeam.svelte";

    import PhoneCert from '../../components/common/certification/PhoneCert.svelte'
    import GoogleOTP from "../../components/common/certification/GoogleOTP.svelte";

    let changeState = 0;
    function changeStatePop(val) {
        changeState = val;
    }

    // 나의정보 가져오기
    onMount(async () => {
        await myInfo();
    })

    // 내정보들 변수
    let knEmail = ""; // 이메일
    let knName = "";// 이름
    let knPhoneNumber = "";// 휴대전화
    let cpName = "";// 소속
    let knDepartment = "";// 부서
    let isMyPagePwdVisible = false; // 비밀번호창 보임 여부

    let knDepartmentState = ""; // 부서 등록/변경
    // 내정보 가져오기
    function myInfo() {
        let url = "/v2/api/Admin/myInfo"

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    knEmail = json_success.data.sendData.knEmail;
                    knName = json_success.data.sendData.knName;
                    knPhoneNumber = json_success.data.sendData.knPhoneNumber;
                    cpName = json_success.data.sendData.cpName;
                    knDepartment = json_success.data.sendData.knDepartment;
                    if(knDepartment === "") {
                        knDepartmentState = "등록";
                    } else {
                        knDepartmentState = "변경";
                    }
                    myInfoLayout = 1;
                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    is_login.set(false);
                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )
    }

    let src;
    let knOtpKey;
    function otpCreate() {
        googleOtpPop = true;

        console.log("구글 OTP 등록 및 재등록 클릭!");

        let url = "/v1/api/Auth/otpQRcode"

        let sendData = {
            knEmail : knEmail,
        }

        restapi('v1', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    src = json_success.data.sendData.url;
                    knOtpKey = json_success.data.sendData.otpKey;
                } else {
                    googleOtpPop = !googleOtpPop;
                }
            },
            (json_error) => {
                console.log("구글 OTP 등록 및 재등록 실패");
                alert(json_error.data.err_msg);
            }
        )
    }

    // 휴대전화번호 변경시 호출되는 함수
    function phoneChange(name, phone) {
        knName = name;
        knPhoneNumber = phone;
    }

    // 부서명+소속명 변경시 호출되는 함수
    function contentsChange(num, val) {
        if(num === 1) {
            cpName = val;
        } else if(num === 2) {
            knDepartment = val;
        } else if(num === 3) {
            knDepartmentState = val
        }
    }

    let myInfoLayout = 0;
    let otpTitle = "구글 OTP 2단계 인증 재등록"
    // 구글 OTP 팝업
    let googleOtpPop = false;
    function googleOtpPopBtn() {
        googleOtpPop = !googleOtpPop;
    }

    let popType = 1;
    let imgState = 1;
    let popTitle = "휴대전화가 변경되었습니다.";
    let popContents1 = "본인인증하신 사용자명으로 변경됩니다";
    let popCheck = "확인";

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a>
            <h1>내 정보</h1>
        </div>
        {#if myInfoLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else}
            <div class="seaContentBox" in:fade>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>소속</dl>
                        <div class="myInfoBox">
                            <span>{cpName}</span>
                            <button class="myinfoChangeBtn" on:click|preventDefault={() => changeStatePop(2)}>변경하기</button>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>부서</dl>
                        <div class="myInfoBox">
                            {#if knDepartment !== ""}
                                <span>{knDepartment}</span>
                                <button class="myinfoChangeBtn" on:click|preventDefault={() => changeStatePop(3)}>변경하기</button>
                            {:else}
                                <button style="margin-left: 0" class="myinfoChangeBtn" on:click|preventDefault={() => changeStatePop(3)}>등록하기</button>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이메일</dl>
                        <div class="myInfoBox">
                            <span>{knEmail}</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이름</dl>
                        <div class="myInfoBox">
                            <span>{knName}</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>휴대전화</dl>
                        <div class="myInfoBox">
                            <span>{knPhoneNumber}</span>
                            <PhoneCert initValue="{phoneChange}" conditionFun="{popOpenBtn}" state="{5}" />
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>비밀번호</dl>
                        <div class="myInfoBox">
                            <button style="margin-left: 0" class="myinfoChangeBtn" on:click|preventDefault={()=>{isMyPagePwdVisible = true;}}>변경하기</button>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>2단계 인증 (MFA)</dl>
                        <div class="myInfoBox">
                            <span class="otptext">구글 OTP 인증 사용중</span>
                            <button class="myinfoChangeBtn" id="otp_pop" on:click|preventDefault={otpCreate}>재등록</button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</section>

<MyPagePwd bind:visible={isMyPagePwdVisible} />

{#if changeState === 2}
<MyPageCp {changeStatePop} {contentsChange} />
{:else if changeState === 3}
<MyPageTeam {changeStatePop} {contentsChange} {knDepartmentState} />
{/if}

<CustumAlert popType = {popType} imgState = {imgState} startFun = {myInfo} {popTitle} {popContents1} {popCheck} />

{#if googleOtpPop}
    <GoogleOTP popTitle="{'구글 OTP 재등록을 완료했습니다.'}" {otpTitle} {knEmail} {src} {knOtpKey} {googleOtpPopBtn} />
{/if}
