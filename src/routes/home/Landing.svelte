<script>
    import { onMount } from "svelte";
    import { fly } from 'svelte/transition';
    import {openDiv, tempPwd} from "../../lib/store.js";
    import {ajaxBody, reportCatch} from "../../components/common/ajax.js";

    let width = window.innerWidth;

    onMount(() => {
        const handleResize = () => {
            width = window.innerWidth;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    let popupVisible = false;

    function privacyCheck() {
        popupVisible = !popupVisible;
    }


    let iqState = ''; // 선호 온보딩 방식 -> 1. 오프라인 미팅 2. 온라인 교육
    let iqWriter = ''; // 작성자
    let iqCompany = ''; // 회사명
    let iqService = ''; // 서비스명
    let iqPhone = ''; // 연락처(휴대전화)
    let iqEmail = ''; // 이메일
    let iqContents = ''; // 온보딩 진행 시 요청사항 (이전에 내용칸 활용)
    let acceptCheck = '0';

    let iqStateBlank = true;
    let iqWriterBlank = true;
    let iqCompanyBlank = true;
    let iqServiceBlank = true;
    let iqPhoneBlank = true;
    let iqEmailBlank = true;
    let acceptBlank = true;

    let essentialCheckMaster = false;
    function essentialCheck() {

        if(!iqState.trim()) {
            iqStateBlank = false;
        } else {
            iqStateBlank = true;
        }

        if(!iqWriter.trim()) {
            iqWriterBlank = false;
        } else {
            iqWriterBlank = true;
        }

        if(!iqCompany.trim()) {
            iqCompanyBlank = false;
        } else {
            iqCompanyBlank = true;
        }

        if(!iqService.trim()) {
            iqServiceBlank = false;
        } else {
            iqServiceBlank = true;
        }

        if(!iqPhone.trim()) {
            iqPhoneBlank = false;
        } else {
            iqPhoneBlank = true;
        }

        if(!iqEmail.trim()) {
            iqEmailBlank = false;
        } else {
            iqEmailBlank = true;
        }

        if(acceptCheck.length === 0) {
            acceptBlank = false;
        } else {
            acceptBlank = true;
        }

        if(iqStateBlank && iqWriterBlank && iqCompanyBlank && iqServiceBlank && iqPhoneBlank && iqEmailBlank && acceptBlank) {
            essentialCheckMaster = true;
        } else {
            essentialCheckMaster = false;
        }

    }

    // 온보딩 신청하기
    function onbordingSend() {

        // 필수항목 입력했는지 체크하기
        essentialCheck();

        if(essentialCheckMaster) {
            let url = "/v1/api/Inquiry/send"

            let sendData = {
                iqState : iqState,
                iqWriter : iqWriter,
                iqCompany : iqCompany,
                iqService : iqService,
                iqPhone : iqPhone,
                iqEmail : iqEmail,
                iqContents : iqContents
            }

            ajaxBody(url, sendData, (res) => {
                alert("온보딩 신청을 완료했습니다.");
            });
        }

    }

</script>

<div class="landing-background"></div>
{#if width < 768}
    <div class="mobile">
        <img src="/assets/images/main/onbording.png" alt="onbording"/>
    </div>
{:else}
    <div class="desktop">
        <img src="/assets/images/main/onbording_big.png" alt="onbording"/>
    </div>
{/if}

<div class="landing-write">

    <div class="onbording_container">

        <div class="onbording_write">

            {#if popupVisible}
                <div class="view_text_popup" in:fly={{ y: -200 }} out:fly={{ y: -200 }}>
                    <div class="view_text_popup_contents">
                        <div class="inquiry_box__close" on:click={privacyCheck}></div>
                        <p style="margin-bottom: 20px;">온보딩 신청 처리를 위해 아래와 같이 개인정보를 수집·이용 합니다.</p>
                        <p style="text-align: left;">▶ 개인정보 수집·이용 내역</p>
                        <table>
                            <tbody class="viewTextTable">
                            <tr>
                                <td style="width: 140px">수집·이용 목적</td>
                                <td style="width: 200px">수집 항목</td>
                                <td style="width: 150px">수집 방법</td>
                                <td style="width: 180px">보유·이용기간</td>
                            </tr>
                            <tr>
                                <td>온보딩 신청 처리</td>
                                <td>이름, 회사명, 서비스명,<br/>연락처, 이메일</td>
                                <td>이용자의 입력</td>
                                <td>1년</td>
                            </tr>
                            </tbody>
                        </table>
                        <p style="margin-top: 20px;">위의 개인정보 수집·이용에 대한<br/>
                            동의를 거부할 권리가 있습니다.</p>
                        <br/>
                        <p>그러나 동의를 거부할 경우 온보딩</p>
                        <p style="margin-bottom: 10px;">서비스 이용에 제한을 받을 수 있습니다.</p>
                    </div>
                </div>
            {/if}

            <div >
                <div class="onbording_deps">
                    <label class="onbording_label"><a>*</a> 선호 온보딩 방식 <p class="{iqStateBlank === true ? 'onbording_checkmark not_work' : 'onbording_checkmark'}">온보딩 방식을 선택해 주세요.</p></label>
                    <div class="onbording_select">
                        <input type="radio" id="select" bind:group={iqState} value="1"><label for="select">오프라인 미팅</label>
                        <input type="radio" id="select2" bind:group={iqState} value="2"><label for="select2">온라인 교육</label>
                    </div>
                </div>

                <div class="onbording_deps">
                    <label for="userName" class="onbording_label"><a>*</a> 이름 <p class="{iqWriterBlank === true ? 'onbording_checkmark not_work' : 'onbording_checkmark'}">이름을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="userName" bind:value={iqWriter} placeholder="이름을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="companyName" class="onbording_label"><a>*</a> 회사명 <p class="{iqCompanyBlank === true ? 'onbording_checkmark not_work' : 'onbording_checkmark'}">회사명을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="companyName" bind:value={iqCompany} placeholder="회사명을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="serviceName" class="onbording_label"><a>*</a> 서비스명 <p class="{iqServiceBlank === true ? 'onbording_checkmark not_work' : 'onbording_checkmark'}">서비스명을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="serviceName" bind:value={iqService} placeholder="서비스명을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="phoneNumber" class="onbording_label"><a>*</a> 연락처 <p class="{iqPhoneBlank === true ? 'onbording_checkmark not_work' : 'onbording_checkmark'}">연락처를 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="phoneNumber" bind:value={iqPhone} placeholder="연락처를 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="userEmail" class="onbording_label"><a>*</a> 이메일 <p class="{iqEmailBlank === true ? 'onbording_checkmark not_work' : 'onbording_checkmark'}">이메일을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="userEmail" bind:value={iqEmail} placeholder="이메일을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="requestOnboarding" class="onbording_label">온보딩 진행시 요청사항 <span class="text-body-secondary">(선택)</span></label>
                    <textarea class="onbording_textarea" id="requestOnboarding" bind:value={iqContents}></textarea>
                </div>
            </div>

            <hr class="onbording_hr">

            <div style="text-align: center">
                <input type="checkbox" id="pri_check" bind:group={acceptCheck} value="1">
                <label class="onbording_privacy" for="pri_check">개인정보 수집 및 이용을 동의합니다.</label><a class="onbording_privacy_show" on:click={privacyCheck}>전문보기</a>
                <p class="{acceptBlank === true ? 'onbording_privacy_check not_work' : 'onbording_privacy_check'}">개인정보 수집 및 이용을 동의해 주세요.</p>
            </div>

            <button class="onbording_btn" type="button" on:click={onbordingSend}>온보딩 신청하기</button>

            <p class="onbording_footer">
                Copyright© 2023 Everyfeb<br/>All Rights Reserved
            </p>

        </div>

    </div>

</div>
