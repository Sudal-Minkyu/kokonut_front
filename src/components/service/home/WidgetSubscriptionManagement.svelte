<script>
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {link} from "svelte-spa-router";

    const handleSelectPeriod = (el) => {
        console.log('구독관리 개월선택', el)
    }
</script>

<div class="wjItem">
    <div class="wjItem">
        <div class="wj_contentBox">
            <div class="wjtitle wjsel">
                <a use:link href="/#/service/environment/subscription">구독관리<span></span></a>
                <div class="">
                    <div class="sc_SelBox">
                        <div class="selectBox" use:SelectBoxManager={{callback: handleSelectPeriod}}>
                            <div class="label">이번달</div>
                            <ul class="optionList">
                                <li class="optionItem" data-value="">이번달</li>
                                <li class="optionItem" data-value="">지난달</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wjsubcTitle marT20 marB12">
                <span>실시간 사용량</span>
                <dl>23. 04. 01 ~ 23. 04. 15</dl>
            </div>
            <div class="wjsubcBox">
                <div class="wjsubc">
                    <p>평균 개인정보 수</p>
                    <div class="wjsubcLine subc_01" style="width:0%"></div>
                    <dl><span>390,000</span>원</dl>
                </div>
                <div class="wjsubc">
                    <p>사용 데이터</p>
                    <div class="wjsubcLine subc_02" style="width:0%"></div>
                    <dl><span>123,456</span>원</dl>
                </div>
                <div class="wjsubc">
                    <p>이메일 이용요금</p>
                    <div class="wjsubcLine subc_03" style="width:0%"></div>
                    <dl><span>5,000</span>원</dl>
                </div>
            </div>
        </div>
    </div>
</div>