
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { backBtn, page } from '../../../lib/store.js'

    import { onMount } from 'svelte';
    import restapi from "../../../lib/api.js";
    import { fade } from 'svelte/transition'

    import QnaTable from "../../../components/service/environment/qna/QnaTable.svelte"
    import Paging from "../../../components/common/Paging.svelte"

    // 나의정보 가져오기
    onMount(async () => {

        // 페이지번호 초기화
        page.set(0);
        qnaList($page);

        // setTimeout(() => qnaLayout = 1, 500);
    })

    let qnaLayout = 0;

    let qna_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    function qnaList(pageNum) {
        console.log("1:1 문의하기 리스트 호출 클릭!");

        page.set(pageNum);

        let url = "/v2/api/Qna/qnaList?page=" + pageNum+"&size="+size;

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");
                    qna_list = json_success.data.datalist
                    total = json_success.data.total_rows
                } else {
                    qna_list = [];
                    total = 0;
                    console.log("조회된 데이터가 없습니다.");
                }
                qnaLayout = 1;
            },
            (json_error) => {
                console.log(json_error);
                console.log("1:1 문의하기 리스트 호출 실패");
            }
        )

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

        {#if qnaLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else}
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
        {/if}

    </div>
</section>

