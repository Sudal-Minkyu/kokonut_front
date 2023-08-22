<script>
    export let currentPage = 1; // 현제 페이지,
    export let totalPosts = 0; // 전체 게시물의 수
    export let postsPerPage = 10; // 한 페이지에 보여줄 게시물의 수
    export let buttonsToShow = 10; // 보여줄 버튼의 수

    $: totalPageCount = Math.ceil(totalPosts / postsPerPage);
    $: group = Math.ceil(currentPage / buttonsToShow);
    $: startPage = (group - 1) * buttonsToShow + 1;
    $: endPage = Math.min(group * buttonsToShow, totalPageCount);

    function goToPage(page) {
        dispatch("change", {page});
    }

    function dispatch(event, detail) {
        const customEvent = new CustomEvent(event, { detail });
        dispatchEvent(customEvent);
    }
</script>

<div class="paginationBox marT40">
    <ul class="pagination">
        {#if startPage > 1 && false}
            <li class="page-item">
                <button class="page-link" aria-label="to page 1" on:click={() => goToPage(1)}>
                    &laquo;
                </button>
            </li>
        {/if}
        <li class="page-item page-pre {startPage === 1 ? 'disabled' : ''}">
            <button class="page-link" aria-label="to page {startPage - 1}" on:click={() => goToPage(startPage - 1)}></button>
        </li>

        {#each Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i) as page}
            <li class="page-item {currentPage === page ? 'active' : ''}">
                <button class="page-link" aria-label="to page {page}" on:click={() => goToPage(page)}>{page}</button>
            </li>
        {/each}

        <li class="page-item page-next {endPage === totalPageCount ? 'disabled' : ''}">
            <button class="page-link " aria-label="to page {endPage + 1}" on:click={() => goToPage(endPage + 1)}></button>
        </li>
        {#if endPage < totalPageCount || false}
            <li class="page-item">
                <button class="page-link" aria-label="to page {totalPageCount}" on:click={() => goToPage(totalPageCount)}>
                    &raquo;
                </button>
            </li>
        {/if}
    </ul>
</div>