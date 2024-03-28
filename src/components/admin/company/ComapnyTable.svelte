
<script>

    import CompanyAdminList from "./CompanyAdminList.svelte";
    import {ajaxParam, reportCatch} from "../../common/ajax.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    export let page;
    export let size;
    export let total;
    export let company_list;
    export let dataFunction

    let companyId;
    let adminListPop = false;

    function companyAdminListPopChange(getCompanyId) {
        adminListPop = !adminListPop;
        companyId = getCompanyId
    }

    const handleInformPIS = () => {
        alert('준비중인 기능입니다.');
    }

    let visible = false;
    function companyBlock(cpCode, csSystemBlockSetting) {
        console.log("cpCode : "+cpCode);
        console.log("차단여부 : "+csSystemBlockSetting);

        let url = "/v4/api/Company/emailSendItemSetting"

        let sendData = {
            cpCode : cpCode,
            csSystemBlockSetting : csSystemBlockSetting
        }

        ajaxParam(url, sendData, (res) => {
            try {
                let titleText;
                if(csSystemBlockSetting === '0') {
                    titleText = "기업이 차단 되었습니다."
                } else {
                    titleText = "차단이 해제 되었습니다."
                }
                openConfirm({
                    icon: 'pass',
                    title: titleText,
                    btnCheck: '확인',
                });
                dataFunction(0)
            } catch (e) {
                reportCatch('temp032', e);
            }
        }, (errCode, errMsg) => {
            try {
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp033', e);
            }
        });
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
                        <button on:click={() => {companyBlock(company.cpCode, company.csSystemBlockSetting)}}>
                            {#if company.csSystemBlockSetting === '0'}
                                기업 차단
                            {:else}
                                차단 해제
                            {/if}
                        </button>
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