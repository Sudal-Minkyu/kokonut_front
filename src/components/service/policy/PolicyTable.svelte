
<script>
    import { link } from 'svelte-spa-router'
    import {page} from "../../../lib/store"

    export let size;
    export let total;
    export let policy_list;

    function addTwoWeeks(dateString) {
        const dateParts = dateString.split("-").map(Number);
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        date.setDate(date.getDate() + 14);
        return `${date.getFullYear()}. ${("0" + (date.getMonth() + 1)).slice(-2)}. ${("0" + date.getDate()).slice(-2)}`;
    }

</script>

<div class="kotable policyList">
<!--    <div class="kt_tableTopBox marB20">-->
<!--        <div class="kt_total">총 <span>{total}</span>건</div>-->
<!--    </div>-->
    <table>
        <caption>개인정보 처리이력 리스트</caption>
        <colgroup>
            <col style="width:5.48%;">
            <col style="width:9.59%;">
            <col style="width:10.96%;">
            <col style="width:12.33%;">
            <col style="width:15.07%;">
            <col style="width:15.07%;">
            <col style="width:15.07%;">
            <col style="width:16.44%;">
        </colgroup>
        <thead>
        <tr>
            <th>No</th>
            <th>버전</th>
            <th>작성자</th>
            <th>등급</th>
            <th>제작일</th>
            <th>개정일</th>
            <th>시행일</th>
            <th>전문확인</th>
        </tr>
        </thead>
        <tbody>
        {#if policy_list.length !== 0}
            {#each policy_list as policy, i}
                <tr>
                    <td>{ total - ($page * size) - i }</td>
                    <td>{policy.piVersion}</td>
                    <td>{policy.knName}</td>
                    {#if policy.knRoleCode === "ROLE_MASTER"}
                        <td style="left: 10px">{policy.knRoleDesc}<div class="mastericon"></div></td>
                    {:else}
                        <td>{policy.knRoleDesc}</td>
                    {/if}
                    <td>{policy.insert_date}</td>
                    <td>{policy.piDate.replaceAll("-",". ")}</td>
                    <td>{addTwoWeeks(policy.piDate)}</td>
                    <td>
                        <div class="dlink">
                            <a use:link href="/service/policyDetail/{policy.piId}">상세보기</a>
                        </div>
                    </td>
                </tr>
            {/each}
        {:else}
            <tr class="none_inq">
                <td>제젝하신 개인정보처리방침이 없습니다.</td>
            </tr>
<!--            <tr >-->
<!--                <td></td>-->
<!--                <td></td>-->
<!--                <td></td>-->
<!--                <td></td>-->
<!--                <td style="color: #BBBBBB!important;">제젝하신 개인정보처리방침이 없습니다.</td>-->
<!--                <td></td>-->
<!--            </tr>-->
        {/if}
        </tbody>
    </table>

</div>