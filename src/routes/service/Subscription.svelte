<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {onMount} from "svelte";
    import {Bootpay} from "@bootpay/client-js";
    import {knEmailHeader, knNameHeader, knPhoneNumber, subscriptionManagementData,} from "../../lib/store.js";
    import CalendarPop from "../../components/service/environment/subscription/CalendarPop.svelte";
    import PaymentPop from "../../components/service/environment/subscription/PaymentPop.svelte";
    import UnsubscribePop from "../../components/service/environment/subscription/UnsubscribePop.svelte";
    import Pagination from "../../components/common/ui/Pagination.svelte";
    import {openAsk, openBanner} from "../../components/common/ui/DialogManager.js";
    import {ajaxGet, ajaxParam} from "../../components/common/ajax.js";

    onMount(() => {
        console.log('pn', $knPhoneNumber);
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
        ajaxGet('/v2/api/Company/paymentList', false, (res) => {
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
        open: (useDate) =>{
            calendarService.visibility = true;
        },
        close: () => {
            calendarService.visibility = false;
        }
    }

    const paymentService = {
        visibility: false,
        open: () =>{
            paymentService.visibility = true;
        },
        close: () => {
            paymentService.visibility = false;
        }
    }

    const unsubscribeService = {
        visibility: false,
        open: () =>{
            unsubscribeService.visibility = true;
        },
        close: () => {
            unsubscribeService.visibility = false;
        }
    }

    const bootpayChangePaymentMethod = () => {
        Bootpay.requestSubscription({
            application_id: import.meta.env.VITE_BOOT_PAY_SECRET,
            pg: '나이스페이',
            order_name: '코코넛 이용을 위한 카드 등록',
            subscription_id: (new Date()).getTime(),
            user: {
                username: $knNameHeader,
                phone: $knPhoneNumber,
                email: $knEmailHeader
            },
            extra: {
                subscription_comment: '매월 사용료에 따라 결제됩니다. 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
                subscribe_test_payment: true
            }
        }).then(handleChangePaymentMethodSuccess, handleChangePaymentMethodFail);
    }

    const handleChangePaymentMethodSuccess = (res) => {
        console.log(res)
        if (res.event === 'done') {
            const receiptIdInfo = {
                payReceiptId: res.data?.receipt_id,
            }
            if (!receiptIdInfo.payReceiptId) {
                // 문제 알리기
                return;
            }
            ajaxParam('/v2/api/Payment/billingSave', receiptIdInfo, (res) => {
                openBanner('결제 수단 변경을 완료했습니다.');
            });
        } else {
            // 문제 일어날 가능성 살펴 추가
        }
    }

    const handleChangePaymentMethodFail = (err) => {
        console.log(err);
        // 각종 에러 가능성 살펴 등록, 필요할 경우 공용코드로
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
            callback: bootpayChangePaymentMethod, // 확인버튼시 동작
        });
    };

    const payStateName = {
        '0': '결제오류',
        '1': '결제완료',
        '2': '결제예약중',
    };

    const payMethodName = {
        '0': '자동결제',
        '1': '요금정산',
        '2': '결제실패',
    }

    const cpiPayTypeName = {
        '0': '월 정기 구독',
        '1': '연 정기 구독',
    };
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>구독관리</h1>
        </div>
        <div class="seaContentBox marB50">
            <div class="seaContentLine borB">
                <div class="seaCont wid50per">
                    <dl>이용중인 상품</dl>
                    <div class="myInfoBox">
                        <div class="top_stand0{($subscriptionManagementData.companyPaymentInfo.cpiPayType + 1) * 2 - 1}">{cpiPayTypeName[$subscriptionManagementData.companyPaymentInfo.cpiPayType]}</div>
                        <!--
                        <div class="top_stand02">Standard2</div>
                        <div class="top_stand03">Standard3</div>
                        -->
                    </div>
                </div>
                <div class="seaCont wid50per">
                    <dl>결제일</dl>
                    <div class="myInfoBox">
                        <span>1일~말일 요금, 익월 5일 결제</span>
                    </div>
                </div>
            </div>
            <div class="seaContentLine borB">
                <div class="seaCont wid50per">
                    <dl>결제수단</dl>
                    <div class="myInfoBox">
                        <span>{$subscriptionManagementData.companyPaymentInfo.cpiInfoCardName}</span>
                        <button class="myinfoChangeBtn" id="method_pop" on:click={handleChangePayMethod}>변경</button>
                    </div>
                </div>
                <div class="seaCont wid50per">
                    <dl>결제 하실 이용요금</dl>
                    <div class="myInfoBox">
                        <span><dd>4,656원</dd></span>
                        <button class="myinfoChangeBtn" id="subscribe_pop" on:click={paymentService.open}>결제</button>
                        <button class="myinfoChangeBtn marL8impor" id="unsubscribe_pop" on:click={unsubscribeService.open}>구독해지</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 테이블 영역 -->
        <div class="kotable subscription">
            <table>
                <caption>1:1문의 리스트</caption>
                <colgroup>
                    <col style="width:16.44%;">
<!--                    <col style="width:24.66%;">-->
                    <col style="width:13.70%;">
                    <col style="width:13.70%;">
                    <col style="width:12.33%;">
                    <col style="width:9.59%;">
                    <col style="width:9.59%;">
                </colgroup>
                <thead>
                <tr>
                    <th>요금부과 기간</th>
<!--                    <th>이용상품</th>-->
                    <th>등록된 개인정보 평균</th>
                    <th>결제 일시</th>
                    <th>결제 금액</th>
                    <th>결제상태</th>
                    <th>결제방법</th>
                </tr>
                </thead>
                <tbody>
                {#each $subscriptionManagementData.paymentList.dataList as {payBillingStartDate, payBillingEndDate, payPrivacyCount, insert_date, payAmount, payState, payMethod}}
                    <tr>
                        <td>{payBillingStartDate} - {payBillingEndDate.substring(5, 10)}</td>
                        <td><div class="cur_priNum open_current_pop" on:click={() => {calendarService.open(payBillingEndDate)}}>{payPrivacyCount}</div></td>
                        <td>{insert_date}</td>
                        <td>{payAmount.toLocaleString()}원</td>
                        <td class={payState === '0' ? 'failtext' : ''}>{payStateName[payState]}</td>
                        <td>{payMethodName[payMethod]}</td>
                    </tr>
                {/each}
                </tbody>
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
    <PaymentPop {paymentService} />
{/if}

{#if unsubscribeService.visibility}
    <UnsubscribePop {unsubscribeService} />
{/if}