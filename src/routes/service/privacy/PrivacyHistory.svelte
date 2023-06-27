
<script>

    import Header from "../../../components/service/layout/Header.svelte"

    import {fade} from "svelte/transition"
    import {onMount} from "svelte";
    import {page} from "../../../lib/store.js";
    import {setDateRangePicker, stimeVal} from "../../../lib/libSearch.js";
    import restapi from "../../../lib/api.js";

    import PrivacyHistoryTable from "../../../components/service/privacy/PrivacyHistoryTable.svelte";
    import PrivacyHistorySearch from "../../../components/service/privacy/PrivacyHistorySearch.svelte";
    import Paging from "../../../components/common/Paging.svelte";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet} from "../../../components/common/ajax.js";

    onMount(async ()=>{
        await fatchSearchModule();
        // setTimeout(() => provisionLayout = 1, 500);

        // 페이지번호 초기화
        page.set(0);
        privacyHistoryList($page);
    })

    async function fatchSearchModule() {
        setDateRangePicker('stime', true, 'period');
    }


    let privacyHistoryLayout = 0;

    let privacy_history_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    const searchCondition = {
        searchText: '',
        stime: '',
        filterRole: '',
        filterState: '',
    }

    function privacyHistoryList(pageNum) {
        searchCondition.stime = stimeVal;
        console.log("개인정보처리이력 리스트 호출 클릭!");

        if(privacyHistoryLayout === 1) {
            privacyHistoryLayout = 0;
        }

        page.set(pageNum);

        let url = "/v2/api/PrivacyHistory/privacyHistoryList?page=" + pageNum+"&size="+size;

        ajaxGet(url, searchCondition, (res) => {
            console.log("조회된 데이터가 있습니다.");
            privacy_history_list = res.data.datalist;
            total = res.data.total_rows;
            privacyHistoryLayout = 1;
        }, (errCode) => {
            privacy_history_list = [];
            total = 0;
            console.log("조회된 데이터가 없습니다.");
            privacyHistoryLayout = 1;
        });
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            page.set(0);
            privacyHistoryList($page);
        }
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보 처리이력</h1>
        </div>

        <div class="koinput marB32">
            <input type="text" bind:value="{searchCondition.searchText}" on:keypress={enterPress} class="wid360" placeholder="관리자 검색" />
            <button on:click={() => privacyHistoryList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
        </div>

        <!-- 상단 검색 영역 -->
        <PrivacyHistorySearch {searchCondition}/>

        <LoadingOverlay bind:loadState={privacyHistoryLayout} left={55} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <PrivacyHistoryTable {privacy_history_list} {size} {total} />
                <!-- 페이징 영역 -->
                <Paging total_page="{total_page}" data_list="{privacy_history_list}" dataFunction="{privacyHistoryList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>