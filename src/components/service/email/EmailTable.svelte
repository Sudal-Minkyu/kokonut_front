
<script>

    export let size;
    export let total;
    export let email_list;

    const getEmPurposeName = ({emPurpose, emEtc}) => {
        const nameObj = {
            '1': '주요공지',
            '2': '광고/홍보',
            '3': '기타',
        }

        return (nameObj[emPurpose] || '미분류') + (emPurpose === '3' ? ` (${emEtc})` : '');
    }

    const getSendDateText = ({send_date}) => {
        return send_date.substring(0, 10) + ' ' + send_date.substring(11, 16);
    }

    const getEmStateName = ({emState}) => {
        const nameObj = {
            '1': '발송중',
            '2': '발송예약중',
            '3': '일부실패',
            '4': '발송실패',
            '5': '발송완료',
            '6': '발송취소',
        }

        return nameObj[emState] || '미분류';
    }

</script>

<div class="kotable email_list">
    <table>
        <caption>이메일 발송 리스트</caption>
        <thead>
            <tr>
                <th>발송 목적</th>
                <th>보낸 사람</th>
                <th>제목</th>
                <th>날짜</th>
                <th>대상 수</th>
                <th>성공 수</th>
                <th>실패 수</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody>
            {#if email_list.length !== 0}
                {#each email_list as email, i}
                    <tr>
                        <td>{getEmPurposeName(email)}</td>
                        <td>{email.knName} ( {email.insert_email} )</td>
                        <td>{email.emTitle}</td>
                        <td>{#if email.emState === '2'}<span>예약</span>{/if}{getSendDateText(email)}</td>
                        <td>{email.emSendAllCount}</td>
                        <td>{email.emSendSucCount}</td>
                        <td>{email.emSendFailCount}</td>
                        <td>{getEmStateName(email)}</td>
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