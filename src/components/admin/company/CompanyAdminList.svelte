<script>

    import {ajaxGet, reportCatch} from "../../common/ajax.js";
    import {debounce200} from "../../common/eventRateControls.js";
    import LoadingOverlay from "../../common/ui/LoadingOverlay.svelte";
    import Paging from "../../common/Paging.svelte";
    import {fade} from "svelte/transition";
    import {onMount} from "svelte";

    const handleCancel = () => {
        companyAdminListPopChange();
    }

    onMount(async ()=>{
        // 페이지번호 초기화
        companyAdminList(0);
    });

    let companyAdmin_list = [];

    let page = 0;
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    let companyAdminListLayout = 0;

    export let companyAdminListPopChange;

    export let companyId;
    console.log("companyId : "+companyId);

    const searchCondition = {
        page: 0,
        size,
        companyId,
        searchText: '',
    }

    // 엔터키 클릭
    function enterPress(event) {
        if(event.key === "Enter") {
            companyAdminList(0);
        }
    }

    // 관리자 목록 호출 함수
    const companyAdminList = debounce200((page) => {
        companyAdminListLayout = 0;

        // searchCondition.companyId = companyId;
        searchCondition.page = page;

        let url = "/v4/api/Company/systemCompanyAdminList";

        ajaxGet(url, searchCondition, (res) => {
            console.log("시스템리스트응답", res);
            try {
                companyAdmin_list = res.data.sendData.datalist.content
                total = res.data.sendData.total_rows
                companyAdminListLayout = 1;
            } catch (e) {
                reportCatch('temp067', e);
            }
        }, (errCode) => {
            try {
                companyAdmin_list = [];
                total = 0;
                companyAdminListLayout = 1;
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp068', e);
            }
        });
    });

</script>

<div class="koko_popup email_member_pop" data-popup="email_member_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3>관리자 목록</h3>
            </div>

            <div class="koinput marB32">
                <input type="text" bind:value="{searchCondition.searchText}"  class="wid360" placeholder="이메일" on:keypress={enterPress} />
                <button on:click={() => companyAdminList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>

            <!-- 상단 검색 영역 -->
            <LoadingOverlay bind:loadState={companyAdminListLayout} top={80} >
                <div in:fade>
                    <!-- 테이블 영역 -->

                    <div class="kotable adminManagement">
                        <table>
                            <caption>고객기업 목록 리스트</caption>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>이메일</th>
                                <th>가입날짜</th>
                                <th>계정상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {#if companyAdmin_list.length !== 0}
                                {#each companyAdmin_list as admin, i}
                                    <tr>
                                        <td>{ total - (page * size) - i }</td>
                                        <td>{admin.knEmail}</td>
                                        <td>{admin.insert_date}</td>
                                        <td>
                                            {#if admin.knActiveStatus === '1'}
                                                <div class="normal">활성</div>
                                            {:else if admin.knActiveStatus === '0'}
                                                <div class="secession">비활성</div>
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            {:else}
                                <tr class="none_inq">
                                    <td>조회된 데이터가 없습니다.</td>
                                </tr>
                            {/if}
                            </tbody>
                        </table>
                    </div>

                    <!-- 페이징 영역 -->
                    <Paging page={searchCondition.page} total_page="{total_page}" data_list="{companyAdmin_list}" dataFunction="{companyAdminList}" />
                </div>
            </LoadingOverlay>

        </div>
        <div class="koko-popup-close email_member_pop_close" data-popup-close="email_member_pop_close" on:click={handleCancel}></div>
    </div>
</div>
