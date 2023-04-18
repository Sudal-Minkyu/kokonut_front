
<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { onMount } from "svelte";

    onMount(async () => {

    })
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>환경설정</h1>
        </div>

        <ul style="font-size: 30px;">
            <li><span>페이지 1 : </span><a style="color: #00BA83" use:link href="/service/environment/apikey">API Key 관리</a></li>
            <br/>
            <li><span>페이지 2 : </span><a style="color: #00BA83" use:link href="/service/environment/mypage">내정보</a></li>
            <br/>
            <li><span>페이지 3 : </span><a style="color: #00BA83" use:link href="/service/environment/setting">서비스설정</a></li>
            <br/>
            <li><span>페이지 4 : </span><a style="color: #00BA83" use:link href="/service/environment/qnaList">1:1 문의</a></li>
            <br/>
            <li><span>페이지 5 : </span><a style="color: #00BA83" use:link href="/service/environment/personalInfoItem">개안정보 항목관리</a></li>
        </ul>

    </div>
</section>