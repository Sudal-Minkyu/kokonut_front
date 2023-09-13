
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import PolicySearch from "../../../components/service/policy/PolicySearch.svelte";
    import PolicyTable from "../../../components/service/policy/PolicyTable.svelte";
    import PolicyElectronic from "../../../components/service/policy/PolicyElectronic.svelte";
    import { link } from 'svelte-spa-router'
    import {userInfoData} from '../../../lib/store.js'
    import { fade } from 'svelte/transition'
    import {setOptionItem, stimeVal} from "../../../components/common/action/DatePicker.js";
    import {onMount} from "svelte";
    import Paging from "../../../components/common/Paging.svelte";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";

    onMount(async ()=>{
        setOptionItem(customSelectBoxOpt);

        companyElectronicCheck();
    });

let customSelectBoxOpt = [
        {id : "policySelect", use_all : true, codeName : "policy_search"},
    ]; // 선택 박스 옵션

    let electronicCheck = false;
    function electronicCheckChange() {
        electronicCheck = false;
    }
    // 전자상거래법 적용대상 체크
    function companyElectronicCheck() {
        if($userInfoData.electronic === "0") {
            electronicCheck = true;
        }
    }

    let startFun = function() {
        let url = "/v2/api/Company/companyElectronicUpdate"

        ajaxParam(url, {}, (res) => {
            try {
            } catch (e) {
                reportCatch('temp080', e);
            }
        });
    }

    let policyLayout = 0;
    let policy_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
        stime: '',
        filterDate: '',
    }

    const policyList = debounce200((page) => {
        searchCondition.stime = stimeVal;
        searchCondition.page = page;
        if(policyLayout === 1) {
            policyLayout = 0;
        }

        let url = "/v2/api/Policy/policyList";

        ajaxGet(url, searchCondition, (res) => {
            try {
                policy_list = res.data.datalist
                total = res.data.total_rows
                policyLayout = 1;
            } catch (e) {
                reportCatch('temp081', e);
            }
        });
    });

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            policyList(0);
        }
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보처리방침 목록</h1>
            <div class="TitleBtn">
                <a use:link href="/service/policyWrite">
                    <button id="adm_registration_pop">개인정보처리방침 제작</button>
                </a>
            </div>
        </div>

        <div class="koinput marB32">
            <input type="text" bind:value="{searchCondition.searchText}" on:keypress={enterPress} class="wid360" placeholder="작성자 검색" />
            <button on:click={() => policyList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
        </div>

        <!-- 상단 검색 영역 -->
        <PolicySearch {searchCondition} {policyList} />

        <LoadingOverlay bind:loadState={policyLayout} left={55}>
            <div in:fade>
                <!-- 테이블 영역 -->
                <PolicyTable page={searchCondition.page} {policy_list} {size} {total} />
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{policy_list}" dataFunction="{policyList}" />
            </div>
        </LoadingOverlay>

    </div>
</section>

{#if electronicCheck}
    <PolicyElectronic {startFun} {electronicCheckChange} />
{/if}