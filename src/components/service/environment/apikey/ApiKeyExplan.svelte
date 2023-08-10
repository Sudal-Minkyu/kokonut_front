
<script>
    import { fade } from 'svelte/transition'

    export let explanState;

    function explanClick() {
        // console.log("내용더보기 클릭");
        explanState = !explanState;
    }
</script>

<div>
    <div class="foldcationBox marT100">
        <div class="foldBox">
            <div class="foldcainner">
                <h2>주의사항</h2>
                <dl>API Key를 호출받을 수 있는 IP는 보안상 최대 5개로 제한합니다.</dl>
                <dl>보안을 위해 주기적으로 API Key를 재발급하시면 좋습니다.</dl>
            </div>
<!--            <div class="foldcainner">-->
<!--                <h2>API 키를 특정 웹사이트로 제한하려면 어떻게 해야 하나요?</h2>-->
<!--                <dl class="">HTTP 리퍼러를 사용하여 API 키를 사용할 수 있는 URL을 제한합니다. 다음은 리퍼러로 설정할 수 있는 URL의 몇 가지 예시입니다. </dl>-->
<!--                <div class="foldexBox">-->
<!--                    <div class="foldex"><span>예시</span>확한 경로를 사용한 구체적인 URL: www.example.com/path</div>-->
<!--                    <div class="foldex"><span>예시</span>와일드 카드 별표(*)를 사용한 단일 하위 도메인의 모든 URL: sub.example.com/*</div>-->
<!--                    <div class="foldex">-->
<!--                        <span>예시</span>-->
<!--                        https://example.com<br>-->
<!--                        https://*.example.com-->
<!--                    </div>-->
<!--                    <div class="foldex"><span>예시</span>비표준 포트가 포함된 URL: www.example.com:8000/*</div>-->
<!--                </div>-->
<!--                <dl>참고 : 쿼리 매개변수 및 프래그먼트는 현재 지원되지 않으므로 HTTP 리퍼러에 포함하면 무시됩니다.</dl>-->
<!--            </div>-->
        </div>
    </div>
</div>

<!--<div class="{explanState === true ? 'foldcationBox marT60 guidetablevisible' : 'foldcationBox marT60'}" in:fade>-->
<!--    <div class="foldBox">-->
<!--        <div class="foldcainner">-->
<!--            <h2>주의사항</h2>-->
<!--            <dl class="marB12">API Key를 호출받을 수 있는 IP는 보안상 최대 5개로 제한합니다.</dl>-->
<!--            <dl class="">API Key를 특정 웹사이트로 제한하려면, HTTP 리퍼러를 사용하여 API Key를 사용할 수 있는 URL을 제한합니다. </dl>-->
<!--            <div class="foldexBox">-->
<!--                <div class="foldex"><span>예시</span>https://192/168.0.2/*</div>-->
<!--                <div class="foldex"><span>예시</span>https://34.64.64.12/api/test/*</div>-->
<!--            </div>-->
<!--            <dl>보안을 위해 주기적으로 API Key를 재발급하시면 좋습니다.</dl>-->
<!--        </div>-->
<!--        <div class="foldcainner">-->
<!--            <h2>API 키를 특정 웹사이트로 제한하려면 어떻게 해야 하나요?</h2>-->
<!--            <dl class="marB12">HTTP 리퍼러를 사용하여 API 키를 사용할 수 있는 URL을 제한합니다. 다음은 리퍼러로 설정할 수 있는 URL의 몇 가지 예시입니다. </dl>-->
<!--            <div class="foldexBox">-->
<!--                <div class="foldex"><span>예시</span>확한 경로를 사용한 구체적인 URL: www.example.com/path</div>-->
<!--                <div class="foldex"><span>예시</span>와일드 카드 별표(*)를 사용한 단일 하위 도메인의 모든 URL: sub.example.com/*</div>-->
<!--                <div class="foldex">-->
<!--                    <span>예시</span>-->
<!--                    A domain and all its subdomains, using a wildcard asterisk (*):<br>-->
<!--                    https://example.com<br>-->
<!--                    https://*.example.com-->
<!--                </div>-->
<!--                <div class="foldex"><span>예시</span>비표준 포트가 포함된 URL: www.example.com:8000/*</div>-->
<!--            </div>-->
<!--            <dl>참고 : 쿼리 매개변수 및 프래그먼트는 현재 지원되지 않으므로 HTTP 리퍼러에 포함하면 무시됩니다.</dl>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="gu_btnBox" on:click={explanClick} style="{explanState === true ? 'display:none' : 'display:flex'}">-->
<!--        <div class="guoff_btn">-->
<!--            내용더보기-->
<!--            <img src="/assets/images/common/gu_btnarrow.png" alt="아래화살표">-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
