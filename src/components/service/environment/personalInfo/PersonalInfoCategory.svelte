<script>
    import restapi from "../../../../lib/api.js";
    import AutoCompleteBox from "./AutoCompleteBox.svelte";

    export let titleStart;
    export let userTableClick;

    export let tableName;
    export let category_list;
    let checkedCategoryList = [];
    export let item_list_additional;

    let autocompleteSearchText = '';
    let chose_category_list = [];

    // 선택항목을 삭제하고 체크 상태를 반영한다.
    function removeSelectedCategoryList(index) {
        chose_category_list.splice(index, 1);
        chose_category_list = [...chose_category_list];
        checkedCategoryList.splice(index, 1);
        checkedCategoryList = [...checkedCategoryList];
    }

    function resetCategoryList() {
        chose_category_list = [];
        checkedCategoryList = [];
    }

    function addSelectedItemsToTable(e) {

        console.log(checkedCategoryList);
        if (e.target.checked) {
            let target = e.target.defaultValue.split("_");
            if(target.length === 4) {
                // chose_category_list.push({ ciName: target[0], ciSecurity: target[1], categoryName: target[2], textColor: target[3]});

                chose_category_list = [...chose_category_list, { ciName: target[0], ciSecurity: target[1], categoryName: target[2], textColor: target[3]}];
            }
        } else {
            const index = chose_category_list.indexOf(e.target.defaultValue);
            chose_category_list.splice(index, 1);
            chose_category_list = [...chose_category_list];
        }
    }

    // 항목(컬럼) 추가 버튼
    function columnAdd() {

        if(chose_category_list.length !== 0) {

            let url = "/v2/api/DynamicUser/tableColumnAdd";

            let sendData = {
                tableName : tableName,
                kokonutAddColumnListDtos : chose_category_list
            }

            restapi('v2', 'post', url, "body", sendData, 'application/json',
                (json_success) => {
                    console.log(json_success);
                    if(json_success.data.status === 200) {
                        titleStart("선택한 항목을 추가하였습니다.");
                        // init();

                        // tableName = clickTable;
                        // field_list = json_success.data.sendData.fieldList;
                        // personallInfoLayout = 1;

                        userTableClick(tableName);
                        resetCategoryList();
                    } else {
                        // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                        // alert(json_success.data.err_msg);
                        // is_login.set(false);
                        // accessToken.set("");
                        // push('/login');
                    }
                },
                (json_error) => {
                    console.log(json_error);
                    console.log("카테고리(컬럼) 추가 호출 실패");
                }
            )
        } else {
            titleStart("추가할 항목을 선택해주세요.");
        }
    }

    document.addEventListener('mouseup', (e) => {
        const parent = e.target.closest('.showcateinBox') || e.target.closest('.cateiBox');
        if (!parent) {
            autoCompleteBoxController.hide();
        }
    });

    const autoCompleteBoxController = {
        visible: false,
        searchResultItemList: [],
        usedSearchText: '',
        show() {
            autoCompleteBoxController.visible = true;
        },
        hide() {
            autoCompleteBoxController.visible = false;
            autoCompleteBoxController.searchResultItemList = [];
        },
        handleAutocompleteSearchTextChange(searchText) {
            console.log('catList', category_list);
            console.log('itmList', item_list_additional);

            let result = [];
            if (searchText) {
                // 기본 제공 항목들에게서 이름이 일치하는 항목이 있을 경우 반환
                for (const {categoryItemListDtoList} of category_list) {
                    result.push(...categoryItemListDtoList.filter(item => item.cddName.includes(searchText)));
                }
                if (result.length) {
                    autoCompleteBoxController.show();
                    autoCompleteBoxController.usedSearchText = searchText;
                } else {
                    result = autoCompleteBoxController.searchResultItemList;
                }
            } else {
                autoCompleteBoxController.hide();
            }

            return result;
        },
        handleCheckedItemChange(e) {
            if (e.target.checked) {
                checkedCategoryList = [...checkedCategoryList, e.target.value];
            } else {
                checkedCategoryList = [...checkedCategoryList.filter(v => v !== e.target.value)];
            }
            addSelectedItemsToTable(e);
            console.log('event', e);
        },
    }
    $: autoCompleteBoxController.searchResultItemList = autoCompleteBoxController.handleAutocompleteSearchTextChange(autocompleteSearchText);

    export let createItemPopController;
</script>

<div class="prPart1_box">
    <div class="prptitle">
        <h2>항목 분류</h2>
        <div class="myAddBtn" on:click={createItemPopController.show}>나만의 항목 추가</div>
    </div>
    <div class="categorydivision_box">
        <div>
            <div class="cateiBox">
                <div class="cateinput">
                    <input type="text" bind:value={autocompleteSearchText} class="catesea" placeholder="찾고 싶은 항목을 검색해 보세요">
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <AutoCompleteBox {autoCompleteBoxController} {addSelectedItemsToTable} />
            </div>

            <div class="cateListBox">
                <div class="cateScrollBox">
                    <div class="cateScrollInner">
                        <div class="cateS_Items">
                            <ul>
                                {#if item_list_additional.length}
                                    <li class="cs_tab on_cateS">추가카테고리</li>
                                {/if}
                                {#each category_list as {cdName}, i}
                                    {#if !item_list_additional.length && i === 0 }
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

                        {#if item_list_additional.length}
                            <div class="cateS_checkInner">
                                {#each item_list_additional as category, i}
                                    <div class="cateS_check">
                                        <input type="checkbox" id="cates_0{i}" bind:group={checkedCategoryList} on:change={addSelectedItemsToTable} value="{category.ciName}_{category.ciSecurity}_추가항목_greentext">
                                        <label for="cates_0{i}">
                                            <em></em>
                                            <p class="check">{category.ciName}</p>
                                        </label>
                                        <span class="subElement greentext">추가항목</span>
                                    </div>
                                {/each}
                            </div>
                        {/if}

                        {#each category_list as {cdName, categoryItemListDtoList}, i}
                            <div class="cateS_checkInner" style="display:none;">
                                {#each categoryItemListDtoList as {cddName, cddSubName, combinedValue}, j}
                                    <div class="cateS_check">
                                        <input type="checkbox" bind:group={checkedCategoryList} value={combinedValue} on:change={addSelectedItemsToTable} id="cates_{i + 1}{j}">
                                        <label for="cates_{i + 1}{j}">
                                            <em></em>
                                            <p class="check">{cddName}</p>
                                        </label>
                                        <span class="subElement redtext">{cddSubName}</span>
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
                {#each chose_category_list as {ciName}, i}
                    <div class="sel_cate" id="choseCategory{i}">
                        {ciName}
                        <button on:click={() => removeSelectedCategoryList(i)}>X</button>
                    </div>
                {/each}
            </div>
            <div class="sel_cateBtnBox">
                <button class="cateResetBtn" on:click={resetCategoryList}>초기화</button>
                <button class="cateAddBtn" on:click={columnAdd}>오른쪽에 추가</button>
            </div>
        </div>
<!--                    <div class="cateAddInfoBox">-->
<!--                        <div class="cateAddInfo" id="commerce_pop">전자상거래법 적용 대상이세요?</div><br>-->
<!--                        <div class="cateAddInfo" id="create_item_pop">원하시는 개인정보 항목이 없나요?</div>-->
<!--                    </div>-->
    </div>
</div>