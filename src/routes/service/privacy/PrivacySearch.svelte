
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {initialPrivacySearch, privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import PrivacySearchInitial from "../../../components/service/privacy/PrivacySearchInitial.svelte";
    import PrivacySearchDetail from "../../../components/service/privacy/PrivacySearchDetail.svelte";
    import {getColumnList} from "../../../components/common/privacySearch/privacySearch.js";

    onMount(() => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
        getColumnList();
    });
</script>

<Header />
<section class="bodyWrap">
    {#if $privacySearchData.currentState === 'search'}
        <div class="contentInnerWrap">
            <PrivacySearchInitial />
        </div>
    {/if}
    {#if $privacySearchData.currentState === 'detail'}
        <PrivacySearchDetail />
    {/if}
</section>
