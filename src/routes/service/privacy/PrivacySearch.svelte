
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {initialPrivacySearch, privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import PrivacySearchInitial from "../../../components/service/privacy/PrivacySearchInitial.svelte";
    import PrivacySearchDetail from "../../../components/service/privacy/PrivacySearchDetail.svelte";
    import {getColumnList} from "../../../components/common/privacySearch/privacySearch.js";
    import ExcelDownloadPop from "../../../components/common/ui/ExcelDownloadPop.svelte";

    onMount(() => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
        getColumnList();
    });

    const excelDownloadPopService = {
        visibility: false,
        requestURL: '/v2/api/DynamicUser/privacyUserDownloadExcel',
        requestData: {
            paramMap: $privacySearchData.currentDetail,
        },
        close: () => {
            excelDownloadPopService.visibility = false;
        },
        open: () => {
            excelDownloadPopService.visibility = true;
        },
    }
</script>

<Header />
<section class="bodyWrap">
    {#if $privacySearchData.currentState === 'search'}
        <div class="contentInnerWrap">
            <PrivacySearchInitial />
        </div>
    {/if}
    {#if $privacySearchData.currentState === 'detail'}
        <PrivacySearchDetail {excelDownloadPopService} />
    {/if}
</section>

{#if excelDownloadPopService.visibility}
    <ExcelDownloadPop {excelDownloadPopService} />
{/if}