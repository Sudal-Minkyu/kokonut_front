<script>
    import {onMount} from "svelte";
    import {Swiper} from "swiper/bundle";
    import 'swiper/css/bundle';
    import {providePrivacyWriteData} from "../../../lib/store.js";

    onMount(async => {
        const galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 0,
            slidesPerView: 'auto',
            loop: false,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        const galleryTop = new Swiper('.gallery-top', {
            effect : 'fade',
            fadeEffect: {
                crossFade: true
            },
            spaceBetween: 0,
            slidesPerView: 1,
            loop:false,
            touchRatio: 0,
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    });

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
            for (const [i, tab] of obj.step4.tableList.entries()) {
                obj.step4.sendDataList[i] = {
                    pipeTableName: tab.ctName,
                    pipeTableTargets: [],
                }
                obj.step4.displayColumnList[i] = {
                    categoryName: tab.ctDesignation,
                    targetObjList: [],
                }
                for (const columnObj of obj.step4.columnList[i]) {
                    if (obj.step4.targetColumnList.includes(columnObj.fieldCode)) {
                        obj.step4.sendDataList[i].pipeTableTargets.push(columnObj.fieldCode);
                        obj.step4.displayColumnList[i].targetObjList.push(columnObj);
                    }
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
            <div class="prslideTabBox">
                <div class="swiper-container gallery-thumbs" scrollbar-hide="true">
                    <div class="swiper-wrapper disflextop">
                        {#each $providePrivacyWriteData.step4.tableList as {ctDesignation, ctName}, i}
                            <div class="swiper-slide">
                                <div class="sl_tab">{ctDesignation}</div>
                            </div>
                        {/each}
                    </div>
                </div>
                <!--<button class="addBtn" id="add_tab_pop"></button>-->
            </div>
            <div class="boaTabBox">
                <div class="bo_tabContentBox">
                    <div class="swiper-container gallery-top">
                        <div class="swiper-wrapper">
                            {#each $providePrivacyWriteData.step4.columnList as singleTabColumnList, i}
                                <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                    <div class="prtable">
                                        <table>
                                            <colgroup>
                                                <col style="width:8.57%;">
                                                <col style="width:15%;">
                                                <col style="width:86.43%;">
                                            </colgroup>
                                            <tbody>
                                            {#each singleTabColumnList as col, j}
                                                <tr>
                                                    <td>
                                                        <div class="koko_check">
                                                            <input type="checkbox" id="ip{i}c{j}" class="partcheck"
                                                                   value={col.fieldCode}
                                                                   bind:group={$providePrivacyWriteData.step4.targetColumnList}
                                                                   on:change={handleTargetColumnCheckChange} />
                                                            <label for="ip{i}c{j}"><em></em></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {col.fieldCode !== 'default' ? col.fieldCode : ''}
                                                    </td>
                                                    <td>
                                                        <div class="{col.fieldSecrity ? 'lockicon' : ''}"></div>
                                                        {col.fieldComment}
                                                        <span class="subElement {col.fieldColor}">{col.fieldCategory}</span>
                                                    </td>
                                                </tr>
                                            {/each}
                                            {#if !singleTabColumnList.length}
                                                <tr class="none_inq">
                                                    <td>존재하는 항목이 없습니다.</td>
                                                </tr>
                                            {/if}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tea_ListBox">
            <div class="teaMemselBox marT68">
                <div class="tmResetBtn">초기화</div>
                <div class="memselBox maxH410impor">
                    {#each $providePrivacyWriteData.step4.displayColumnList as {categoryName, targetObjList}}
                        {#if targetObjList.length}
                            <div class="mspartBox">
                                <p>{categoryName}</p>
                                {#each targetObjList as {fieldComment, fieldCode}}
                                    <div class="memName">{fieldComment}({fieldCode})
                                        <button type="button" class="memdel" on:click={() => {handleUncheckColumnByCode(fieldCode)}}></button>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>