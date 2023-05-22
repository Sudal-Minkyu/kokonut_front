
<script>
    import { page } from "../../../lib/store"

    export let size;
    export let total;
    export let privacy_history_list;

</script>

<div class="kotable searchList">

    <table>
        <caption>개인정보 처리이력 리스트</caption>
        <colgroup>
            <col style="width:5.48%;">
            <col style="width:15.07%;">
            <col style="width:10.96%;">
            <col style="width:13.70%;">
            <col style="width:20.55%;">
            <col style="width:17.81%;">
            <col style="width:16.44%;">
        </colgroup>
        <thead>
        <tr>
            <th>No</th>
            <th>처리 내역</th>
            <th>관리자</th>
            <th>관리자 등급</th>
            <th>해당 회원 ID</th>
            <th>활동 일시
<!--            <span class="tiptool" id="tool_btn01">-->
<!--                &lt;!&ndash; [D] tooltip : 처리목적 &ndash;&gt;-->
<!--                <div class="layerToolType thtool_01" id="tool_box01">-->
<!--                    <div class="tipContents">-->
<!--                        <p>-->
<!--                            오전 8시 ~ 오후 8시 이외의 시간의 내역은 빨간색으로 표시됩니다.-->
<!--                        </p>-->
<!--                    </div>-->
<!--                </div>-->
<!--                &lt;!&ndash; // [D] 처리목적 &ndash;&gt;-->
<!--            </span>-->
            </th>
            <th>활동 IP</th>
        </tr>
        </thead>
        <tbody>
        {#if privacy_history_list.length !== 0}
            {#each privacy_history_list as privacyHistory, i}
                <tr>
                    <td>{ total - ($page * size) - i }</td>
                    {#if privacyHistory.privacyHistoryCode === "생성"}
                        <td><div class="processing produce">생성</div></td>
                    {:else if privacyHistory.privacyHistoryCode === "변경"}
                        <td><div class="processing change">변경</div></td>
                    {:else if privacyHistory.privacyHistoryCode === "삭제"}
                        <td><div class="processing delete">삭제</div></td>
                    {:else if privacyHistory.privacyHistoryCode === "조회"}
                        <td><div class="processing check">조회</div></td>
                    {:else if privacyHistory.privacyHistoryCode === "열람"}
                        <td><div class="processing reading">열람</div></td>
                    {:else}
                        <td><div class="condition complete">알수없음</div></td>
                    {/if}
                    <td>{privacyHistory.privacyHistoryCode}</td>
                    <td>{privacyHistory.knName}</td>
                    {#if privacyHistory.knRoleCode === "ROLE_MASTER"}
                        <td style="left: 10px">{privacyHistory.knRoleDesc}<div class="mastericon"></div></td>
                    {:else}
                        <td>{privacyHistory.knRoleDesc}</td>
                    {/if}
                    <td>{privacyHistory.knEmail}</td>
                    <td>{privacyHistory.insert_date}</td>
                    <td>{privacyHistory.kphIpAddr}</td>
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
