<script>
    // 레이아웃
    import Header from "../../../components/admin/layout/Header.svelte";
    import Paging from '../../../components/common/Paging.svelte';
    import { onMount } from 'svelte';
    import {fade} from "svelte/transition";
    import { pageTransitionData } from "../../../lib/store.js";
    import {commonCode} from "../../../lib/commonCode.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";
    import {openBanner} from "../../../components/common/ui/DialogManager.js";
    import AdminAccountCreate from "../../../components/admin/account/AdminAccountCreate.svelte";
    import AdminAccountUpdate from "../../../components/admin/account/AdminAccountUpdate.svelte";
    import AdminAccountTable from "../../../components/admin/account/AdminAccountTable.svelte";
    import {openAsk} from "../../../components/common/ui/DialogManager.js";

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

        let url = "/v4/api/Admin/systemList";

        ajaxGet(url, searchCondition, (res) => {
            console.log("시스템리스트응답", res);
            try {
                admin_list = res.data.sendData.datalist.content
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
            knName: '',
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
                knName: '',
                knEmail: '',
                knIsEmailAuth: '',
                knRoleCode: '',
                knActiveStatus: '',
                otpValue: '',
                otpErrMsg: '',
            };
        },
        deleteKokonutAdmin: (email) => {
            openAsk({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: '코코넛 관리자 삭제', // 제목
                contents1: '선택하신 관리자를 삭제 하시겠습니까?', // 내용
                contents2: '',
                btnCheck: '', // 확인 버튼의 텍스트
                btnStart: '예', // 실행 버튼의 텍스트
                btnCancel: '아니오', // 취소 버튼의 텍스트
                callback: () => {
                    const sendData = {
                        knEmail : email,
                    }

                    let url = "/v4/api/Admin/deleteSystemAdmin";

                    ajaxParam(url, sendData,(res) => {
                        try {
                            openBanner("선택하신 코코넛 관리자를 삭제하였습니다.");
                            adminList(searchCondition.page);
                        } catch (e) {
                            reportCatch('temp066', e);
                        }
                    });
                }, // 확인버튼시 동작
            });
        },
        toggleKokonutAdminActivity: (admin) => {

            openAsk({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: `코코넛 관리자 ${admin.knActiveStatus === "1" ? "비" : ""}활성화`, // 제목
                contents1: `선택하신 관리자를 ${admin.knActiveStatus === "1" ? "비" : ""}활성화 하시겠습니까?`, // 내용
                contents2: '',
                btnCheck: '', // 확인 버튼의 텍스트
                btnStart: '예', // 실행 버튼의 텍스트
                btnCancel: '아니오', // 취소 버튼의 텍스트
                callback: () => {
                    const sendData = {
                        knEmail : admin.knEmail,
                    }

                    let url = "/v4/api/Admin/deactivateSystemAdmin";

                    ajaxParam(url, sendData,(res) => {
                        try {
                            openBanner("선택하신 코코넛 관리자를 " + (admin.knActiveStatus === "1" ? "비" : "") + "활성화하였습니다.");
                            adminList(searchCondition.page);
                        } catch (e) {
                            reportCatch('temp066', e);
                        }
                    });
                }, // 확인버튼시 동작
            });
        },
        setAdminData: (rawAdminData) => {
            if (typeof rawAdminData === 'object') {
                adminUpdateService.adminData = {
                    knName: rawAdminData.knName,
                    knEmail: rawAdminData.knEmail,
                    knIsEmailAuth: rawAdminData.knIsEmailAuth,
                    knRoleCode: rawAdminData.knRoleCode,
                    knActiveStatus: rawAdminData.knActiveStatus,
                    otpValue: '',
                    otpErrMsg: '',
                }
            }
        },
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>코코넛 관리자 목록 관리</h1>
            <div class="TitleBtn">
                <button on:click={adminSavePopChange} id="adm_registration_pop">코코넛 관리자 등록</button>
            </div>
        </div>

        <div class="seaWrap">
            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}"  class="wid360" placeholder="코코넛 관리자 검색(이메일ID)" on:keypress={enterPress} />
                <button on:click={() => adminList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <LoadingOverlay bind:loadState={adminManagementLayout} top={195} >
            <div in:fade>
                <!-- 테이블 영역 -->
                <AdminAccountTable page={searchCondition.page} {admin_list} {size} {total} {adminUpdateService}/>
                <!-- 페이징 영역 -->
                <Paging page={searchCondition.page} total_page="{total_page}" data_list="{admin_list}" dataFunction="{adminList}" />
            </div>
        </LoadingOverlay>
    </div>
</section>

<!-- [D] 관리자 등록 팝업 -->
{#if adminSavePop}
    <AdminAccountCreate {adminSavePopChange} {adminList} />
{/if}

{#if adminUpdateService.visibility}
    <AdminAccountUpdate {adminUpdateService}/>
{/if}