
<script>
    import Header from "../../../components/service/layout/Header.svelte";
    import {initialPrivacySearch, privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../../components/common/ajax.js";
    import PrivacySearchInitial from "../../../components/service/privacy/PrivacySearchInitial.svelte";
    import PrivacySearchDetail from "../../../components/service/privacy/PrivacySearchDetail.svelte";
    import {openConfirm} from "../../../components/common/ui/DialogManager.js";
    import {push} from "svelte-spa-router";

    onMount(() => {
        privacySearchData.set(JSON.parse(initialPrivacySearch));
        getColumnList();
    });

    const getColumnList = () => {
        ajaxGet('/v2/api/DynamicUser/searchColumnCall', false, (res2) => {
            if (res2.data.sendData.fieldList.length) {
                privacySearchData.update(obj => {
                    obj.columnList = res2.data.sendData.fieldList;
                    console.log('컬럼리스트', obj.columnList);
                    obj.searchConditionList[0].searchCode = obj.columnList[0].fieldCode;
                    obj.searchConditionList[0].currentColumnName = obj.columnList[0].fieldComment;
                    obj.searchConditionList[0].currentTableColumnList = obj.columnList;
                    return obj;
                });
            } else {
                openConfirm({
                    icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: "항목이 존재하지 않음", // 제목
                    contents1: '항목이 존재하지 않아 사용할 수 없습니다.',
                    contents2: '관리자에게 해당 사실을 문의해 주세요.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                    callback: () => {
                        push('/service');
                    },
                });
            }
        });
    };
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
