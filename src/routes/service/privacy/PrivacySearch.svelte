
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {initialPrivacySearch, privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../../components/common/ajax.js";
    import PrivacySearchInitial from "../../../components/service/privacy/PrivacySearchInitial.svelte";
    import PrivacySearchResult from "../../../components/service/privacy/PrivacySearchResult.svelte";
    import PrivacySearchDetail from "../../../components/service/privacy/PrivacySearchDetail.svelte";

    onMount(async => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
        getTableAndColumnList();
    });

    const getTableAndColumnList = () => {
        ajaxGet('/v2/api/Company/privacyTableList', false, (res) => {
            privacySearchData.update(obj => {
                obj.tableList = res.data.sendData.companyTableList;
                obj.searchConditionList[0].searchTable = obj.tableList[0].ctName;
                obj.searchConditionList[0].currentTableName = obj.tableList[0].ctDesignation;
                obj.searchConditionList[0].currentTableIndex = 0;
                console.log('tableList', obj);
                return obj;
            });

            for (const [i, {ctName}] of $privacySearchData.tableList.entries()) {
                ajaxGet('/v2/api/DynamicUser/searchColumnCall', {tableName: ctName}, (res2) => {
                    privacySearchData.update(obj => {
                        obj.tableList[i].columnList = res2.data.sendData.fieldList;
                        if (!i) {
                            obj.searchConditionList[0].searchCode = obj.tableList[0].columnList[0].fieldCode;
                            obj.searchConditionList[0].currentColumnName = obj.tableList[0].columnList[0].fieldComment;
                            obj.searchConditionList[0].currentTableColumnList = obj.tableList[0].columnList;
                        }
                        return obj;
                    });
                });
            }
        });
    }

    window.kk = () => {
        console.log($privacySearchData);
    }
</script>

<Header />
<section class="bodyWrap">
    {#if $privacySearchData.currentState === 'search'}
        <div class="contentInnerWrap">
            <PrivacySearchInitial />
            {#if $privacySearchData.rawResultList.length}
                <PrivacySearchResult {getTableAndColumnList} />
            {/if}
        </div>
    {/if}
    {#if $privacySearchData.currentState === 'detail'}
        <PrivacySearchDetail />
    {/if}
</section>
