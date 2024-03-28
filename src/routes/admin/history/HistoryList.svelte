
<script>

    // 레이아웃
    import Header from "../../../components/admin/layout/Header.svelte";
    import HistorySearch from './HistorySearch.svelte'
    import HistroyTable from './HistroyTable.svelte'

    import Paging from '../../../components/common/Paging.svelte'
    import { onMount } from "svelte";
    import {fade} from "svelte/transition"
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import {stimeVal} from "../../../components/common/action/DatePicker.js";

    onMount(async () => {
        await fatchSearchModule();
    });

    async function fatchSearchModule() {
        // 페이지번호 초기화
        activityList(0);
    }

    let activity_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size);
    let adminActivityLayout = 0;

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
        stime: '',
    }
    const activityList = debounce200((page) => {
        adminActivityLayout = 0;
        searchCondition.stime = stimeVal;
        searchCondition.page = page;

        let url = "/v4/api/History/activitySystemList";

        ajaxGet(url, searchCondition, (res) => {
            try {
                activity_list = res.data.datalist
                total = res.data.total_rows
                adminActivityLayout = 1;
            } catch (e) {
                reportCatch('temp063', e);
            }
        });
    });

    // 검색 변수
    let searchText = ""; // 이름 및 이메일 검색

    let choseMax = false;
    let choseMaxText = '';

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            activityList(0);
        }
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>시스템 관리자 이력관리</h1>
        </div>

        <div class="seaWrap">
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}" class="wid360" placeholder="관리자 검색(이름 혹은 이메일ID)" on:keypress={enterPress} />
                <button on:click={() => activityList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <HistorySearch {choseMax} {choseMaxText} {searchCondition} {activityList} />

        <LoadingOverlay bind:loadState={adminActivityLayout} top={140} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <HistroyTable page={searchCondition.page} {activity_list} {total} {size} />
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{activity_list}" dataFunction="{activityList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>
