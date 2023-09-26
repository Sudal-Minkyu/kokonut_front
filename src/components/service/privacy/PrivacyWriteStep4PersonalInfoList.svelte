<script>
    import {providePrivacyWriteData} from "../../../lib/store.js";

    const handleTargetColumnCheckChange = () => {
        refineTargetColumnObjByTable();
    };

    const handleUncheckColumnByCode = (fieldCode) => {
        providePrivacyWriteData.update(obj => {
            obj.step4.targetColumnList = obj.step4.targetColumnList.filter(code => code !== fieldCode);
            return obj;
        });
        refineTargetColumnObjByTable();
    };

    const refineTargetColumnObjByTable = () => {
        providePrivacyWriteData.update(obj => {
            obj.step4.sendDataList = {
                pipeTableTargets: [],
            }
            obj.step4.displayColumnList = [];
            for (const columnObj of obj.step4.columnList) {
                if (obj.step4.targetColumnList.includes(columnObj.fieldCode)) {
                    obj.step4.sendDataList.pipeTableTargets.push(columnObj.fieldCode);
                    obj.step4.displayColumnList.push(columnObj);
                }
            }
            return obj;
        });
    };
</script>

<div class="teamtable">
    <label class="steplabel">어떤 개인정보 항목을 제공하실 건가요? </label>
    <div class="tea_ListFlexBox marT24">
        <div class="tea_ListBox">
            <div class="boaTabBox">
                <div class="prtable">
                    <table>
                        <colgroup>
                            <col style="width:8.57%;">
                            <col style="width:15%;">
                            <col style="width:86.43%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>고유번호</th>
                                <th>항목</th>
                            </tr>
                        </thead>
                        <tbody>
                        {#each $providePrivacyWriteData.step4.columnList as column, i}
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" id="ip{i}" class="partcheck"
                                               value={column.fieldCode}
                                               bind:group={$providePrivacyWriteData.step4.targetColumnList}
                                               on:change={handleTargetColumnCheckChange} />
                                        <label for="ip{i}"><em></em></label>
                                    </div>
                                </td>
                                <td>
                                    {#if !['1_idx', '1_regdate', '1_lastlog'].includes(column.fieldCode)}{column.fieldCode}{/if}
                                </td>
                                <td>
                                    <div class="{column.fieldSecrity ? 'lockicon' : ''}"></div>
                                    {column.fieldComment}
                                    {#if column.fieldCategory}
                                    <span class="subElement {column.fieldColor}">{column.fieldCategory}</span>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                        {#if !$providePrivacyWriteData.step4.columnList.length}
                            <tr class="none_inq">
                                <td>존재하는 항목이 없습니다.</td>
                            </tr>
                        {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="tea_ListBox">
            <div class="teaMemselBox marT20">
                <div class="tmResetBtn">초기화</div>
                <div class="memselBox maxH410impor">
                    <div class="mspartBox">
                        {#each $providePrivacyWriteData.step4.displayColumnList as {fieldComment, fieldCode}}
                            <div class="memName">{fieldComment}{#if !['1_idx', '1_regdate', '1_lastlog'].includes(fieldCode)} ({fieldCode}) {/if}
                                <button type="button" class="memdel" on:click={() => {handleUncheckColumnByCode(fieldCode)}}></button>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>