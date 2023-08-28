<script>
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {link} from "svelte-spa-router";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";

    let dateType = '1';
    let currentFee = {
        cloudAmount: '',
        emailAmount: '',
        serviceAmount: '',
    }
    $: dateRange = calculateRangeByDateType(dateType);

    onMount(() => {
        getSubscriptionManagementInfo(dateType);
    });

    const getSubscriptionManagementInfo = (dateType) => {
        ajaxGet('/v2/api/Index/paymentInfo', {dateType}, (res) => {
            console.log('구독관리', res.data.sendData);
            currentFee = res.data.sendData;
        });
    }

    const handleSelectPeriod = (el) => {
        dateType = el.dataset.value;
        getSubscriptionManagementInfo(dateType);
        calculateRangeByDateType(dateType);
    }

    const calculateRangeByDateType = (dateType) => {
        const currentDate = new Date();
        let startDate, endDate;

        const pad = (number) => {
            return number < 10 ? '0' + number : number;
        }

        if (dateType === '1') {
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            endDate = currentDate;
        } else if (dateType === '2') {
            // If current month is January, then set the month to December of the previous year
            if (currentDate.getMonth() === 0) {
                startDate = new Date(currentDate.getFullYear() - 1, 11, 1);
                endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
            } else {
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            }
        }

        return `${startDate.getFullYear()}. ${pad(startDate.getMonth() + 1)}. ${pad(startDate.getDate())} ~ ${endDate.getFullYear()}. ${pad(endDate.getMonth() + 1)}. ${pad(endDate.getDate())}`;
    }
</script>

<div class="wjItem">
    <div class="wjItem">
        <div class="wj_contentBox">
            <div class="wjtitle wjsel">
                <a use:link href="/service/environment/subscription">구독관리<span></span></a>
                <div class="">
                    <div class="sc_SelBox">
                        <div class="selectBox" use:SelectBoxManager={{callback: handleSelectPeriod}}>
                            <div class="label">이번달</div>
                            <ul class="optionList">
                                <li class="optionItem" data-value="1">이번달</li>
                                <li class="optionItem" data-value="2">지난달</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wjsubcTitle marT20 marB12">
                <span>실시간 사용량</span>
                <dl>{dateRange}</dl>
            </div>
            <div class="wjsubcBox">
                <div class="wjsubc">
                    <p>서비스 이용요금</p>
                    <div class="wjsubcLine subc_01" style="width:0%"></div>
                    <dl><span>{currentFee.serviceAmount}</span>원</dl>
                </div>
                <div class="wjsubc">
                    <p>클라우드 이용요금</p>
                    <div class="wjsubcLine subc_02" style="width:0%"></div>
                    <dl><span>{currentFee.cloudAmount}</span>원</dl>
                </div>
                <div class="wjsubc">
                    <p>이메일 이용요금</p>
                    <div class="wjsubcLine subc_03" style="width:0%"></div>
                    <dl><span>{currentFee.emailAmount}</span>원</dl>
                </div>
            </div>
        </div>
    </div>
</div>