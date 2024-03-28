
<script >
    export let page;
    export let size;
    export let total;
    export let activity_list;

</script>

<!-- 테이블 영역 -->
<div class="kotable adminActivityManagement">

    <table>
        <caption>관리자 활동 이력 리스트</caption>
<!--        <colgroup>-->
<!--            <col style="width:5.48%;">-->
<!--            <col style="width:20.59%;">-->
<!--            <col style="width:7.96%;">-->
<!--            <col style="width:15.4%;">-->
<!--            <col style="width:18.07%;">-->
<!--            <col style="width:25.07%;">-->
<!--            <col style="width:9.44%;">-->
<!--        </colgroup>-->
        <thead>
        <tr>
            <th>No</th>
            <th>관리자</th>
            <th>활동내역</th>
            <th>활동상세내역</th>
            <th>활동일시(접속IP)</th>
            <th>상태</th>
        </tr>
        </thead>
        <tbody>
        {#if activity_list.length !== 0}
            {#each activity_list as activity, i}
                <tr>
                    <td>{ total - (page * size) - i }</td>
                    <td>{activity.knName}({activity.knEmail})</td>
                    <td>
                        <div>{activity.ahActivityDetail || "-" }</div>
                    </td>
                    <td>{activity.insert_date}(IP:{activity.ahIpAddr})</td>
                    <td>
                        {#if activity.ahState === 1}
                            <div class="normal">성공</div>
                        {:else}
                            <div class="secession">실패</div>
                        {/if}
                    </td>
                </tr>
            {/each}
        {:else}
            <tr class="none_inq">
                <td>조회된 데이터가 없습니다.</td>
            </tr>
        {/if}
        </tbody>
    </table>
</div>