
<script>

    export let page;
    export let size;
    export let total;
    export let provision_list;

    export let downloadHistoryClick;
    export let excelDownloadPopService;

    export let handleExitProvisionBtn;

</script>

<div class="kotable privacyList">

    <table>
        <caption>개인정보 처리이력 리스트</caption>
        <colgroup>
            <col style="width:5.48%;">
            <col style="width:9.59%;">
            <col style="width:10.96%;">
            <col style="width:13.70%;">
            <col style="width:19.18%;">
            <col style="width:9.59%;">
            <col style="width:10.96%;">
            <col style="width:9.59%;">
            <col style="width:10.96%;">
        </colgroup>
        <thead>
        <tr>
            <th>No</th>
            <th>상태</th>
            <th>제공자</th>
            <th>만든 날짜</th>
            <th>제공 기간</th>
            <th>제공 타입</th>
            <th>제공인원 수</th>
            <th>다운로드인원 수</th>
            <th>제공기능</th>
        </tr>
        </thead>
        <tbody>
        {#if provision_list.length !== 0}
            {#each provision_list as provision, i}
                <tr>
                    <td>{ total - (page * size) - i }</td>
                    {#if provision.proState === "0"}
                        <td><div class="condition waiting">대기중</div></td>
                    {:else if provision.proState === "1"}
                        <td><div class="condition ing">제공중</div></td>
                    {:else if provision.proState === "2"}
                        <td><div class="condition complete">제공기간 만료</div></td>
                    {:else}
                        <td><div class="condition exit">제공종료</div></td>
                    {/if}
                    <td>{provision.knName}</td>
                    <td>{provision.insert_date}</td>
                    <td>{provision.proStartDate} ~ {provision.proExpDate}</td>
                    {#if provision.offerType === "1"}
                        <td><div>제공함</div></td>
                    {:else}
                        <td><div>제공받음</div></td>
                    {/if}
                    <td>{provision.offerCount}</td>
                    <td><div class="dcount downcountPop" on:click={() => downloadHistoryClick(provision.proCode)}>{provision.downloadCount}</div></td>
                    <td>
                        {#if provision.proState === "1" && provision.downloadAccept === "1"}
                            <div class="dlink">
                                <a on:click={() => {excelDownloadPopService.open({proCode: provision.proCode})}}>다운로드</a>
                            </div>
                        {:else if provision.proState === "1" && provision.downloadAccept === "2"}
                            <div class="dlink">
                                <a on:click={() => {handleExitProvisionBtn(provision.proCode)}}>제공종료</a>
                            </div>

                        {:else if provision.proState === "1" && provision.downloadAccept === "3"}
                            <div class="dlink">
                                <a on:click={() => {excelDownloadPopService.open({proCode: provision.proCode})}}>다운로드</a>
                            </div>
                            /
                            <div class="dlink">
                                <a on:click={() => {handleExitProvisionBtn(provision.proCode)}}>제공종료</a>
                            </div>
                        {/if}
                    </td>
                </tr>
            {/each}
        {:else}
            <tr class="none_inq">
                <td>제공된 개인정보가 없습니다.</td>
            </tr>
        {/if}
        </tbody>
    </table>
</div>