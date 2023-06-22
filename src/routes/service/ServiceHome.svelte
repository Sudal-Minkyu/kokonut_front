<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import WidgetSwiperNews from "../../components/service/home/WidgetSwiperNews.svelte";
    import WidgetTodayStatus from "../../components/service/home/WidgetTodayStatus.svelte";
    import DynamicComponentPlacer from "../../components/service/home/DynamicComponentPlacer.svelte";
    import {knNameHeader, paymentBillingCheck} from "../../lib/store.js";
    import PopInformAskSubscribe from "../../components/service/home/PopInformAskSubscribe.svelte";
    import {bootpayContinueSubscription, bootpayStartSubscription} from "../../components/common/bootpayment.js";
    import {openAsk, openBanner, openConfirm} from "../../components/common/ui/DialogManager.js";

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
                        askSubscribeService.visibility = false; // 로그아웃 구현 후 삭제
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
            askSubscribeService.handleNext = () => {
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
            };
            askSubscribeService.handleCancel = () => {
                openAsk({
                    callback: () => {
                        askSubscribeService.visibility = false; // 로그아웃 구현 후 삭제
                    }, // 로그아웃 공용화하여 추가
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '로그아웃 하시겠습니까?', // 제목
                    btnStart: '로그아웃', // 실행 버튼의 텍스트
                    btnCancel: '취소', // 취소 버튼의 텍스트
                });
            };
            askSubscribeService.visibility = true;
        },
    }

    $: if(isBillingCheckTriggerNotActivatedYet && $paymentBillingCheck === '0') { // 0은 새로 가입된 사람임을 의미
        isBillingCheckTriggerNotActivatedYet = false;
        askSubscribeService.askStartSubscribe();
    } else if ($paymentBillingCheck === '2') { // 2는 구독을 해지한 사람임을 의미
        isBillingCheckTriggerNotActivatedYet = false;
        console.log($paymentBillingCheck)
        askSubscribeService.askContinueSubscribe();
    }
</script>
<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="maincontent">
            <div class="pageH1_type01">
                <h1><span>{$knNameHeader}</span>님, 안녕하세요!</h1>
            </div>
            <WidgetSwiperNews />
            <WidgetTodayStatus />
            <DynamicComponentPlacer />
        </div>
    </div>
</section>

{#if askSubscribeService.visibility}
    <PopInformAskSubscribe {askSubscribeService}/>
{/if}