<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {onMount, onDestroy} from "svelte";
    import {bootpayChangeToAnotherMethod} from "../../components/common/bootpayment.js";
    import {
        backBtn,
        initialSubscriptionManagement,
        mainScreenBlockerVisibility,
        subscriptionManagementData,
        userInfoData,
    } from "../../lib/store.js";
    import CalendarPop from "../../components/service/environment/subscription/CalendarPop.svelte";
    import PaymentPop from "../../components/service/environment/subscription/PaymentPop.svelte";
    import UnsubscribePop from "../../components/service/environment/subscription/UnsubscribePop.svelte";
    import Pagination from "../../components/common/ui/Pagination.svelte";
    import {openAsk} from "../../components/common/ui/DialogManager.js";
    import {ajaxGet, ajaxParam, reportCatch} from "../../components/common/ajax.js";
    import {link} from "svelte-spa-router";
    import LoadingOverlay from "../../components/common/ui/LoadingOverlay.svelte";
    import {onlyNumber} from "../../lib/common.js";
    import ErrorHighlight from "../../components/common/ui/ErrorHighlight.svelte";
    import {fade} from "svelte/transition";
    import {logout} from "../../components/common/authActions.js";
    import {openConfirm} from "../../components/common/ui/DialogManager.js";

    let payBeforeUnsubscribeConfirmVisibility = false;
    let unsubscribeDoneConfirmVisibility = false;

    $: isModifiable = ['ROLE_MASTER', 'ROLE_ADMIN'].includes($userInfoData.role);
    let gotPaymentState = 0;

    onMount(() => {
        subscriptionManagementData.set(JSON.parse(initialSubscriptionManagement));
        getCompanyPaymentInfo();
        getPaymentList();
    });

    onDestroy(() => {
        subscriptionManagementData.set(JSON.parse(initialSubscriptionManagement));
    });

    const getCompanyPaymentInfo = () => {
        ajaxGet('/v2/api/Company/companyPaymentInfo', false, (res) => {
            try {
                subscriptionManagementData.update(obj => {
                    obj.companyPaymentInfo = res.data.sendData.paymentInfo;
                    return obj;
                });
            } catch (e) {
                reportCatch('temp001', e);
            }
        });
    }
    
    const getPaymentList = () => {
        gotPaymentState = 0;
        ajaxGet('/v2/api/Company/paymentList', false, (res) => {
            try {
                gotPaymentState = 1;
                subscriptionManagementData.update(obj => {
                    obj.paymentList.dataList = res.data.datalist;
                    obj.paymentList.total_rows = res.data.total_rows;
                    return obj;
                });
            } catch (e) {
                reportCatch('temp002', e);
            }
        });
    }

    const calendarService = {
        visibility: false,
        year: 2023,
        month: 8,
        open: (useDate) => {
            calendarService.year = Number(useDate.substring(0, 4));
            calendarService.month = Number(useDate.substring(5, 7));
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

    const suspendSubscriptionPopService = {
        visible: false,
        isCautionChecked: '',
        requestData: {
            downloadReason: '',
            otpValue: '',
        },
        downloadReasonErrMsg: '',
        otpValueErrMsg: '',
        cautionErrMsg: '',
        open: () => {
            suspendSubscriptionPopService.visible = true;
        },
        close: () => {
            suspendSubscriptionPopService.visible = false;
        },
        proceedCancelSubscription: () => {
            if (!suspendSubscriptionPopService.requestData.otpValue) {
                suspendSubscriptionPopService.otpValueErrMsg = 'OTP를 적어주세요.';
                return;
            } else {
                suspendSubscriptionPopService.otpValueErrMsg = '';
            }

            if (!suspendSubscriptionPopService.isCautionChecked) {
                suspendSubscriptionPopService.cautionErrMsg = '주의사항을 확인하고 체크해 주세요.';
                return;
            } else {
                suspendSubscriptionPopService.cautionErrMsg = '';
            }

            mainScreenBlockerVisibility.set(true);

            ajaxParam('/v2/api/Payment/billingDelete', suspendSubscriptionPopService.requestData, (res) => {
                try {
                    mainScreenBlockerVisibility.set(false);
                    openConfirm({
                        icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: "구독 해지를 완료하였습니다.", // 제목
                        contents1: '그동안 이용해 주셔서 감사합니다.',
                        contents2: '로그인 페이지로 이동합니다.',
                        btnCheck: '확인', // 확인 버튼의 텍스트
                        callback: logout,
                    });
                } catch (e) {
                    reportCatch('temp004', e);
                }
            }, (errCode, errMsg) => {
                try {
                    mainScreenBlockerVisibility.set(false);
                } catch (e) {
                    reportCatch('temp005', e);
                }
            });
        },
    }
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
                            &nbsp;&nbsp;<button class="myinfoChangeBtn marL8impor" id="unsubscribe_pop" on:click={suspendSubscriptionPopService.open}>구독해지</button>
                        {/if}
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

        <LoadingOverlay bind:loadState={gotPaymentState} top={150} >
            <!-- 테이블 영역 -->
            <div class="kotable subscription" in:fade>
                <table>
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
                </table>
            </div>
        </LoadingOverlay>

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

{#if suspendSubscriptionPopService.visible}
    <!-- [D] 구독 해지 -->
    <div class="koko_popup excel_download_pop" data-popup="excel_download_pop" in:fade out:fade >
        <div class="koko_popup_inner">
            <div class="koko_popup_container">
                <div class="koko_popup_title">
                    <h3 class="">구독 해지</h3>
                </div>
                <form>
                    <div class="kopopinput marB24">
                        <label>사유</label>
                        <textarea placeholder="사유를 적어주세요." bind:value={suspendSubscriptionPopService.requestData.downloadReason}></textarea>
                        <ErrorHighlight bind:message={suspendSubscriptionPopService.downloadReasonErrMsg}/>
                    </div>
                    <div class="kopopinput marB24">
                        <label>구글 OTP 인증번호(6자리)</label>
                        <input type="text" bind:value={suspendSubscriptionPopService.requestData.otpValue} maxlength="6"
                               on:keyup={() => suspendSubscriptionPopService.requestData.otpValue = onlyNumber(suspendSubscriptionPopService.requestData.otpValue)} placeholder="OTP를 적어주세요." />
                        <ErrorHighlight bind:message={suspendSubscriptionPopService.otpValueErrMsg}/>
                    </div>
                    <div class="popcaseInfoBox">
                        <p>주의사항</p>
                        <dl>구독은 즉시 해지되며 데이터는 한달후 일괄 삭제됩니다.</dl>
                        <dl>삭제된 데이터는 복구되지 않습니다.</dl>
                        <dl>서비스 요금은 이번 달 일할계산으로 계산되어 청구됩니다.</dl>
                    </div>
                    <div class="koko_check">
                        <input type="checkbox" value="1" id="pricheck" bind:checked={suspendSubscriptionPopService.isCautionChecked}>
                        <label for="pricheck">
                            <em></em>
                            <p class="check">주의사항에 대해 확인했습니다.</p>
                        </label>
                        <ErrorHighlight bind:message={suspendSubscriptionPopService.cautionErrMsg}/>
                    </div>

                    <div class="kokopopBtnBox">
                        <div class="koko_go"><button type="button" on:click={suspendSubscriptionPopService.proceedCancelSubscription}>구독해지</button></div>
                        <div class="koko_cancel" on:click={suspendSubscriptionPopService.close}>취소</div>
                    </div>
                </form>
            </div>
            <div class="koko-popup-close excel_download_pop_close" data-popup-close="excel_download_pop_close" on:click={suspendSubscriptionPopService.close} ></div>
        </div>
    </div>
    <!-- // [D] 구독 해지 -->
{/if}