<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import PrivacyListTable from "../../../components/service/privacy/PrivacyListTable.svelte";
    import PrivacyListSearch from "../../../components/service/privacy/PrivacyListSearch.svelte";
    import PrivacyDownloadHistory from "../../../components/service/privacy/PrivacyDownloadHistory.svelte";
    import Paging from "../../../components/common/Paging.svelte";
    import {popupPage, privacyDetailData} from "../../../lib/store.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";
    import PrivacyDetailPop from "../../../components/service/privacy/PrivacyDetailPop.svelte";
    import {stimeVal} from "../../../components/common/action/DatePicker.js";
    import ExcelDownloadPop from "../../../components/common/ui/ExcelDownloadPop.svelte";
    import {openAsk, openConfirm} from "../../../components/common/ui/DialogManager.js";

    let provisionLayout = 0;

    let provision_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
        stime: '',
        filterOfferType: '',
        filterState: '',
    }

    function provisionList(page) {
        searchCondition.stime = stimeVal;
        searchCondition.page = page;
        if(provisionLayout === 1) {
            provisionLayout = 0;
        }

        let url = "/v2/api/Provision/provisionList";
        ajaxGet(url, searchCondition, (res) => {
            try {
                excelProvisionListDownloadPopService.requestData = {
                    searchText: searchCondition.searchText,
                    stime: searchCondition.stime,
                    filterOfferType: searchCondition.filterOfferType,
                    filterState: searchCondition.filterState
                };

                provision_list = res.data.datalist;
                total = res.data.total_rows;
                provisionLayout = 1;
            } catch (e) {
                reportCatch('temp089', e);
            }
        });
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            provisionList(0);
        }
    }

    let downloadPop = 0;
    let setProCode;
    function downloadHistoryClick(proCode) {
        downloadPop = 1;
        setProCode = proCode;

        downloadHistoryList(0);
    }

    let provisionDownloadHistory_list = [];
    let provisionDownload_size = 10;
    let provisionDownload_total = 0;
    let provisionDownload_total_page;
    $: provisionDownload_total_page = Math.ceil(provisionDownload_total/provisionDownload_size)
    function downloadHistoryList(pageNum) {
        popupPage.set(pageNum);

        let url = "/v2/api/Provision/provisionDownloadList?page=" + pageNum+"&size="+provisionDownload_size;

        let sendData = {
            proCode : setProCode
        };

        ajaxGet(url, sendData, (res) => {
            try {
                provisionDownloadHistory_list = res.data.datalist
                provisionDownload_total = res.data.total_rows
            } catch (e) {
                reportCatch('temp091', e);
            }
        });
    }

    function downloadPopClose() {
        downloadPop = 0;
        setProCode = "";
        provisionDownloadHistory_list = [];
        popupPage.set(0);
    }

    const excelDownloadPopService = {
        visibility: false,
        useBodyParam: false,
        requestURL: '/v2/api/Provision/provisionDownloadExcel',
        requestData: {},
        close: () => {
            excelDownloadPopService.visibility = false;
        },
        open: (data) => {
            excelDownloadPopService.requestData = data;
            excelDownloadPopService.visibility = true;
        },
    }

    const excelProvisionListDownloadPopService = {
        visibility: false,
        useBodyParam: false,
        requestURL: '/v2/api/Provision/provisionListDownloadExcel',
        requestData: {
            searchText: '',
            stime: '',
            filterOfferType: '',
            filterState: '',
        },
        close: () => {
            excelProvisionListDownloadPopService.visibility = false;
        },
        open: () => {
            excelProvisionListDownloadPopService.visibility = true;
        },
    }

    // 제공종료
    function provisionExit(proCode) {

        let url = "/v2/api/Provision/provisionExit"

        let sendData = {
            proCode : proCode,
        }

        ajaxParam(url, sendData, () => {
            openConfirm({
                icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '개인 정보 제공 종료', // 제목
                contents1: '선택하신 개인정보제공을 종료하였습니다.', // 내용
                contents2: '',
                btnCheck: '확인', // 확인 버튼의 텍스트
            });
            provisionList(searchCondition.page);
        });

    }

    function handleExitProvisionBtn (proCode) {
        openAsk({
            icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '개인 정보 제공 종료', // 제목
            contents1: '개인정보 제공을 종료하시겠습니까?', // 내용
            contents2: '',
            btnCheck: '', // 확인 버튼의 텍스트
            btnStart: '예', // 실행 버튼의 텍스트
            btnCancel: '아니오', // 취소 버튼의 텍스트
            callback: () => {provisionExit(proCode)}, // 확인버튼시 동작
        });
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>개인정보 제공 리스트</h1>
            <div class="TitleBtn">
                <a use:link href="/service/privacy/privacyWrite">
                    <button id="adm_registration_pop">개인정보 제공</button>
                </a>
            </div>
        </div>

        <div class="seaWrap">
            <div class="kotopBtn">
                <button id="excel_download_pop" on:click={excelProvisionListDownloadPopService.open}>개인정보 제공 목록 다운로드</button>
            </div>
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}" on:keypress={enterPress} class="wid360" placeholder="제공자 검색" />
                <button on:click={() => provisionList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <PrivacyListSearch {searchCondition} {provisionList} />

        <LoadingOverlay bind:loadState={provisionLayout} top={140} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <PrivacyListTable page={searchCondition.page} {downloadHistoryClick} {handleExitProvisionBtn} {provision_list} {size} {total} {excelDownloadPopService} />

                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page={total_page} data_list={provision_list} dataFunction={provisionList} />
            </div>
        </LoadingOverlay>
    </div>
</section>

{#if downloadPop === 1}
    <PrivacyDownloadHistory {downloadPopClose} {provisionDownload_size} {provisionDownload_total} {provisionDownload_total_page} {provisionDownloadHistory_list} {downloadHistoryList}  />
{/if}

{#if $privacyDetailData.proCode}
    <PrivacyDetailPop />
{/if}

{#if excelDownloadPopService.visibility}
    <ExcelDownloadPop {excelDownloadPopService} popType={3} />
{/if}

{#if excelProvisionListDownloadPopService.visibility}
    <ExcelDownloadPop excelDownloadPopService = {excelProvisionListDownloadPopService} popType={4} />
{/if}