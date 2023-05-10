<script>
    import {personalInfoCategoryData} from "../../../../lib/store.js";
    import {onDestroy, onMount} from "svelte";
    export let personalInfoCategoryService;

    // 카테고리를 선택했을 때 해당 카테고리에 맞는 항목들을 보여주기 위함
    const catBoxControl = (e) => {
        const parent = e.target.closest('.showcateinBox') || e.target.closest('.cateiBox');
        if (!parent) {
            $personalInfoCategoryData.autoCompleteBox.searchInputText = '';
            personalInfoCategoryService.autoCompleteBox.hide();
        }
    };

    onMount(async => {
        document.addEventListener('mouseup', catBoxControl);
    });

    onDestroy(async => {
        document.removeEventListener('mouseup', catBoxControl);
    });
</script>

<div class="prPart1_box">
    <div class="prptitle">
        <h2>항목 분류</h2>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="myAddBtn" on:click={personalInfoCategoryService.createItemPop.show}>나만의 항목 추가</div>
    </div>
    <div class="categorydivision_box">
        <div>
            <div class="cateiBox">
                <div class="cateinput">
                    <input type="text" class="catesea" placeholder="찾고 싶은 항목을 검색해 보세요"
                           bind:value={$personalInfoCategoryData.autoCompleteBox.searchInputText}
                           on:keyup={personalInfoCategoryService.autoCompleteBox.handleAutocompleteSearchTextChange} >
                </div>
                <div class="showcateinBox {$personalInfoCategoryData.autoCompleteBox.visible ? 'showon' : ''}">
                    <div class="showcateinner">
                        {#each $personalInfoCategoryData.autoCompleteBox.searchResultItemList as {ciName}, i}
                            <div class="cateS_check">
                                <input type="checkbox" name="itemCheck" value={ciName} id="shcate_{i}"
                                       bind:group={$personalInfoCategoryData.checkedItemNameList}
                                       on:change={personalInfoCategoryService.handleCheckedItemChange} >
                                <label for="shcate_{i}">
                                    <em></em>
                                    <p class="check"><span>{ciName}</span></p>
                                </label>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="cateListBox">
                <div class="cateScrollBox">
                    <div class="cateScrollInner">
                        <div class="cateS_Items">
                            <ul>
                                {#if $personalInfoCategoryData.addItemList.length}
                                    <li class="cs_tab on_cateS">추가카테고리</li>
                                {/if}
                                {#each $personalInfoCategoryData.basicCategoryList as {cdName}, i}
                                    {#if !$personalInfoCategoryData.addItemList.length && i === 0 }
                                        <li class="cs_tab on_cateS">{cdName}</li>
                                    {:else}
                                        <li class="cs_tab">{cdName}</li>
                                    {/if}
                                {/each}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="cateS_checkWrap">
                    <!-- 항목 선택이 없을 시 -->
                    <!--<div class="nonecateS_Box"><p>추가하고 싶은 항목을<br> 선택해 주세요</p></div>-->

                    <div class="cateS_checkBox">

                        {#if $personalInfoCategoryData.addItemList.length}
                            <div class="cateS_checkInner">
                                {#each $personalInfoCategoryData.addItemList as {ciName, categoryName}, i}
                                    <div class="cateS_check">
                                        <input type="checkbox" name="itemCheck" id="cates_0{i}" value={ciName}
                                               bind:group={$personalInfoCategoryData.checkedItemNameList}
                                               on:change={personalInfoCategoryService.handleCheckedItemChange}>
                                        <label for="cates_0{i}">
                                            <em></em>
                                            <p class="check">{ciName}</p>
                                        </label>
                                        <button on:click={()=>{personalInfoCategoryService.editItemPop.show(i)}} class="cateReviseIcon"></button>
                                    </div>
                                {/each}
                            </div>
                        {/if}

                        {#each $personalInfoCategoryData.basicCategoryList as {cdName, categoryItemListDtoList}, i}
                            <div class="cateS_checkInner" style="display:none;">
                                {#each categoryItemListDtoList as {ciName, categoryName}, j}
                                    <div class="cateS_check">
                                        <input type="checkbox" name="itemCheck" id="cates_{i + 1}{j}" value={ciName}
                                               bind:group={$personalInfoCategoryData.checkedItemNameList}
                                               on:change={personalInfoCategoryService.handleCheckedItemChange}>
                                        <label for="cates_{i + 1}{j}">
                                            <em></em>
                                            <!-- 암호화 여부의 따라 해당 아이콘 넣어야 될지도? <div class="lockicon"></div>-->
                                            <p class="check">{ciName}</p>
                                        </label>
                                        <!-- 클래스 받은값으로 색변경 -->
                                        <span class="subElement redtext">{categoryName}</span>
                                    </div>
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <div class="sel_cateListBox">
            <div class="sel_cateList">
                {#each $personalInfoCategoryData.checkedItemObjList as {ciName}, i}
                    <div class="sel_cate" id="choseCategory{i}">
                        {ciName}
                        <button on:click={() => personalInfoCategoryService.removeCheckedItem(ciName)}>X</button>
                    </div>
                {/each}
            </div>
            <div class="sel_cateBtnBox">
                <button class="cateResetBtn" on:click={personalInfoCategoryService.resetCheckedItemState}>초기화</button>
                <button class="cateAddBtn" on:click={personalInfoCategoryService.insertItemPop.handleAddItemBtnClick}>오른쪽에 추가</button>
            </div>
        </div>
<!--                    <div class="cateAddInfoBox">-->
<!--                        <div class="cateAddInfo" id="commerce_pop">전자상거래법 적용 대상이세요?</div><br>-->
<!--                        <div class="cateAddInfo" id="create_item_pop">원하시는 개인정보 항목이 없나요?</div>-->
<!--                    </div>-->
    </div>
</div>