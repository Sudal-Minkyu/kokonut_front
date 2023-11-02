<script>
    import {fade} from "svelte/transition";
    import {SelectBoxManager} from "../../../common/action/SelectBoxManager.js";
    import ErrorHighlight from "../../../common/ui/ErrorHighlight.svelte";
    import {onMount} from "svelte";
    import {ajaxParam, reportCatch} from "../../../common/ajax.js";
    import {openBanner} from "../../../common/ui/DialogManager.js";

    export let connectionSettingPop;
    export let columnList;
    export let getThirdPartyInfo;

    let tsBizmReceiverNumCodeErrMsg = '';
    let tsBizmAppUserIdCodeErrMsg = '';
    let confirmCheckErrMsg = '';

    export let savedBizmSettingData;
    const bizmSettingData = JSON.parse(JSON.stringify(savedBizmSettingData));

    onMount(() => {
        initializeSelectBoxes(bizmSettingData);
    });

    const initializeSelectBoxes = (bizmSettingData) => {
        if (bizmSettingData.tsBizmReceiverNumCode) {
            const selectedColumn = columnList.filter(obj => obj.fieldCode === bizmSettingData.tsBizmReceiverNumCode);
            document.getElementById('tsBizmReceiverNumCodeLabel').innerHTML = selectedColumn.length ? selectedColumn[0].fieldComment : '선택';
        }

        if (bizmSettingData.tsBizmAppUserIdCode) {
            const selectedColumn = columnList.filter(obj => obj.fieldCode === bizmSettingData.tsBizmAppUserIdCode);
            document.getElementById('tsBizmAppUserIdCodeLabel').innerHTML = selectedColumn.length ? selectedColumn[0].fieldComment : '선택';
        }
    }

    const handleCancel = () => {
        connectionSettingPop.close();
    }

    let isConfirmChecked = false;
    const handleSave = () => {
        if (!isConfirmChecked) {
            confirmCheckErrMsg = '안내사항에 동의를 해 주세요.';
            return;
        } else {
            confirmCheckErrMsg = '';
        }

        ajaxParam('/v2/api/ThirdParty/bizmSetting', bizmSettingData, (res) => {
            try {
                getThirdPartyInfo();
                savedBizmSettingData = JSON.parse(JSON.stringify(bizmSettingData));
                openBanner('연동 설정 저장을 완료하였습니다.');
                connectionSettingPop.close();
            } catch (e) {
                reportCatch('temp133', e);
            }
        });
    }

    const handleSelectTsBizmReceiverNumCode = (el) => {
        bizmSettingData.tsBizmReceiverNumCode = el.dataset.value;
    }

    const handleSelectTsBizmAppUserIdCode = (el) => {
        bizmSettingData.tsBizmAppUserIdCode = el.dataset.value;
    }
</script>

<!-- [D] 연동 변경 팝업 -->
<div class="koko_popup change_pop" data-popup="change_pop">
    <div class="koko_popup_inner" in:fade>
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">연동 설정</h3>
            </div>
            <form>
<!--                <div class="kopopinput marB24">-->
<!--                    <label>사용여부</label>-->
<!--                    <div class="popRadio">-->
<!--                        <div class="check poprCheck">-->
<!--                            <input type="radio" class="radio" name="use_noneuse" id="사용" value="사용" checked="">-->
<!--                            <label for="사용"><em><dt></dt></em>사용</label>-->
<!--                        </div>-->
<!--                        <div class="check poprCheck">-->
<!--                            <input type="radio" class="radio" name="use_noneuse" id="사용 안 함" value="사용 안 함">-->
<!--                            <label for="사용 안 함"><em><dt></dt></em>사용 안 함</label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="kopopinput marB24">
                    <label>휴대전화번호</label>
                    <div class="mrtBox" style="height: 5rem">
                        <div class="mrtSelBox" style="height: 5rem">
                            <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: handleSelectTsBizmReceiverNumCode}}>
                                <div class="label" id="tsBizmReceiverNumCodeLabel">사용안함</div>
                                <ul class="optionList">
                                    <li class="optionItem" data-value='' >사용안함</li>
                                    {#each columnList as {fieldCode, fieldComment}, i (fieldCode)}
                                        <li class="optionItem" data-value={fieldCode} >{fieldComment}</li>
                                    {/each}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ErrorHighlight bind:message={tsBizmReceiverNumCodeErrMsg} />
                </div>
                <div class="kopopinput marB24">
                    <label>카카오 앱 아이디</label>
                    <div class="mrtBox" style="height: 5rem">
                        <div class="mrtSelBox" style="height: 5rem">
                            <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: handleSelectTsBizmAppUserIdCode}}>
                                <div class="label" id="tsBizmAppUserIdCodeLabel">사용안함</div>
                                <ul class="optionList">
                                    <li class="optionItem" data-value='' >사용안함</li>
                                    {#each columnList as {fieldCode, fieldComment}, i (fieldCode)}
                                        <li class="optionItem" data-value={fieldCode} >{fieldComment}</li>
                                    {/each}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ErrorHighlight bind:message={tsBizmAppUserIdCodeErrMsg} />
                </div>
<!--                <div class="kopopinput marB24">-->
<!--                    <label>카카오앱아이디 항목 지정</label>-->
<!--                    <input type="text" placeholder="Secret Key를 적어주세요.">-->
<!--                </div>-->
                <div class="koko_check">
                    <input type="checkbox" value="1" name="thirdcheck" id="thirdcheck" bind:checked={isConfirmChecked} >
                    <label for="thirdcheck">
                        <em></em>
                        <p class="check">코코넛에 보관되어있는 개인정보를 “해피톡"에 전달하는 것에 동의합니다.<!--<b>자세히보기</b>--></p>
                    </label>
                </div>
                <ErrorHighlight bind:message={confirmCheckErrMsg} />
                <div class="kokopopBtnBox">
                    <div class="koko_cancel change_pop_close" on:click={handleCancel} >취소</div>
                    <div class="koko_go"><button type="button" on:click={handleSave} >저장</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close change_pop_close" data-popup-close="change_pop_close" on:click={handleCancel} ></div>
    </div>
</div>
<!-- // [D] 연동 변경 팝업 -->