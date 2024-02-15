
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {initialPrivacySearch, privacySearchData} from "../../../lib/store.js";
    import {onDestroy, onMount} from "svelte";
    import PrivacySearchInitial from "../../../components/service/privacy/PrivacySearchInitial.svelte";
    import PrivacySearchDetail from "../../../components/service/privacy/PrivacySearchDetail.svelte";
    import {getColumnList} from "../../../components/common/privacySearch/privacySearch.js";
    import ExcelDownloadPop from "../../../components/common/ui/ExcelDownloadPop.svelte";

    onMount(() => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
        getColumnList();
    });

    onDestroy(() => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
    });

    const excelDownloadPopService = {
        visibility: false,
        useBodyParam: true,
        requestURL: '/v2/api/DynamicUser/privacyUserDownloadExcel',
        requestData: [],
        close: () => {
            excelDownloadPopService.visibility = false;
        },
        open: () => {
            excelDownloadPopService.requestData = $privacySearchData.currentDetail;
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
    <ExcelDownloadPop {excelDownloadPopService} popType={0} />
{/if}