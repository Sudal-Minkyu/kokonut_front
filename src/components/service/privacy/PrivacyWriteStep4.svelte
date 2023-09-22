
<script>
    import { fade } from 'svelte/transition'
    import { providePrivacyWriteData} from "../../../lib/store.js";
    export let stateChange;
    import PrivacyWriteStep4PersonalInfoList from "./PrivacyWriteStep4PersonalInfoList.svelte";
    import {onMount} from "svelte";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    onMount(async => {

    });

const handleNext = () => {
        const confirmProps = {
            icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '', // 제목
            contents1: '', // 내용
            contents2: '',
            btnCheck: '확인', // 확인 버튼의 텍스트
        };
        if ($providePrivacyWriteData.step4.proTargetType === '') {
            confirmProps.title = '제공 정보 범위 선택';
            confirmProps.contents1 = '제공하실 개인정보 범위를 선택해 주세요.';
        } else if ($providePrivacyWriteData.step4.proTargetType === 1 && !$providePrivacyWriteData.step4.targetColumnList.length) {
            confirmProps.title = '제공 개인 정보 선택';
            confirmProps.contents1 = '제공하실 개인정보 항목을 선택해 주세요.';
        }
        if (confirmProps.title) {
            openConfirm(confirmProps);
            return;
        }

        stateChange(5);
    }

</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
<!--                <label class="steplabel">제공할 개인정보를 선택해 주세요.</label>-->
<!--                <div class="step_radioBox">-->
<!--                    <div class="step_radio">-->
<!--                        <input type="radio" class="stradio all" name="porim" id="radioEveryone" value={0}-->
<!--                               bind:group={$providePrivacyWriteData.step4.proTargetType} />-->
<!--                        <label for="radioEveryone"><em><dt></dt></em>전체 개인정보</label>-->
<!--                    </div>-->
<!--                    <div class="step_radio">-->
<!--                        <input type="radio" class="stradio part" name="porim" id="radioSomeone" value={1}-->
<!--                               bind:group={$providePrivacyWriteData.step4.proTargetType} />-->
<!--                        <label for="radioSomeone"><em><dt></dt></em>일부 개인정보</label>-->
<!--                    </div>-->
<!--                </div>-->
                {#if $providePrivacyWriteData.step4.proTargetType === 1}
                    <PrivacyWriteStep4PersonalInfoList />
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_2 prog80"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(3)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>4</span> / 5</dl>
                </div>
                <button on:click={handleNext} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>