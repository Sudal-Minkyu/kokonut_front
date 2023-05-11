
<script>
    import { fade } from 'svelte/transition'
    import {providePrivacyWriteData} from "../../../lib/store.js";
    export let stateChange;
    import 'swiper/css/bundle';
    import PrivacyWriteStep4PersonalInfoList from "./PrivacyWriteStep4PersonalInfoList.svelte";
</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <label class="steplabel">제공할 개인정보를 선택해 주세요.</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio all" name="porim" id="radioEveryone" value="everyone"
                               bind:group={$providePrivacyWriteData.step4.provideColumnScope} />
                        <label for="radioEveryone"><em><dt></dt></em>전체 개인정보</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio part" name="porim" id="radioSomeone" value="someone"
                               bind:group={$providePrivacyWriteData.step4.provideColumnScope} />
                        <label for="radioSomeone"><em><dt></dt></em>일부 개인정보</label>
                    </div>
                </div>
                {#if $providePrivacyWriteData.step4.provideColumnScope === 'someone'}
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
                <button on:click={() => stateChange(5)} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>