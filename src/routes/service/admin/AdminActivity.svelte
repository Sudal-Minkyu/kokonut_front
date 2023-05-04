
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"

    import ActivitySearch from '../../../components/service/admin/activity/ActivitySearch.svelte'
    import ActivityTable from '../../../components/service/admin/activity/ActivityTable.svelte'
    import ActivityExcel from '../../../components/service/admin/activity/ActivityExcel.svelte'

    import Paging from '../../../components/common/Paging.svelte'

    import restapi from "../../../lib/api.js"

    import {page} from "../../../lib/store.js"
    import jQuery from 'jquery';

    import { onMount } from "svelte";


    import {stimeVal, setDateRangePicker} from "../../../lib/libSearch.js";

    onMount(async ()=>{
        await fatchSearchModule();

    })

    async function fatchSearchModule(){
        setDateRangePicker('stime', true, 'period');

        // 페이지번호 초기화
        page.set(0);
        activityList($page);
    }

    let activity_list = [];
    let size = 10;
    let total = 0;
    let total_page;
    $: total_page = Math.ceil(total/size)

    function activityList(pageNum) {
        console.log("관리자 활동이력 리스트 데이터 호출");

        // $: $page, activityList(page); 대체함
        page.set(pageNum);

        console.log("searchText : "+searchText);
        console.log("stimeVal : "+stimeVal);
        console.log("actvityType : "+actvityType);

        let url = "/v2/api/History/activityList?page=" + pageNum+"&size="+size;
        let sendData = {
            searchText : searchText,
            stime : stimeVal,
            actvityType : actvityType,
        };

        restapi('v2', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");
                    // console.log(json_success);
                    activity_list = json_success.data.datalist
                    total = json_success.data.total_rows
                    // console.log(activity_list);
                    // console.log(total);
                } else {
                    // alert(json_success.data.err_msg);
                    activity_list = [];
                    total = 0;
                    console.log("조회된 데이터가 없습니다.");
                }
                // console.log("관리자활동이력 리스트 호출 성공");
            },
            (json_error) => {
                console.log(json_error);
                console.log("관리자활동이력 리스트 호출 실패");
            }
        )
    }

    // 검색 변수
    let searchText = ""; // 이름 및 이메일 검색
    let actvityType =""; // 활동선택

    let choseMax = false;
    let choseMaxText = '';
    function activityConfirm() {
        let select_text = '';
        actvityType = '';
        if(jQuery("input[name='activity']:checked").length === 0){
            console.log("1");
            choseMax = true;
            choseMaxText = '최소 한개 이상의 선택은 진행해주셔야 합니다.';
            return false;
        }

        let count = jQuery("input[name='activity']:checked").length;
        if(count > 5){
            console.log("2");
            choseMax = true;
            choseMaxText = '5개 이상 선택 할 수 없습니다.';
        }
        else{
            jQuery('input[type="checkbox"]:checked').each(function (index) {
                if (index !== 0) {
                    select_text += ', ';
                    actvityType += ',';
                }
                actvityType += jQuery(this).val();

                const answer = jQuery(this).attr("id");
                select_text += jQuery("label[for='"+answer+"']").text();

                document.getElementById('result').innerText = select_text;
                jQuery('.floatCheckBox').css("display", 'none');
            });
            choseMax = false;
            choseMaxText = '';

            // actvityType = '['+actvityType+']'
            console.log("바뀌기전 actvityType : "+actvityType);
            // actvityType = actvityType.split(",");
            // console.log("바뀌기후 actvityType : "+actvityType);
            console.log("바뀌기후 select_text : "+select_text);
        }
    }

    function activityCancel() {
        actvityType = '';
        jQuery(".act_sel").prop("checked",false);
        document.getElementById('result').innerText = '활동전체';
        jQuery('.floatCheckBox').css("display", 'none');
    }

    // 엔터키 클릭.. 모듈화필요..
    function enterPress(event) {
        if(event.key === "Enter") {
            // 페이지번호 초기화
            page.set(0);
            activityList($page);
        }
    }

    let excelPop = false;
    function excelPopClick() {
        excelPop = !excelPop
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>관리자 활동 이력</h1>
        </div>

        <div class="seaWrap">
            <div class="kotopBtn">
                <button id="excel_download_pop" on:click={excelPopClick}>현재목록 엑셀 다운로드</button>
            </div>
            <div class="koinput marB32">
                <input type="text" bind:value="{searchText}" class="wid360" placeholder="이름, 이메일 검색" on:keypress={enterPress} />
                <button on:click={() => activityList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <ActivitySearch {choseMax} {choseMaxText} {activityCancel} {activityConfirm} />

        <ActivityTable {activityList} {activity_list} {total} {size} {total_page} />

        <Paging total_page="{total_page}" data_list="{activity_list}" dataFunction="{activityList}" />

    </div>
</section>

{#if excelPop}
    <ActivityExcel {excelPopClick} {total} />
{/if}