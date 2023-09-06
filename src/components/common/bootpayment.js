import {Bootpay} from "@bootpay/client-js";
import {get} from 'svelte/store';
import {userInfoData} from "../../lib/store.js";
import {ajaxParam, reportCatch} from "./ajax.js";
import {openBanner, openConfirm} from "./ui/DialogManager.js";

export const bootpayStartSubscription = (handleSuccess, handleFail) => {
    addOrChangeCard({
        order_name: '코코넛 이용을 위한 결제 수단 등록',
        subscription_comment: '매월 사용료에 따라 결제됩니다. 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
        success_msg: '카드등록이 완료되었습니다.',
        handleSuccess,
        handleFail,
    });
}

export const bootpayContinueSubscription = (handleSuccess, handleFail) => {
    addOrChangeCard({
        order_name: '코코넛 구독 계속하기를 위한 결제 수단 등록',
        subscription_comment: '매월 사용료에 따라 결제됩니다. 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
        success_msg: '구독을 재개하였습니다.',
        handleSuccess,
        handleFail,
    });
}

export const bootpayChangeToAnotherMethod = (handleSuccess) => {
    addOrChangeCard({
        order_name: '코코넛 결제 수단 변경',
        subscription_comment: '매월 사용료에 따라 결제됩니다. 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
        success_msg: '결제 수단을 변경 하였습니다.',
        handleSuccess,
        handleFail: (err) => {
            if (err.event === 'cancel') {
                openBanner('결제수단 변경을 취소하였습니다.');
            } else {
                openConfirm({
                    icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: "결제수단 변경 실패", // 제목
                    contents1: err.message,
                    contents2: '필요시, 관리자에게 해당 사실을 문의해 주세요.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
            }
        },
    });
}

export const bootpayRemainingUsageFee = () => {
    Bootpay.requestPayment({
        "application_id": "6369c021cf9f6d001b23e2ef",
        "price": 5000,
        "order_name": "테스트결제",
        "order_id": "주문번호얌",
        "pg": "나이스페이",
        "method": "카드",
        "tax_free": 0,
        "user": {
            "id": "회원아이디",
            "username": "콩길동",
            "phone": "01022223344",
            "email": ""
        },
        "items": [
            {
                "id": "item_id1",
                "name": "테스트아이템1",
                "qty": 1,
                "price": 1000
            },
            {
                "id": "item_id2",
                "name": "테스트아이템2",
                "qty": 1,
                "price": 3000
            },
            {
                "id": "item_id3",
                "name": "테스트아이템3",
                "qty": 2,
                "price": 500
            }
        ],
        "extra": {
            "open_type": "iframe",
            "card_quota": "0,2,3",
            "escrow": false
        }
    });
}

const addOrChangeCard = ({order_name, subscription_comment, success_msg, handleSuccess, handleFail}) => {
    const currentUserInfo = get(userInfoData);
    Bootpay.requestSubscription({
        application_id: import.meta.env.VITE_BOOT_PAY_SECRET,
        pg: '나이스페이',
        order_name: order_name,
        subscription_id: (new Date()).getTime(),
        user: {
            username: currentUserInfo.knName,
            phone: currentUserInfo.knPhoneNumber,
            email: currentUserInfo.knEmail
        },
        extra: {
            subscription_comment: subscription_comment,
            subscribe_test_payment: true
        }
    }).then((res) => {
        if (res.event === 'done') {
            const receiptIdInfo = {
                payReceiptId: res.data?.receipt_id,
            }
            if (!receiptIdInfo.payReceiptId) {
                // 문제 알리기
                return;
            }
            ajaxParam('/v2/api/Payment/billingSave', receiptIdInfo, (res) => {
                try {
                    openBanner(success_msg);
                    handleSuccess(res);
                } catch (e) {
                    reportCatch('temp009', e);
                }
            }, () => {
                try {
                    openConfirm({
                        icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                        title: "카드가 등록되었으나 반영실패", // 제목
                        contents1: '카드가 등록되었지만 프로그램에 반영하는 것을 실패하였습니다.',
                        contents2: '관리자에게 해당 사실을 문의해 주세요.',
                        btnCheck: '확인', // 확인 버튼의 텍스트
                    });
                } catch (e) {
                    reportCatch('temp010', e);
                }
            });
        } else {
            openConfirm({
                icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "예상치 못한 문제 발생", // 제목
                contents1: '예상치 못한 문제가 발생하여 카드 등록을 실패하였습니다.',
                contents2: '관리자에게 해당 사실을 문의해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
            });
            // 문제 일어날 가능성 살펴 추가
        }
    }, (err) => {
        handleFail(err);
        // 각종 에러 가능성 살펴 등록, 필요할 경우 공용코드로
    });
}