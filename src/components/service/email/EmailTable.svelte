
<script>
    import {page} from "../../../lib/store"

    export let size;
    export let total;
    export let email_list;
</script>

<div class="kotable email_list">
    <table>
        <caption>이메일 발송 리스트</caption>
        <colgroup>
            <col style="width:8.22%;">
            <col style="width:19.18%;">
            <col style="width:38.36%;">
            <col style="width:8.22%;">
            <col style="width:13.70%;">
            <col style="width:12.33%;">
        </colgroup>
        <thead>
            <tr>
                <th>발송 목적</th>
                <th>보낸 사람</th>
                <th>제목</th>
                <th>받는 사람 수</th>
                <th>날짜</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody>
            {#if email_list.length !== 0}
                {#each email_list as email, i}
                    <tr>
                        <td>{email.sendType}</td>
                        <td>{email.sendName}({email.sendEmail})</td>
                        <td>{email.title}</td>
<!--                        <td>-->
<!--                            <div class="reason">{activity.ahActivityDetail}</div>-->
<!--                        </td>-->
<!--                        <td>{activity.insert_date}(IP:{activity.ahIpAddr})</td>-->
<!--                        <td>-->
<!--                            {#if activity.ahState === 1}-->
<!--                                <div class="normal">정상</div>-->
<!--                            {:else}-->
<!--                                <div class="secession">비정상</div>-->
<!--                            {/if}-->
<!--                        </td>-->
                    </tr>
                {/each}
            {:else}
                <tr class="none_inq">
                    <td>조회된 데이터가 없습니다.</td>
                </tr>
            {/if}
            <tr>
                <td>주요공지</td>
                <td>코코넛 (testestest@kokonut.me)</td>
                <td>
                    <div class="reason">[코코넛] 안녕하세요. 개인정보처림방침 관련 안내 메일입니다.</div>
                </td>
                <td>500</td>
                <td><span>예약</span>오후 02:30</td>
                <td>발송전<button>취소</button></td>
            </tr>
            <tr>
                <td>광고·홍보</td>
                <td>코코넛 (test@kokonut.me)</td>
                <td>
                    <div class="reason">[코코넛] 안녕하세요. 개인정보처림방침 관련 안내 메일입니다.</div>
                </td>
                <td>500</td>
                <td>2023-01-27 09:00</td>
                <td>발송완료</td>
            </tr>
        </tbody>
    </table>
</div>