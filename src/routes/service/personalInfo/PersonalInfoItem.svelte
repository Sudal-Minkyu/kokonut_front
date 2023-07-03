<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import PersonalInfoCategory from "../../../components/service/environment/personalInfo/PersonalInfoCategory.svelte"
    import PersonalInfoTable from "../../../components/service/environment/personalInfo/PersonalInfoTable.svelte"
    import PersonalInfoCreateItemPop
        from "../../../components/service/environment/personalInfo/PersonalInfoCreateItemPop.svelte";
    import PersonalInfoAddTabPop
        from "../../../components/service/environment/personalInfo/PersonalInfoAddTabPop.svelte";

    import { onMount } from 'svelte'
    import {link, push} from 'svelte-spa-router'
    import { fade } from 'svelte/transition'

    import jQuery from "jquery";
    import restapi from "../../../lib/api.js";
    import {backBtn, personalInfoCategoryData, personalInfoTableData} from '../../../lib/store.js'
    import PersonalInfoRemoveColumnPop
        from "../../../components/service/environment/personalInfo/PersonalInfoRemoveColumnPop.svelte";
    import PersonalInfoInsertItemPop
        from "../../../components/service/environment/personalInfo/PersonalInfoInsertItemPop.svelte";
    import PersonalInfoEditItemPop
        from "../../../components/service/environment/personalInfo/PersonalInfoEditItemPop.svelte";
    import {openAsk, openBanner} from "../../../components/common/ui/DialogManager.js";
    import {ajaxBody, ajaxGet, ajaxParam} from "../../../components/common/ajax.js";
    import {logout} from "../../../components/common/authActions.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";

    const personalInfoItemProp = {
        loadState: 0,
        currentSelectedTab: '',
        setCurrentSelectedTab(tabName) {
            personalInfoItemProp.currentSelectedTab = tabName;
        },
        getTableColumnList(tableName) {
            let sendData = {
                tableName
            }
            ajaxGet('/v2/api/DynamicUser/tableColumnCall', sendData, (json_success) => {
                personalInfoItemProp.setCurrentSelectedTab(tableName);
                personalInfoTableData.update(obj => {
                    obj.columnList = json_success.data.sendData.fieldList;
                    return obj;
                });
                console.log('탭정보', $personalInfoTableData.columnList);
                personalInfoItemProp.loadState = 1;
            });
        },
    }

    const personalInfoCategoryService = {
        checkCiNameExistInAddItemList(targetCiName) {
            const chkFromAddItem = $personalInfoCategoryData.addItemList.filter(item => item.ciName === targetCiName).length;
            let chkFromBasicItem = 0;
            for (const {categoryItemListDtoList} of $personalInfoCategoryData.basicCategoryList) {
                chkFromBasicItem += categoryItemListDtoList.filter(item => item.ciName === targetCiName).length;
            }
            return chkFromAddItem || chkFromBasicItem;
        },
        createItemPop: {
            show() {
                personalInfoCategoryData.update(obj => {
                    obj.createItemPop.visible = true;
                    return obj;
                });
            },
            hide() {
                personalInfoCategoryData.update(obj => {
                    console.log(obj);
                    obj.createItemPop.visible = false;
                    return obj;
                });
            },
            initInputData() {
                personalInfoCategoryData.update(obj => {
                    obj.createItemPop.ciNameErrorMsg = '';
                    obj.createItemPop.inputData = {
                        ciName: '',
                        ciSecurity: '0',
                    }
                    return obj;
                });
            },
            handleCreateItemClick() {
                const addItemName = $personalInfoCategoryData.createItemPop.inputData.ciName;

                const isAlreadyExist = personalInfoCategoryService.checkCiNameExistInAddItemList(addItemName);

                if (isAlreadyExist) {
                    personalInfoCategoryData.update(obj => {
                        obj.createItemPop.ciNameErrorMsg = '이미 존재하는 항목명 입니다.';
                        return obj;
                    });
                } else  if (!addItemName) {
                    personalInfoCategoryData.update(obj => {
                        obj.createItemPop.ciNameErrorMsg = '항목명을 입력해 주세요.';
                        return obj;
                    });
                } else {
                    personalInfoCategoryService.createItemPop.sendCreateItem();
                }
            },
            sendCreateItem() {
                restapi('v2', 'post', '/v2/api/Company/saveItem', "param", $personalInfoCategoryData.createItemPop.inputData, 'application/json',
                    (json_success) => {
                        if (json_success.data.status === 200) {
                            personalInfoCategoryService.getAdditionalItemList();
                            openBanner("선택한 항목을 추가하였습니다.");
                        } else if (json_success.data.err_code === 'KO087') {
                            alert('이미 등록되어 있는 항목입니다.');
                        }
                        personalInfoCategoryService.createItemPop.initInputData();
                        personalInfoCategoryService.createItemPop.hide();
                    },
                    (json_error) => {
                        console.log('아이템 추가 실패', json_error);
                    }
                );
            },
        },
        editItemPop: {
            show(index) {
                personalInfoCategoryData.update(obj => {
                    obj.editItemPop.visible = true;
                    obj.editItemPop.inputData.ciId = obj.addItemList[index].ciId;
                    obj.editItemPop.inputData.ciName = obj.addItemList[index].ciName;
                    obj.editItemPop.currentMode = 'modify';
                    obj.editItemPop.checkPreCautionAgree = false;
                    obj.editItemPop.cautionAgreeErrorMsg = '';
                    obj.editItemPop.ciNameErrorMsg = '';
                    return obj;
                });
            },
            hide() {
                personalInfoCategoryData.update(obj => {
                    obj.editItemPop.visible = false;
                    return obj;
                });
            },
            handleSelectMode(modeName) {
                personalInfoCategoryData.update(obj => {
                    obj.editItemPop.currentMode = modeName;
                    return obj;
                });
            },
            handleCommitAction() {
                if ($personalInfoCategoryData.editItemPop.currentMode === 'modify') {

                    // 입력중인 이름의 중복검사
                    const addItemName = $personalInfoCategoryData.editItemPop.inputData.ciName;
                    const isAlreadyExist = personalInfoCategoryService.checkCiNameExistInAddItemList(addItemName);
                    if (isAlreadyExist) {
                        personalInfoCategoryData.update(obj => {
                            obj.editItemPop.ciNameErrorMsg = '이미 존재하는 항목명 입니다.';
                            return obj;
                        });
                    } else  if (!addItemName) {
                        personalInfoCategoryData.update(obj => {
                            obj.editItemPop.ciNameErrorMsg = '항목명을 입력해 주세요.';
                            return obj;
                        });
                    } else {
                        personalInfoCategoryData.update(obj => {
                            obj.editItemPop.ciNameErrorMsg = '';
                            return obj;
                        });
                        personalInfoCategoryService.editItemPop.sendUpdateItem();
                    }

                } else if ($personalInfoCategoryData.editItemPop.currentMode === 'delete') {

                    if (!$personalInfoCategoryData.editItemPop.checkPreCautionAgree) {
                        personalInfoCategoryData.update(obj => {
                            obj.editItemPop.cautionAgreeErrorMsg = '주의사항을 읽고 동의를 해주세요.';
                            return obj;
                        });
                    } else {
                        personalInfoCategoryData.update(obj => {
                            obj.editItemPop.cautionAgreeErrorMsg = '';
                            return obj;
                        });
                        personalInfoCategoryService.editItemPop.sendDeleteItem();
                    }

                }
            },
            sendUpdateItem() {
                const sendData = {
                    ciId: $personalInfoCategoryData.editItemPop.inputData.ciId,
                    ciName: $personalInfoCategoryData.editItemPop.inputData.ciName,
                }

                restapi('v2', 'post', "/v2/api/Company/updateItem", "param", sendData, 'application/json',
                    (json_success) => {
                        if (json_success.data.status === 200) {
                            personalInfoCategoryService.getAdditionalItemList();
                            personalInfoCategoryService.editItemPop.hide();
                            openBanner("선택한 항목명을 수정하였습니다.");
                        } else {
                            // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                            // alert(json_success.data.err_msg);
                            // logout();
                        }
                    },
                    (json_error) => {
                        console.log(json_error);
                        console.log("카테고리(컬럼) 추가 호출 실패");
                    }
                );
            },
            sendDeleteItem() {
                let sendData = {
                    ciId: $personalInfoCategoryData.editItemPop.inputData.ciId,
                }
                ajaxParam('/v2/api/Company/deleteItem', sendData, (json_success) => {
                    personalInfoCategoryService.getAdditionalItemList();
                    personalInfoCategoryService.editItemPop.hide();
                    openBanner("선택한 항목을 삭제하였습니다.");
                });
            }
        },
        insertItemPop: {
            show() {
                personalInfoCategoryData.update(obj => {
                    obj.insertItemPop.visible = true;
                    return obj;
                });
            },
            hide() {
                personalInfoCategoryData.update(obj => {
                    obj.insertItemPop.visible = false;
                    return obj;
                });
            },
            handleAddItemBtnClick() {
                if ($personalInfoCategoryData.checkedItemObjList.length !== 0) {
                    openAsk({
                        callback: personalInfoCategoryService.insertItemPop.addItemListToTable, // 확인버튼시 동작
                        icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: '선택 항목 등록 확인', // 제목
                        contents1: '선택하신 항목을', // 내용
                        contents2: '등록 하시겠습니까?',
                        btnStart: '확인', // 실행 버튼의 텍스트
                        btnCancel: '취소', // 취소 버튼의 텍스트
                    })
                } else {
                    openBanner("추가할 항목을 선택해주세요.");
                }
            },
            addItemListToTable() {
                let sendData = {
                    tableName: personalInfoItemProp.currentSelectedTab,
                    kokonutAddColumnListDtos: $personalInfoCategoryData.checkedItemObjList
                }

                ajaxBody('/v2/api/DynamicUser/tableColumnAdd', sendData, (json_success) => {
                    openBanner("선택한 항목을 추가하였습니다.");

                    personalInfoItemProp.getTableColumnList(personalInfoItemProp.currentSelectedTab);
                    personalInfoCategoryService.resetCheckedItemState();
                });
            },
        },
        autoCompleteBox: {
            show() {
                personalInfoCategoryData.update(obj => {
                    obj.autoCompleteBox.visible = true;
                    return obj;
                });
            },
            hide() {
                personalInfoCategoryData.update(obj => {
                    obj.autoCompleteBox.visible = false;
                    obj.autoCompleteBox.searchResultItemList = [];
                    return obj;
                });
            },
            handleAutocompleteSearchTextChange() {
                let result = [];
                if ($personalInfoCategoryData.autoCompleteBox.searchInputText) {
                    // 추가카테고리 항목에서 이름이 일치하는 항목이 있을 경우 반환
                    result.push(...$personalInfoCategoryData.addItemList.filter(item => item.ciName.includes($personalInfoCategoryData.autoCompleteBox.searchInputText)));
                    // 기본 제공 항목들에게서 이름이 일치하는 항목이 있을 경우 반환
                    for (const {categoryItemListDtoList} of $personalInfoCategoryData.basicCategoryList) {
                        result.push(...categoryItemListDtoList.filter(item => item.ciName.includes($personalInfoCategoryData.autoCompleteBox.searchInputText)));
                    }
                    if (result.length) {
                        personalInfoCategoryService.autoCompleteBox.show();
                        personalInfoCategoryData.update(obj => {
                            obj.autoCompleteBox.usedSearchText = $personalInfoCategoryData.autoCompleteBox.searchInputText;
                            return obj;
                        });
                    } else {
                        result = $personalInfoCategoryData.autoCompleteBox.searchResultItemList;
                    }
                } else {
                    personalInfoCategoryService.autoCompleteBox.hide();
                }
                personalInfoCategoryData.update(obj => {
                    obj.autoCompleteBox.searchResultItemList = result;
                    return obj;
                });
            },
        },
        handleCheckedItemChange(e) {
            if (e.target.checked) {
                personalInfoCategoryData.update(obj => {
                    let itemsFromBasicCategoryList = [];
                    for (const {categoryItemListDtoList} of obj.basicCategoryList) {
                        itemsFromBasicCategoryList = [
                            ...itemsFromBasicCategoryList,
                            ...categoryItemListDtoList.filter(item => item.ciName === e.target.value)
                        ];
                    }
                    obj.checkedItemObjList = [
                        ...obj.checkedItemObjList,
                        ...obj.addItemList.filter(item => item.ciName === e.target.value),
                        ...itemsFromBasicCategoryList,
                    ];
                    console.log(obj.checkedItemObjList);
                    return obj;
                });
            } else {
                personalInfoCategoryData.update(obj => {
                    obj.checkedItemObjList = obj.checkedItemObjList.filter(item => item.ciName !== e.target.value);
                    console.log('체크된 아이템 오브젝트', obj.checkedItemObjList);
                    console.log('체크된 아이템 이름리스트', obj.checkedItemNameList);
                    return obj;
                });
            }
        },
        resetCheckedItemState() {
            personalInfoCategoryData.update(obj => {
                obj.checkedItemNameList = [];
                obj.checkedItemObjList = [];
                return obj;
            });
        },
        removeCheckedItem(ciName) {
            personalInfoCategoryData.update(obj => {
                obj.checkedItemNameList = obj.checkedItemNameList.filter(itemName => itemName !== ciName);
                obj.checkedItemObjList = obj.checkedItemObjList.filter(item => item.ciName !== ciName);
                return obj;
            });
        },
        getAdditionalItemList() {
            ajaxGet('/v2/api/Company/addItemList', false, (json_success) => {
                personalInfoCategoryData.update(obj => {
                    obj.addItemList = json_success.data.sendData.itemList.map((innerObj) => {
                        return {...innerObj, categoryName: '추가항목', textColor: 'greentext'};
                    });
                    return obj;
                });
                console.log('추가 카테고리 리스트', $personalInfoCategoryData.addItemList);

                if($personalInfoCategoryData.addItemList.length === 0) {
                    jQuery("#defaultField").css("display", "block");
                }
            });
        },
        getBasicCategoryList() {
            ajaxGet('/v2/api/Company/categoryList', false, (res) => {
                personalInfoCategoryData.update(obj => {
                    obj.basicCategoryList = res.data.sendData.defaultCategoryList;
                    for (const itemCategory of obj.basicCategoryList) {
                        itemCategory.categoryItemListDtoList = itemCategory.categoryItemListDtoList.map((itemObj) => {
                            return {...itemObj, ciName: itemObj.cddName, ciSecurity: itemObj.cddSecurity,
                                categoryName: itemObj.cddSubName, textColor: itemObj.cddClassName,
                                combinedValue: `${itemObj.cddName}_${itemObj.cddSecurity}_${itemObj.cddSubName}_${itemObj.cddClassName}`,
                            };
                        });
                    }
                    return obj;
                });
                console.log('기본 카테고리 리스트', $personalInfoCategoryData.basicCategoryList);
            });
        },
    };

    const personalInfoTableService = {
        addTabPop: {
            show() {
                personalInfoTableData.update(obj => {
                    obj.addTabPop.visible = true;
                    return obj;
                });
            },
            hide() {
                personalInfoTableData.update(obj => {
                    obj.addTabPop.visible = false;
                    return obj;
                });
            },
            initInput() {
                personalInfoTableData.update(obj => {
                    obj.addTabPop.inputData = {
                        ctDesignation: '',
                    }
                    return obj;
                });
            },
            sendAddTab() {
                restapi('v2', 'post', '/v2/api/Company/userTableSave', "param", $personalInfoTableData.addTabPop.inputData, 'application/json',
                    (json_success) => {
                        console.log('아이템 추가 성공', json_success);
                        if(json_success.data.status === 200) {
                            personalInfoTableService.getUserTableList();
                        } else if (json_success.data.err_code === 'KO088') {
                            alert('이미 등록되어 있는 테이블 명입니다.');
                        }
                        personalInfoTableService.addTabPop.hide();
                        personalInfoTableService.addTabPop.initInput();
                    },
                    (json_error) => {
                        console.log('아이템 추가 실패', json_error);
                        personalInfoTableService.addTabPop.hide();
                        personalInfoTableService.addTabPop.initInput();
                    }
                );
            },
            handleClosePop() {
                personalInfoTableService.addTabPop.hide();
                personalInfoTableService.addTabPop.initInput();
            },
        },
        removeColumnPop: {
            show() {
                personalInfoTableData.update(obj => {
                    if (obj.checkedColumnNameList.length) {
                        obj.removeColumnPop.visible = true;
                    } else {
                        // 먼저 삭제할 개인정보 항목을 선택해 달라는 팝업 추가
                    }
                    return obj;
                });
            },
            hide() {
                personalInfoTableData.update(obj => {
                    personalInfoTableService.removeColumnPop.initInput();
                    obj.removeColumnPop.visible = false;
                    return obj;
                });
            },
            initInput() {
                personalInfoTableData.update(obj => {
                    obj.removeColumnPop = {
                        ...obj.removeColumnPop,
                        otpValue: '',
                        checkPreCautionAgree: false,
                    };
                    return obj;
                });
            },
            removeUserTableColumnByColumnNameList() {
                personalInfoTableData.update(obj => {
                    obj.removeColumnPop.otpErrorMsg = '';
                    obj.removeColumnPop.cautionAgreeErrorMsg = '';
                    return obj;
                });
                if ($personalInfoTableData.removeColumnPop.otpValue.length !== 6) {
                    personalInfoTableData.update(obj => {
                        obj.removeColumnPop.otpErrorMsg = 'OTP 6자리를 입력해 주세요.';
                        return obj;
                    });
                }
                if (!$personalInfoTableData.removeColumnPop.checkPreCautionAgree) {
                    // 삭제팝업 주의사항 하단에 주의사항 확인 체크 요청
                    personalInfoTableData.update(obj => {
                        obj.removeColumnPop.cautionAgreeErrorMsg = '주의사항을 확인하시고 체크해 주세요.';
                        return obj;
                    });
                }
                if($personalInfoTableData.removeColumnPop.cautionAgreeErrorMsg || $personalInfoTableData.removeColumnPop.otpErrorMsg) {
                    return;
                }

                const targetData = {
                    otpValue: $personalInfoTableData.removeColumnPop.otpValue,
                    tableName: personalInfoItemProp.currentSelectedTab,
                    fieldNames: $personalInfoTableData.checkedColumnNameList
                };
                console.log(targetData);
                restapi('v2', 'post', '/v2/api/DynamicUser/tableColumnDelete', 'body', targetData, 'application/json',
                    (json_success) => {
                        if(json_success.data.status === 200) {
                            personalInfoTableService.removeColumnPop.hide();
                            openBanner('선택하신 개인정보 항목을 삭제하였습니다.');
                            personalInfoItemProp.getTableColumnList(targetData.tableName);
                        } else {
                            // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                            alert(json_success.data.err_msg);
                            logout();
                        }
                    },
                    (json_error) => {
                        console.log(json_error);
                        console.log('회사의 테이블리스트 호출 실패');
                    }
                )
            },
        },
        handleColumnChecked() {
            personalInfoTableData.update(obj => {
                // bind를 통해 checkedColumnList 에 이름이 모이고, 체크된 컬럼이 담긴다.
                obj.checkedColumnObjList = obj.columnList.filter(colObj => obj.checkedColumnNameList.includes(colObj.fieldName));
                // 삭제창에 보여줄 대상 컬럼에 대한 문자열
                let generateStringGround = '';
                for (const [i, colObj] of obj.checkedColumnObjList.entries()) {
                    generateStringGround += (i ? ', ' : '') + colObj.fieldComment;
                }
                obj.checkedColumnTitleString = generateStringGround;
                return obj;
            });
        },
        getUserTableList() {
            ajaxGet('/v2/api/Company/userTableList', false, (json_success) => {
                personalInfoTableData.update(obj => {
                    obj.userTableData = json_success.data.sendData.companyTableList;
                    return obj;
                });
                if($personalInfoTableData.userTableData.length !== 0) {
                    personalInfoItemProp.setCurrentSelectedTab($personalInfoTableData.userTableData[0].ctName);
                    personalInfoItemProp.getTableColumnList(personalInfoItemProp.currentSelectedTab);
                }
            });
        },
    };

    // 사용자 추가카테고리 확인
    onMount(async ()=>{
        await personalInfoCategoryService.getAdditionalItemList();
        await personalInfoCategoryService.getBasicCategoryList()
        await personalInfoTableService.getUserTableList();
    });

    jQuery(function(){
        // 항목분류 탭메뉴 스크립트
        jQuery(document.body).on('click','.cs_tab', function() {
            const inx = jQuery(this).parent().parent().find('.cs_tab').index(this);
            const arr_firstrows = jQuery(this).parent().parent().find('.cs_tab');
            arr_firstrows.removeClass('on_cateS');
            jQuery(this).addClass('on_cateS');
            jQuery(this).parent().parent().parent().parent().parent().find('.cateS_checkBox > div').hide();
            jQuery(this).parent().parent().parent().parent().parent().find('.cateS_checkBox > div:nth-child('+ (inx+1) +')').show();
        });
        // 개인정보항목 탭메뉴 스크립트
        jQuery(document.body).on('click','.bo_tab', function() {
            // const inx = jQuery(this).parent().parent().find('.bo_tab').index(this);
            const arr_firstrows = jQuery(this).parent().parent().find('.bo_tab');
            arr_firstrows.removeClass('on_bo');
            jQuery(this).addClass('on_bo');
            // jQuery(this).parent().parent().parent().parent().parent().find('.bo_tabContentBox > div').hide();
            // jQuery(this).parent().parent().parent().parent().parent().find('.bo_tabContentBox > div:nth-child('+ (inx+1) +')').show();
        });
    });
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB70">
            <a use:link href="/service/environment">{$backBtn}</a>
            <h1>개인정보 항목 관리</h1>
        </div>

        <LoadingOverlay bind:loadState={personalInfoItemProp.loadState} >
            <div class="prDivideBox" in:fade>
                <PersonalInfoCategory {personalInfoCategoryService} />
                <PersonalInfoTable {personalInfoItemProp} {personalInfoTableService} />
            </div>
        </LoadingOverlay>
    </div>
