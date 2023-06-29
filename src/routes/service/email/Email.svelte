
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import {push} from 'svelte-spa-router'
    import {page} from '../../../lib/store'
    import EmailSearch from '../../../components/service/email/EmailSearch.svelte'
    import EmailTable from '../../../components/service/email/EmailTable.svelte'
    import Paging from '../../../components/common/Paging.svelte'
    import {onMount} from "svelte";
    import {stimeVal, setDateRangePicker, setCustomSelectBox, setOptionItem} from "../../../lib/libSearch.js";
    import jQuery from "jquery";
    import {ajaxGet} from "../../../components/common/ajax.js";

    onMount(async () => {
        await fatchSearchModule();
    });

    async function fatchSearchModule(){
        setDateRangePicker('stime', true, 'period');
        setCustomSelectBox();
        setOptionItem(customSelectBoxOpt);

        // 페이지번호 초기화
        page.set(0);
        emailSendList($page);
    }

    let customSelectBoxOpt = [
        {id : "emailTypeSelect", use_all : true, codeName : "email_type"},
    ]; // 선택 박스 옵션

    let searchText = "";
    let email_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size);

    function emailSendList(pageNum) {
        console.log("이메일 발송내역 리스트 호출!");

        page.set(pageNum);

        let url = "/v2/api/Email/emailList?page=" + pageNum+"&size="+size;

        let sendData = {
            searchText : searchText,
            stime : stimeVal,
            emailType : jQuery("#emailTypeSelect").text(),
        };

        ajaxGet(url, sendData, (res) => {
            email_list = res.data.datalist;
            total = res.data.total_rows;
        }, (errCode, errMsg) => {
            email_list = [];
            total = 0;
            return {action: 'NONE'};
        });
    }

    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            page.set(0);
            emailSendList($page);
        }
    }

    function moveEmailSend() {
        push("/service/emailSend")
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>이메일 발송 내역</h1>
        </div>

        <div class="seaWrap">
            <div class="TitleBtn">
                <button on:click={moveEmailSend} id="adm_registration_pop">이메일 발송</button>
            </div>
            <div class="koinput marB32">
                <input type="text" bind:value="{searchText}" class="wid360" placeholder="이름, 이메일 검색" on:keypress={enterPress} />
                <button on:click={() => emailSendList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <EmailSearch />

        <EmailTable {emailSendList} {email_list} {total} {size} {total_page} />

        <Paging total_page="{total_page}" data_list="{email_list}" dataFunction="{emailSendList}" />

    </div>
</section>