
<script>
    import { fade } from 'svelte/transition'
    import {providePrivacyWriteData} from "../../../lib/store.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";
    import {onMount} from "svelte";
    import {location as spaLocation} from "svelte-spa-router";

    export let stateChange;
    export let didForwardBackwardNavBtnClicked;
    export let privacyStage;
    export let navigationForwardFunction;

    onMount(() => {
        if (didForwardBackwardNavBtnClicked) {
            didForwardBackwardNavBtnClicked = false;
        } else {
            history.pushState({privacyStage}, '', '/#' + $spaLocation);
        }
        navigationForwardFunction = handleNext;
    });

    const handleNext = () => {
        if ($providePrivacyWriteData.step1.proProvide === '') {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '제공 대상 선택', // 제목
                contents1: '제공 대상을 선택해 주세요.', // 내용
                contents2: '',
                btnCheck: '확인', // 확인 버튼의 텍스트
            });
            return true;
        }
        stateChange(2);
    }
</script>

<div class="pri_forntWrap" in:fade>
    <div class="pri_forntBox marB100">
        <div class="pri_fornt">
            <input type="radio" class="priradio" name="inorout" id="radioInside" value={0}
                   bind:group={$providePrivacyWriteData.step1.proProvide} />
            <label for="radioInside">
                <div class="pri_forntImg"><img src="/assets/images/common/privacy_step_img_01.png" alt=""></div>
                <div class="priletext">
                    <h2>내부 제공</h2>
                    <h3>
                        팀원이나 본인에게 개인정보를<br>
                        제공하는 기능입니다.
                    </h3>
                </div>
            </label>
        </div>
        <div class="pri_fornt">
            <input type="radio" class="priradio" name="inorout" id="radioOutside" value={1}
                   bind:group={$providePrivacyWriteData.step1.proProvide} />
            <label for="radioOutside">
                <div class="pri_forntImg"><img src="/assets/images/common/privacy_step_img_02.png" alt=""></div>
                <div class="priletext">
                    <h2>외부 제공</h2>
                    <h3>
                        외부 위탁 회사의 관리자에게<br>
                        개인정보를 제공하는 기능입니다.
                    </h3>
                </div>
            </label>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <div class="pris_num">
                    <dl style="padding: 3px"><span>1</span> / 5</dl>
                </div>
                <button on:click={handleNext} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>