</section>


{#if $personalInfoCategoryData.createItemPop.visible}
    <PersonalInfoCreateItemPop {personalInfoCategoryService} />
{/if}

{#if $personalInfoCategoryData.editItemPop.visible}
    <PersonalInfoEditItemPop {personalInfoCategoryService} />
{/if}

{#if $personalInfoCategoryData.insertItemPop.visible}
    <PersonalInfoInsertItemPop {personalInfoCategoryService} />
{/if}

{#if $personalInfoTableData.addTabPop.visible}
    <PersonalInfoAddTabPop {personalInfoTableService} />
{/if}

{#if $personalInfoTableData.removeColumnPop.visible}
    <PersonalInfoRemoveColumnPop {personalInfoTableService} />
{/if}


<!-- [D] 전자상거래 적용 대상 팝업 -->
<!--<div class="koko_popup commerce_pop" data-popup="commerce_pop" style="display:block;">-->
<!--    <div class="koko_popup_inner">-->
<!--        <div class="koko_popup_container">-->
<!--            <div class="koko_popup_titleh4">-->
<!--                <h4 class="">-->
<!--                    <span>전자상거래법 적용 대상</span> 이신가요?-->
<!--                </h4>-->
<!--            </div>-->
<!--            <form>-->
<!--                <div class="popcaseInfoBoxType02">-->
<!--                    <dl>-->
<!--                        정보주체(고객)의 개인정보 파기 이후에도 일정 기간 거래기록을 보존해야 하는 사업자는 체크박스에 체크해주세요. 이 경우 최소한의 개인정보 식별을 위한 <span>이름, 생년월일, 휴대전화번호를 필수로 등록</span>하게 됩니다.-->
<!--                    </dl>-->
<!--                </div>-->
<!--                <div class="popRadioBox">-->
<!--                    <div class="check popRadioType02">-->
<!--                        <input type="radio" class="radio" name="commerce_yesno" id="commerce_yes" value="commerce_yes">-->
<!--                        <label for="commerce_yes"><em><dt></dt></em><p class="ox_o"></p><span class="colgr">네,</span> 전자상거래법 적용 대상입니다.</label>-->
<!--                    </div>-->
<!--                    <div class="check popRadioType02">-->
<!--                        <input type="radio" class="radio" name="commerce_yesno" id="commerce_no" value="commerce_no">-->
<!--                        <label for="commerce_no"><em><dt></dt></em><p class="ox_x"></p><span class="colred">아니요,</span> 이 팝업을 1년간 안 보이게 해주세요.</label>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="kokopopBtnBox">-->
<!--                    <div class="koko_go"><button type="submit">확인</button></div>-->
<!--                </div>-->
<!--            </form>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->