
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import PolicyTable from "../../../components/service/policy/PolicyTable.svelte";
    import { link } from 'svelte-spa-router'
    import { page } from '../../../lib/store.js'
    import { fade } from 'svelte/transition'

    import {setCustomSelectBox, setDateRangePicker, setOptionItem, stimeVal} from "../../../lib/libSearch.js";
    import {onMount} from "svelte";
    import Paging from "../../../components/common/Paging.svelte";
    import restapi from "../../../lib/api.js";
    import jQuery from "jquery";

    onMount(async ()=>{
        await fatchSearchModule();

        // 페이지번호 초기화
        page.set(0);
        policyList($page);
    })

    async function fatchSearchModule(){
        setDateRangePicker('stime', true, 'period');
        setCustomSelectBox();
        setOptionItem(customSelectBoxOpt);
    }

    let customSelectBoxOpt = [
        {id : "policySelect", use_all : true, codeName : "policy_search"},
    ]; // 선택 박스 옵션

    let policyLayout = 0;

    let searchText;
    let policy_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    function policyList(pageNum) {
        console.log("개인정보처리방침 리스트 호출 클릭!");

        page.set(pageNum);

        let url = "/v2/api/Policy/policyList?page=" + pageNum+"&size="+size;

        let sendData = {
            searchText : searchText,
            stime : stimeVal,
            filterDate : jQuery("#policySelect").text()
        };

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");
                    policy_list = json_success.data.datalist
                    total = json_success.data.total_rows
                } else {
                    policy_list = [];
                    total = 0;
                    console.log("조회된 데이터가 없습니다.");
                }
                policyLayout = 1;
            },
            (json_error) => {
                console.log(json_error);
                console.log("개인정보처리방침 리스트 호출 실패");
            }
        )

    }

    // 엔터키 클릭.. 모듈화필요..
    function enterPress(event) {
        if(event.keyCode === 13) {
            // 페이지번호 초기화
            page.set(0);
            policyList($page);
        }
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보처리방침 목록</h1>
            <div class="TitleBtn">
                <a use:link href="/service/policyWrite" on:click="{() => {$page = 0}}">
                    <button id="adm_registration_pop">개인정보처리방침 제작</button>
                </a>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <div class="seaWrap marB28">
            <form>
                <div class="koinput marB32">
                    <input type="text" bind:value="{searchText}" on:keypress={enterPress} class="wid360" placeholder="작성자 검색" />
                    <button><img src="/assets/images/common/icon_search.png" alt=""></button>
                </div>
                <div class="seaContentBox">
                    <div class="seaContentLine borB">
                        <div class="seaCont wid662">
                            <dl>날짜 선택</dl>
                            <div class="seaflexBox">
                                <div class="sc_SelBox">
                                    <div class="selectBox wid162">
                                        <div class="label" id="policySelect" ></div>
                                        <ul class="optionList">
                                        </ul>
                                    </div>
                                </div>
                                <div class="calenderBox borL">
                                    <div class="calenderInput">
                                        <input id="stime" type="text" class="form-control" placeholer="날짜선택" aria-describedby="stime_addon" readonly />
                                        <img src="/assets/images/common/callendericon.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seaRadioBox borL">
                            <div class="seaRadio">
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="당일" value="1" />
                                    <label for="당일"><em><dt></dt></em>당일</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 1주일" value="7" />
                                    <label for="최근 1주일"><em><dt></dt></em>최근 1주일</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 한 달" value="30" checked />
                                    <label for="최근 한 달"><em><dt></dt></em>최근 한 달</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 3개월" value="90" />
                                    <label for="최근 3개월"><em><dt></dt></em>최근 3개월</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 6개월" value="180" />
                                    <label for="최근 6개월"><em><dt></dt></em>최근 6개월</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="사용자 지정" value="0" />
                                    <label for="사용자 지정"><em><dt></dt></em>사용자 지정</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        {#if policyLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else}
            <div in:fade>

                <!-- 테이블 영역 -->
                <PolicyTable {policy_list} {size} {total} />

                <!-- 페이징 영역 -->
                <Paging total_page="{total_page}" data_list="{policy_list}" dataFunction="{policyList}" />

            </div>
        {/if}

    </div>
</section>