
<script>

    import { fade } from 'svelte/transition'
    import {backBtn, policyInfoData, piId} from "../../../lib/store.js";
    import {onlyDouble, onlyNumber} from "../../../lib/common.js"
    import jQuery from "jquery";
    import restapi from "../../../lib/api.js";
    import {push} from "svelte-spa-router";
    import {onMount} from "svelte";

    jQuery(function() {

        //모든 datepicker에 대한 공통 옵션 설정
        // jQuery("#startdate").data('daterangepicker') ({
        //     dateFormat: 'yy. mm. dd' //Input Display Format 변경
        //     ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        //     ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        //     ,changeYear: true //콤보박스에서 년 선택 가능
        //     ,changeMonth: true //콤보박스에서 월 선택 가능
        //     ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        //     ,yearSuffix: "" //달력의 년도 부분 뒤에 붙는 텍스트
        //     ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        //     ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        //     ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        //     ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        //     ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        //     ,maxDate: "+5Y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        // });

        // //input을 datepicker로 선언
        // jQuery("#startdate").datepicker();
        // jQuery("#startdate").data('daterangepicker');
        //From의 초기값을 오늘 날짜로 설정
        //$('#datepicker').datepicker('setDate', '-7D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        //To의 초기값을 내일로 설정
        //$('#datepicker2').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    });

    onMount(async () => {
        console.log("첫번째 뎁스 piId : "+$piId);
        if($piId === 0) {
            console.log("조회안함");
        } else {
            console.log("조회함");
            policyWriting();
        }
    })

    export let policyWriting;
    export let stateChange;

    let piVersion = $policyInfoData.policyData1.piVersion;
    let piDate = $policyInfoData.policyData1.piDate;
    let piHeader = $policyInfoData.policyData1.piHeader;

    let textState = 0;
    function firstDepthSave() {
        if(piVersion === "" || piVersion.toString().search(/\s/) !== -1) {
            textState = 1;
            return false;
        }

        if(piDate === "") {
            textState = 2;
            return false;
        }

        if(piHeader === "" || piHeader.toString().search(/\s/) !== -1) {
            textState = 3;
            return false;
        }

        console.log("첫번째 뎁스 저장")

        let url = "/v2/api/Policy/privacyPolicyFirstSave"

        let sendData = {
            piId : $piId,
            piVersion : piVersion,
            piDate : piDate,
            piHeader : piHeader,
        }

        restapi('v2', 'post', url, "body", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    // 완료후
                    if($piId === 0) {
                        piId.set(json_success.data.sendData.saveId);
                    }
                    policyInfoData.update(obj => {
                        obj.policyData1 = {
                            piVersion : piVersion,
                            piDate : piDate,
                            piHeader : piHeader,
                        };
                        return obj;
                    });
                    stateChange(2);
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        )

    }
</script>

<div in:fade>

    <div class="pri_versionBox marB50">
    <div class="priverBox">
        <dl>개정본 버전</dl>
        <div class="priverInput">
            <p>Ver.</p>
            <div class="koinput">
                <input type="text" bind:value={piVersion} maxlength="10" placeholder="버전을 입력해 주세요" />
            </div>
        </div>
        <a class="{textState === 1 ? 'textShake' : 'noText'}">개정본버전을 입력해주세요.</a>
    </div>
    <div class="priv_divider"></div>
    <div class="priverBox">
        <dl>개정일</dl>
        <div class="priverCal">
            <div class="time_input">
                <input type="text" id="startdate" bind:value={piDate} placeholder="개정일을 선택해 주세요." autocomplete="off" maxlength="20" />
            </div>
        </div>
        <a class="{textState === 2 ? 'textShake' : 'noText'}">개정일을 선택해주세요.</a>
    </div>
    <div class="priv_divider"></div>
    <div class="priverBox">
        <dl>시행일</dl>
        <span>개정일의 2주 뒤로 자동 입력됩니다.</span>
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
                <input bind:value={piHeader} type="text" placeholder="기업명">
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
                <button on:click="{firstDepthSave}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
