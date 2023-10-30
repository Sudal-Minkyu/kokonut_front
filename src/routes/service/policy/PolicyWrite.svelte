<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import {location as spaLocation, push} from 'svelte-spa-router'
    import {onDestroy, onMount} from "svelte";

    import PolicyWritingCheck from '../../../components/service/policy/PolicyWritingCheck.svelte'

    import PolicyWriteStep1 from '../../../components/service/policy/PolicyWriteStep1.svelte'
    import PolicyWriteStep2 from '../../../components/service/policy/PolicyWriteStep2.svelte'
    import PolicyWriteStep3 from '../../../components/service/policy/PolicyWriteStep3.svelte'
    import PolicyWriteStep4 from '../../../components/service/policy/PolicyWriteStep4.svelte'
    import PolicyWriteStep5 from '../../../components/service/policy/PolicyWriteStep5.svelte'
    import PolicyWriteStep6 from '../../../components/service/policy/PolicyWriteStep6.svelte'
    import PolicyWriteStep7 from '../../../components/service/policy/PolicyWriteStep7.svelte'

    import {backBtn, policyInfoData, piId, piStage, initialPolicyInfo} from '../../../lib/store.js'

    import {openAsk, openConfirm} from "../../../components/common/ui/DialogManager.js";
    import {logout} from "../../../components/common/authActions.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";

    let didNavBtnClicked = true;
    let navBackwardFn = () => {};
    let navForwardFn = () => {};

    const handleNavigation = (e) => {
        if (e.state && e.state.stage < stage) {
            didNavBtnClicked = true;
            if (navBackwardFn(stage)) {
                window.history.forward();
                didNavBtnClicked = false;
            }
        } else if (e.state && e.state.stage > stage) {
            didNavBtnClicked = true;
            if (navForwardFn(stage)) {
                window.history.back();
                didNavBtnClicked = false;
            }
        }
    }

    const initializeHistoryState = () => {
        if (history.state && history.state.stage) {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "만료된 페이지", // 제목
                contents1: '해당 처리방침 제작 페이지는 만료되었습니다.',
                contents2: '개인정보처리방침 제작을 눌러 이용해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    push('/service/policyList');
                },
            });
        } else {
            policyCheck();
        }
    }

    // 툴팁기능 (클릭시 펼쳐지는 물음표) 동작을 위함
    const tooltipEvent = (e) => {
        const toolTipElements = document.getElementsByClassName('layerToolType');
        for (const el of toolTipElements) {
            el.style.display = 'none';
        }
        if (e.target.classList.contains('tiptool')) {
            var children = e.target.children;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.classList.contains('layerToolType')) {
                    child.style.display = 'block';
                    break;
                }
            }
        }
    }

    onMount(() => {
        document.addEventListener('click', tooltipEvent);
        window.addEventListener('popstate', handleNavigation);
        initializeHistoryState();
    });

    onDestroy(() => {
        document.removeEventListener('click', tooltipEvent);
        window.removeEventListener('popstate', handleNavigation);
    });

