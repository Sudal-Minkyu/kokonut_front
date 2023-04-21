<script>

    import restapi from "../../../../lib/api.js";
    import jQuery from "jquery";
    import {accessToken, is_login} from "../../../../lib/store.js";
    import {push} from "svelte-spa-router";

    export let tableName;
    export let table_list;
    export let column_list;

    console.log("tableName : "+tableName);
    console.log(table_list);
    console.log(column_list);
    console.log(column_list.length);

    // console.log(column_list[0].columnList);
    // console.log(column_list[1].columnList);

    export let userTableList;
    export let userTableClick;
    export let addTabPopController;

    // 테이블삭제 및 이름수정
    function tableUpdate() {

        console.log("테이블 삭제 및 이름수정 호출")

        let url = "/v2/api/DynamicUser/tableColumnUpdate";
        let sendData = {
            tableName : tableName
        }

        restapi('v2', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {

                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    is_login.set(false);
                    accessToken.set("");
                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("테이블삭제 및 이름수정 실패");
            }
        )

    }

</script>

<div class="prPart2_box" >


    <div class="prptitle marB24">
        <h2>개인정보 항목
            <button class="addtabBtn" id="add_tab_pop"  on:click={addTabPopController.show}>
                <img src="/assets/images/common/tab_add_button_ver2.png" alt="탭추가">
            </button>
        </h2>
    </div>

    <div class="bo_tabBox" style="overflow: scroll">
        <div class="tabWrap">
            {#if table_list.length !== 0}
                {#each table_list as table, i}
                    {#if i === 0}
                        <div class="bo_tab on_bo" on:click={() => userTableClick(table.ctName)}>
                            {table.ctDesignation}
                        </div>
                    {:else}
                        <div class="bo_tab" on:click={() => userTableClick(table.ctName)}>
                            {table.ctDesignation}
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>

    <div class="boaTabBox">
        <div class="bo_tabContentBox">
            <div class="prtable">
                <table>
                    <colgroup>
                        <col style="width:8.21%;">
                        <col style="width:11.00%;">
                        <col style="width:60.14%;">
                        <col style="width:20.66%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>선택</th>
                        <th>항목</th>
                        <th>수정</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#if column_list.length !== 0}
                        {#each column_list as column, i}
                            <tr>
                                <td>{i+1}</td>
                                {#if column.fieldName === "ID" || column.fieldName === "PASSWORD" }
                                    <td></td>
                                {:else}
                                    <td>
                                        <div class="koko_check">
                                            <input type="checkbox" value="{column.fieldName}" id="ip{i}" class="partcheck">
                                            <label for="ip{i}"><em></em></label>
                                        </div>
                                    </td>
                                {/if}
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
                                {#if column.fieldName === "ID" || column.fieldName === "PASSWORD" }
                                    <td>
                                        <div class="nonereviseBtn">수정불가</div>
                                    </td>
                                {:else}
                                    <td>
                                        <button>수정하기</button>
                                    </td>
                                {/if}
                            </tr>
                        {/each}
                    {:else}
                        <tr class="none_inq">
                            <td>추가된 항목이 없습니다.</td>
                        </tr>
                    {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {#if column_list.length !== 0}
        <div class="prDelBtn marT20">
            <button id="delete_pr_pop">삭제</button>
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