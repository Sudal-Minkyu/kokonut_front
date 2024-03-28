<script>
    import Header from "../../../components/admin/layout/Header.svelte";
    import {onMount, onDestroy} from "svelte";
    import {
        initialSubscriptionManagement,
        mainScreenBlockerVisibility,
        subscriptionManagementData,
        userInfoData,
    } from "../../../lib/store.js";

    import Pagination from "../../../components/common/ui/Pagination.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../../components/common/ajax.js";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {fade} from "svelte/transition";
    import {logout} from "../../../components/common/authActions.js";
    import {openConfirm} from "../../../components/common/ui/DialogManager.js";


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
        ajaxGet('/v4/api/Papment/paymentList', false, (res) => {
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
            <h1>결제 관리</h1>
        </div>

        <LoadingOverlay bind:loadState={gotPaymentState} top={150} >
            <!-- 테이블 영역 -->
            <div class="kotable subscription" in:fade>
                <table>
<!--                    <colgroup>-->
<!--                        <col style="width:21.82%;">-->
<!--                        <col style="width:18.16%;">-->
<!--                        <col style="width:18.16%;">-->
<!--                        <col style="width:16.35%;">-->
<!--                        <col style="width:12.71%;">-->
<!--                        <col style="width:12.71%;">-->
<!--                    </colgroup>-->
                    <thead>
                    <tr>
                        <th>요금부과 기간</th>
                        <th>기업명</th>
                        <th>등록된 개인정보 평균</th>
                        <th>결제 일시</th>
                        <th>결제 금액</th>
                        <th>결제상태</th>
                        <th>결제방법</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $subscriptionManagementData.paymentList.dataList as {cpName, payBillingStartDate, payBillingEndDate, payPrivacyCount, payReserveExecuteDate, payAmount, payState, payMethod}}
                        <tr>
                            <td>{payBillingStartDate} - {payBillingEndDate.substring(5, 10)}</td>
                            <td>{cpName}</td>
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
