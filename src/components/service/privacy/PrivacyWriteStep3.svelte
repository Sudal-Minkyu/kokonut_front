
<script>
    import { fade } from 'svelte/transition'
    export let stateChange;



</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB80">
                <label class="steplabel">제공받을 수 있는 기간을 정해주세요.</label>
                <div class="callender_radio_box">
                    <div class="start_end_search_box">
                        <div class="start_end_search_Inner">
                            <div class="time_input l_time_input">
                                <input type="text" name="startdate" id="datepicker" class="" placeholder="시작일" autocomplete="off" maxlength="10" value="">
                            </div>
                            <div class="time_text">
                                ~
                            </div>
                            <div class="time_input r_time_input">
                                <input type="text" name="enddate" id="datepicker2" class="" placeholder="종료일" autocomplete="off" maxlength="10" value="">
                            </div>
                        </div>
                    </div>

                    <div class="seaRadio">
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="오늘" value="오늘">
                            <label for="오늘"><em><dt></dt></em>오늘</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="1주일" value="1주일">
                            <label for="1주일"><em><dt></dt></em>1주일</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="1개월" value="1개월">
                            <label for="1개월"><em><dt></dt></em>1개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="3개월" value="3개월">
                            <label for="3개월"><em><dt></dt></em>3개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="6개월" value="6개월">
                            <label for="6개월"><em><dt></dt></em>6개월</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <label class="steplabel">다운로드가 가능하게 할까요?</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio" name="porim" id="가능" value="가능">
                        <label for="가능"><em><dt></dt></em>가능</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio" name="porim" id="불가능" value="불가능">
                        <label for="불가능"><em><dt></dt></em>불가능</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_2 prog60"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(2)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>3</span> / 5</dl>
                </div>
                <button on:click={() => stateChange(4)} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>