
<script>

    import { fade } from 'svelte/transition'
    import {piId, policyInfoData} from '../../../lib/store.js'

    import {onMount} from "svelte";
    import restapi from "../../../lib/api.js";

    onMount(async () => {
        console.log("두번째 뎁스 $piId : "+$piId);

        if($piId === 0) {
            console.log("조회안함");
        } else {
            console.log("조회함");
            policyWriting();
        }
    })

    window.cd = () => {
        console.log($policyInfoData);
    }

    export let policyWriting;
    export let stateChange;

    let policyPurposeDeleteIdList = [];

    function createItem() {
        if ($policyInfoData.purposeDataList.length < 4) {
            policyInfoData.update((obj) => {
                obj.purposeDataList = [...obj.purposeDataList, {
                    pipId: 0,
                    pipTitle: '',
                    pipContent: '',
                }];
                return obj;
            });
        } else {
            // 항목 추가는 4개까지만 가능하다는 메시지
        }
    }

    function removeItem(index) {
        policyInfoData.update((obj) => {
            if (obj.purposeDataList[index].pipId) {
                policyPurposeDeleteIdList.push(obj.purposeDataList[index].pipId);
            }
            obj.purposeDataList.splice(index, 1);
            return obj;
        });
    }

    function secondDepthSave(goToState) {
        let url = "/v2/api/Policy/privacyPolicySecondSave";

        let sendData = {
            piId : $piId,
            policyPurposeSaveDtoList : $policyInfoData.purposeDataList,
            policyPurposeDeleteIdList : policyPurposeDeleteIdList
        }
        restapi('v2', 'post', url, "body", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    // 완료후
                    stateChange(goToState);
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        );
    }

</script>

<div in:fade>

    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">1. 개인정보의 처리 목적</div>
        <div class="pr_wrap">
            <div class="prbox">
                <div class="prti w1528per">서비스 제공 및 운영</div>
                <div class="prst w8472per">사용자 인증, 회원 관리, 서비스 제공, 서비스의 보안, 이용약관 위반 고객 제재 등 서비스의 제공과 운영을 위해 이용합니다. </div>
            </div>
            <div class="prbox">
                <div class="prti w1528per">서비스 개선</div>
                <div class="prst w8472per">서비스 개선: 기존 서비스의 개선, 신규 서비스의 발굴 등 고객에 대한 서비스를 개선하는 데 이용합니다.</div>
            </div>
            {#each $policyInfoData.purposeDataList as {pipTitle, pipContent}, i}
                <div class="addelement">
                    <div class="prboxtext">
                        <div class="prbte1 w1528per">
                            <input type="text" bind:value={pipTitle} placeholder="내용입력" />
                        </div>
                        <div class="prbte2 w8472per">
                            <input type="text" bind:value={pipContent} placeholder="내용입력" />
                        </div>
                    </div>
                    <a on:click={() => {removeItem(i)}} class="pr_delete"></a></div>
            {/each}
            <div class="prcontainer1"></div>
            <div class="pr_fieldBtnInner">
                <button on:click={createItem} class="add_pr_field1 pr_fieldBtn"></button>
            </div>
        </div>
    </div>

</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 30%"></div>
                </div>
            </div>

            <div class="pri_bottomBtnBox marT32">
                <button on:click="{() => {secondDepthSave(1)}}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>2</span> / 7</dl>
                </div>

                <button on:click="{() => {secondDepthSave(3)}}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
