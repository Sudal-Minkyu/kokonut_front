
<script>
    import Header from "../../../components/admin/layout/Header.svelte"
    import {push} from 'svelte-spa-router'
    import EmailSearch from '../../../components/admin/email/EmailSearch.svelte'
    import EmailTable from '../../../components/admin/email/EmailTable.svelte'
    import Paging from '../../../components/common/Paging.svelte'
    import {onMount} from "svelte";
    import {stimeVal, setOptionItem} from "../../../components/common/action/DatePicker.js";
    import {ajaxGet, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";

    let emailHistoryListState = 0;

    onMount(async () => {
        await fatchSearchModule();
    });

    async function fatchSearchModule(){
        setOptionItem(customSelectBoxOpt);
        emailSendList(0);
    }

    let customSelectBoxOpt = [
        {id : "emailTypeSelect", use_all : true, codeName : "email_type"},
    ]; // 선택 박스 옵션

    let email_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size);

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
        stime: '',
        emPurpose: '',
    }

    const emailSendList = debounce200((page) => {
        emailHistoryListState = 0;
        searchCondition.stime = stimeVal;
        searchCondition.page = page;

        let url = "/v4/api/Email/systemEmailList";

        ajaxGet(url, searchCondition, (res) => {
            try {
                emailHistoryListState = 1;
                email_list = res.data.datalist;
                total = res.data.total_rows;
            } catch (e) {
                reportCatch('temp069', e);
            }
        });
    });

    function enterPress(event) {
        if(event.key === "Enter") {
            emailSendList(0);
        }
    }

    function moveEmailSend() {
        push("/admin/emailSend");
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>관리자 이메일 발송 내역</h1>
            <div class="TitleBtn">
                <button on:click={moveEmailSend} id="adm_registration_pop">관리자 이메일 발송</button>
            </div>
        </div>

        <div class="seaWrap">
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}" class="wid360" placeholder="보낸사람 검색(이름, 아이디)" on:keypress={enterPress} />
                <button on:click={() => emailSendList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <EmailSearch {searchCondition} {emailSendList} />

        <LoadingOverlay bind:loadState={emailHistoryListState} top={140} >
            <EmailTable {email_list} {total} {size} />
            <Paging page={searchCondition.page} total_page="{total_page}" data_list="{email_list}" dataFunction="{emailSendList}" />
        </LoadingOverlay>
    </div>
</section>