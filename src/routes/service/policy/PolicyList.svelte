
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import PolicySearch from "../../../components/service/policy/PolicySearch.svelte";
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

        <div class="koinput marB32">
            <input type="text" bind:value="{searchText}" on:keypress={enterPress} class="wid360" placeholder="작성자 검색" />
            <button on:click={() => policyList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
        </div>

        <!-- 상단 검색 영역 -->
        <PolicySearch />

        {#if policyLayout === 0}
            <div class="loaderParent" style="left: 55%">
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