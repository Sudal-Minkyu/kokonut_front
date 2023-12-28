
<script>
    import {userInfoData} from "../../../lib/store.js";

    export let page;
    export let size;
    export let total;
    export let admin_list;

    export let adminUpdateService;

    // 각 대상에 대한 수정 권한 여부 리턴
    const getModifiability = (targetRole) => {
        switch ($userInfoData.role) {
            case 'ROLE_MASTER':
                return true;
            case 'ROLE_ADMIN':
                return ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST'].includes(targetRole);
            case 'ROLE_USER':
                return ['ROLE_GUEST'].includes(targetRole);
            case 'ROLE_GUEST':
                return false;
        }
    };
</script>

<div class="kotable adminManagement">
    <table>
        <caption>관리자 목록 리스트</caption>
        <thead>
        <tr>
            <th>No</th>
            <th>관리자</th>
            <th>관리자 등급</th>
            <th>등록자</th>
            <th>등록 일시</th>
            <th>최근 접속</th>
            <th>이메일 인증</th>
            <th>인증 및 보안</th>
            <th>계정 상태</th>
            <th>권한</th>
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
                        <td>{admin.knLastLoginDate}</td>
                    {/if}

                    <td>
                        {#if admin.knIsEmailAuth === "Y"}
                            <div class="normal">완료</div>
                        {:else}
                            <div class="secession">미완료</div>
                        {/if}
                    </td>
                    <td>
                        {#if admin.knIsEmailAuth === "Y"}
                            <button on:click={()=>{adminUpdateService.sendPwChangeMail(admin.knEmail)}}>비밀번호 변경</button>
                        {:else}
                            <button on:click={()=>{adminUpdateService.sendVerifyMail(admin.knEmail)}}>인증메일 재전송</button>
                        {/if}
                    </td>

                    <td>
                        {#if admin.knActiveStatus === '1'}
                            <div class="normal">활성</div>
                        {:else if admin.knActiveStatus === '0'}
                            <div class="secession">비활성</div>
                        {/if}
                    </td>
                    <td>
                        {#if getModifiability(admin.knRoleCode) && $userInfoData.knEmail !== admin.knEmail}
                            <button on:click={() => {adminUpdateService.open(admin)}}>설정</button>
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