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

    import restapi from "../../../lib/api.js";

    import {openAsk} from "../../../components/common/ui/DialogManager.js";
    import {logout} from "../../../components/common/authActions.js";

    const tooltipEvent = (e) => {
        console.log('act');
        if (e.target.classList.contains('tiptool')) {
            var children = e.target.children;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.classList.contains('layerToolType')) {
                    child.style.display = 'block';
                    break;
                }
            }
        } else {
            const toolTipElements = document.getElementsByClassName('layerToolType');
            for (const el of toolTipElements) {
                el.style.display = 'none';
            }
        }
    }

    onMount(async () => {
        if($piStage === 0) {
            policyCheck();
        } else {
            policyWriting();
        }
        document.addEventListener('click', tooltipEvent);
    });

    onDestroy(async () => {
        document.removeEventListener('click', tooltipEvent);
    });


    let writingCheck = false;
    function writingCheckChange() {
        writingCheck = false;
    }
    function policyCheck() {
        console.log("여기 실행했니?");

        let url = "/v2/api/Policy/policyCheck"

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    let result = json_success.data.sendData.result;
                    if(result) {
                        writingCheck = true;
                        piId.set(json_success.data.sendData.piId)
                        piStage.set(json_success.data.sendData.piStage);
                    } else {
                        setTimeout(() => stage = 1, 500);
                    }
                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    logout();
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )
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
        console.log("작성중단 함수");
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
        console.log("중단후 작성중이던 글 삭제호출 함수");
        console.log("삭제할 piId : "+$piId);

        let url = "/v2/api/Policy/privacyPolicyDelete"

        let sendData = {
            piId : $piId
        }
        restapi('v2', 'post', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    piId.set(0);
                    piStage.set(0);
                    policyInfoData.set(JSON.parse(initialPolicyInfo));
                    push("/service/policyList");
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )
    }

    // 개인정보처리방침 작성중인 글 조회
    function policyWriting() {

        console.log("작성중인 글 조회 실행!");
        console.log("piId : "+$piId);
        console.log("piStage : "+$piStage);

        let url = "/v2/api/Policy/privacyPolicyWriting"
        let sendData = {
            piId : $piId,
        }

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
            console.log('저장된 데이터', json_success);
                if(json_success.data.status === 200) {
                    stage = $piStage;
                    console.log("현재까지 작성된 데이터 가져오기");
                    console.log(json_success)
                    policyInfoData.update(obj => {
                        obj.policyData1 = json_success.data.sendData.policyInfo1;
                        obj.purposeDataList = json_success.data.sendData.purposeInfo;
                        obj.beforeDataList = json_success.data.sendData.beforeDataList;
                        obj.afterDataList = json_success.data.sendData.afterDataList;
                        obj.serviceAutoDataList = json_success.data.sendData.serviceAutoDataList;
                        obj.policyData2 = json_success.data.sendData.policyInfo2;
                        obj.outDataList = json_success.data.sendData.outDataList;
                        obj.outDetailDataList = json_success.data.sendData.outDetailDataList;
                        obj.thirdDataList = json_success.data.sendData.thirdDataList;
                        obj.thirdOverseasDataList = json_success.data.sendData.thirdOverseasDataList;
                        obj.reponsibleDataList = json_success.data.sendData.reponsibleDataList;
                        obj.policyData3 = json_success.data.sendData.policyInfo3;
                        return obj;
                    });

                }else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    logout();
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <a style="cursor: pointer" on:click={stopWrite}>{$backBtn}</a><h1>개인정보처리방침 제작</h1>
            <dl>해당 페이지는 최고관리자만 이용할 수 있습니다.</dl>
        </div>

        {#if stage === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else if stage === 1}
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

    </div>
</section>

{#if writingCheck}
    <PolicyWritingCheck {startFun} {policyWriting} {writingCheckChange} />
{/if}
