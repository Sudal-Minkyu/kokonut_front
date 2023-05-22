<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import jQuery from 'jquery';

    import AdminSearch from '../../../components/service/admin/management/AdminSearch.svelte'
    import AdminTable from '../../../components/service/admin/management/AdminTable.svelte'
    import AdminCreate from '../../../components/service/admin/management/AdminCreate.svelte'
    import Paging from '../../../components/common/Paging.svelte'

    import { onMount } from 'svelte';
    import {fade} from "svelte/transition"

    import { page, pageTransitionData } from "../../../lib/store.js";
    import restapi from "../../../lib/api.js";

    import {setCustomSelectBox, setOptionItem} from "../../../lib/libSearch.js";
    import {commonCode} from "../../../lib/commonCode.js";
    import PolicyTable from "../../../components/service/policy/PolicyTable.svelte";

    onMount(async ()=>{
        await fatchSearchModule();
        // 페이지번호 초기화
        page.set(0);
        adminList($page);
        checkPageTransitionDataExists();
    })

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
        setCustomSelectBox();
        setOptionItem(customSelectBoxOpt);
    }

    let customSelectBoxOpt = [
        {id : "roleSelect", use_all : true, codeName : "kn_role_code"},
        {id : "stateSelect", use_all : true, codeName : "kn_state"},
    ]; // 선택 박스 옵션

    // 관리자 등록 팝업
    let adminSavePop = false;
    function adminSavePopChange() {
        if(adminSavePop) {
            setCustomSelectBox();
        }
        adminSavePop = !adminSavePop;
    }

    let admin_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    let adminManagementLayout = 0;
    // 관리자 목록 호출 함수
    function adminList(pageNum) {
        console.log("관리자 목록호출 클릭!");


        page.set(pageNum);

        console.log(jQuery("#roleSelect"));
        let url = "/v2/api/Admin/list?page=" + pageNum+"&size="+size;
        let sendData = {
            searchText : searchText,
            filterRole : jQuery("#roleSelect").text(),
            filterState : jQuery("#stateSelect").text(),
        };

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");
                    admin_list = json_success.data.sendData.datalist
                    total = json_success.data.sendData.total_rows
                } else {
                    admin_list = [];
                    total = 0;
                    console.log("조회된 데이터가 없습니다.");
                }

                adminManagementLayout = 1;
            },
            (json_error) => {
                console.log(json_error);
                console.log("관리자 리스트 호출 실패");
            }
        )
    }

    // 검색 변수
    let searchText = ""; // 이름 및 이메일 검색

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            page.set(0);
            adminList($page);
        }
    }

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
                <input type="text" bind:value="{searchText}"  class="wid360" placeholder="이름, 이메일 검색" on:keypress={enterPress} />
                <button on:click={() => adminList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <AdminSearch />

        {#if adminManagementLayout === 0}
            <div class="loaderParent" style="left: 55%">
                <div class="loader"></div>
            </div>
        {:else}
            <div in:fade>

                <!-- 테이블 영역 -->
                <AdminTable {admin_list} {size} {total} />

                <!-- 페이징 영역 -->
                <Paging total_page="{total_page}" data_list="{admin_list}" dataFunction="{adminList}" />

            </div>
        {/if}
    </div>
</section>


<!-- [D] 관리자 등록 팝업 -->
{#if adminSavePop}
    <AdminCreate {adminSavePopChange} {adminList} />
{/if}
