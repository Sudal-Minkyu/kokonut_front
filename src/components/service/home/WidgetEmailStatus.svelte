<script>
    import {link} from "svelte-spa-router";
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";

    onMount(() => {
        getEmailCount('1');
    });

    let emailSendCountDto = {
        completeCount: '',
        reservationCount: '',
    };

    const getEmailCount = (dateType) => {
        ajaxGet('/v2/api/Index/emailSendCount', {dateType}, (res) => {
            emailSendCountDto = res.data.sendData.emailSendCountDto;
            console.log('이메일 발송', emailSendCountDto);
        });
    }

    const handleSelectDuration = (el) => {
        getEmailCount(el.dataset.value);
    }
</script>

<div class="wjItem">
    <div class="wjItem">
        <div class="wj_contentBox">
            <div class="wjtitle wjsel">
                <a use:link href="/#/service/emailList">이메일 발송<span></span></a>
                <div class="">
                    <div class="sc_SelBox">
                        <div class="selectBox" use:SelectBoxManager={{callback: handleSelectDuration}}>
                            <div class="label">오늘</div>
                            <ul class="optionList">
                                <li class="optionItem" data-value="1">오늘</li>
                                <li class="optionItem" data-value="2">이번주</li>
                                <li class="optionItem" data-value="3">이번달</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wjcountBox marT20">
                <div class="wjcount">
                    <span>발송 완료</span>
                    <dl>{emailSendCountDto.completeCount}</dl>
                </div>
                <div class="wjcount">
                    <span>예약 건수</span>
                    <dl>{emailSendCountDto.reservationCount}</dl>
                </div>
            </div>
        </div>
    </div>
</div>