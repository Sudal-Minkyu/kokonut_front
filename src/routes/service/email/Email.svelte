
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import {push} from 'svelte-spa-router'
    import EmailSearch from '../../../components/service/email/EmailSearch.svelte'
    import EmailTable from '../../../components/service/email/EmailTable.svelte'
    import Paging from '../../../components/common/Paging.svelte'
    import {onMount} from "svelte";
    import {stimeVal, setOptionItem} from "../../../components/common/action/DatePicker.js";
    import {ajaxGet} from "../../../components/common/ajax.js";
    import {userInfoData} from "../../../lib/store.js";
    import {openConfirm} from "../../../components/common/ui/DialogManager.js";
    import {debounce200} from "../../../components/common/eventRateControls.js";

    onMount(async () => {
        await fatchSearchModule();
    });

    async function fatchSearchModule(){
        setOptionItem(customSelectBoxOpt);
        emailSendList(0);
    }

    // 이메일 사용가능여부 체크
    const checkEmailColumnAvailableInterval = setInterval(() => {
        let chkCount = 0;
        if (chkCount === 100) { // 10초간 사용자 정보를 가져오지 못하면......
            openConfirm({
                icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "통신 상태 불량", // 제목
                contents1: '이메일 주소가 담겨있는 항목을 가져오지 못했습니다.',
                contents2: '통신 연결 상태를 점검하시고, 이상이 없는 경우 관리자에게 문의해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    push('/service');
                },
            });
            clearInterval(checkEmailColumnAvailableInterval);
            return;
        }

        if ($userInfoData.emailSendSettingState === '') {
            chkCount++;
            return;
        }

        if ($userInfoData.emailSendSettingState === '0') {
            const openConfirmProps = {
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "이메일 항목 지정 필요", // 제목
                contents1: '이메일 주소가 담겨있는 항목의 지정이 필요합니다.',
                contents2: '최고관리자에게 해당 사실을 문의해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    push('/service');
                },
            };
            if (['ROLE_MASTER', 'ROLE_ADMIN'].includes($userInfoData.role)) {
                openConfirmProps.contents2 = '서비스 설정 페이지로 이동합니다.';
                openConfirmProps.callback = () => {
                    push('/service/environment/setting');
                };
            }
            openConfirm(openConfirmProps);
        }
        clearInterval(checkEmailColumnAvailableInterval);
    }, 100);

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
        console.log("이메일 발송내역 리스트 호출!");
        searchCondition.stime = stimeVal;
        searchCondition.page = page;

        let url = "/v2/api/Email/emailList";

        ajaxGet(url, searchCondition, (res) => {
            console.log(res);
            email_list = res.data.datalist;
            total = res.data.total_rows;
        }, (errCode, errMsg) => {
            email_list = [];
            total = 0;
            return {action: 'NONE'};
        });
    });

    function enterPress(event) {
        if(event.key === "Enter") {
            emailSendList(0);
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
                <input type="text" bind:value="{searchCondition.searchText}" class="wid360" placeholder="이름, 이메일 검색" on:keypress={enterPress} />
                <button on:click={() => emailSendList(0)}><img src="/assets/images/common/icon_search.png" alt=""></button>
            </div>
        </div>

        <EmailSearch {searchCondition} {emailSendList} />

        <EmailTable {emailSendList} {email_list} {total} {size} {total_page} />

        <Paging page={searchCondition.page} total_page="{total_page}" data_list="{email_list}" dataFunction="{emailSendList}" />

    </div>
</section>