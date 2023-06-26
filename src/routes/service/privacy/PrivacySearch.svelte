
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {initialPrivacySearch, privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../../components/common/ajax.js";
    import PrivacySearchInitial from "../../../components/service/privacy/PrivacySearchInitial.svelte";
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
                return obj;
            });

            for (const [i, {ctName}] of $privacySearchData.tableList.entries()) {
                ajaxGet('/v2/api/DynamicUser/searchColumnCall', {tableName: ctName}, (res2) => {
                    privacySearchData.update(obj => {
                        obj.tableList[i].columnList = res2.data.sendData.fieldList;
                        if (i === 0) { // 첫번째 테이블에 할당된 컬럼을 기준으로, 처음 화면이 뜰 때의 셀렉트 박스 선택 상태를 정하기 위함
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
