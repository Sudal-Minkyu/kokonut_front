<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {onMount} from "svelte";
    import {Bootpay} from "@bootpay/client-js";
    import {knEmailHeader, knNameHeader, privacySearchData} from "../../lib/store.js";
    import CalendarPop from "../../components/service/environment/subscription/CalendarPop.svelte";
    import PaymentPop from "../../components/service/environment/subscription/PaymentPop.svelte";
    import UnsubscribePop from "../../components/service/environment/subscription/UnsubscribePop.svelte";
    import Pagination from "../../components/common/ui/Pagination.svelte";

    onMount(() => {
        // applyBasicEvents();
    });

    const applyBasicEvents = () => {
        // 미니 팝업 스크립트
        document.querySelectorAll(".tippop").forEach(function(el, i) {
            const thisId = el.getAttribute("id");
            const idNum = thisId.slice(-2);

            document.querySelector('#tip_btn' + idNum).addEventListener('click', function() {
                const display = window.getComputedStyle(document.querySelector('#tip_box' + idNum)).display;
                if (display === 'none') {
                    document.querySelector('#tip_box' + idNum).classList.add('dp_b');
                }
                document.querySelector('.dim').style.display = 'block';
                document.querySelector('.koko_popup').style.display = 'none';
            });

            document.querySelector('#tip_close' + idNum).addEventListener('click', function() {
                document.querySelector('#tip_box' + idNum).classList.remove('dp_b');
                document.querySelector('.dim').style.display = 'none';
                document.body.style.overflow = 'unset';
            });
        });


        //----- 결제수단 변경 OPEN / CLOSE
        document.querySelector('#method_pop').addEventListener('click', function() {
            document.querySelector('[data-popup="method_pop"]').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.method_pop_close').addEventListener('click', function() {
            document.querySelector('[data-popup="method_pop"]').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        //----- 결제 OPEN / CLOSE
        document.querySelector('#subscribe_pop').addEventListener('click', function() {
            document.querySelector('[data-popup="subscribe_pop"]').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.subscribe_pop_close').addEventListener('click', function() {
            document.querySelector('[data-popup="subscribe_pop"]').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        //----- 구독 해지 OPEN / CLOSE
        document.querySelector('#unsubscribe_pop').addEventListener('click', function() {
            document.querySelector('[data-popup="unsubscribe_pop"]').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.unsubscribe_pop_close').addEventListener('click', function() {
            document.querySelector('[data-popup="unsubscribe_pop"]').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        //----- 월 평균 개인정보 OPEN / CLOSE
        document.querySelector('.open_current_pop').addEventListener('click', function() {
            document.querySelector('.month_current_pop').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.current_pop_close').addEventListener('click', function() {
            document.querySelector('.month_current_pop').style.display = 'none';
            document.body.style.overflow = 'unset';
        });


        /* 커스텀 select 박스 스크립트 */
        document.querySelectorAll('.label').forEach(function(label) {
            label.addEventListener('click', function() {
                const optionList = label.nextElementSibling;
                const optionItems = optionList.querySelectorAll('.optionItem');
                const isActive = label.parentNode.classList.contains('active');

                label.parentNode.classList.toggle('active', !isActive);

                optionItems.forEach((optionItem) => {
                    optionItem[isActive ? 'removeEventListener' : 'addEventListener']('click', () => {
                        label.innerHTML = optionItem.textContent;
                        label.parentNode.classList.remove('active');
                    });
                });
            });
        });


        /* 커스텀 select 박스 외부 영역 클릭 시 사라지는 스크립트 */
        document.addEventListener('click', function(event) {
            const container = document.querySelector(".selectBox");
            if (container && !container.contains(event.target)) {
                container.classList.remove('active');
            }
        });

        /* 팝업 검은색 배경 영역 클릭 시 사라지는 스크립트 */
        document.addEventListener('mouseup', function(event) {
            const LayerPopup = document.querySelector(".koko_popup");
            if (LayerPopup && !LayerPopup.contains(event.target)) {
                LayerPopup.style.display = 'none';
                document.body.style.overflow = 'unset';
            }
        });
    }

    // 부트페이 정기결제 카드등록
    window.bootpayBilling = () => {
        Bootpay.requestSubscription({
            application_id: import.meta.env.VITE_BOOT_PAY_SECRET,
            pg: '나이스페이',
            order_name: '코코넛 이용을 위한 카드 등록',
            subscription_id: (new Date()).getTime(),
            user: {
                username: $knNameHeader,
                phone: '01000000000',
                email: $knEmailHeader
            },
            extra: {
                subscription_comment: '매월 사용료에 따라 결제됩니다. 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
                subscribe_test_payment: true
            }
        }).then(
            function (response) {
                console.log(response)
                if (response.event === 'done') {
                    console.log("빌링키 : "+response.data.receipt_id);
                    alert('빌링키 발급이 완료되었습니다.');
                }
            },
            function (error) {
                console.log(error.message)
            }
        )
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
                        <div class="top_stand01">Standard1</div>
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
                        <span>BC카드</span>
                        <button class="myinfoChangeBtn" id="method_pop">변경</button>
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
                    <col style="width:24.66%;">
                    <col style="width:13.70%;">
                    <col style="width:13.70%;">
                    <col style="width:12.33%;">
                    <col style="width:9.59%;">
                    <col style="width:9.59%;">
                </colgroup>
                <thead>
                <tr>
                    <th>요금부과 기간</th>
                    <th>이용상품</th>
                    <th>등록된 개인정보 평균</th>
                    <th>결제 일시</th>
                    <th>결제 금액</th>
                    <th>결제상태</th>
                    <th>결제방법</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_03">Standard3</div></td>
                    <td><div class="cur_priNum open_current_pop" on:click={() => {calendarService.open('요금부가시작기간')}}>9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td>결제완료</td>
                    <td>자동결제</td>
                </tr>
                <tr>
                    <td>2022.02.01 - 02.28</td>
                    <td><div class="stand stand_02">Standard2</div></td>
                    <td><div class="cur_priNum open_current_pop" on:click={() => {calendarService.open('요금부가시작기간')}}>9,111</div></td>
                    <td>2022-11-23 09:49</td>
                    <td>13,000원</td>
                    <td class="failtext">결제실패</td>
                    <td>자동결제</td>
                </tr>
                </tbody>
            </table>
        </div>

        <Pagination current={1}
                    totalPosts={150}
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