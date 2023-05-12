
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'

    import {setCustomSelectBox, setDateRangePicker, setOptionItem, stimeVal} from "../../../lib/libSearch.js";
    import {onMount} from "svelte";

    import PrivacyTable from "../../../components/service/privacy/PrivacyTable.svelte";
    import PrivacySearch from "../../../components/service/privacy/PrivacySearch.svelte";
    import PrivacyDownloadHistory from "../../../components/service/privacy/PrivacyDownloadHistory.svelte";
    import Paging from "../../../components/common/Paging.svelte";

    import {page, popupPage} from "../../../lib/store.js";
    import jQuery from "jquery";
    import restapi from "../../../lib/api.js";

    onMount(async ()=>{
        await fatchSearchModule();
        // setTimeout(() => provisionLayout = 1, 500);

        // 페이지번호 초기화
        page.set(0);
        provisionList($page);
    })

    async function fatchSearchModule() {
        setDateRangePicker('stime', true, 'period');
        setCustomSelectBox();
        setOptionItem(customSelectBoxOpt);
    }

    let customSelectBoxOpt = [
        {id : "privacyYnSelect", use_all : true, codeName : "privacy_yn"},
        {id : "privacyStatusSelect", use_all : true, codeName : "privacy_status"},
    ];

    let provisionLayout = 0;

    let searchText;
    let provision_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    function provisionList(pageNum) {
        console.log("개인정보제공 리스트 호출 클릭!");

        if(provisionLayout === 1) {
            provisionLayout = 0;
        }

        page.set(pageNum);

        let url = "/v2/api/Provision/provisionList?page=" + pageNum+"&size="+size;

        let sendData = {
            searchText : searchText,
            stime : stimeVal,
            filterDownload : jQuery("#privacyYnSelect").text(),
            filterState :  jQuery("#privacyStatusSelect").text(),
        };

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");
                    provision_list = json_success.data.datalist
                    total = json_success.data.total_rows
                } else {
                    provision_list = [];
                    total = 0;
                    console.log("조회된 데이터가 없습니다.");
                }
                provisionLayout = 1;
            },
            (json_error) => {
                console.log(json_error);
                console.log("개인정보제공 리스트 호출 실패");
            }
        )

    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            page.set(0);
            provisionList($page);
        }
    }


    let downloadPop = 0;
    let setProCode;
    function downloadHistoryClick(proCode) {
        console.log("proCode : "+proCode);
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
        console.log("다운로드이력 리스트호출");

        console.log("setProCode : "+setProCode);

        popupPage.set(pageNum);

        let url = "/v2/api/Provision/provisionDownloadList?page=" + pageNum+"&size="+provisionDownload_size;

        let sendData = {
            proCode : setProCode
        };

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");
                    provisionDownloadHistory_list = json_success.data.datalist
                    provisionDownload_total = json_success.data.total_rows
                } else {
                    provisionDownloadHistory_list = [];
                    provisionDownload_total = 0;
                    console.log("조회된 데이터가 없습니다.");
                }
                provisionLayout = 1;
            },
            (json_error) => {
                console.log(json_error);
                console.log("개인정보제공 다운로드 리스트 호출 실패");
            }
        )

    }

    function downloadPopClose() {
        downloadPop = 0;
        setProCode = "";
        provisionDownloadHistory_list = [];
        popupPage.set(0);
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보 제공리스트</h1>
            <div class="TitleBtn">
                <a use:link href="/service/privacy/privacyWrite">
                    <button id="adm_registration_pop">개인정보 제공</button>
                </a>
            </div>
        </div>

        <div class="koinput marB32">
            <input type="text" bind:value="{searchText}" on:keypress={enterPress} class="wid360" placeholder="제공자 검색" />
            <button on:click={() => provisionList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
        </div>

        <!-- 상단 검색 영역 -->
        <PrivacySearch />

        {#if provisionLayout === 0}
            <div class="loaderParent" style="left: 55%">
                <div class="loader"></div>
            </div>
        {:else}
            <div in:fade>
                <!-- 테이블 영역 -->
                <PrivacyTable {downloadHistoryClick} {provision_list} {size} {total} />

                <!-- 페이징 영역 -->
                <Paging total_page="{total_page}" data_list="{provision_list}" dataFunction="{provisionList}" />
            </div>
        {/if}
    </div>
</section>

{#if downloadPop === 1}
    <PrivacyDownloadHistory {downloadPopClose} {provisionDownload_size} {provisionDownload_total} {provisionDownload_total_page} {provisionDownloadHistory_list} {downloadHistoryList}  />
{/if}