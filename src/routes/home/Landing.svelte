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
</script>

<style>
    /*@media (min-width: 1200px)*/
    /*    .container {*/
    /*        max-width: 1140px;*/
    /*    }*/

</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

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

<!--    <div id="view_text_popup" class="view_text_popup">-->
<!--        <div class="inquiry_box__close"></div>-->
<!--        <div class="view_text_popup_contents">-->
<!--            <p style="margin: -5px;padding-top: 20px;">이용자가 입력하는 문의사항을 처리하기 위해</p>-->
<!--            <p>다음과 같이 개인정보를 수집합니다.</p>-->
<!--            <table>-->
<!--                <tbody class="viewTextTable">-->
<!--                <tr>-->
<!--                    <td style="width: 140px">처리 목적</td>-->
<!--                    <td style="width: 200px">수집 항목</td>-->
<!--                    <td style="width: 150px">수집 방법</td>-->
<!--                    <td style="width: 180px">처리 및 보유 기간</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td>문의사항 처리</td>-->
<!--                    <td>이름, 이메일 주소<br/>연락처, 소속</td>-->
<!--                    <td>이용자의 입력</td>-->
<!--                    <td>1년</td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--            </table>-->
<!--            <p style="margin-top: 20px;margin-bottom: -10px">이용자는 위와 같이 개인정보를 처리하는데</p>-->
<!--            <p style="margin: 5px 0 11px 0">동의하지 않으실 수 있습니다.</p>-->
<!--            <p style="margin: -5px">다만, 동의하지 않으시면 문의</p>-->
<!--            <p style="margin-bottom: 5px">서비스를 받으실 수 없습니다.</p>-->
<!--        </div>-->
<!--    </div>-->

    <div class="ontbording_container">
        <div class="col-md-6 mx-auto">
            <div >
                <div class="col-12">
                    <label for="custnom" class="form-label">선호 온보딩 방식</label>
                    <div class="ontbording_select">
                        <input type="radio" id="select" name="iqState"><label for="select">오프라인 미팅</label>
                        <input type="radio" id="select2" name="iqState"><label for="select2">온라인 교육</label>
                        <input type="radio" id="select3" name="iqState"><label for="select3">상관없음</label>
                    </div>
                    <div class="ontbording_checkmark">선택해 주세요.</div>
                </div>
                <div class="col-12">
                    <label for="custnom" class="form-label">이름</label>
                    <input type="text" class="form-control" id="custnom">
                    <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0.5rem 0 0.5rem 0; font-size: 2rem; font-weight:600; padding-top: 0.4rem;"/>
                </div>
                <div class="col-12">
                    <label for="companyName" class="form-label">회사명</label>
                    <input type="text" class="form-control" id="companyName">
                    <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0.5rem 0 0.5rem 0; font-size: 2rem; font-weight:600; padding-top: 0.4rem;"/>
                </div>
                <div class="col-12">
                    <label for="serviceName" class="form-label">서비스명</label>
                    <input type="text" class="form-control" id="serviceName">
                    <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0.5rem 0 0.5rem 0; font-size: 2rem; font-weight:600; padding-top: 0.4rem;"/>
                </div>
                <div class="col-12">
                    <label for="phoneNumber" class="form-label">연락처</label>
                    <input type="text" class="form-control" id="phoneNumber" placeholder="010-1234-5678">
                    <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0.5rem 0 0.5rem 0; font-size: 2rem; font-weight:600; padding-top: 0.4rem;"/>
                </div>
                <div class="col-12">
                    <label for="email" class="form-label">이메일</label>
                    <input type="text" class="form-control" id="email" placeholder="you@example.com">
                    <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0.5rem 0 0.5rem 0; font-size: 2rem; font-weight:600; padding-top: 0.4rem;"/>
                </div>
                <div class="col-12">
                    <label for="requestOnboarding" class="form-label">온보딩 진행시 요청사항 <span class="text-body-secondary">(선택)</span></label>
                    <textarea class="form-control" id="requestOnboarding" style="resize: none;"></textarea>
                    <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0.5rem 0 0.5rem 0; font-size: 2rem; font-weight:600; padding-top: 0.4rem;"/>
                </div>
            </div>

            <hr class="my-4">

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="same-address">
                <label class="form-check-label" for="same-address">개인정보 수집 및 이용을 동의합니다. (전문보기)</label>
            </div>
            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: -0.7rem 0 1rem 0; padding-top: 0.4rem;"/>

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="save-info">
                <label class="form-check-label" for="save-info">개인정보 수집 및 이용을 동의합니다. 2</label>
            </div>
            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: -0.7rem 0 1rem 0; padding-top: 0.4rem;"/>

            <button class="w-100 btn btn-light btn-lg" type="submit" style="margin-top: 2rem;">온보딩 신청하기</button>

            <p style="margin-top: 2rem;margin-bottom: 0;font-size: 15px;font-weight: 500;text-align: center;">
                Copyright© 2023 Everyfeb. All Rights Reserved
            </p>
        </div>
    </div>

</div>
