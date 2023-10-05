<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import { push } from 'svelte-spa-router'
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

    import {openAsk} from "../../../components/common/ui/DialogManager.js";
    import {logout} from "../../../components/common/authActions.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";

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
        policyCheck();
        document.addEventListener('click', tooltipEvent);
    });

    onDestroy(() => {
        document.removeEventListener('click', tooltipEvent);
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

    // let popType = 2; // 1: 버튼하나, 2: 여부를 묻는 버튼 두개
    // let imgState = 4; // 1 : 성공, 2 : 경고, 3: 실패, 4: 물음표
    // let popTitle = "제작을 중단하시겠습니까?"; // 제목 텍스트
    // let popContents1 = "중단하게 되면 작성중인 글은 삭제됩니다.";  // 내용1 텍스트
    // let popStart = "예"; // 예 텍스트
    // let popCancel = "아니오"; // 아니오 텍스트

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
    function policyWriting() {
        let url = "/v2/api/Policy/privacyPolicyWriting"
        let sendData = {
            piId : $piId,
        }
        ajaxGet(url, sendData, (res) => {
            try {
                stage = $piStage;
                policyInfoData.update(obj => {
                    obj.policyData1 = res.data.sendData.policyInfo1;
                    obj.purposeDataList = res.data.sendData.purposeInfo;
                    obj.beforeDataList = res.data.sendData.beforeDataList;
                    obj.afterDataList = res.data.sendData.afterDataList;
                    obj.serviceAutoDataList = res.data.sendData.serviceAutoDataList;
                    obj.policyData2 = res.data.sendData.policyInfo2;
                    obj.outDataList = res.data.sendData.outDataList;
                    obj.outDetailDataList = res.data.sendData.outDetailDataList;
                    obj.thirdDataList = res.data.sendData.thirdDataList;
                    obj.thirdOverseasDataList = res.data.sendData.thirdOverseasDataList;
                    obj.reponsibleDataList = res.data.sendData.reponsibleDataList;
                    obj.policyData3 = res.data.sendData.policyInfo3;
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
        <div class="pageTitleBtn marB50">
            <a style="cursor: pointer" on:click={stopWrite}>{$backBtn}</a><h1>개인정보처리방침 제작</h1>
            <dl>해당 페이지는 최고관리자만 이용할 수 있습니다.</dl>
        </div>

        <LoadingOverlay bind:loadState={stage} top={300}>
            {#if stage === 1}
            <PolicyWriteStep1 {stateChange} {policyWriting} />
            {:else if stage === 2}
            <PolicyWriteStep2 {stateChange} {policyWriting} />
            {:else if stage === 3}
            <PolicyWriteStep3 {stateChange} {policyWriting} />
            {:else if stage === 4}
            <PolicyWriteStep4 {stateChange} {policyWriting} />
            {:else if stage === 5}
            <PolicyWriteStep5 {stateChange} {policyWriting} />
            {:else if stage === 6}
            <PolicyWriteStep6 {stateChange} {policyWriting} />
            {:else if stage === 7}
            <PolicyWriteStep7 {stateChange} />
            {/if}
        </LoadingOverlay>
    </div>
</section>

{#if writingCheck}
    <PolicyWritingCheck {startFun} {policyWriting} {writingCheckChange} />
{/if}
