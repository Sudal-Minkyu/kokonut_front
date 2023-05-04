
<script>
    import { fade } from 'svelte/transition'
    import jQuery from "jquery";
    import {providePrivacyWriteData} from "../../../lib/store.js";
    import restapi from "../../../lib/api.js";
    import {onMount} from "svelte";

    export let stateChange;
    let isMasterCheckBoxChecked = false;

    onMount(async => {
        getProvideTargetAdminList();
    });

    const getProvideTargetAdminList = () => {
        let sendData = {
            type: '0',
        }

        restapi('v2', 'get', "/v2/api/Privacy/offerAdminList", "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    providePrivacyWriteData.update(obj => {
                        obj.step2.offerList = json_success.data.sendData.offerList;
                        console.log('전달받은 데이터', obj.step2.offerList);
                        return obj;
                    });
                }
            },
            (json_error) => {
                console.log(json_error);
            }
        );
    }

    const handleChangeAdminSelection = () => {
        providePrivacyWriteData.update(obj => {
            obj.step2.selectedAdminObjList = [];
            for (const adminId of obj.step2.selectedAdminIdList) {
                obj.step2.selectedAdminObjList.push(...obj.step2.offerList.filter(item => item.adminId === adminId));
            }
            return obj;
        });
        if ($providePrivacyWriteData.step2.offerList.length === $providePrivacyWriteData.step2.selectedAdminIdList.length) {
            isMasterCheckBoxChecked = true;
        } else if (!$providePrivacyWriteData.step2.selectedAdminIdList.length) {
            isMasterCheckBoxChecked = false;
        }
    }

    const removeSelectedAdmin = (index) => {
        providePrivacyWriteData.update(obj => {
            obj.step2.selectedAdminIdList.splice(index, 1);
            return obj;
        });
        handleChangeAdminSelection();
    };

    const resetSelectedAdmin = () => {
        providePrivacyWriteData.update(obj => {
            obj.step2.selectedAdminIdList = [];
            return obj;
        });
        handleChangeAdminSelection();
    };

    const handleMasterCheckBoxChange = (e) => {
        providePrivacyWriteData.update(obj => {
            if (e.target.checked) {
                obj.step2.selectedAdminIdList = obj.step2.offerList.map(item => item.adminId);
            } else {
                obj.step2.selectedAdminIdList = [];
            }
            return obj;
        });
        handleChangeAdminSelection();
    }
</script>

<div class="pri_componentWrap" in:fade>
    <div class="pristep">
        <div class="pristepContent">
            <div class="marB46">
                <label class="steplabel">제공받을 사람을 선택해 주세요.</label>
                <div class="step_radioBox">
                    <div class="step_radio">
                        <input type="radio" class="stradio solo" name="solo_team" id="radioSelf" value="self"
                               bind:group={$providePrivacyWriteData.step2.provideTargetType} />
                        <label for="radioSelf">본인</label>
                    </div>
                    <div class="step_radio">
                        <input type="radio" class="stradio team" name="solo_team" id="radioTeammate" value="teammate"
                               bind:group={$providePrivacyWriteData.step2.provideTargetType} />
                        <label for="radioTeammate">내부 팀원</label>
                    </div>
                </div>
                {#if $providePrivacyWriteData.step2.provideTargetType === 'teammate' }
                    <div class="teamtable">
                        <label class="steplabel">팀원을 선택해 주세요.</label>
                        <div class="tea_ListFlexBox marT24">
                            <div class="tea_ListBox">
                                <div class="teamSeaBox">
                                    <div class="memseaBox marB32">
                                        <div class="koinput">
                                            <input type="text" class="wid236" placeholder="이메일 검색">
                                            <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                        </div>
                                        <div class="mu_SelBox wid150 noneMarR">
                                            <div class="selectBox wid100per nonePad">
                                                <div class="label popgrade">관리자 등급</div>
                                                <ul class="optionList">
                                                    <li class="optionItem popanoGrade">최고관리자</li>
                                                    <li class="optionItem popanoGrade">일반관리자</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tea_listBox">
                                    <div class="kt_tableTopBox marB16">
                                        <div class="kt_total">총 <span>{$providePrivacyWriteData.step2.offerList.length}</span>건</div>
<!--                                        <div class="kt_selbox wid108">-->
<!--                                            <div class="selectBox wid100per nonePad">-->
<!--                                                <div class="label">최근 등록순</div>-->
<!--                                                <ul class="optionList">-->
<!--                                                    <li class="optionItem">최근 등록순</li>-->
<!--                                                    <li class="optionItem">정확도순</li>-->
<!--                                                    <li class="optionItem">오름차순</li>-->
<!--                                                    <li class="optionItem">내림차순</li>-->
<!--                                                </ul>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div>

                                    <div class="emailtableBox">
                                        <div class="prtable crownTable">
                                            <table>
                                                <caption>개인정보 제공 팀원 리스트</caption>
                                                <colgroup>
                                                    <col style="width:7.27%;">
                                                    <col style="width:45%;">
                                                    <col style="width:22.74%;">
                                                    <col style="width:25%;">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>
                                                        <div class="koko_check">
                                                            <input type="checkbox" name="allcheck" id="allcheck"
                                                                   bind:checked={isMasterCheckBoxChecked}
                                                                   on:click={handleMasterCheckBoxChange} >
                                                            <label for="allcheck"><em></em></label>
                                                        </div>
                                                    </th>
                                                    <th>이메일</th>
                                                    <th>이름</th>
                                                    <th>관리자 등급</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {#each $providePrivacyWriteData.step2.offerList as
                                                    {adminId, knEmail, knName, knRoleDesc, knRoleCode}, i}
                                                    <tr>
                                                        <td>
                                                            <div class="koko_check">
                                                                <input type="checkbox" name="mem01" id="mem01" class="partcheck"
                                                                       value={adminId}
                                                                       bind:group={$providePrivacyWriteData.step2.selectedAdminIdList}
                                                                       on:change={handleChangeAdminSelection} />
                                                                <label for="mem01"><em></em></label>
                                                            </div>
                                                        </td>
                                                        <td>{knEmail}</td>
                                                        <td>{knName}</td>
                                                        {#if knRoleCode === "ROLE_MASTER"}
                                                            <td>{knRoleDesc}<div class="mastericon"></div></td>
                                                        {:else}
                                                            <td>{knRoleDesc}</td>
                                                        {/if}
                                                    </tr>
                                                {/each}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tea_ListBox">
                                <div class="teaMemselBox marT110">
                                    <div class="tmResetBtn" on:click={resetSelectedAdmin}>초기화</div>
                                    <div class="memselBox">
                                        {#each $providePrivacyWriteData.step2.selectedAdminObjList as {knEmail, knName}, i}
                                            <div class="memName">{knName}({knEmail})
                                                <button type="button" class="memdel" on:click={() => {removeSelectedAdmin(i)}}></button>
                                            </div>
                                        {/each}
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
                    <div class="Prog_1 prog40"></div>
                </div>
            </div>
            <div class="pri_bottomBtnBox marT32">
                <button on:click={() => stateChange(1)} class="pri_prevBtn">이전</button>
                <div class="pris_num">
                    <dl style="padding: 3px"><span>2</span> / 5</dl>
                </div>
                <button on:click={() => stateChange(3)} class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>