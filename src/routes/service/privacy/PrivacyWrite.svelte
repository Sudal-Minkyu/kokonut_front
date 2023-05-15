
<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import { link } from 'svelte-spa-router'

    import {backBtn, is_login, accessToken, providePrivacyWriteData} from '../../../lib/store.js'

    import PrivacyWriteStep1 from "../../../components/service/privacy/PrivacyWriteStep1.svelte";
    import PrivacyWriteStep2 from "../../../components/service/privacy/PrivacyWriteStep2.svelte";
    import PrivacyWriteStep3 from "../../../components/service/privacy/PrivacyWriteStep3.svelte";
    import PrivacyWriteStep4 from "../../../components/service/privacy/PrivacyWriteStep4.svelte";
    import PrivacyWriteStep5 from "../../../components/service/privacy/PrivacyWriteStep5.svelte";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../../components/common/ajax.js";

    onMount(async () => {
        setTimeout(() => priavacyStage = 1, 500);
        getUserTableList();
    })

    function stateChange(val) {
        priavacyStage = val;
    }

    let priavacyStage = 0;

    const getUserTableList = () => {
        ajaxGet('/v2/api/Company/userTableList', false,
            (json_success) => {
                console.log('테이블리스트', json_success);
                providePrivacyWriteData.update(obj => {
                    obj.step4.tableList = json_success.data.sendData.companyTableList;
                    return obj;
                });
                getTableColumnList();
            },
            (json_error) => {
                console.log(json_error);
                console.log("회사의 테이블리스트 호출 실패");
            }
        );
    };

    const getTableColumnList = () => {
        for (const [i, {ctName}] of $providePrivacyWriteData.step4.tableList.entries()) {
            ajaxGet('/v2/api/DynamicUser/tableColumnCall', {tableName: ctName},
                (json_success) => {
                    providePrivacyWriteData.update(obj => {
                        obj.step4.columnList[i] = json_success.data.sendData.fieldList.filter(item => item.fieldName !== 'PASSWORD');
                        return obj;
                    });
                },
                (json_error) => {
                    console.log(json_error);
                    console.log("테이블컬럼 리스트 호출 실패");
                }
            );
        }
    }

</script>

<Header />
<section class="stepbodyWrap">
    <div class="stepcontentInnerWrap">
        <div class="spcontWrap">
            <div class="pageTitleBtn marB50">
                <a style="cursor: pointer" use:link href="/service/privacy/privacyList">{$backBtn}</a><h1>개인정보 제공</h1>
                <dl>
                    💡 더 이상 이메일로 회원의 소중한 개인정보를 공유하지 마세요. 코코넛을 통해 안전하게 개인정보를 제공하고 조회할 수 있습니다.
                </dl>
            </div>

            {#if priavacyStage === 0}
                <div class="loaderParent" style="top: 40%;left: 55%">
                    <div class="loader"></div>
                </div>
            {:else if priavacyStage === 1}
                <PrivacyWriteStep1 {stateChange} />
            {:else if priavacyStage === 2}
                <PrivacyWriteStep2 {stateChange} />
            {:else if priavacyStage === 3}
                <PrivacyWriteStep3 {stateChange} />
            {:else if priavacyStage === 4}
                <PrivacyWriteStep4 {stateChange} />
            {:else if priavacyStage === 5}
                <PrivacyWriteStep5 {stateChange} />
            {/if}

        </div>


    </div>
</section>