<script>
    import { onMount } from "svelte";
    import ErrorHighlight from "../../components/common/ui/ErrorHighlight.svelte";

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

    function privacyCheck() {
        console.log("전문보기 클릭!");
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

        <div class="view_text_popup">
            <div class="inquiry_box__close"></div>
            <div class="view_text_popup_contents">
                <p>이용자가 입력하는 문의사항을 처리하기 위해</p>
                <p style="margin-bottom: 20px;">다음과 같이 개인정보를 수집합니다.</p>
                <table>
                    <tbody class="viewTextTable">
                    <tr>
                        <td style="width: 140px">처리 목적</td>
                        <td style="width: 200px">수집 항목</td>
                        <td style="width: 150px">수집 방법</td>
                        <td style="width: 180px">처리 및 보유 기간</td>
                    </tr>
                    <tr>
                        <td>문의사항 처리</td>
                        <td>이름, 회사명, 서비스명, 연락처, 이메일</td>
                        <td>이용자의 입력</td>
                        <td>1년</td>
                    </tr>
                    </tbody>
                </table>
                <p style="margin-top: 20px;">이용자는 위와 같이 개인정보를 처리하는데</p>
                <p style="margin-bottom: 10px;">동의하지 않으실 수 있습니다.</p>
                <p>다만, 동의하지 않으시면 문의</p>
                <p>서비스를 받으실 수 없습니다.</p>
            </div>
        </div>

        <div class="onbording_write">

            <div >
                <div class="onbording_deps">
                    <label class="onbording_label"><a>*</a> 선호 온보딩 방식 <p class="onbording_checkmark">온보딩 방식을 선택해 주세요.</p></label>
                    <div class="onbording_select">
                        <input type="radio" id="select" name="iqState"><label for="select">오프라인 미팅</label>
                        <input type="radio" id="select2" name="iqState"><label for="select2">온라인 교육</label>
                        <input type="radio" id="select3" name="iqState"><label for="select3">상관없음</label>
                    </div>
                </div>
                <div class="onbording_deps">
                    <label for="userName" class="onbording_label"><a>*</a> 이름 <p class="onbording_checkmark">이름을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="userName" placeholder="이름을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="companyName" class="onbording_label"><a>*</a> 회사명 <p class="onbording_checkmark">회사명을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="companyName" placeholder="회사명을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="serviceName" class="onbording_label"><a>*</a> 서비스명 <p class="onbording_checkmark">서비스명을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="serviceName" placeholder="서비스명을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="phoneNumber" class="onbording_label"><a>*</a> 연락처 <p class="onbording_checkmark">연락처를 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="phoneNumber" placeholder="연락처를 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="userEmail" class="onbording_label"><a>*</a> 이메일 <p class="onbording_checkmark">이메일을 입력해 주세요.</p></label>
                    <input type="text" class="onbording_input" id="userEmail" placeholder="이메일을 입력해 주세요.">
                </div>
                <div class="onbording_deps">
                    <label for="requestOnboarding" class="onbording_label">온보딩 진행시 요청사항 <span class="text-body-secondary">(선택)</span></label>
                    <textarea class="onbording_textarea" id="requestOnboarding"></textarea>
                </div>
            </div>

            <hr class="onbording_hr">

            <div style="text-align: center">
                <input type="checkbox" id="pri_check">
                <label class="onbording_privacy" for="pri_check">개인정보 수집 및 이용을 동의합니다.</label><a class="onbording_privacy_show" on:click={privacyCheck}>전문보기</a>
                <p class="onbording_privacy_check">개인정보 수집 및 이용을 동의해 주세요.</p>
            </div>

            <button class="onbording_btn" type="button">온보딩 신청하기</button>

            <p class="onbording_footer">
                Copyright© 2023 Everyfeb<br/>All Rights Reserved
            </p>

        </div>

    </div>

</div>
