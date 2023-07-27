<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {onMount} from "svelte";
    import {bootpayChangeToAnotherMethod} from "../../components/common/bootpayment.js";
    import {backBtn, subscriptionManagementData, userInfoData,} from "../../lib/store.js";
    import CalendarPop from "../../components/service/environment/subscription/CalendarPop.svelte";
    import PaymentPop from "../../components/service/environment/subscription/PaymentPop.svelte";
    import UnsubscribePop from "../../components/service/environment/subscription/UnsubscribePop.svelte";
    import Pagination from "../../components/common/ui/Pagination.svelte";
    import {openAsk} from "../../components/common/ui/DialogManager.js";
    import {ajaxGet} from "../../components/common/ajax.js";
    import {link} from "svelte-spa-router";
    import LoadingOverlay from "../../components/common/ui/LoadingOverlay.svelte";

    let payBeforeUnsubscribeConfirmVisibility = false;
    let unsubscribeDoneConfirmVisibility = false;

    $: isModifiable = ['ROLE_MASTER', 'ROLE_ADMIN'].includes($userInfoData.role);
    let gotPaymentState = 0;

    onMount(() => {
        getCompanyPaymentInfo();
        getPaymentList();
    });

    const getCompanyPaymentInfo = () => {
        ajaxGet('/v2/api/Company/companyPaymentInfo', false, (res) => {
            console.log('기초데이터', res);
            subscriptionManagementData.update(obj => {
                obj.companyPaymentInfo = res.data.sendData.paymentInfo;
                return obj;
            });
        });
    }
    
    const getPaymentList = () => {
        gotPaymentState = 0;
        ajaxGet('/v2/api/Company/paymentList', false, (res) => {
            gotPaymentState = 1;
            console.log('기초데이터2', res);
            subscriptionManagementData.update(obj => {
                obj.paymentList.dataList = res.data.datalist;
                obj.paymentList.total_rows = res.data.total_rows;
                return obj;
            });
        });
    }

    const calendarService = {
        visibility: false,
        open: (useDate) => {
            calendarService.visibility = true;
        },
        close: () => {
            calendarService.visibility = false;
        }
    }

    const paymentService = {
        visibility: false,
        open: () => {
            paymentService.visibility = true;
        },
        close: () => {
            paymentService.visibility = false;
        }
    }

    const unsubscribeService = {
        visibility: false,
        open: () => {
            unsubscribeService.visibility = true;
        },
        close: () => {
            unsubscribeService.visibility = false;
        }
    }

    const handleChangePayMethod = () => {
        openAsk({
            icon: 'question', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '결제 수단 변경', // 제목
            contents1: '결제 수단을 변경 하시겠습니까?', // 내용
            contents2: '',
            btnCheck: '', // 확인 버튼의 텍스트
            btnStart: '변경하기', // 실행 버튼의 텍스트
            btnCancel: '취소', // 취소 버튼의 텍스트
            callback: (res) => {
                bootpayChangeToAnotherMethod((successRes)=>{
                    getCompanyPaymentInfo();
                });
            }, // 확인버튼시 동작
        });
    };

    const handlePayment = () => {
        payBeforeUnsubscribeConfirmVisibility = false;
        paymentService.open();
    }

    const handleUnsubscribeBtn = () => {
        if (false) { // 잔금이 없을 경우
            unsubscribeService.open();
        } else { // 잔금이 존재할 경우
            payBeforeUnsubscribeConfirmVisibility = true;
        }
    }

    const payStateName = {
        '0': '결제실패',
        '1': '결제완료',
        '2': '결제예약중',
    };

    const payMethodName = {
        '0': '자동결제',
        '1': '요금정산',
    };

    const cpiPayTypeName = {
        '0': '월 정기 구독',
        '1': '연 정기 구독',
    };
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a>
            <h1>구독관리</h1>
        </div>
        <div class="seaContentBox marB50">
            <div class="seaContentLine borB">
                <div class="seaCont wid50per">
                    <dl>이용중인 상품</dl>
                    <div class="myInfoBox">
                        <div class="top_stand0{($subscriptionManagementData.companyPaymentInfo.cpiPayType + 1) * 2 - 1}">{cpiPayTypeName[$subscriptionManagementData.companyPaymentInfo.cpiPayType]}</div>
                        {#if $userInfoData.role === 'ROLE_MASTER' }
                            &nbsp;&nbsp;<button class="myinfoChangeBtn marL8impor" id="unsubscribe_pop" on:click={handleUnsubscribeBtn}>구독해지</button>
                        {/if}
                        <!--
                        <div class="top_stand02">Standard2</div>
                        <div class="top_stand03">Standard3</div>
                        -->
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB">
                <div class="seaCont wid50per">
                    <dl>결제수단</dl>
                    <div class="myInfoBox">
                        <span>{$subscriptionManagementData.companyPaymentInfo.cpiInfoCardName}</span>
                        {#if isModifiable }
                            <button class="myinfoChangeBtn" id="method_pop" on:click={handleChangePayMethod}>변경</button>
                        {/if}
                    </div>
                </div>
                <div class="seaCont wid50per">
                    <dl>결제일</dl>
                    <div class="myInfoBox">
                        <span>1일~말일 요금, 익월 5일 결제</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 테이블 영역 -->
        <div class="kotable subscription">
            <table>
                <caption>1:1문의 리스트</caption>
                <colgroup>
                    <col style="width:21.82%;">
                    <col style="width:18.16%;">
                    <col style="width:18.16%;">
                    <col style="width:16.35%;">
                    <col style="width:12.71%;">
                    <col style="width:12.71%;">
                </colgroup>
                <thead>
                <tr>
                    <th>요금부과 기간</th>
                    <th>등록된 개인정보 평균</th>
                    <th>결제 일시</th>
                    <th>결제 금액</th>
                    <th>결제상태</th>
                    <th>결제방법</th>
                </tr>
                </thead>
                <LoadingOverlay bind:loadState={gotPaymentState} >
                    <tbody>
                    {#each $subscriptionManagementData.paymentList.dataList as {payBillingStartDate, payBillingEndDate, payPrivacyCount, payReserveExecuteDate, payAmount, payState, payMethod}}
                        <tr>
                            <td>{payBillingStartDate} - {payBillingEndDate.substring(5, 10)}</td>
                            <td><div class="cur_priNum open_current_pop" on:click={() => {calendarService.open(payBillingEndDate)}}>{payPrivacyCount}</div></td>
                            <td>{payReserveExecuteDate}</td>
                            <td>{payAmount.toLocaleString()}원</td>
                            <td class={payState === '0' ? 'failtext' : ''}>{payStateName[payState]}</td>
                            <td>{payMethodName[payMethod]}</td>
                        </tr>
                    {/each}
                    {#if $subscriptionManagementData.paymentList.dataList.length === 0}
                        <tr>
                            <td colspan="99">요금부과 내역이 없습니다.</td>
                        </tr>
                    {/if}
                    </tbody>
                </LoadingOverlay>
            </table>
        </div>

        <Pagination bind:currentPage={$subscriptionManagementData.paymentList.current}
                    bind:totalPosts={$subscriptionManagementData.paymentList.total_rows}
                    on:change={()=>{}} />
    </div>
</section>

<div class="dim"></div>

{#if calendarService.visibility}
    <CalendarPop {calendarService} />
{/if}

{#if paymentService.visibility}
    <PaymentPop {paymentService} bind:unsubscribeDoneConfirmVisibility />
{/if}

{#if unsubscribeService.visibility}
    <UnsubscribePop {unsubscribeService} />
{/if}

{#if unsubscribeDoneConfirmVisibility}
    <div class="koko_popup">
        <div class="layerPopType" id="tip_box03" style="display: block">
            <header class="popHeader">
                <img src="/assets/images/common/minipop_pass.png" alt="">
                <h4 class="popTit">해지가 완료되었습니다.</h4>
            </header>
            <section class="popContents">
                <p>
                    그 동안 서비스를 이용해 주셔서 감사합니다.<br>
                    해지 취소를 원하신다면 고객센터로 연락주세요.
                </p>
            </section>
            <div class="popcBtnBox">
                <button type="button" id="tip_close03" class="layerBtn">확인</button>
            </div>
        </div>
    </div>
{/if}

{#if payBeforeUnsubscribeConfirmVisibility}
    <div class="koko_popup">
        <div class="layerPopType" id="tip_box04" style="display: block">
            <header class="popHeader">
                <img src="/assets/images/common/minipop_stop.png" alt="">
                <h4 class="popTit">남은 요금을 결제해 주세요</h4>
            </header>
            <section class="popContents">
                <p>
                    결제 후에 구독해지를 진행할 수 있습니다.
                </p>
            </section>
            <div class="popcBtnBox">
                <button type="button" id="tip_close04" class="layerBtn" on:click={handlePayment}>확인</button>
            </div>
        </div>
    </div>
{/if}