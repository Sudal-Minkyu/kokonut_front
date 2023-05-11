
<script>
    import { link } from 'svelte-spa-router'
    import { page } from "../../../lib/store"

    export let size;
    export let total;
    export let provision_list;

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
            <th>다운로드 유무</th>
            <th>제공인원 수</th>
            <th>다운로드 횟수</th>
            <th>상세보기</th>
        </tr>
        </thead>
        <tbody>
        {#if provision_list.length !== 0}
            {#each provision_list as provision, i}
                <tr>
                    <td>{ total - ($page * size) - i }</td>
                    {#if provision.proState === "0"}
                        <td><div class="condition waiting">대기중</div></td>
                    {:else if provision.proState === "1"}
                        <td><div class="condition ing">제공중</div></td>
                    {:else}
                        <td><div class="condition complete">제공완료</div></td>
                    {/if}
                    <td>{provision.knName}</td>
                    <td>{provision.insert_date}</td>
                    <td>{provision.proStartDate} ~ {provision.proExpDate}</td>
                    <td>{provision.proDownloadYn}</td>
                    <td>{provision.offerCount}</td>
                    <td><div class="dcount downcountPop">{provision.downloadCount}</div></td>
                    <td>
                        <div class="dlink">
                            <a use:link href="/service/privacyDetail/{provision.proCode}">상세보기</a>
                        </div>
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