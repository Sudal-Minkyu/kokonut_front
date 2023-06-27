
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { backBtn, page } from '../../../lib/store.js'

    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition'

    import QnaTable from "../../../components/service/environment/qna/QnaTable.svelte"
    import Paging from "../../../components/common/Paging.svelte"
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet} from "../../../components/common/ajax.js";

    // 나의정보 가져오기
    onMount(() => {
        page.set(0);
        qnaList($page);
    })

    let qnaLayout = 0;

    let qna_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    function qnaList(pageNum) {
        console.log("1:1 문의하기 리스트 호출 클릭!");
        qnaLayout = 0;
        page.set(pageNum);

        let url = "/v2/api/Qna/qnaList?page=" + pageNum+"&size="+size;
        ajaxGet(url, false, (res) => {
            qna_list = res.data.datalist
            total = res.data.total_rows
            qnaLayout = 1;
        }, (errCode) => {
            qna_list = [];
            total = 0;
            qnaLayout = 1;
        });
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment" on:click="{() => {$page = 0}}">{$backBtn}</a><h1>1:1 문의</h1>
            <dl>
                서비스 관련 궁금증이 있으신가요?<br>
                궁금한 내용을 남겨주시면 최대한 빠르게 답변을 드리도록 하겠습니다.
            </dl>
        </div>
        <LoadingOverlay bind:loadState={qnaLayout} >
            <div in:fade>
                <!-- 각 컴포넌트 넣기 -->
                <div class="bottomBtnBox marB24">
                    <a use:link href="/service/environment/qnaWrite" class="bottomBtn">문의하기</a>
                </div>

                <!-- 테이블 영역 -->
                <QnaTable {qna_list} {size} {total} />

                <!-- 페이징 영역 -->
                <Paging total_page="{total_page}" data_list="{qna_list}" dataFunction="{qnaList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>

