
<script>
    import {openBanner} from "../../../common/ui/DialogManager.js";

    export let page;
    export let size;
    export let total;
    export let admin_list;

    export let emailSend;
    export let pwChangeMail;

</script>

<div class="kotable adminManagement">
    <table>
        <caption>관리자 목록 리스트</caption>
        <colgroup>
            <col style="width:4%;">
            <col style="width:22%;">
            <col style="width:8%;">
            <col style="width:6%;">
            <col style="width:13%;">
            <col style="width:25%;">
            <col style="width:6%;">
            <col style="width:8%;">
            <col style="width:12%;">
        </colgroup>
        <thead>
        <tr>
            <th>No</th>
            <th>관리자</th>
            <th>등급</th>
            <th>등록자</th>
            <th>등록 일시</th>
            <th>최근 접속일시 (접속IP)</th>
            <th>이메일 인증</th>
            <th>계정 상태</th>
            <th>설정</th>
        </tr>
        </thead>
        <tbody>
        {#if admin_list.length !== 0}
            {#each admin_list as admin, i}
                <tr>
                    <td>{ total - (page * size) - i }</td>
                    <td>{admin.knName}({admin.knEmail})</td>
                    {#if admin.knRoleCode === "ROLE_MASTER"}
                        <td style="left: 10px">{admin.knRoleDesc}<div class="mastericon"></div></td>
                    {:else}
                        <td>{admin.knRoleDesc}</td>
                    {/if}
                    <td>{admin.insertName}</td>
                    <td>{admin.insert_date}</td>

                    {#if admin.knLastLoginDate === ""}
                        <td>없음</td>
                    {:else}
                        <td>{admin.knLastLoginDate}(IP:{admin.knIpAddr})</td>
                    {/if}

                    <td>
                        {#if admin.knIsEmailAuth === "Y"}
                            <div class="normal">완료</div>
                        {:else}
                            <div class="secession">미완료</div>
                        {/if}
                    </td>

                    <td>
                        {#if admin.knState === 1}
                            <div class="normal">정상</div>
                        {:else if admin.knState === 3}
                            <div class="secession">탈퇴</div>
                        {:else if admin.knState === 4}
                            <div class="dormancy">휴면</div>
                        {:else if admin.knState === 2}
                            <div class="secession">로그인제한</div>
                        {:else if admin.knState === 0}
                            <div class="secession">정지</div>
                        {/if}
                    </td>

                    <td>
<!--                        <button on:click={()=>{openBanner("현재 준비중인 서비스입니다.")}}>사업자 변경</button>-->
                        {#if admin.knIsEmailAuth === "Y"}
                            <button on:click={()=>{pwChangeMail(admin.knEmail)}}>비밀번호 변경</button>
                        {:else}
                            <button on:click={()=>emailSend(admin.knEmail)}>인증메일 재전송</button>
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