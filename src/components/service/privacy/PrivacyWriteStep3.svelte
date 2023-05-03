
<script>
    import { fade } from 'svelte/transition'
    import {providePrivacyWriteData} from "../../../lib/store.js";

    const handleRadioPeriodClick = (e) => {

        console.log(e.target.value);
    }
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
                            <input type="radio" class="radio" name="period" id="radioToday" value="1"
                                   on:click={handleRadioPeriodClick} />
                            <label for="radioToday"><em><dt></dt></em>오늘</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radioWeek" value="7"
                                   on:click={handleRadioPeriodClick} />
                            <label for="radioWeek"><em><dt></dt></em>1주일</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radioMonth" value="30"
                                   on:click={handleRadioPeriodClick} />
                            <label for="radioMonth"><em><dt></dt></em>1개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radio3Month" value="90"
                                   on:click={handleRadioPeriodClick} />
                            <label for="radio3Month"><em><dt></dt></em>3개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radio6Month" value="180"
                                   on:click={handleRadioPeriodClick} />
                            <label for="radio6Month"><em><dt></dt></em>6개월</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <label class="steplabel">다운로드가 가능하게 할까요?</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio" name="porim" id="radioAllow" value="allow"
                               bind:group={$providePrivacyWriteData.step3.isDownloadAvailable} />
                        <label for="radioAllow"><em><dt></dt></em>가능</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio" name="porim" id="radioDeny" value="deny"
                               bind:group={$providePrivacyWriteData.step3.isDownloadAvailable} />
                        <label for="radioDeny"><em><dt></dt></em>불가능</label>
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