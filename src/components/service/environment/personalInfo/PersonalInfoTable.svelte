<script>
    import {personalInfoTableData} from "../../../../lib/store.js";
    export let personalInfoItemProp;
    export let personalInfoTableService;
</script>

<div class="prPart2_box" >


    <div class="prptitle marB24">
        <h2>개인정보 항목
            <button class="addtabBtn" id="add_tab_pop"  on:click={personalInfoTableService.addTabPop.show}>
                <img src="/assets/images/common/tab_add_button_ver2.png" alt="탭추가">
            </button>
        </h2>
    </div>

    <div class="bo_tabBox" style="overflow: scroll">
        <div class="tabWrap">
            {#each $personalInfoTableData.userTableData as table, i}
                <div class="bo_tab {!i ? 'on_bo' : ''}" on:click={() => personalInfoItemProp.getTableColumnList(table.ctName)}>
                    {table.ctDesignation}
                </div>
            {/each}
        </div>
    </div>

    <div class="boaTabBox">
        <div class="bo_tabContentBox">
            <div class="prtable" style="height: 38em;">
                <table>
                    <colgroup>
                        <col style="width:8.21%;">
                        <col style="width:11.00%;">
                        <col style="width:20.66%;">
                        <col style="width:60.14%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>선택</th>
                        <th>고유번호</th>
                        <th>항목</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $personalInfoTableData.columnList as column, i}
                        <tr>
                            <td>{i+1}</td>
                            {#if column.fieldCode === "default" }
                                <td></td>
                            {:else}
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" bind:group={$personalInfoTableData.checkedColumnNameList} on:change={personalInfoTableService.handleColumnChecked} value="{column.fieldName}" id="ip{i}" class="partcheck">
                                        <label for="ip{i}"><em></em></label>
                                    </div>
                                </td>
                            {/if}
                            <td>
                                {column.fieldCode !== 'default' ? column.fieldCode : ''}
                            </td>
                            {#if column.fieldSecrity === 1}
                                <td>
                                    <div class="lockicon"></div>
                                    {column.fieldComment}
                                    <span class="subElement {column.fieldColor}">{column.fieldCategory}</span>
                                </td>
                            {:else}
                                <td>
                                    {column.fieldComment}
                                    <span class="subElement {column.fieldColor}">{column.fieldCategory}</span>
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

    <div class="prDelBtn marT20" style="visibility: {$personalInfoTableData.columnList.length ? 'visible' : 'hidden'};">
        <button id="delete_pr_pop" on:click={personalInfoTableService.removeColumnPop.show}>삭제</button>
    </div>
    <div class="prbott">
        <ul>
            <li>항목의 추가, 수정, 삭제 시 데이터 양에 따라 최대 3일까지 소요될 수 있습니다.</li>
            <li>테이블 및 항목 삭제 시 데이터는 모두 삭제되며 복구 불가능합니다.</li>
            <li>테이블 및 항목 삭제 시 OTP 인증을 진행해야 합니다.</li>
        </ul>
    </div>

</div>