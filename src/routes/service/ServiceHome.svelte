<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import WidgetTodayStatus from "../../components/service/home/WidgetTodayStatus.svelte";
    import DynamicComponentPlacer from "../../components/service/home/DynamicComponentPlacer.svelte";
    import {userInfoData} from "../../lib/store.js";
    import PopInformAskSubscribe from "../../components/service/home/PopInformAskSubscribe.svelte";
    import {bootpayContinueSubscription, bootpayStartSubscription} from "../../components/common/bootpayment.js";
    import {openAsk, openConfirm} from "../../components/common/ui/DialogManager.js";
    import {logout} from "../../components/common/authActions.js";
    import {ajaxParam, reportCatch} from "../../components/common/ajax.js";
    import {openBanner} from "../../components/common/ui/DialogManager.js";

    let isBillingCheckTriggerNotActivatedYet = true;

    const askSubscribeService = {
        visibility: false,
        texts: {
            title: '',
            content: '',
            notification: '',
            agreement: '',
        },
        handleNext: () => {},
        handleCancel: () => {},
        askStartSubscribe: () => {
            askSubscribeService.texts = {
                title: '구독 시작',
                content: '서비스의 이용을 위해서는 카드를 등록하여 구독을 시작해야 합니다.',
                notification: '처음 한달간의 구독요금은 청구되지 않습니다. (클라우드 이용 요금만 청구) 수정필요',
                agreement: '안내사항을 확인하였으며, 구독을 시작하는 것에 대해 동의합니다.',
            };
            askSubscribeService.handleNext = () => {
                bootpayStartSubscription((res) => {

                }, (err) => {
                    openConfirm({
                        icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: "결제수단 등록 실패", // 제목
                        contents1: err.message,
                        contents2: '필요시, 관리자에게 해당 사실을 문의해 주세요.',
                        btnCheck: '확인', // 확인 버튼의 텍스트
                        callback: () => {
                            askSubscribeService.askStartSubscribe();
                        }
                    });
                });
                askSubscribeService.visibility = false;
            };
            askSubscribeService.handleCancel = () => {
                openAsk({
                    callback: () => {
                        askSubscribeService.visibility = false;
                        logout();
                    }, // 로그아웃 공용화하여 추가
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '로그아웃 하시겠습니까?', // 제목
                    btnStart: '로그아웃', // 실행 버튼의 텍스트
                    btnCancel: '취소', // 취소 버튼의 텍스트
                });
            };
            askSubscribeService.visibility = true;
        },
        askContinueSubscribe: () => {
            askSubscribeService.texts = {
                title: '구독 다시하기',
                content: '서비스의 이용을 위해서는 구독 다시하기가 필요합니다.',
                notification: '다시 요금이 청구됩니다. 수정필요',
                agreement: '안내사항을 확인하였으며, 구독을 재개하는 것에 대해 동의합니다.',
            };
            askSubscribeService.handleNext = $userInfoData.paymentDeleteCancel === "1" ? askSubscribeService.continueSubscribeWhenCardInfoExist : askSubscribeService.continueSubscribeWhenCardInfoDeleted;
            askSubscribeService.handleCancel = () => {
                openAsk({
                    callback: () => {
                        askSubscribeService.visibility = false;
                        logout();
                    }, // 로그아웃 공용화하여 추가
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '로그아웃 하시겠습니까?', // 제목
                    btnStart: '로그아웃', // 실행 버튼의 텍스트
                    btnCancel: '취소', // 취소 버튼의 텍스트
                });
            };
            askSubscribeService.visibility = true;
        },
        continueSubscribeWhenCardInfoDeleted: () => {
            bootpayContinueSubscription((res) => {

            }, (err) => {
                openConfirm({
                    icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: "결제수단 등록 실패", // 제목
                    contents1: err.message,
                    contents2: '필요시, 관리자에게 해당 사실을 문의해 주세요.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                    callback: () => {
                        askSubscribeService.askContinueSubscribe();
                    }
                });
            });
            askSubscribeService.visibility = false;
        },
        continueSubscribeWhenCardInfoExist: () => {
            ajaxParam('/v2/api/Payment/billingDeleteCancel', {}, (res) => {
                try {
                    openBanner('구독을 재개하였습니다.');
                    userInfoData.update(obj => {
                        obj.paymentBillingCheck = '1';
                        return obj;
                    });
                    askSubscribeService.visibility = false;
                } catch (e) {
                    reportCatch('temp051', e);
                }
            });
        },
    }

    const subscribableRoleList = ['ROLE_MASTER', 'ROLE_ADMIN']

    $: if(isBillingCheckTriggerNotActivatedYet && $userInfoData.paymentBillingCheck === '0') { // 0은 새로 가입된 사람임을 의미
        if (subscribableRoleList.includes($userInfoData.role)) {
            isBillingCheckTriggerNotActivatedYet = false;
            askSubscribeService.askStartSubscribe();
        } else {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "구독이 필요합니다.", // 제목
                contents1: '서비스 사용을 위해서 구독이 필요합니다.',
                contents2: '관리자에게 해당 사실을 문의해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    logout();
                }
            });
        }
    } else if ($userInfoData.paymentBillingCheck === '2') { // 2는 구독을 해지한 사람임을 의미
        console.log($userInfoData);
        if (subscribableRoleList.includes($userInfoData.role)) {
            isBillingCheckTriggerNotActivatedYet = false;
            askSubscribeService.askContinueSubscribe();
        } else {
            openConfirm({
                icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "구독 다시하기가 필요합니다.", // 제목
                contents1: '구독이 해지되어 서비스를 사용할 수 없습니다.',
                contents2: '관리자에게 해당 사실을 문의해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    logout();
                }
            });
        }
    }
</script>
<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="maincontent">
            <div class="pageH1_type01">
                <h1><span>{$userInfoData.knName}</span>님, 안녕하세요!</h1>
            </div>
<!--            <WidgetSwiperNews />-->
            <WidgetTodayStatus />
            <DynamicComponentPlacer />
        </div>
    </div>
</section>

{#if askSubscribeService.visibility}
    <PopInformAskSubscribe {askSubscribeService}/>
{/if}