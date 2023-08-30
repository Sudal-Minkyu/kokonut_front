<script>
    import { onMount } from "svelte";

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

    <div class="inqueryWrite">
        <div class="inqueryCall">
            <div class="inqueryGroup">
                <div>* 선호 온보딩 방식</div>
                <input type="radio" value="오프라인 미팅" />
                <input type="radio" value="온라인 교육" />
                <input type="radio" value="상관없음" />
            </div>
            <div class="inqueryGroup">
                <input type="text" placeholder="이름 *" />
                <div>* 이름을 입력해주세요.</div>
            </div>
            <div class="inqueryGroup">
                <input type="text" placeholder="회사명 *" />
                <div>* 회사명을 입력해주세요.</div>
            </div>
            <div class="inqueryGroup">
                <input type="text" placeholder="서비스명 *" />
                <div>* 서비스명을 입력해주세요.</div>
            </div>
            <div class="inqueryGroup">
                <input type="text" placeholder="연락처 *" />
                <div>* 연락처를 입력해주세요.</div>
            </div>
            <div class="inqueryGroup">
                <input type="text" placeholder="이메일 *" />
                <div>* 이메일을 입력해주세요.</div>
            </div>
            <div class="inqueryGroup">
                <textarea placeholder="내용 *"></textarea>
                <div>[선택]온보딩 진행 시 요청사항</div>
            </div>
        </div>
        <div>
            <div >
                <input class="form-check-input" type="checkbox" id="check1">
                <label class="form-check-input" for="check1"></label>
                <span style="font-family: 'Cafe24Ohsquareair',serif;font-size: 14px">개인정보 수집 및 이용 동의를 체크해 주세요.<a style="cursor: pointer" onclick="viewTextPopup()">(전문보기)</a></span>
            </div>
        </div>
    </div>

</div>

