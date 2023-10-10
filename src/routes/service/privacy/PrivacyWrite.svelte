
<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import { link } from 'svelte-spa-router'

    import {
        backBtn,
        is_login,
        accessToken,
        providePrivacyWriteData,
        initialProvidePrivacyWrite
    } from '../../../lib/store.js'

    import PrivacyWriteStep1 from "../../../components/service/privacy/PrivacyWriteStep1.svelte";
    import PrivacyWriteStep2 from "../../../components/service/privacy/PrivacyWriteStep2.svelte";
    import PrivacyWriteStep3 from "../../../components/service/privacy/PrivacyWriteStep3.svelte";
    import PrivacyWriteStep4 from "../../../components/service/privacy/PrivacyWriteStep4.svelte";
    import PrivacyWriteStep5 from "../../../components/service/privacy/PrivacyWriteStep5.svelte";
    import {onMount} from "svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";

    onMount(async () => {
        setTimeout(() => priavacyStage = 1, 500);
        providePrivacyWriteData.set(JSON.parse(initialProvidePrivacyWrite));
        getColumnList();
    });

    function stateChange(val) {
        priavacyStage = val;
    }

    let priavacyStage = 0;

const getColumnList = () => {
        ajaxGet('/v2/api/DynamicUser/privateTableColumnCall', false, (json_success) => {
            try {
                console.log(json_success);
                providePrivacyWriteData.update(obj => {
                    obj.step4.columnList = json_success.data.sendData.fieldList.filter(item => !['PASSWORD_1_PW'].includes( item.fieldCode));
                    return obj;
                });
            } catch (e) {
                reportCatch('temp093', e);
            }
        });
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

            <LoadingOverlay bind:loadState={priavacyStage} top={40} >
                {#if priavacyStage === 1}
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
            </LoadingOverlay>
        </div>

</div>
</section>