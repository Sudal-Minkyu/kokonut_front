
<script>
    import { page } from "../../lib/store"

    export let total_page;
    export let data_list;
    export let dataFunction

</script>

{#if data_list.length !== 0}
    <div class="paginationBox marT40">
        <ul class="pagination">
            <!-- 이전페이지 -->
            <li class="page-item page-pre {$page <= 0 && 'disabled' || ''}">
                <button class="page-link" aria-label="previous page" on:click="{() => dataFunction($page-1)}" disabled={$page === 0} ></button>
            </li>
            <!-- 페이지번호 -->
            {#each Array(total_page) as _, loop_page}
                {#if loop_page >= $page-4 && loop_page <= $page+4}
                    <li class="page-item {loop_page === $page && 'active'}">
                        <button class="page-link" aria-label="to page {loop_page}" on:click="{() => dataFunction(loop_page)}">{loop_page+1}</button>
                    </li>
                {/if}
            {/each}
            <!-- 다음페이지 -->
            <li class="page-item page-next {$page >= total_page-1 && 'disabled' || ''}">
                <button aria-label="next page" class="page-link" on:click="{() => dataFunction($page+1)}" disabled={$page === total_page-1}></button>
            </li>
        </ul>
    </div>
{/if}