<script>

    import { push } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import {policyInfoData, piId, initialPolicyInfo, piStage} from "../../../lib/store.js";
    import ErrorHighlight from "../../common/ui/ErrorHighlight.svelte";
    import {openConfirm} from "../../common/ui/DialogManager.js";
    import {ajaxParam, reportCatch} from "../../common/ajax.js";

    export let stateChange;

    let checkAgree = false;
    let checkAgreeErrorMsg = '';

function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    const handleComplete = () => {
        if (checkAgree) {
            finalSave();
        } else {
            scrollToBottom();
            checkAgreeErrorMsg = '동의여부를 클릭해주세요.';
        }
    }

    const finalSave = () => {
        let url = "/v2/api/Policy/privacyPolicyFinalSave";
        let sendData = {
            piId : $piId,
        }
        ajaxParam(url, sendData, (res) => {
            try {
                const customConfirmProp = {
                    callback: () => {
                        const pathName = '/service/policyDetail/' + $piId;
                        piId.set(0);
                        piStage.set(0);
                        policyInfoData.set(JSON.parse(initialPolicyInfo));
                        push(pathName);
                    }, // 확인버튼시 동작
                    icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '제작 완료', // 제목
                    contents1: '개인정보처리방침 제작을 완료하였습니다.', // 내용
                    contents2: '',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                }
                openConfirm(customConfirmProp);
            } catch (e) {
                reportCatch('t23082307', e);
            }
        });
    }
</script>

<div in:fade>
    <!------------ No.3 ------------>
    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">7. 개인정보의 파기에 관한 사항</div>
        <div class="prinortext">
            회사는 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. 이때, DB로 옮겨진 개인정보는 해당 법령에서 허용된 목적 이외의 다른 목적으로 이용되지 않습니다.
        </div>
        <div class="prinortext">
            회사의 개인정보 파기절차 및 방법은 다음과 같습니다.
        </div>
        <div class="prnor_text">
            <div class="pttext">
                <dt>1.</dt>
                파기절차
                <span class="tiptool" id="tool_btn08">
                            <!-- [D] tooltip : 파기절차 -->
                            <div class="layerToolType pmtool_04" id="tool_box08">
                                <div class="tipContents">
                                    <p>
                                        1. 코코넛에 위탁 관리하는 개인정보는 고객 탈퇴 시 자동 파기할 수 있습니다. 보유기간이 설정된 개인정보는 해당 기간이 지나면 자동 파기됩니다.<br>
                                        2. 법령 등에 따라 별도 보존기간이 설정된 개인정보는 별도 DB의 테이블로 옮겨져 해당 기간만큼 보존 후 파기합니다.(2-3 법령에 따른 개인정보의 보유기간)
                                    </p>
                                </div>
                            </div>
                    <!-- // [D] 파기절차 -->
                        </span>
            </div>
            <dd>회사는 보유기간의 경과, 처리목적 달성으로 인해 불필요하게 되었거나 동의 철회, 처리 정지 등 정보주체의 요구가 있은 개인정보를 지체없이 파기합니다. 개인정보보호책임자는 정기적으로 파기된 개인정보 현황을 확인합니다.</dd>
        </div>
        <div class="prnor_text">
            <p><span>2.</span>파기 방법</p>
            <dd>회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</dd>
        </div>
    </div>

    <!------------ No.7 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">8. 정보주체의 권리, 의무 및 그 행사방법에 관한 사항</div>
        <div class="prnor_text">
            <p><span>1.</span>이용자는 계약 기간 내에 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 자신의 개인정보에 대해 정보삭제 및 처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
        </div>
        <div class="prnor_text">
            <p><span>2.</span>온라인으로 제공되지 않는 정보주체의 권리 행사는 개인정보보호 담당부서(privacy@kokonut.me)로 전자우편을 보내주시면, 회사는 이에 대해 지체없이 조치하겠습니다.</p>
        </div>
        <div class="prnor_text">
            <p><span>3.</span>권리 행사는 법정 대리인 또는 정보주체의 위임을 받은 자 등 대리인을 통하여 할 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하여야 합니다.</p>
        </div>
        <div class="prnor_text">
            <p><span>4.</span>회사는 정보주체의 권리에 따른 열람·정정·삭제·처리정지의 요구 시 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
        </div>
    </div>

    <!------------ No.8 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">9. 개인정보의 안전성 확보 조치에 관한 사항</div>
        <div class="prinortext marB16">
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            <span class="tiptool" id="tool_btn16">
                        <!-- [D] tooltip : 개인정보의 안전성 확보 -->
                        <div class="layerToolType pmtool_02" id="tool_box16">
                            <div class="tipContents">
                                <p>
                                    코코넛에서 관리하는 개인정보는 아래와 같은 관리적 기술적 물리적 보호조치를 충족합니다. 서류에 작성된 개인정보는 고객사가 직접 관리하는 개인정보에만 해당합니다.
                                </p>
                            </div>
                        </div>
                <!-- // [D] 개인정보의 안전성 확보 -->
                    </span>
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>관리적 보호 조치 : 개인정보 내부관리계획 수립·시행, 임직원에 대한 개인정보 보호 교육</dd>
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>기술적 보호 조치 : 개인정보처리시스템에 대한 접근권한 관리 및 원격 접속 시 2단계 인증, 접속기록 관리, 접근 통제, 개인정보 암호화, 보안 프로그램 운영</dd>
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>물리적 보호조치 : 개인정보가 포함된 서류는 잠금장치가 있는 장소에 보관</dd>
        </div>
    </div>

    <!------------ No.11 ------------>
    <div class="priContentBox">
        <div class="priC_title marB24">10. 개인정보의 권익침해에 대한 구제방법</div>
        <div class="prinortext marB16">
            이용자는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</dd>
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</dd>
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</dd>
        </div>
        <div class="prnor_text">
            <dd class="pradfont"><span></span>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</dd>
        </div>
    </div>

    <div class="priContentBox">
        <div class="koko_checkDoubleBox">
            <div class="koko_check">
                <input type="checkbox" value="1" name="selcheck02" id="selcheck02" bind:checked={checkAgree} >
                <label for="selcheck02">
                    <em></em>
                    <p style="font-size: 18px;font-weight: 500;" class="check">모든 사항을 확인하였고 동의합니다.</p>
                </label>
            </div>
            <ErrorHighlight message={checkAgreeErrorMsg} fontSize={2} />
        </div>
    </div>

</div>
<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 100%"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click="{() => stateChange(6)}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>7</span> / 7</dl>
                </div>

                <button on:click="{handleComplete}" class="pri_nextBtn">완료</button>
            </div>

        </div>
    </div>
</div>
