
<script>
    import { link } from 'svelte-spa-router'
    import {page} from "../../../../lib/store"

    export let size;
    export let total;
    export let qna_list;

</script>

<div class="kotable inq">
    <table>
        <caption>1:1문의 리스트</caption>
        <colgroup>
            <col style="width:5.48%;">
            <col style="width:9.59%;">
            <col style="width:57.53%;">
            <col style="width:13.70%;">
            <col style="width:13.70%;">
        </colgroup>
        <thead>
        <tr>
            <th>No</th>
            <th>분류</th>
            <th>제목</th>
            <th>문의 일시</th>
            <th>상태</th>
        </tr>
        </thead>
        <tbody>
        {#if qna_list.length !== 0}
            {#each qna_list as qna, i}
                <tr>
                    <td>{ total - ($page * size) - i }</td>
                    <td>
                        {#if qna.qnaType === 0}
                            기타
                        {:else if qna.qnaType === 1}
                            회원정보
                        {:else if qna.qnaType === 2}
                            사업자정보
                        {:else if qna.qnaType === 3}
                            Kokonut서비스
                        {:else if qna.qnaType === 4}
                            결제
                        {:else}
                            없음
                        {/if}
                    </td>
                    <td>
                        <a use:link href="/service/environment/qnaDetail/{qna.qnaId}">
                            <div class="reason">{qna.qnaTitle}</div>
                        </a>
                    </td>
                    <td>{qna.insert_date}</td>
                    <td>
                        {#if qna.qnaState === 0}
                            <div class="wait">답변대기</div>
                        {:else}
                            <div class="normal">답변완료</div>
                        {/if}
                    </td>
                </tr>
            {/each}
        {:else}
            <tr class="none_inq">
                <td>문의한 글이 없습니다.</td>
            </tr>
<!--            <tr >-->
<!--                <td></td>-->
<!--                <td></td>-->
<!--                <td style="color: #BBBBBB!important;">문의한 글이 없습니다.</td>-->
<!--            </tr>-->
        {/if}
        </tbody>
    </table>
</div>