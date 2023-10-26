
<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import {link, push} from 'svelte-spa-router'
    import {location as spaLocation} from "svelte-spa-router";
    import {openConfirm} from "../../../components/common/ui/DialogManager.js";
    import {
        backBtn,
        providePrivacyWriteData,
        initialProvidePrivacyWrite
    } from '../../../lib/store.js'

    import PrivacyWriteStep1 from "../../../components/service/privacy/PrivacyWriteStep1.svelte";
    import PrivacyWriteStep2 from "../../../components/service/privacy/PrivacyWriteStep2.svelte";
    import PrivacyWriteStep3 from "../../../components/service/privacy/PrivacyWriteStep3.svelte";
    import PrivacyWriteStep4 from "../../../components/service/privacy/PrivacyWriteStep4.svelte";
    import PrivacyWriteStep5 from "../../../components/service/privacy/PrivacyWriteStep5.svelte";
    import {onDestroy, onMount} from "svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";

    let didForwardBackwardNavBtnClicked = true;
    let navigationForwardFunction = () => {};

    onMount(async () => {
        window.addEventListener('popstate', handleNavigation);
        setTimeout(() => privacyStage = 1, 500);
        providePrivacyWriteData.set(JSON.parse(initialProvidePrivacyWrite));
        getColumnList();
        initializeHistoryState();
    });

    onDestroy(() => {
        window.removeEventListener('popstate', handleNavigation);
    });

    const initializeHistoryState = () => {
        if (history.state && history.state.privacyStage) {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "만료된 페이지", // 제목
                contents1: '해당 개인정보 작성 페이지는 만료되었습니다.',
                contents2: '개인정보 제공을 눌러 해당 기능을 이용해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    push('/service/privacy/privacyList');
                },
            });
        } else {
            history.replaceState({privacyStage: 1}, '', '/#' + $spaLocation);
        }
    }

    const handleNavigation = (e) => {
        if (e.state && e.state.privacyStage < privacyStage) {
            didForwardBackwardNavBtnClicked = true;
            stateChange(e.state.privacyStage);
            // history.replaceState('', '', '');
        } else if (e.state && e.state.privacyStage > privacyStage) {
            didForwardBackwardNavBtnClicked = true;
            if(navigationForwardFunction()) {
                window.history.back();
                didForwardBackwardNavBtnClicked = false;
            }
        }
    }

    function stateChange(val) {
        privacyStage = val;
    }

    let privacyStage = 0;

const getColumnList = () => {
        ajaxGet('/v2/api/DynamicUser/privateTableColumnCall', false, (json_success) => {
            try {
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
                    💡 개인정보를 업무상 꼭 제공해야 할 때 내부는 물론 외부까지 안전하게 제공하세요.
                </dl>
            </div>

            <LoadingOverlay bind:loadState={privacyStage} top={40} >
                {#if privacyStage === 1}
                <PrivacyWriteStep1 {privacyStage} {stateChange} bind:didForwardBackwardNavBtnClicked={didForwardBackwardNavBtnClicked} bind:navigationForwardFunction={navigationForwardFunction} />
                {:else if privacyStage === 2}
                <PrivacyWriteStep2 {privacyStage} {stateChange} bind:didForwardBackwardNavBtnClicked={didForwardBackwardNavBtnClicked} bind:navigationForwardFunction={navigationForwardFunction} />
                {:else if privacyStage === 3}
                <PrivacyWriteStep3 {privacyStage} {stateChange} bind:didForwardBackwardNavBtnClicked={didForwardBackwardNavBtnClicked} bind:navigationForwardFunction={navigationForwardFunction} />
                {:else if privacyStage === 4}
                <PrivacyWriteStep4 {privacyStage} {stateChange} bind:didForwardBackwardNavBtnClicked={didForwardBackwardNavBtnClicked} bind:navigationForwardFunction={navigationForwardFunction} />
                {:else if privacyStage === 5}
                <PrivacyWriteStep5 {privacyStage} {stateChange} bind:didForwardBackwardNavBtnClicked={didForwardBackwardNavBtnClicked} bind:navigationForwardFunction={navigationForwardFunction} />
                {/if}
            </LoadingOverlay>
        </div>

</div>
</section>