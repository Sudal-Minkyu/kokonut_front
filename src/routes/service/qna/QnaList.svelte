
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { backBtn } from '../../../lib/store.js'

    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition'

    import QnaTable from "../../../components/service/environment/qna/QnaTable.svelte"
    import Paging from "../../../components/common/Paging.svelte"
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";

    // 나의정보 가져오기
    onMount(() => {
        qnaList(0);
    })

    let qnaLayout = 0;

    let qna_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)
    const searchCondition = {
        page: 0,
        size,
    }
    function qnaList(page) {
        qnaLayout = 0;
        searchCondition.page = page;

        let url = "/v2/api/Qna/qnaList";
        ajaxGet(url, false, (res) => {
            try {
                qna_list = res.data.datalist
                total = res.data.total_rows
                qnaLayout = 1;
            } catch (e) {
                reportCatch('temp098', e);
            }
        });
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="spcontWrap">
            <div class="pageTitleBtn marB50">
                <a use:link href="/service/environment">{$backBtn}</a><h1>1:1 문의</h1>
                <dl>
                    💡 서비스 관련 궁금증이 있으신가요?<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;궁금한 내용을 남겨주시면 최대한 빠르게 답변을 드리도록 하겠습니다.
                </dl>
            </div>
        </div>
        <LoadingOverlay bind:loadState={qnaLayout} top={150}>
            <div in:fade>
                <!-- 각 컴포넌트 넣기 -->
                <div class="bottomBtnBox marB24">
                    <a use:link href="/service/environment/qnaWrite" class="bottomBtn">문의하기</a>
                </div>

                <!-- 테이블 영역 -->
                <QnaTable page={searchCondition.page} {qna_list} {size} {total} />

                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{qna_list}" dataFunction="{qnaList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>

