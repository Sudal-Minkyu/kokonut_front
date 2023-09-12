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
                content: '코코넛 서비스 이용을 위해 카드를 먼저 등록해야 합니다.',
                notification: '꼭 유의해주세요! 요금이 바로 청구되지 않아요.<br /><br />' +
                    '- 카드 등록한 날로부터 첫 한 달간(30일)은 요금이 청구되지 않습니다.<br />' +
                    '&nbsp;&nbsp; 서비스 이용료, 클라우드 서버 이용료 모두 무료입니다.<br />' +
                    '&nbsp;&nbsp; ex. 9월 11일 카드 등록 시, 10월 11일까지 무료 이용 가능<br /><br />' +
                    '- 무료 기간인 첫 한 달은 코코넛 서비스를 이해하고<br />' +
                    '&nbsp;&nbsp; 개인정보 데이터 이관 및 연동 작업이 진행되는 최대 기간입니다.<br /><br />' +
                    '- 무료 기간이 끝나기 전에 언제든 해지할 수 있습니다.<br />' +
                    '&nbsp;&nbsp; 단, 해지한 직후부터 무료 이용 기간은 종료되어 서비스 이용이 즉시 제한됩니다.<br /><br />' +
                    '- 무료 체험 기간이 끝난 월의 비용은 보유 개인정보량과<br />' +
                    '&nbsp;&nbsp; 서버 이용 실비에 맞춰 등록된 카드에서 자동으로 요금이 결제됩니다.<br />' +
                    '&nbsp;&nbsp; ex. 10월 11일까지 무료기간 사용 이후에 10월 12일부터 유료 이용 시,<br />' +
                    '&nbsp;&nbsp; 10월 12일 ~ 10월 31일 기간 내 비용 일할 비용 자동 결제<br /><br />' +
                    '- 이후 비용은 월 1일부터 말일까지 보유 개인정보량과<br />' +
                    '&nbsp;&nbsp; 서버 이용 실비에 맞춰 이용 금액이 자동 결제됩니다.',
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