<script>

    import { fade } from 'svelte/transition'
    import {policyInfoData, piId} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {singleDatePicker} from "../../../lib/libSearch.js";
    import {ajaxBody, reportCatch} from "../../common/ajax.js";
    import moment from "moment";
    import {location as spaLocation} from "svelte-spa-router";

    export let policyWriting;
    export let stateChange;
    export let didNavBtnClicked;
    export let navBackwardFn;
    export let navForwardFn;
    export let stage;

    onMount(async () => {
        if (didNavBtnClicked) {
            didNavBtnClicked = false;
        } else {
            history.pushState({stage}, '', '/#' + $spaLocation);
        }
        navBackwardFn = () => {};
        navForwardFn = firstDepthSave;

        singleDatePicker('startdate', (result) => {
            policyInfoData.update(obj => {
                obj.policyData1.piDate = result.format('YYYY-MM-DD');
                return obj;
            });
        }, {minDate: moment(), maxDate: moment().add(5, 'years')});
        policyInfoData.update(obj => {
            obj.policyData1.piDate = document.getElementById('startdate').value;
            return obj;
        });
    });


    let textState = 0;
    function firstDepthSave(stage = 2) {
        if($policyInfoData.policyData1.piVersion === "") {
            textState = 1;
            return true;
        }

        if($policyInfoData.policyData1.piDate === "") {
            textState = 2;
            return true;
        }

        if($policyInfoData.policyData1.piHeader === "") {
            textState = 3;
            return true;
        }
        let url = "/v2/api/Policy/privacyPolicyFirstSave"

        let sendData = {
            piId : $piId,
            piVersion : $policyInfoData.policyData1.piVersion,
            piDate : $policyInfoData.policyData1.piDate,
            piHeader : $policyInfoData.policyData1.piHeader,
        }

        ajaxBody(url, sendData, (res) => {
            try {
                if ($piId === 0) {
                    piId.set(res.data.sendData.saveId);
                }
                policyWriting(stage);
            } catch (e) {
                reportCatch('t23082302', e);
                return true;
            }
        });
    }
</script>

<div in:fade>

    <div class="pri_versionBox marB50">
    <div class="priverBox">
        <dl>개정본 버전</dl>
        <div class="priverInput">
            <p>Ver.</p>
            <div class="koinput">
                <input type="text" bind:value={$policyInfoData.policyData1.piVersion} maxlength="10" placeholder="버전을 입력해 주세요" />
            </div>
        </div>
        <a class="{textState === 1 ? 'textShake' : 'noText'}">개정본버전을 입력해주세요.</a>
    </div>
    <div class="priv_divider"></div>
    <div class="priverBox">
        <dl>개정일</dl>
        <span>개정일은 제작완료된 날짜로 자동 입력됩니다.</span>
    </div>
    <div class="priv_divider"></div>
    <div class="priverBox">
        <dl>시행일</dl>
        <div class="priverCal">
            <div class="time_input">
                <input type="text" id="startdate" bind:value={$policyInfoData.policyData1.piDate} placeholder="시행일을 선택해 주세요." autocomplete="off" maxlength="20" />
            </div>
        </div>
        <a class="{textState === 2 ? 'textShake' : 'noText'}">시행일을 선택해주세요.</a>
    </div>
    <div class="priv_divider"></div>
    <div class="priverBox">
        <dl>작성자</dl>
        <span>저장한 작성자 명이 자동 입력됩니다.</span>
    </div>
    </div>

    <div class="priContentBox">
        <div class="priC_title marB24">머리말<a class="{textState === 3 ? 'textShake' : 'noText'}">기업명을 입력해주세요.</a></div>
        <div class="priCIntrotext">
            개인정보 처리방침
            <div class="koinput wid220">
                <input bind:value={$policyInfoData.policyData1.piHeader} type="text" placeholder="기업명">
            </div>
            (이하 회사)은(는) 고객의 개인정보를 중시하며, 개인정보보호법 등 관련 법규를 준수하기 위해 노력하고 있습니다.
            <dl>회사는 개인정보 처리방침을 통해 고객의 개인정보를 어떠한 용도와 방식으로 이용하고 있으며, 개인정보보호를 위해 어떠한 조치를 취하고 있는지 알려드립니다.</dl>
            <dl>회사의 개인정보 처리방침은 다음과 같습니다.</dl>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 15%"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <div class="pris_num">
                    <dl><span>1</span> / 7</dl>
                </div>
                <button on:click="{()=>{firstDepthSave(2)}}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
