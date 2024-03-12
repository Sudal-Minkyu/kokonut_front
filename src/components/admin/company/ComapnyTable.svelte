
<script>

    import CompanyAdminList from "./CompanyAdminList.svelte";

    export let page;
    export let size;
    export let total;
    export let company_list;

    let companyId;
    let adminListPop = false;

    function companyAdminListPopChange(getCompanyId) {
        adminListPop = !adminListPop;
        companyId = getCompanyId
    }

    const handleInformPIS = () => {
        alert('준비중인 기능입니다.');
    }

    function companyBlock(companyId) {
        console.log("companyId : "+companyId);
    }

</script>

<div class="kotable adminManagement">
    <table>
        <caption>고객기업 목록 리스트</caption>
        <thead>
        <tr>
            <th>No</th>
            <th>기업명</th>
            <th>이메일</th>
            <th>관리자명</th>
            <th>연락처</th>
            <th>가입날짜</th>
            <th>관리자리스트</th>
            <th>기업차단</th>
        </tr>
        </thead>
        <tbody>
        {#if company_list.length !== 0}
            {#each company_list as company, i}
                <tr>

                    <td>{ total - (page * size) - i }</td>
                    <td>{company.cpName}</td>
                    <td>{company.knEmail}</td>
                    <td>{company.knName}</td>
                    <td>{company.knPhoneNumber}</td>
                    <td>{company.insert_date}</td>

                    <td>
                        <button on:click={() => {companyAdminListPopChange(company.companyId)}}>관리자 목록</button>
                    </td>

                    <td>
                        <button on:click={handleInformPIS}>기압 차단</button>
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

<!-- [D] 관리자 목록리스트 팝업 -->
{#if adminListPop}
    <CompanyAdminList {companyAdminListPopChange} {companyId} />
{/if}