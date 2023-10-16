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
    import {commonCode} from "../../../lib/commonCode.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import {openBanner} from "../../../components/common/ui/DialogManager.js";
    import AdminUpdate from "../../../components/service/admin/management/AdminUpdate.svelte";

    onMount(async ()=>{
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

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            adminList(0);
        }
    }

    // 관리자 목록 호출 함수
    const adminList = debounce200((page) => {
        adminManagementLayout = 0;
        searchCondition.page = page;

        let url = "/v2/api/Admin/list";

        ajaxGet(url, searchCondition, (res) => {
            try {
                admin_list = res.data.sendData.datalist
                total = res.data.sendData.total_rows
                adminManagementLayout = 1;
            } catch (e) {
                reportCatch('temp067', e);
            }
        }, (errCode) => {
            try {
                admin_list = [];
                total = 0;
                adminManagementLayout = 1;
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp068', e);
            }
        });
    });

    const adminUpdateService = {
        visibility: false,
        adminData: {
            knEmail: '',
            knIsEmailAuth: '',
            knRoleCode: '',
            knActiveStatus: '',
            otpValue: '',
            otpErrMsg: '',
        },
        open: (adminData) => {
            adminUpdateService.setAdminData(adminData);
            adminUpdateService.visibility = true;
        },
        close: () => {
            adminUpdateService.visibility = false;
            adminUpdateService.adminData = {
                knEmail: '',
                knIsEmailAuth: '',
                knRoleCode: '',
                knActiveStatus: '',
                otpValue: '',
                otpErrMsg: '',
            };
        },
        updateAdmin: () => {
            if (!adminUpdateService.adminData.otpValue) {
                adminUpdateService.adminData.otpErrMsg = 'OTP를 적어주세요.';
                return;
            } else {
                adminUpdateService.adminData.otpErrMsg = '';
            }

            console.log('업데이트할 관리자 정보', adminUpdateService.adminData);
            ajaxParam('/v2/api/Admin/updateAdminData', adminUpdateService.adminData, (res) => {
                adminList(searchCondition.page);
                openBanner('관리자 정보 변경을 완료하였습니다.');
                adminUpdateService.close();
            });
        },
        sendVerifyMail: (email) => {
            const sendDate = {
                userEmail : email,
            }

            let url = "/v2/api/Admin/createMailAgain";

            ajaxParam(url, sendDate,(res) => {
                try {
                    openBanner("재인증메일을 전송하였습니다.");
                } catch (e) {
                    reportCatch('temp065', e);
                }
            });
        },
        sendPwChangeMail: (email) => {
            const sendData = {
                userEmail : email,
            }

            let url = "/v2/api/Admin/passwordChangeMail";

            ajaxParam(url, sendData,(res) => {
                try {
                    openBanner("비밀번호변경 메일을 전송하였습니다.");
                } catch (e) {
                    reportCatch('temp066', e);
                }
            });
        },
        setAdminData: (rawAdminData) => {
            if (typeof rawAdminData === 'object') {
                console.log('raw admin', rawAdminData);
                adminUpdateService.adminData = {
                    knEmail: rawAdminData.knEmail,
                    knIsEmailAuth: rawAdminData.knIsEmailAuth,
                    knRoleCode: rawAdminData.knRoleCode,
                    knActiveStatus: rawAdminData.knActiveStatus,
                    otpValue: '',
                    otpErrMsg: '',
                }
                console.log('refinedAdminData', adminUpdateService.adminData);
            }
        },
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>관리자 목록 관리</h1>
            <div class="TitleBtn">
                <button on:click={adminSavePopChange} id="adm_registration_pop">관리자 등록</button>
            </div>
        </div>

        <div class="seaWrap">
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}"  class="wid360" placeholder="관리자 검색(이름, 아이디)" on:keypress={enterPress} />
                <button on:click={() => adminList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <AdminSearch {adminList} {searchCondition}/>

        <LoadingOverlay bind:loadState={adminManagementLayout} top={195} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <AdminTable page={searchCondition.page} {admin_list} {size} {total} {adminUpdateService}/>
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

{#if adminUpdateService.visibility}
    <AdminUpdate {adminUpdateService}/>
{/if}