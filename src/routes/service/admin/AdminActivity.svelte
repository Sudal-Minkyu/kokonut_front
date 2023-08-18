
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import ActivitySearch from '../../../components/service/admin/activity/ActivitySearch.svelte'
    import ActivityTable from '../../../components/service/admin/activity/ActivityTable.svelte'
    import ActivityExcel from '../../../components/service/admin/activity/ActivityExcel.svelte'
    import Paging from '../../../components/common/Paging.svelte'
    import jQuery from 'jquery';
    import { onMount } from "svelte";
    import {fade} from "svelte/transition"
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import {stimeVal} from "../../../components/common/action/DatePicker.js";
    import ExcelDownloadPop from "../../../components/common/ui/ExcelDownloadPop.svelte";

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
        actvityType: '',
        filterRole: '',
    }
    const activityList = debounce200((page) => {
        console.log('페이지', page);
        adminActivityLayout = 0;
        searchCondition.stime = stimeVal;
        searchCondition.page = page;
        console.log("관리자 활동이력 리스트 데이터 호출");

        let url = "/v2/api/History/activityList";
        ajaxGet(url, searchCondition, (res) => {
            try {
                excelDownloadPopService.requestData = {
                    searchText: searchCondition.searchText,
                    stime: searchCondition.stime,
                    actvityType: searchCondition.actvityType,
                };
                console.log("조회된 데이터가 있습니다.");
                activity_list = res.data.datalist
                total = res.data.total_rows
                adminActivityLayout = 1;
            } catch (e) {
                reportCatch('temp063', e);
            }
        }, (errCode) => {
            try {
                activity_list = [];
                total = 0;
                adminActivityLayout = 1;
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp064', e);
            }
        });
    });

    // 검색 변수
    let searchText = ""; // 이름 및 이메일 검색

    let choseMax = false;
    let choseMaxText = '';
    function activityConfirm() {
        let select_text = '';
        if(jQuery("input[name='activity']:checked").length === 0){
            console.log("1");
            choseMax = true;
            choseMaxText = '최소 한개 이상의 선택은 진행해주셔야 합니다.';
            return false;
        }

        let count = jQuery("input[name='activity']:checked").length;
        if(count > 5){
            console.log("2");
            choseMax = true;
            choseMaxText = '5개 이상 선택 할 수 없습니다.';
        }
        else{
            searchCondition.actvityType = '';
            jQuery('input[type="checkbox"]:checked').each(function (index) {
                if (index !== 0) {
                    select_text += ', ';
                    searchCondition.actvityType += ',';
                }
                searchCondition.actvityType += jQuery(this).val();

                const answer = jQuery(this).attr("id");
                select_text += jQuery("label[for='"+answer+"']").text();

                document.getElementById('result').innerText = select_text;
                jQuery('.floatCheckBox').css("display", 'none');
            });
            choseMax = false;
            choseMaxText = '';

            // actvityType = '['+actvityType+']'
            console.log("바뀌기전 actvityType : "+searchCondition.actvityType);
            // actvityType = actvityType.split(",");
            // console.log("바뀌기후 actvityType : "+actvityType);
            console.log("바뀌기후 select_text : "+select_text);
            activityList(0);
        }
    }

    function activityCancel() {
        searchCondition.actvityType = '';
        jQuery(".act_sel").prop("checked",false);
        document.getElementById('result').innerText = '활동전체';
        jQuery('.floatCheckBox').css("display", 'none');
        activityList(0);
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            activityList(0);
        }
    }

    let excelPop = false;
    function excelPopClick() {
        excelPop = !excelPop
    }

    const excelDownloadPopService = {
        visibility: false,
        useBodyParam: false,
        requestURL: '/v2/api/History/activityDownloadExcel',
        requestData: {
            searchText: '',
            stime: '',
            actvityType: '',
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
            <h1>관리자 활동 이력</h1>
        </div>

        <div class="seaWrap">
            <div class="kotopBtn">
                <button id="excel_download_pop" on:click={excelDownloadPopService.open}>현재목록 엑셀 다운로드</button>
            </div>
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}" class="wid360" placeholder="관리자 검색(이름, 아이디)" on:keypress={enterPress} />
                <button on:click={() => activityList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <ActivitySearch {choseMax} {choseMaxText} {activityCancel} {activityConfirm} {searchCondition} {activityList} />

        <LoadingOverlay bind:loadState={adminActivityLayout} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <ActivityTable page={searchCondition.page} {activityList} {activity_list} {total} {size} {total_page} />
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{activity_list}" dataFunction="{activityList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>

{#if excelDownloadPopService.visibility}
    <ExcelDownloadPop {excelDownloadPopService} />
{/if}