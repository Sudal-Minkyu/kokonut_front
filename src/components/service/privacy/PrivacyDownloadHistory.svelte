
<script>

    import { fade } from 'svelte/transition'
    import {popupPage} from "../../../lib/store.js";

    export let downloadPopClose;

    export let provisionDownload_size;
    export let provisionDownload_total;

    export let provisionDownload_total_page;
    export let provisionDownloadHistory_list;
    export let downloadHistoryList;

</script>

<div class="koko_popup open_downcountPop" in:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">개인정보제공 다운로드 내역</h3>
            </div>

            <div class="prilistpop">
                <div class="kt_tableTopBox marB16">
                    <div class="kt_total">총 <span>{provisionDownload_total}</span>건</div>
                </div>

                <div class="prtable">
                    <table>
                        <colgroup>
                            <col style="width:10.91%;">
                            <col style="width:38.18%;">
                            <col style="width:25.45%;">
                            <col style="width:25.45%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>다운로드 일시</th>
                            <th>다운로드 시간</th>
                            <th>다운로더</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#if provisionDownloadHistory_list.length !== 0}
                            {#each provisionDownloadHistory_list as downloadHistory, i}
                                <tr>
                                    <td>{ provisionDownload_total - ($popupPage * provisionDownload_size) - i }</td>
                                    <td>{downloadHistory.insert_date}</td>
                                    <td>{downloadHistory.insert_time}</td>
                                    <td>{downloadHistory.knName}</td>
                                </tr>
                            {/each}
                        {:else}
                            <tr class="none_inq">
                                <td>다운로드 이력이 없습니다.</td>
                            </tr>
                        {/if}
                        </tbody>
                    </table>
                </div>

                <!-- 페이징 영역 -->
                {#if provisionDownloadHistory_list.length !== 0}
                    <div class="paginationBox marT40">
                        <ul class="pagination">
                            <!-- 이전페이지 -->
                            <li class="page-item page-pre {$popupPage <= 0 && 'disabled' || ''}">
                                <button class="page-link" aria-label="previous page" on:click="{() => downloadHistoryList($popupPage-1)}" disabled={$popupPage === 0} ></button>
                            </li>
                            <!-- 페이지번호 -->
                            {#each Array(provisionDownload_total_page) as _, loop_page}
                                {#if loop_page >= $popupPage-4 && loop_page <= $popupPage+4}
                                    <li class="page-item {loop_page === $popupPage && 'active'}">
                                        <button class="page-link" aria-label="to page {loop_page}" on:click="{() => downloadHistoryList(loop_page)}">{loop_page+1}</button>
                                    </li>
                                {/if}
                            {/each}
                            <!-- 다음페이지 -->
                            <li class="page-item page-next {$popupPage >= provisionDownload_total_page-1 && 'disabled' || ''}">
                                <button aria-label="next page" class="page-link" on:click="{() => downloadHistoryList($popupPage+1)}" disabled={$popupPage === provisionDownload_total_page-1}></button>
                            </li>
                        </ul>
                    </div>
                {/if}

            </div>
        </div>
        <div class="koko-popup-close downcountPop_close" on:click={downloadPopClose}></div>
    </div>
</div>