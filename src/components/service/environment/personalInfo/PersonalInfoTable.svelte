<script>
    import {personalInfoTableData, userInfoData} from "../../../../lib/store.js";
    import 'swiper/css/bundle';
    export let personalInfoTableService;

    $: isModifiable = ['ROLE_MASTER', 'ROLE_ADMIN'].includes($userInfoData.role);
</script>

<div class="prPart2_box" style="width: 41%;">
    <div class="prptitle marB24">
        <h2>개인정보 항목</h2>
    </div>

    <div class="boaTabBox" style="padding-top: 0.2rem;">
        <div class="bo_tabContentBox">
            <div class="prtable" style="max-height: 41.5rem">
                <table>
                    <thead>
                    <tr>
                        <th>No</th>
                        {#if isModifiable}
                            <th>선택</th>
                        {/if}
                        <th>고유번호</th>
                        <th>항목</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $personalInfoTableData.columnList as column, i}
                        <tr>
                            <td>{i+1}</td>
                            {#if ['1_id', '1_pw'].includes(column.fieldCode) && isModifiable}
                                <td></td>
                            {:else if (isModifiable)}
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" bind:group={$personalInfoTableData.checkedColumnNameList} on:change={personalInfoTableService.handleColumnChecked} value="{column.fieldName}" id="ip{i}" class="partcheck">
                                        <label for="ip{i}"><em></em></label>
                                    </div>
                                </td>
                            {/if}
                            <td>
                                {column.fieldCode}
                            </td>
                            {#if column.fieldSecrity === 1}
                                <td>
                                    <div class="lockicon"></div>
                                    {column.fieldComment}
                                    {#if column.fieldCategory}
                                        <span class="subElement {column.fieldColor}">{column.fieldCategory}</span>
                                    {/if}
                                </td>
                            {:else}
                                <td>
                                    {column.fieldComment}
                                    {#if column.fieldCategory}
                                        <span class="subElement {column.fieldColor}">{column.fieldCategory}</span>
                                    {/if}
                                </td>
                            {/if}
                            <!--{#if column.fieldName === "ID" || column.fieldName === "PASSWORD" }-->
                            <!--    <td>-->
                            <!--        <div class="nonereviseBtn">수정불가</div>-->
                            <!--    </td>-->
                            <!--{:else}-->
                            <!--    <td>-->
                            <!--        <button>수정하기</button>-->
                            <!--    </td>-->
                            <!--{/if}-->
                        </tr>
                    {/each}
                    {#if !$personalInfoTableData.columnList.length}
                        <tr class="none_inq">
                            <td>추가된 항목이 없습니다.</td>
                        </tr>
                    {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {#if isModifiable}
        <div class="prDelBtn marT20" style="visibility: {$personalInfoTableData.columnList.length ? 'visible' : 'hidden'};">
            <button id="delete_pr_pop" on:click={personalInfoTableService.removeColumnPop.show}>삭제</button>
        </div>
    {/if}
    <div class="prbott">
        <ul>
            <li>항목의 추가, 수정, 삭제 시 데이터 양에 따라 최대 3일까지 소요될 수 있습니다.</li>
            <li>테이블 및 항목 삭제 시 데이터는 모두 삭제되며 복구 불가능합니다.</li>
            <li>테이블 및 항목 삭제 시 OTP 인증을 진행해야 합니다.</li>
        </ul>
    </div>

</div>