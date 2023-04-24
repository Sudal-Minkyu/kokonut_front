<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"

    import PersonalInfoCategory from "../../../components/service/environment/personalInfo/PersonalInfoCategory.svelte"
    import PersonalInfoTable from "../../../components/service/environment/personalInfo/PersonalInfoTable.svelte"
    import TitleAlarm from '../../../components/common/TitleAlarm.svelte'

    import {link, push} from 'svelte-spa-router'
    import { fade } from 'svelte/transition'

    import {accessToken, backBtn, is_login, personalInfoCategoryData, personalInfoTableData} from '../../../lib/store.js'
    import jQuery from "jquery";

    import { onMount } from 'svelte'
    import restapi from "../../../lib/api.js";
    import PersonalInfoCreateItemPop
        from "../../../components/service/environment/personalInfo/PersonalInfoCreateItemPop.svelte";
    import PersonalInfoAddTabPop
        from "../../../components/service/environment/personalInfo/PersonalInfoAddTabPop.svelte";

    // 사용자 추가카테고리 확인
    onMount(async ()=>{
        await addItemList();
        await basicCategoryList();
        await userTableList();
    })

    let personallInfoLayout = 0;

    // 회사의 추가 카테고리항목 호출 함수
    function addItemList() {

        let url = "/v2/api/Company/addItemList";

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    console.log('추가', json_success);
                    personalInfoCategoryData.update(obj => {
                        obj.addItemList = json_success.data.sendData.itemList;
                        return obj;
                    });
                    console.log('추가 카테고리 리스트', $personalInfoCategoryData.addItemList);

                    if($personalInfoCategoryData.addItemList.length === 0) {
                        jQuery("#defaultField").css("display","block");
                    }
                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    is_login.set(false);
                    accessToken.set("");
                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("추가 카테고리항목 호출 실패");
            }
        )
    }

    let category_list;
    // 기본으로 제공되는 카테고리 항목
    function basicCategoryList() {
        restapi('v2', 'get', '/v2/api/Company/categoryList', '', {}, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    personalInfoCategoryData.update(obj => {
                        obj.basicCategoryList = json_success.data.sendData.defaultCategoryList;
                        for (const {categoryItemListDtoList} of obj.basicCategoryList) {
                            for (const item of categoryItemListDtoList) {
                                item.combinedValue =
                                    `${item.cddName}_${item.cddSecurity}_${item.cddSubName}_${item.cddClassName}`;
                            }
                        }
                        return obj;
                    });
                    console.log('기본 카테고리 리스트', $personalInfoCategoryData.basicCategoryList);
                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    is_login.set(false);
                    accessToken.set("");
                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("추가 카테고리항목 호출 실패");
            }
        )
    }

    let tableName= ""; // 테이블명
    let column_list = []; // 컬럼리스트

    // 회사의 테이블리스트 호출 함수
    function userTableList() {

        let url = "/v2/api/Company/userTableList";

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    personalInfoTableData.update(obj => {
                        obj.userTableData = json_success.data.sendData.companyTableList;
                        return obj;
                    });
                    if($personalInfoTableData.userTableData.length !== 0) {
                        tableName = $personalInfoTableData.userTableData[0].ctName;

                        userTableClick(tableName);
                    }
                    // personallInfoLayout = 1;
                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    is_login.set(false);
                    accessToken.set("");
                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("회사의 테이블리스트 호출 실패");
            }
        )
    }

    // 테이블 클릭 -> 클릭한 테이블의 컬럼 호출 함수
    function userTableClick(clickTable) {

        let url = "/v2/api/DynamicUser/tableColumnCall";

        let sendData = {
            tableName : clickTable
        }

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    tableName = clickTable;
                    column_list = json_success.data.sendData.fieldList;
                    personallInfoLayout = 1;
                } else {
                    // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                    alert(json_success.data.err_msg);
                    is_login.set(false);
                    accessToken.set("");
                    push('/login');
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("테이블컬럼 리스트 호출 실패");
            }
        )
    }

    let titleMessage = "";
    let titleClick = false;
    function titleStart(message) {
        titleMessage = message;
        titleClick = true;
        setTimeout(() => {
            if(titleClick) {
                titleClick = false;
            }
        }, 1000)
    }

    const createItemPopController = {
        visible: false,
        show() {
            createItemPopController.visible = true;
        },
        hide() {
            createItemPopController.visible = false;
        },
    }

    const addTabPopController = {
        visible: false,
        show() {
            addTabPopController.visible = true;
        },
        hide() {
            addTabPopController.visible = false;
        },
    }

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

            const inx = jQuery(this).parent().parent().find('.bo_tab').index(this);

            const arr_firstrows = jQuery(this).parent().parent().find('.bo_tab');
            arr_firstrows.removeClass('on_bo');
            jQuery(this).addClass('on_bo');

            jQuery(this).parent().parent().parent().parent().parent().find('.bo_tabContentBox > div').hide();
            jQuery(this).parent().parent().parent().parent().parent().find('.bo_tabContentBox > div:nth-child('+ (inx+1) +')').show();
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

        <TitleAlarm {titleMessage} {titleClick} />

        {#if personallInfoLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else}
            <div class="prDivideBox" in:fade>
                <PersonalInfoCategory {userTableClick} {titleStart} {tableName} {createItemPopController}/>
                <PersonalInfoTable {userTableClick} {userTableList} {tableName} {column_list} {addTabPopController}/>
            </div>
        {/if}

    </div>
</section>


{#if $personalInfoCategoryData.createItemPop.visible}
    <PersonalInfoCreateItemPop {addItemList} />
{/if}

{#if addTabPopController.visible}
    <PersonalInfoAddTabPop {addTabPopController} {userTableList} />
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