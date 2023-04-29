
<script>
    import { fade } from 'svelte/transition'
    export let stateChange;




</script>

<div class="pri_forntWrap" in:fade>
    <div class="pri_forntBox marB100">
        <div class="pri_fornt">
            <input type="radio" class="priradio" name="inorout" id="내부" value="내부">
            <label for="내부">
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
            <input type="radio" class="priradio" name="inorout" id="외부" value="외부">
            <label for="외부">
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
                <button on:click={() => stateChange(2)} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>