
<script>
    import { fade } from 'svelte/transition'
    import {knEmailHeader, providePrivacyWriteData} from "../../../lib/store.js";
    import {onMount} from "svelte";
    import {ajaxBody, ajaxGet} from "../../common/ajax.js";
    import PrivacyWriteStep5FilterPop from "./PrivacyWriteStep5FilterPop.svelte";
    export let stateChange;
    function savePrivacy() {
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
            console.info('저장성공', json_success);
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
     * 그리고, 각 추가될 컬럼들의 퍼센트 너비는 어마나 되는지를 구한다.
     */
    const pickColumnAndDetermineWidth = () => {
        const calculateRelativeWidth = (displayColumnList) => {
            const TARGET_TOTAL_WIDTH_PERCENT = 92.4;
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
            obj.step5.filteredMemberList = obj.step5.memberList;
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
                <div class="teamtable">
                    <label class="steplabel">회원을 선택해 주세요.<span>{$providePrivacyWriteData.step5.piplTargetIdxs.length}명</span></label>
                    <div class="tea_ListFlexBox marT24">
                        <div class="tea_ListBox" style="width: 100%">
                            <div class="teamSeaBox">
                                <div class="memseaBox marB32 hei40">
                                    <div class="koinput">
                                        <input type="text" name="" id="" class="wid236" placeholder="아이디, 이메일 검색">
                                        <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                    </div>
                                    <div class="filtetBtn" id="filter_pop">기간 필터</div>
                                </div>
                            </div>
                            <div class="tea_listBox">
                                <div class="kt_tableTopBox marB16">
                                    <div class="kt_total">총 <span>{$providePrivacyWriteData.step5.filteredMemberList.length}</span>건</div>
                                    <div class="kt_selbox wid108">
                                        <div class="selectBox wid100per nonePad">
                                            <div class="label">최근 등록순</div>
                                            <ul class="optionList">
                                                <li class="optionItem">최근 등록순</li>
                                                <li class="optionItem">정확도순</li>
                                                <li class="optionItem">오름차순</li>
                                                <li class="optionItem">내림차순</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="emailtableBox">
                                    <div class="prtable">
                                        <table>
                                            <caption>개인정보 제공 팀원 리스트</caption>
                                            <colgroup>
                                                <col style="width:7.27%;">
                                                {#each $providePrivacyWriteData.step5.displayColumnList as {relativeWidth}}
                                                    <col style={relativeWidth}>
                                                {/each}
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>
                                                    <div class="koko_check">
                                                        <input type="checkbox" name="allcheck" id="allcheck">
                                                        <label for="allcheck"><em></em></label>
                                                    </div>
                                                </th>
                                                {#each $providePrivacyWriteData.step5.displayColumnList as {columnName}}
                                                    <th>{columnName}</th>
                                                {/each}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {#each $providePrivacyWriteData.step5.filteredMemberList as
                                                {basicEmail, basicPhone, basicName, basicBirth, basicGender, kokonut_IDX}, i}
                                                <tr>
                                                    <td>
                                                        <div class="koko_check">
                                                            <input type="checkbox" id="mem{i}" class="partcheck"
                                                                   value={kokonut_IDX}
                                                                   bind:group={$providePrivacyWriteData.step5.piplTargetIdxs}>
                                                            <label for="mem{i}"><em></em></label>
                                                        </div>
                                                    </td>
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
                <button on:click={savePrivacy} class="pri_nextBtn">완료</button>
            </div>
        </div>
    </div>
</div>

{#if false}
    <PrivacyWriteStep5FilterPop />
{/if}