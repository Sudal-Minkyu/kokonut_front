<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import AdminSearch from '../../../components/service/admin/management/AdminSearch.svelte'
    import AdminTable from '../../../components/service/admin/management/AdminTable.svelte'
    import AdminCreate from '../../../components/service/admin/management/AdminCreate.svelte'
    import Paging from '../../../components/common/Paging.svelte'
    import { onMount } from 'svelte';
    import {fade} from "svelte/transition"
    import { pageTransitionData } from "../../../lib/store.js";
    import {setOptionItem} from "../../../lib/libSearch.js";
    import {commonCode} from "../../../lib/commonCode.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import {openBanner} from "../../../components/common/ui/DialogManager.js";

    onMount(async ()=>{
        await fatchSearchModule();
        // 페이지번호 초기화
        adminList(0);
        checkPageTransitionDataExists();
    });

    // 입장시 다른페이지로부터 관리자등록 팝업을 열어 특정 관리자 등급을 선택하기를 요청한 경우
    // 페이지가 열리고 검사를 통해 팝업을 열어주고 관리자 등급을 선택시킨 화면을 띄운다.
    const checkPageTransitionDataExists = () => {
        if ($pageTransitionData.createTarget) {
            const role = commonCode.filter(obj => obj.label === 'admin_create_role_code')
                .filter(obj => obj.value === $pageTransitionData.createTarget);

            if (role.length) {
                adminSavePopChange();
                setTimeout(() => {
                    const selectBox = document.getElementById('createAdminRoleSelect');
                    selectBox.innerHTML = role[0].text;
                    selectBox.dataset.value = role[0].value;
                    pageTransitionData.set({});
                }, 0);
            } else {
                pageTransitionData.set({});
            }
        }
    }

    async function fatchSearchModule(){
        setOptionItem(customSelectBoxOpt);
    }

    let customSelectBoxOpt = [
        {id : "roleSelect", use_all : true, codeName : "kn_role_code"},
        {id : "stateSelect", use_all : true, codeName : "kn_state"},
    ]; // 선택 박스 옵션

    // 관리자 등록 팝업
    let adminSavePop = false;
    function adminSavePopChange() {
        adminSavePop = !adminSavePop;
    }

    let admin_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    let adminManagementLayout = 0;

    const searchCondition = {
        page: 0,
        size,
        searchText: '',
        filterRole: '',
        filterState: '',
    }

    // 관리자 목록 호출 함수
    const emailSend = function emailAgain(userEmail) {
        console.log("관리자 재인증 메일전송 클릭!");

        const sendDate = {
            userEmail : userEmail
        }

        let url = "/v2/api/Admin/createMailAgain";

        ajaxParam(url, sendDate,(res) => {
            // console.log("재인증메일을 전송하였습니다.");
            openBanner("재인증메일을 전송하였습니다.");
        });
    }

    // 관리자 목록 호출 함수
    const pwChangeMail = function pwChange(userEmail) {
        console.log("비밀번호 변경 메일전송 클릭!");

        const sendDate = {
            userEmail : userEmail
        }

        let url = "/v2/api/Admin/passwordChangeMail";

        ajaxParam(url, sendDate,(res) => {
            // console.log("재인증메일을 전송하였습니다.");
            openBanner("비밀번호변경 메일을 전송하였습니다.");
        });
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            adminList(0);
        }
    }

    // 관리자 목록 호출 함수
    const adminList = debounce200((page) => {
        adminManagementLayout = 0;
        console.log("관리자 목록호출 클릭!");
        searchCondition.page = page;

        let url = "/v2/api/Admin/list";

        ajaxGet(url, searchCondition, (res) => {
            console.log("조회된 데이터가 있습니다.");
            admin_list = res.data.sendData.datalist
            total = res.data.sendData.total_rows
            adminManagementLayout = 1;
        }, (errCode) => {
            admin_list = [];
            total = 0;
            console.log("조회된 데이터가 없습니다.");
            adminManagementLayout = 1;
            return {action: 'NONE'};
        });
    });

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>관리자 목록 관리</h1>
        </div>

        <div class="seaWrap">
            <div class="TitleBtn">
                <button on:click={adminSavePopChange} id="adm_registration_pop">관리자 등록</button>
            </div>
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}"  class="wid360" placeholder="관리자 검색(이름, 아이디)" on:keypress={enterPress} />
                <button on:click={() => adminList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <AdminSearch {adminList} {searchCondition}/>

        <LoadingOverlay bind:loadState={adminManagementLayout} left={55} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <AdminTable page={searchCondition.page} {admin_list} {size} {total} {emailSend} {pwChangeMail} />
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{admin_list}" dataFunction="{adminList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>


<!-- [D] 관리자 등록 팝업 -->
{#if adminSavePop}
    <AdminCreate {adminSavePopChange} {adminList} />
{/if}
