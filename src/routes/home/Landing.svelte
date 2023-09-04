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
    <div id="view_text_popup" class="view_text_popup">
        <div class="inquiry_box__close"></div>
        <div class="view_text_popup_contents">
            <p style="margin: -5px;padding-top: 20px;">이용자가 입력하는 문의사항을 처리하기 위해</p>
            <p>다음과 같이 개인정보를 수집합니다.</p>
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
                    <td>이름, 이메일 주소<br/>연락처, 소속</td>
                    <td>이용자의 입력</td>
                    <td>1년</td>
                </tr>
                </tbody>
            </table>
            <p style="margin-top: 20px;margin-bottom: -10px">이용자는 위와 같이 개인정보를 처리하는데</p>
            <p style="margin: 5px 0 11px 0">동의하지 않으실 수 있습니다.</p>
            <p style="margin: -5px">다만, 동의하지 않으시면 문의</p>
            <p style="margin-bottom: 5px">서비스를 받으실 수 없습니다.</p>
        </div>
    </div>

    <div class="container marT40">
        <main>
            <div class="row g-5" style="margin-bottom: 3rem;">
                <div class="col-md-6 mx-auto">
                    <div class="row g-3">
                        <div class="col-12">
                            <h5 class="form-label">선호 온보딩 방식</h5>
                            <div class="form-check" style="margin-top: 0.3rem;">
                                <input id="offlineMeeting" name="preferMethod" type="radio" class="form-check-input">
                                <label class="form-check-label" for="offlineMeeting">오프라인 미팅</label>
                            </div>
                            <div class="form-check">
                                <input id="onlineMeeting" name="preferMethod" type="radio" class="form-check-input">
                                <label class="form-check-label" for="onlineMeeting">온라인 교육</label>
                            </div>
                            <div class="form-check">
                                <input id="dontCare" name="preferMethod" type="radio" class="form-check-input">
                                <label class="form-check-label" for="dontCare">상관없음</label>
                            </div>
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: -0.5rem 0 -0.5rem 0; padding-top: 0.4rem;"/>
                        </div>
                        <div class="col-12">
                            <label for="custnom" class="form-label">이름</label>
                            <input type="text" class="form-control" id="custnom">
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0 0 -0.5rem 0; padding-top: 0.4rem;"/>
                        </div>
                        <div class="col-12">
                            <label for="companyName" class="form-label">회사명</label>
                            <input type="text" class="form-control" id="companyName">
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0 0 -0.5rem 0; padding-top: 0.4rem;"/>
                        </div>
                        <div class="col-12">
                            <label for="serviceName" class="form-label">서비스명</label>
                            <input type="text" class="form-control" id="serviceName">
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0 0 -0.5rem 0; padding-top: 0.4rem;"/>
                        </div>
                        <div class="col-12">
                            <label for="phoneNumber" class="form-label">연락처</label>
                            <input type="text" class="form-control" id="phoneNumber" placeholder="010-1234-5678">
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0 0 -0.5rem 0; padding-top: 0.4rem;"/>
                        </div>
                        <div class="col-12">
                            <label for="email" class="form-label">이메일</label>
                            <input type="text" class="form-control" id="email" placeholder="you@example.com">
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0 0 -0.5rem 0; padding-top: 0.4rem;"/>
                        </div>
                        <div class="col-12">
                            <label for="requestOnboarding" class="form-label">온보딩 진행시 요청사항 <span class="text-body-secondary">(선택)</span></label>
                            <textarea class="form-control" id="requestOnboarding" style="resize: none;"></textarea>
                            <ErrorHighlight message="입력해 주세요." fontSize="1.1" style="margin: 0 0 -0.5rem 0; padding-top: 0.4rem;"/>
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
                </div>
            </div>
        </main>
    </div>
</div>

<footer class="my-5 pt-5 text-body-secondary text-center text-small" style="margin-top: 0!important;">
    <p class="mb-1">&copy; 2017–2023 Company Name</p>
    <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Privacy</a></li>
        <li class="list-inline-item"><a href="#">Terms</a></li>
        <li class="list-inline-item"><a href="#">Support</a></li>
    </ul>
</footer>
