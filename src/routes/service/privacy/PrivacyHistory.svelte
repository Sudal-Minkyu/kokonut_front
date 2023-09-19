<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import {fade} from "svelte/transition"
    import {stimeVal} from "../../../components/common/action/DatePicker.js";
    import PrivacyHistoryTable from "../../../components/service/privacy/PrivacyHistoryTable.svelte";
    import PrivacyHistorySearch from "../../../components/service/privacy/PrivacyHistorySearch.svelte";
    import Paging from "../../../components/common/Paging.svelte";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import ExcelDownloadPop from "../../../components/common/ui/ExcelDownloadPop.svelte";

    let privacyHistoryLayout = 0;

    let privacy_history_list = [];
    const size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size);

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
        stime: '',
        filterRole: '',
        filterState: '',
    }

    const privacyHistoryList = debounce200((page = 0) => {

        searchCondition.stime = stimeVal;
        searchCondition.page = page;
        privacyHistoryLayout = 0;
        let url = "/v2/api/PrivacyHistory/privacyHistoryList";
        ajaxGet(url, searchCondition, (res) => {
            try {
                // 엑셀 다운로드를 위한 조회했던 정보의 기억
                excelDownloadPopService.requestData = {
                    searchText: searchCondition.searchText,
                    stime: searchCondition.stime,
                    filterRole: searchCondition.filterRole,
                    filterState: searchCondition.filterState,
                };
                privacy_history_list = res.data.datalist;
                total = res.data.total_rows;
                privacyHistoryLayout = 1;
            } catch (e) {
                reportCatch('temp087', e);
            }
        });
    });

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            privacyHistoryList(0);
        }
    }

    const excelDownloadPopService = {
        visibility: false,
        useBodyParam: false,
        requestURL: '/v2/api/PrivacyHistory/privacyHistoryDownloadExcel',
        requestData: {
            searchText: '',
            stime: '',
            filterRole: '',
            filterState: '',
        },
        close: () => {
            excelDownloadPopService.visibility = false;
        },
        open: () => {
            excelDownloadPopService.visibility = true;
        },
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보 처리이력</h1>
        </div>

        <div class="seaWrap">
            <div class="kotopBtn">
                <button id="excel_download_pop" on:click={excelDownloadPopService.open}>현재목록 엑셀 다운로드</button>
            </div>
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}" on:keypress={enterPress} class="wid360" placeholder="관리자 검색(이름, 아이디)" />
                <button on:click={() => privacyHistoryList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <PrivacyHistorySearch {searchCondition} {privacyHistoryList}/>

        <LoadingOverlay bind:loadState={privacyHistoryLayout} left={55} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <PrivacyHistoryTable page={searchCondition.page} {privacy_history_list} {size} {total} />
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{privacy_history_list}" dataFunction="{privacyHistoryList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>

{#if excelDownloadPopService.visibility}
    <ExcelDownloadPop {excelDownloadPopService} />
{/if}