let writingCheck = false;
    function writingCheckChange() {
        writingCheck = false;
    }
    function policyCheck() {
        let url = "/v2/api/Policy/policyCheck"

        ajaxGet(url, false, (res) => {
            try {
                let result = res.data.sendData.result;
                if (result) {
                    writingCheck = true;
                    piId.set(res.data.sendData.piId)
                    piStage.set(res.data.sendData.piStage);
                    history.replaceState({stage}, '', '/#' + $spaLocation);
                } else {
                    setTimeout(() => stage = 1, 500);
                }
            } catch (e) {
                reportCatch('temp83', e);
            }
        }, (errCode, errMsg) => {
            // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
            // alert(errMsg);
            // logout();
        });
    }

    function stateChange(val) {
        piStage.set(val);
        stage = val;
    }

    let stage = $piStage;

    function stopWrite() {
        if(stage === 1 && $piId === 0) {
            push("/service/policyList")
        } else {
            const customConfirmProp = {
                callback: startFun, // 확인버튼시 동작
                icon: 'question', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '제작을 중단하시겠습니까?', // 제목
                contents1: '중단하게 되면 작성중인 글은 삭제됩니다.', // 내용
                contents2: '',
                btnStart: '예', // 확인 버튼의 텍스트
                btnCancel: '아니오'
            }
            openAsk(customConfirmProp);
        }
    }

    let startFun = function deletePolicy() {
        let url = "/v2/api/Policy/privacyPolicyDelete"

        let sendData = {
            piId : $piId
        }

        ajaxParam(url, sendData, (res) => {
            try {
                piId.set(0);
                piStage.set(0);
                policyInfoData.set(JSON.parse(initialPolicyInfo));
                policyCheck();
            } catch (e) {
                reportCatch('temp084', e);
            }
        });
    }

    // 개인정보처리방침 작성중인 글 조회
    function policyWriting(changeStage = 0) {
        let url = "/v2/api/Policy/privacyPolicyWriting"
        let sendData = {
            piId : $piId,
        }
        ajaxGet(url, sendData, (res) => {
            try {
                stateChange(changeStage ? changeStage : $piStage);
                policyInfoData.update(obj => {
                    obj.policyData1 = res.data.sendData.policyInfo1;
                    obj.purposeDataList = res.data.sendData.purposeInfo;
                    obj.beforeDataList = res.data.sendData.beforeDataList;
                    obj.afterDataList = res.data.sendData.afterDataList;
                    obj.serviceAutoDataList = res.data.sendData.serviceAutoDataList;
                    obj.outDataList = res.data.sendData.outDataList;
                    obj.outDetailDataList = res.data.sendData.outDetailDataList;
                    obj.thirdDataList = res.data.sendData.thirdDataList;
                    obj.thirdOverseasDataList = res.data.sendData.thirdOverseasDataList;
                    obj.reponsibleDataList = res.data.sendData.reponsibleDataList;
                    obj.policyData3 = res.data.sendData.policyInfo3;

                    if(res.data.sendData.piChoseListString) {
                        obj.policyData2.piChoseListString = JSON.parse(res.data.sendData.piChoseListString);
                        obj.policyData2.piChoseCustomList = res.data.sendData.piChoseCustomList;
                    } else {
                        obj.policyData2.piChoseListString = [];
                        obj.policyData2.piChoseCustomList = [];
                    }
                    return obj;
                });
            } catch (e) {
                reportCatch('temp085', e);
            }
        }, (errCode, errMsg) => {
            try {
                // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                alert(errMsg);
                logout();
            } catch (e) {
                reportCatch('temp086', e);
            }
        });
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="spcontWrap">
            <div class="pageTitleBtn marB50">
                <a style="cursor: pointer" on:click={stopWrite}>{$backBtn}</a><h1>개인정보처리방침 제작</h1>
<!--                <dl>💡 해당 페이지는 최고관리자만 이용할 수 있습니다.</dl>-->
            </div>
        </div>

        <LoadingOverlay bind:loadState={stage} top={300}>
            {#if stage === 1}
            <PolicyWriteStep1 {stage} {stateChange} {policyWriting} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {:else if stage === 2}
            <PolicyWriteStep2 {stage} {policyWriting} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {:else if stage === 3}
            <PolicyWriteStep3 {stage} {stateChange} {policyWriting} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {:else if stage === 4}
            <PolicyWriteStep4 {stage} {stateChange} {policyWriting} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {:else if stage === 5}
            <PolicyWriteStep5 {stage} {stateChange} {policyWriting} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {:else if stage === 6}
            <PolicyWriteStep6 {stage} {stateChange} {policyWriting} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {:else if stage === 7}
            <PolicyWriteStep7 {stage} {stateChange} bind:didNavBtnClicked bind:navBackwardFn bind:navForwardFn />
            {/if}
        </LoadingOverlay>
    </div>
</section>

{#if writingCheck}
    <PolicyWritingCheck {startFun} {policyWriting} {writingCheckChange} />
{/if}
