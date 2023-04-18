<script>
    import jQuery from "jquery";
    import restapi from "../../../../lib/api.js";
    import {accessToken, is_login} from "../../../../lib/store.js";
    import {push} from "svelte-spa-router";

    export let titleStart;
    export let userTableClick;

    export let tableName;
    export let category_list;

    function test() {
        jQuery(".showcateinBox").addClass("showon");
    }

    function test2() {
        jQuery(".showcateinBox").removeClass("showon");
    }

    let chose_category_list = [];

    // 선택항목 삭제
    function removeColumn(index) {
        console.log(chose_category_list);
        chose_category_list.splice(index, 1);
    }

    function test3(e) {
        if (e.target.checked) {
            let target = e.target.defaultValue.split("_");
            if(target.length === 4) {
                chose_category_list.push({ ccName: target[0], ccSecurity: target[1], categoryName: target[2], textColor: target[3]});
            }
        } else {
            const index = chose_category_list.indexOf(e.target.defaultValue);
            chose_category_list.splice(index, 1);
        }
        console.log(chose_category_list);
    }

    // 초기화 버튼
    function init() {
        console.log("초기화");
        chose_category_list = [];
    }

    // 항목(컬럼) 추가 버튼
    function columnAdd() {
        console.log("항목(컬럼) 추가");

        if(chose_category_list.length !== 0) {
            console.log("추가할 테이블명 : "+tableName);
            console.log("추가할 카테고리 리스트 : "+chose_category_list);

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

</script>

<div class="prPart1_box">
    <div class="prptitle">
        <h2>항목 분류</h2>
        <div class="myAddBtn" id="create_item_pop">나만의 항목 추가</div>
    </div>
    <div class="categorydivision_box">
        <div>
            <div class="cateiBox">
                <div class="cateinput">
                    <input type="text" name="" id="" class="catesea" on:click={test} placeholder="찾고 싶은 항목을 검색해 보세요">
                </div>
                <div class="showcateinBox" on:click={test2}>
                    <div class="showcateinner">
                        <div class="cateS_check">
                            <input type="checkbox" value="1" name="shcate_01" id="shcate_01">
                            <label for="shcate_01">
                                <em></em>
                                <p class="check"><span>주소</span>(시군구)</p>
                            </label>
                        </div>
                        <div class="cateS_check">
                            <input type="checkbox" value="1" name="shcate_02" id="shcate_02">
                            <label for="shcate_02">
                                <em></em>
                                <p class="check"><span>주소</span>(동호수)</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cateListBox">
                <div class="cateScrollBox">
                    <div class="cateScrollInner">
                        <div class="cateS_Items">
                            <ul>
                                {#if category_list.length !== 0}
                                    <li class="cs_tab on_cateS">추가카테고리</li>
                                    <li class="cs_tab">고유식별정보</li>
                                {:else}
                                    <li class="cs_tab on_cateS">고유식별정보</li>
                                {/if}
                                <li class="cs_tab">생체정보</li>
                                <li class="cs_tab">파일</li>
<!--                                <li class="cs_tab">신체정보</li>-->
<!--                                <li class="cs_tab">의료/건강 정보</li>-->
<!--                                <li class="cs_tab">기호/성 정보</li>-->
<!--                                <li class="cs_tab">비밀정보</li>-->
<!--                                <li class="cs_tab">교육정보</li>-->
<!--                                <li class="cs_tab">가족정보</li>-->
<!--                                <li class="cs_tab">신체정보</li>-->
<!--                                <li class="cs_tab">의료/건강 정보</li>-->
<!--                                <li class="cs_tab">기호/성 정보</li>-->
<!--                                <li class="cs_tab">비밀정보</li>-->
<!--                                <li class="cs_tab">교육정보</li>-->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="cateS_checkWrap">
                    <!-- 항목 선택이 없을 시 -->
                    <!--<div class="nonecateS_Box"><p>추가하고 싶은 항목을<br> 선택해 주세요</p></div>-->

                    <div class="cateS_checkBox">

                        {#if category_list.length !== 0}
                            <div class="cateS_checkInner">
                            {#each category_list as category, i}
                                <div class="cateS_check">
                                    <input type="checkbox" id="cates_0{i}" on:change={test3} value="{category.ccName}_{category.ccSecurity}_추가항목_greentext">
                                    <label for="cates_0{i}">
                                        <em></em>
                                        <p class="check">{category.ccName}</p>
                                    </label>
                                    <span class="subElement greentext">추가항목</span>
                                </div>
                            {/each}
                            </div>
                        {/if}


                        <div class="cateS_checkInner" id="defaultField" style="display:none;">
                            <div class="cateS_check">
                                <input type="checkbox" value="주민등록번호_1_고유식별정보_redtext" on:change={test3} id="cates_03">
                                <label for="cates_03">
                                    <em></em>
                                    <p class="check">주민등록번호</p>
                                </label>
                                <span class="subElement redtext">고유식별정보</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="여권번호_1_고유식별정보_redtext" on:change={test3} id="cates_04">
                                <label for="cates_04">
                                    <em></em>
                                    <p class="check">여권번호</p>
                                </label>
                                <span class="subElement redtext">고유식별정보</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="운전면허번호_1_고유식별정보_redtext" on:change={test3} id="cates_05">
                                <label for="cates_05">
                                    <em></em>
                                    <p class="check">운전면허번호</p>
                                </label>
                                <span class="subElement redtext">고유식별정보</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="외국인등록번호_1_고유식별정보_redtext" on:change={test3} id="cates_06">
                                <label for="cates_04">
                                    <em></em>
                                    <p class="check">외국인등록번호</p>
                                </label>
                                <span class="subElement redtext">고유식별정보</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="거소신고번호_1_고유식별정보_redtext" on:change={test3} id="cates_07">
                                <label for="cates_05">
                                    <em></em>
                                    <p class="check">거소신고번호</p>
                                </label>
                                <span class="subElement redtext">고유식별정보</span>
                            </div>
                        </div>


                        <div class="cateS_checkInner" style="display:none;">
                            <div class="cateS_check">
                                <input type="checkbox" value="이름_0_전자상거래법_yeltext" on:change={test3} id="cates_08">
                                <label for="cates_08">
                                    <em></em>
                                    <p class="check">이름</p>
                                </label>
                                <span class="subElement yeltext">전자상거래법</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="휴대전화 번호_1_전자상거래법_yeltext" on:change={test3} id="cates_09">
                                <label for="cates_09">
                                    <em></em>
                                    <p class="check">휴대전화 번호</p>
                                </label>
                                <span class="subElement yeltext">전자상거래법</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="생년월일_0_전자상거래법_yeltext" name="cates_06" on:change={test3} id="cates_10">
                                <label for="cates_10">
                                    <em></em>
                                    <p class="check">생년월일</p>
                                </label>
                                <span class="subElement yeltext">전자상거래법</span>
                            </div>
                        </div>


                        <div class="cateS_checkInner" style="display:none;">
                            <div class="cateS_check">
                                <input type="checkbox" value="사진_1_파일_yeltext" on:change={test3} id="cates_90">
                                <label for="cates_90">
                                    <em></em>
                                    <p class="check">사진</p>
                                </label>
                                <span class="subElement yeltext">파일</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="동영상_1_파일_yeltext" on:change={test3} id="cates_91">
                                <label for="cates_91">
                                    <em></em>
                                    <p class="check">동영상</p>
                                </label>
                                <span class="subElement yeltext">파일</span>
                            </div>
                            <div class="cateS_check">
                                <input type="checkbox" value="기타파일_0_파일_yeltext" on:change={test3} id="cates_92">
                                <label for="cates_92">
                                    <em></em>
                                    <p class="check">기타파일</p>
                                </label>
                                <span class="subElement yeltext">파일</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="sel_cateListBox">
            <div class="sel_cateList">

                {#each chose_category_list as choseCategory, i}
                    <div class="sel_cate" id="choseCategory{i}">
                        {choseCategory}
                        <button on:click={() => removeColumn(i)}>X</button>
                    </div>
                {/each}

<!--                <div class="sel_cate">이름<button></button></div>-->
<!--                <div class="sel_cate">생년월일<button></button></div>-->
<!--                <div class="sel_cate">휴대전화번호<button></button></div>-->
<!--                <div class="sel_cate">주민등록번호<button></button></div>-->
            </div>
            <div class="sel_cateBtnBox">
                <button class="cateResetBtn" on:click={init}>초기화</button>
                <button class="cateAddBtn" on:click={columnAdd}>오른쪽에 추가</button>
            </div>
        </div>
<!--                    <div class="cateAddInfoBox">-->
<!--                        <div class="cateAddInfo" id="commerce_pop">전자상거래법 적용 대상이세요?</div><br>-->
<!--                        <div class="cateAddInfo" id="create_item_pop">원하시는 개인정보 항목이 없나요?</div>-->
<!--                    </div>-->
    </div>
</div>