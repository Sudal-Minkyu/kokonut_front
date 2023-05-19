
<script>
    import { fade } from 'svelte/transition'
    import {initialProvidePrivacyWrite, knEmailHeader, providePrivacyWriteData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxBody, ajaxGet} from "../../common/ajax.js";
    import PrivacyWriteStep5FilterPop from "./PrivacyWriteStep5FilterPop.svelte";
    import {openBanner, openConfirm} from "../../common/ui/DialogManager.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {push} from "svelte-spa-router";

    export let stateChange;

    // 전체 체크박스 꺼지고 켜짐 상태 동기화
    $: isMasterCheckBoxChecked = $providePrivacyWriteData.step5.filteredMemberList.length
        && $providePrivacyWriteData.step5.filteredMemberList
            .every(item => $providePrivacyWriteData.step5.piplTargetIdxs.includes(item.kokonut_IDX));

    function handleSave() {
        const confirmProps = {
            icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '', // 제목
            contents1: '', // 내용
            contents2: '',
            btnCheck: '확인', // 확인 버튼의 텍스트
        };
        if ($providePrivacyWriteData.step5.provideTargetMemberScope === '') {
            confirmProps.title = '제공 대상 선택';
            confirmProps.contents1 = '제공될 회원 범위를 선택해 주세요.';
        } else if ($providePrivacyWriteData.step5.provideTargetMemberScope === 'someone'
            && !$providePrivacyWriteData.step5.piplTargetIdxs.length) {
            confirmProps.title = '제공 대상 회원 선택';
            confirmProps.contents1 = '개인 정보 제공될 회원을 선택해 주세요.';
        }
        if (confirmProps.title) {
            openConfirm(confirmProps);
            return;
        }

        const ppd = $providePrivacyWriteData;
        const sendData = {
            proProvide: ppd.step1.proProvide,
            ...ppd.step3,
            proTargetType: ppd.step4.proTargetType,
            provisionEntrySaveDtos: ppd.step4.sendDataList,
            piplTargetIdxs: ppd.step5.piplTargetIdxs,
        };
        if (ppd.step2.provideTargetType === 'self') {
            sendData.adminEmailList = [$knEmailHeader];
        } else if (ppd.step2.provideTargetType === 'teammate') {
            sendData.adminEmailList = ppd.step2.selectedAdminObjList.map(item => item.knEmail);
        }

        console.log('저장데이터', sendData);
        ajaxBody('/v2/api/Provision/provisionSave', sendData, (json_success) => {
            providePrivacyWriteData.set(JSON.parse(initialProvidePrivacyWrite));
            openBanner('개인 정보 제공을 등록하였습니다.');
            push('/service/privacy/privacyList');
        });
    }

    onMount(async => {
        getAllCustomerList();
        console.log('현재데이터', $providePrivacyWriteData);
    });

    const getAllCustomerList = () => {
        ajaxGet('/v2/api/DynamicUser/tableBasicList', false, (json_success) => {
            console.log(json_success);
            providePrivacyWriteData.update(obj => {
                obj.step5.memberList = json_success.data.sendData.basicTableList || [];
                pickColumnAndDetermineWidth();
                return obj;
            });
            filterMemberList();
        }, (json_error) => {

        })
    };

    /**
     * 회원 리스트의 늘어나고 줄어드는 요소들에 대한 처리를 바르게 하기 위해, 컬럼이 포함될 것인지,
     * 그리고, 각 추가될 컬럼들의 퍼센트 너비는 얼마나 되는지를 구한다.
     */
    const pickColumnAndDetermineWidth = () => {
        const calculateRelativeWidth = (displayColumnList) => {
            const TARGET_TOTAL_WIDTH_PERCENT = 82.4;
            const totalRatio = displayColumnList.reduce(
                (accumulator, currentObj) => accumulator + currentObj.columnWidthRatio, 0);
            for (const propObj of displayColumnList) {
                propObj.relativeWidth = Number((TARGET_TOTAL_WIDTH_PERCENT * propObj.columnWidthRatio / totalRatio).toFixed(1));
            }
            displayColumnList[0].relativeWidth += TARGET_TOTAL_WIDTH_PERCENT - displayColumnList.reduce(
                (accumulator, currentObj) => accumulator + currentObj.relativeWidth, 0);
            displayColumnList[0].relativeWidth = Number(displayColumnList[0].relativeWidth.toFixed(1));
            return displayColumnList;
        };

        const targetKeyAndPropList = [
            {key: 'basicEmail', columnName: '이메일주소', columnWidthRatio: 1},
            {key: 'basicPhone', columnName: '휴대전화번호', columnWidthRatio: 1},
            {key: 'basicName', columnName: '이름', columnWidthRatio: 1},
            {key: 'basicBirth', columnName: '생년월일', columnWidthRatio: 1},
            {key: 'basicGender', columnName: '성별', columnWidthRatio: 1},
        ];


        if ($providePrivacyWriteData.step5.memberList.length) {
            providePrivacyWriteData.update(obj => {
                const displayColumnList = [];
                const testObj = obj.step5.memberList[0];
                for (const examConditionObj of targetKeyAndPropList) {
                    if (typeof testObj[examConditionObj.key] !== 'undefined') {
                        displayColumnList.push(examConditionObj);
                    }
                }
                obj.step5.displayColumnList = calculateRelativeWidth(displayColumnList);
                console.log('처리된 컬럼 표시 정보', displayColumnList);
                return obj;
            });
        }
    }

    const filterMemberList = () => {
        providePrivacyWriteData.update(obj => {
            obj.step5.filteredMemberList = obj.step5.memberList.filter(member => {
                let textExam = true;
                if (member.basicEmail && obj.step5.searchCondition.text) {
                    textExam = member.ID?.includes(obj.step5.searchCondition.text) || member.basicEmail?.includes(obj.step5.searchCondition.text);
                }
                let registerDateExam = true;
                if (member.kokonut_REGISTER_DATE && obj.step5.searchCondition) {

                }

                return textExam;
            });

            return obj;
        });
    }

    const turnOnDateConditionPop = () => {
        providePrivacyWriteData.update(obj => {
            obj.step5.searchCondition.popVisible = true;
            return obj;
        });
    };

    const turnOffDateConditionPop = () => {
        providePrivacyWriteData.update(obj => {
            obj.step5.searchCondition.popVisible = false;
            return obj;
        });
    };

    const resetDateCondition = () => {
        turnOffDateConditionPop();
    }

    const applyDateCondition = () => {
        filterMemberList();
        turnOffDateConditionPop();
    }

    const handleMasterCheckBoxChange = (e) => {
        providePrivacyWriteData.update(obj => {
            console.log(obj.step5.filteredMemberList);
            const filteredMemberIdxList = obj.step5.filteredMemberList.map(item => item.kokonut_IDX);
            obj.step5.piplTargetIdxs = obj.step5.piplTargetIdxs.filter(idx => !filteredMemberIdxList.includes(idx));
            if (e.target.checked) {
                obj.step5.piplTargetIdxs = [...obj.step5.piplTargetIdxs, ...filteredMemberIdxList];
            }
            return obj;
        });
    }

