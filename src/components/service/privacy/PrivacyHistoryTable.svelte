
<script>
    import {onDestroy, onMount} from "svelte";

    export let page;
    export let size;
    export let total;
    export let privacy_history_list;


    $: privacy_history_list.map(obj => {
        obj.isOffDutyAction = determineOffDuty(obj.insert_date);
    });

    // 지정 시간 외에 일어난 작업에 대해서 검사하여 여부 반환
    const determineOffDuty = (time) => {
        const hour = Number(time.substring(11, 13));
        return hour < 8 || hour > 20;
    }

    // 툴팁기능 (클릭시 펼쳐지는 물음표) 동작을 위함
    const tooltipEvent = (e) => {
        const toolTipElements = document.getElementsByClassName('layerToolType');
        for (const el of toolTipElements) {
            el.style.display = 'none';
        }
        if (e.target.classList.contains('tiptool')) {
            var children = e.target.children;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.classList.contains('layerToolType')) {
                    child.style.display = 'block';
                    break;
                }
            }
        }
    }

    onMount(async => {
        document.addEventListener('click', tooltipEvent);
    });

    onDestroy(async () => {
        document.removeEventListener('click', tooltipEvent);
    });

</script>

<div class="kotable searchList">

    <table>
        <caption>개인정보 처리이력 리스트</caption>
        <colgroup>
            <col style="width:5%;">
            <col style="width:10%;">
            <col style="width:30%;">
            <col style="width:5%;">
            <col style="width:10%;">
            <col style="width:20%;">
            <col style="width:10%;">
            <col style="width:15%;">
            <col style="width:10%;">
        </colgroup>
        <thead>
        <tr>
            <th>No</th>
            <th>처리 내역</th>
            <th>처리 내용</th>
            <th>관리자</th>
            <th>관리자 등급</th>
            <th>관리자 이메일</th>
            <th>활동 일시
            <span class="tiptool" id="tool_btn01">
                <!-- [D] tooltip : 처리목적 -->
                <div class="layerToolType thtool_01" id="tool_box01">
                    <div class="tipContents">
                        <p>
                            오전 8시 ~ 오후 8시 이외의 시간의 내역은 빨간색으로 표시됩니다.
                        </p>
                    </div>
                </div>
                <!-- // [D] 처리목적 -->
            </span>
            </th>
            <th>활동 IP</th>
        </tr>
        </thead>
        <tbody>
        {#if privacy_history_list.length !== 0}
            {#each privacy_history_list as privacyHistory, i}
                <tr>
                    <td>{ total - (page * size) - i }</td>
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
                    <td>{privacyHistory.kphReason}</td>
                    <td>{privacyHistory.knName}</td>
                    {#if privacyHistory.knRoleCode === "ROLE_MASTER"}
                        <td style="left: 10px">{privacyHistory.knRoleDesc}<div class="mastericon"></div></td>
                    {:else}
                        <td>{privacyHistory.knRoleDesc}</td>
                    {/if}
                    <td>{privacyHistory.knEmail}</td>
                    <td style="{privacyHistory.isOffDutyAction ? 'color:#FC5757' : ''}">{privacyHistory.insert_date}</td>
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
