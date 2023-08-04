
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
        <thead>
        <tr>
            <th>No</th>
            <th>관리자</th>
            <th>등급</th>
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
                    {#if activity.knRoleCode === "ROLE_MASTER"}
                        <td style="left: 10px">{activity.knRoleDesc}<div class="mastericon"></div></td>
                    {:else}
                        <td>{activity.knRoleDesc}</td>
                    {/if}
                    <td>{activity.activityCode}</td>
                    <td>
                        <div class="reason">{activity.ahActivityDetail}</div>
                    </td>
                    <td>{activity.insert_date}(IP:{activity.ahIpAddr})</td>
                    <td>
                        {#if activity.ahState === 1}
                            <div class="normal">정상</div>
                        {:else}
                            <div class="secession">비정상</div>
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