
<script>
    import { fade } from 'svelte/transition'
    import {providePrivacyWriteData} from "../../../lib/store.js";
    import {onDestroy, onMount} from "svelte";
    import {setCustomSelectBox, setDateRangePicker, setOptionItem} from "../../../lib/libSearch.js";
    import {openConfirm} from "../../common/ui/DialogManager.js";

    export let stateChange;

    onMount(async ()=>{
        history.pushState({stage: 3}, '', '');
        window.addEventListener('popstate', handleNavigation);
        fatchSearchModule();
    });

    onDestroy(() => {
        window.removeEventListener('popstate', handleNavigation);
    });

    const handleNavigation = (e) => {
        console.log(e)
        if (e.state && e.state.stage) {
            stateChange(e.state.stage);
        } else {
            window.removeEventListener('popstate', handleNavigation);
            history.back();
        }
    }

    const fatchSearchModule = () => {
        setDateRangePicker('stime', true, 'period');
        setCustomSelectBox();
    }

    const handleNext = () => {
        const stime = document.getElementById('stime').value;

        const confirmProps = {
            icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '', // 제목
            contents1: '', // 내용
            contents2: '',
            btnCheck: '확인', // 확인 버튼의 텍스트
        };
        if (stime.length !== 23) {
            confirmProps.title = '제공 기간 선택';
            confirmProps.contents1 = '제공하실 기간을 선택해 주세요.';
        } else if ($providePrivacyWriteData.step3.proDownloadYn === '') {
            confirmProps.title = '다운로드 여부 선택';
            confirmProps.contents1 = '다운로드 가능 여부를 선택해 주세요.';
        }
        if (confirmProps.title) {
            openConfirm(confirmProps);
            return;
        }

        providePrivacyWriteData.update(obj => {
            obj.step3.proStartDate = stime.substring(0, 10);
            obj.step3.proExpDate = stime.substring(13, 23);
            return obj;
        });
        stateChange(4);
    }
</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB80">
                <label class="steplabel">개인정보를 다운로드할 수 있는 기간을 정해주세요.</label>
                <div class="callender_radio_box">
                    <div class="start_end_search_box">
                        <div class="start_end_search_Inner">
                            <div class="calenderBox" style="padding: 1.5rem 3rem 1.5rem 0;">
                                <div class="calenderInput">
                                    <input id="stime" type="text" class="form-control" aria-describedby="stime_addon" style="width: 125%;" readonly />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="seaRadio">
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radioToday" value="-1" checked/>
                            <label for="radioToday"><em><dt></dt></em>오늘</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radioWeek" value="-7" />
                            <label for="radioWeek"><em><dt></dt></em>1주일</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radioMonth" value="-30" />
                            <label for="radioMonth"><em><dt></dt></em>1개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radio3Month" value="-90" />
                            <label for="radio3Month"><em><dt></dt></em>3개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="radio6Month" value="-180" />
                            <label for="radio6Month"><em><dt></dt></em>6개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="사용자 지정" value="-0"/>
                            <label for="사용자 지정"><em><dt></dt></em>사용자 지정</label>
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="">-->
<!--                <label class="steplabel">다운로드가 가능하게 할까요?</label>-->
<!--                <div class="step_radioBox">-->
<!--                    <div class="step_radio">-->
<!--                        <input type="radio" class="stradio" name="porim" id="radioAllow" value={1}-->
<!--                               bind:group={$providePrivacyWriteData.step3.proDownloadYn} />-->
<!--                        <label for="radioAllow"><em><dt></dt></em>가능</label>-->
<!--                    </div>-->
<!--                    <div class="step_radio">-->
<!--                        <input type="radio" class="stradio" name="porim" id="radioDeny" value={0}-->
<!--                               bind:group={$providePrivacyWriteData.step3.proDownloadYn} />-->
<!--                        <label for="radioDeny"><em><dt></dt></em>불가능</label>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
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
                <button on:click={handleNext} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>