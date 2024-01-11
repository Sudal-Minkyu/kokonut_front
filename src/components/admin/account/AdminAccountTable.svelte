
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
            <th>등록자</th>
            <th>등록 일시</th>
            <th>최근 접속</th>
            <th>계정 상태</th>
            <th>활성화 제어</th>
            <th>계정 삭제</th>
        </tr>
        </thead>
        <tbody>
        {#if admin_list.length !== 0}
            {#each admin_list as admin, i}
                <tr>
                    <td>{ total - (page * size) - i }</td>
                    <td>{admin.knEmail}</td>
                    <td>{admin.insertName}</td>
                    <td>{admin.insert_date}</td>

                    {#if admin.knLastLoginDate === ""}
                        <td>없음</td>
                    {:else}
                        <td>{admin.knLastLoginDate}</td>
                    {/if}
                    <td>
                        {#if admin.knActiveStatus === '1'}
                            <div class="normal">활성</div>
                        {:else if admin.knActiveStatus === '0'}
                            <div class="secession">비활성</div>
                        {/if}
                    </td>
                    <td>
                        {#if admin.knActiveStatus === '1'}
                            <button on:click={() => {adminUpdateService.toggleKokonutAdminActivity(admin)}}>비활성화</button>
                        {:else if admin.knActiveStatus === '0'}
                            <button on:click={() => {adminUpdateService.toggleKokonutAdminActivity(admin)}}>활성화</button>
                        {/if}
                    </td>
                    <td>
                        <button on:click={() => {adminUpdateService.deleteKokonutAdmin(admin.knEmail)}}>삭제</button>
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