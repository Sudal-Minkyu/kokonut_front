<script>
    import {bootpayRemainingUsageFee} from "../../../common/bootpayment.js";
    export let paymentService;

</script>

<!-- [D] 결제 팝업 -->
<div class="koko_popup subscribe_pop" data-popup="subscribe_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title marB40">
                <h3 class="">남은 이용요금 결제</h3>
            </div>
            <div class="seaContentBox marB24">
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이용상품</dl>
                        <div class="myInfoBox">
                            <div class="stand stand_01">Standard1</div>
                            <div class="stand stand_02">Standard2</div>
                            <div class="stand stand_03">Standard3</div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이용기간</dl>
                        <div class="myInfoBox">
                            <span>2023-02-01 ~ 2023-02-19</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>요금산정</dl>
                        <div class="myInfoBox">
                            <span>개인정보 28건*10원 + 트래픽 비용 1,823원</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>미결제 요금</dl>
                        <div class="myInfoBox">
                            <span><dd>4,620원</dd> (원단위 절삭)</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>결제수단</dl>
                        <div class="myInfoBox">
                            <span>BC카드</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="koko_checkDoubleBox">
                <div class="koko_check">
                    <input type="checkbox" value="1" name="selcheck02" id="selcheck02">
                    <label for="selcheck02">
                        <em></em>
                        <p class="check">미결제 요금을 확인하였고, 등록된 카드로 결제를 진행하는데 동의합니다.</p>
                    </label>
                </div>
            </div>
            <div class="payBtnBox">
                <div class="koko_cancel subscribe_pop_close" on:click={paymentService.close}>취소</div>
                <div class="koko_go"><button class="tippop" id="tip_btn01">결제</button></div>
            </div>
        </div>
        <div class="koko-popup-close subscribe_pop_close" data-popup-close="subscribe_pop_close" on:click={paymentService.close}></div>
    </div>
</div>

<!-- [D] 미니 팝업 : 결제 성공 팝업 -->
{#if false}
<div class="koko_popup">
    <div class="layerPopType" id="tip_box01">
        <header class="popHeader">
            <img src="/assets/images/common/minipop_pass.png" alt="">
            <h4 class="popTit">결제가 완료되었습니다.</h4>
        </header>
        <section class="popContents">
            <p>
                이후 추가 결제 유도하는 안내 멘트가<br>
                들어가면 좋겠습니다.
            </p>
        </section>
        <div class="popcBtnBox">
            <button type="button" id="tip_close01" class="layerBtn">확인</button>
        </div>
    </div>
</div>
{/if}
<!-- // [D] 미니 팝업 : 결제 성공 팝업 -->

<!-- [D] 미니 팝업 : 결제 실패 팝업 -->
{#if false}
<div class="koko_popup">
    <div class="layerPopType" id="tip_box02">
        <header class="popHeader">
            <img src="/assets/images/common/minipop_warring.png" alt="">
            <h4 class="popTit">결제 실패 안내</h4>
        </header>
        <section class="popContents">
            <p>
                카드 정보 인증에 실패했습니다.<br>
                잠시 후 다시 시도해 주세요.
            </p>
        </section>
        <div class="popcBtnBox">
            <button type="button" id="tip_close02" class="layerBtn">확인</button>
        </div>
    </div>
</div>
{/if}

<!-- // [D] 미니 팝업 : 결제 실패 팝업 -->