</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <label class="steplabel">개인정보를 제공할 회원을 선택해 주세요.</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio all" name="porim" id="radioEveryone" value="everyone"
                               bind:group={$providePrivacyWriteData.step5.provideTargetMemberScope} />
                        <label for="radioEveryone"><em><dt></dt></em>전체 회원</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio part" name="porim" id="radioSomeone" value="someone"
                               bind:group={$providePrivacyWriteData.step5.provideTargetMemberScope} />
                        <label for="radioSomeone"><em><dt></dt></em>일부 회원</label>
                    </div>
                </div>
                {#if $providePrivacyWriteData.step5.provideTargetMemberScope === 'someone'}
                    <div class="teamtable">
                    <label class="steplabel">회원을 선택해 주세요.<span>{$providePrivacyWriteData.step5.piplTargetIdxs.length}명</span></label>
                    <div class="tea_ListFlexBox marT24">
                        <div class="tea_ListBox" style="width: 100%">
                            <div class="teamSeaBox">
                                <div class="memseaBox marB32 hei40">
                                    <div class="koinput">
                                        <input type="text" class="wid236" placeholder="아이디, 이메일 검색"
                                               bind:value={$providePrivacyWriteData.step5.searchCondition.text}
                                               on:keyup={filterMemberList} />
                                        <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                    </div>
<!--                                    <div class="filtetBtn" id="filter_pop" on:click={turnOnDateConditionPop}>기간 필터</div>-->
                                </div>
                            </div>
                            <div class="tea_listBox">
                                <div class="kt_tableTopBox marB16">
                                    <div class="kt_total">총 <span>{$providePrivacyWriteData.step5.filteredMemberList.length}</span>건</div>
                                    {#if false}
                                        <div class="kt_selbox wid108">
                                            <div class="selectBox wid100per nonePad" use:SelectBoxManager={()=>{}}>
                                                <div class="label">최근 등록순</div>
                                                <ul class="optionList">
                                                    <li class="optionItem">최근 등록순</li>
                                                    <li class="optionItem">오름차순</li>
                                                    <li class="optionItem">내림차순</li>
                                                </ul>
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                                <div class="emailtableBox">
                                    <div class="prtable">
                                        <table>
                                            <caption>개인정보 제공 팀원 리스트</caption>
<!--                                            <colgroup>-->
<!--                                                <col style="width:7.27%;">-->
<!--                                                <col style="width: 10%;">-->
<!--                                                {#each $providePrivacyWriteData.step5.displayColumnList as {relativeWidth}}-->
<!--                                                    <col style={relativeWidth}>-->
<!--                                                {/each}-->
<!--                                            </colgroup>-->
                                            <thead>
                                            <tr>
                                                <th>
                                                    <div class="koko_check">
                                                        <input type="checkbox" id="allcheck" bind:checked={isMasterCheckBoxChecked} on:click={handleMasterCheckBoxChange}>
                                                        <label for="allcheck"><em></em></label>
                                                    </div>
                                                </th>
                                                <th>ID</th>
                                                {#each $providePrivacyWriteData.step5.displayColumnList as {columnName}}
                                                    <th>{columnName}</th>
                                                {/each}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {#each $providePrivacyWriteData.step5.filteredMemberList as
                                                {ID, basicEmail, basicPhone, basicName, basicBirth, basicGender, kokonut_IDX}, i}
                                                <tr>
                                                    <td>
                                                        <div class="koko_check">
                                                            <input type="checkbox" id="mem{i}" class="partcheck"
                                                                   value={kokonut_IDX}
                                                                   bind:group={$providePrivacyWriteData.step5.piplTargetIdxs}>
                                                            <label for="mem{i}"><em></em></label>
                                                        </div>
                                                    </td>
                                                    <td>{ID}</td>
                                                    {#if typeof basicEmail !== 'undefined'}
                                                        <td>{basicEmail}</td>
                                                    {/if}
                                                    {#if typeof basicPhone !== 'undefined'}
                                                        <td>{basicPhone}</td>
                                                    {/if}
                                                    {#if typeof basicName !== 'undefined'}
                                                        <td>{basicName}</td>
                                                    {/if}
                                                    {#if typeof basicBirth !== 'undefined'}
                                                        <td>{basicBirth}</td>
                                                    {/if}
                                                    {#if typeof basicGender !== 'undefined'}
                                                        <td>{basicGender}</td>
                                                    {/if}
                                                </tr>
                                            {/each}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div class="Prog_2 prog100"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(4)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>5</span> / 5</dl>
                </div>
                <button on:click={handleSave} class="pri_nextBtn">완료</button>
            </div>
        </div>
    </div>
</div>

{#if $providePrivacyWriteData.step5.searchCondition.popVisible && false}
    <div class="another_koko_popup step_filter_pop filter_pop" data-popup="filter_pop">
        <div class="koko_popup_inner">
            <div class="koko_popup_container">
                <div class="koko_popup_title">
                    <h3 class="">기간 필터</h3>
                </div>
                <form>
                    <div class="filtercontbox marB50">
                        <p>회원가입 일시</p>
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
                                <input type="radio" class="radio" name="period" id="today" value="today" checked>
                                <label for="today"><em><dt></dt></em>오늘</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="period" id="week" value="week">
                                <label for="week"><em><dt></dt></em>1주일</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="period" id="month1" value="month1">
                                <label for="month1"><em><dt></dt></em>1개월</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="period" id="month6" value="month6">
                                <label for="month6"><em><dt></dt></em>6개월</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="period" id="all" value="all">
                                <label for="all"><em><dt></dt></em>전체</label>
                            </div>
                        </div>
                    </div>
                    <div class="filtercontbox">
                        <p>마지막 로그인 일시</p>
                        <div class="start_end_search_box">
                            <div class="start_end_search_Inner">
                                <div class="time_input l_time_input">
                                    <input type="text" name="last_startdate" id="datepicker3" class="" placeholder="시작일" autocomplete="off" maxlength="10" value="">
                                </div>
                                <div class="time_text">
                                    ~
                                </div>
                                <div class="time_input r_time_input">
                                    <input type="text" name="last_enddate" id="datepicker4" class="" placeholder="종료일" autocomplete="off" maxlength="10" value="">
                                </div>
                            </div>
                        </div>
                        <div class="seaRadio">
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="last_period" id="last_today" value="last_today" checked>
                                <label for="last_today"><em><dt></dt></em>오늘</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="last_period" id="last_week1" value="last_week1">
                                <label for="last_week1"><em><dt></dt></em>1주일</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="last_period" id="last_month1" value="last_month1">
                                <label for="last_month1"><em><dt></dt></em>1개월</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="last_period" id="last_month6" value="last_month6">
                                <label for="last_month6"><em><dt></dt></em>6개월</label>
                            </div>
                            <div class="check radioCheck">
                                <input type="radio" class="radio" name="last_period" id="last_all" value="last_all">
                                <label for="last_all"><em><dt></dt></em>전체</label>
                            </div>
                        </div>
                    </div>
                    <div class="kokopopBtnBox">
                        <div class="koko_reset" id="reset" on:click={resetDateCondition}>초기화</div>
                        <div class="koko_go"><button type="button" on:click={applyDateCondition}>적용하기</button></div>
                    </div>
                </form>
            </div>
            <div class="koko-popup-close filter_pop_close" on:click={turnOffDateConditionPop} ></div>
        </div>
    </div>
{/if}


{#if false}
    <PrivacyWriteStep5FilterPop />
{/if}