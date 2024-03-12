<script>
    // 레이아웃
    import Header from "../../../components/admin/layout/Header.svelte";
    import Paging from '../../../components/common/Paging.svelte';
    import { onMount } from 'svelte';
    import {fade} from "svelte/transition";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";

    import ComapnyTable from "../../../components/admin/company/ComapnyTable.svelte";

    onMount(async ()=>{
        // 페이지번호 초기화
        companyList(0);
    });

    let company_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    let companyListLayout = 0;

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            companyList(0);
        }
    }

    // 관리자 목록 호출 함수
    const companyList = debounce200((page) => {
        companyListLayout = 0;
        searchCondition.page = page;

        let url = "/v4/api/Company/systemCompanyList";

        ajaxGet(url, searchCondition, (res) => {
            console.log("시스템리스트응답", res);
            try {
                company_list = res.data.sendData.datalist.content
                total = res.data.sendData.total_rows
                companyListLayout = 1;
            } catch (e) {
                reportCatch('temp067', e);
            }
        }, (errCode) => {
            try {
                company_list = [];
                total = 0;
                companyListLayout = 1;
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp068', e);
            }
        });
    });
    
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>고객기업 목록 관리</h1>
        </div>

        <div class="seaWrap">
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}"  class="wid360" placeholder="기업명" on:keypress={enterPress} />
                <button on:click={() => companyList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <LoadingOverlay bind:loadState={companyListLayout} top={195} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <ComapnyTable page={searchCondition.page} {company_list} {size} {total} />
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{company_list}" dataFunction="{companyList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>
