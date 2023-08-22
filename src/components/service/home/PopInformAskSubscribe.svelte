<script>
    import ErrorHighlight from "../../common/ui/ErrorHighlight.svelte";
    import {userInfoData} from "../../../lib/store.js";

    export let askSubscribeService;

    let checkAgree;
    let checkMessage = '';
    const handleAddCard = () => {
        if (checkAgree) {
            askSubscribeService.handleNext();
        } else {
            checkMessage = '진행을 위해 안내사항을 확인하고 동의해 주세요.';
        }
    }
</script>

<div class="koko_popup unsubscribe_pop" data-popup="unsubscribe_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title noneMarB">
                <h3 class="">{askSubscribeService.texts.title}</h3>
                <div class="koSubInfo ks_noneicon">
                    <dl>
                        {askSubscribeService.texts.content}
                    </dl>
                </div>
            </div>
            <div class="popcaseInfoBox pi_noneicon marB32">
                <p>안내사항</p>
                <dl>{askSubscribeService.texts.notification}</dl>
            </div>
            <div class="koko_checkDoubleBox">
                <div class="koko_check">
                    <input type="checkbox" name="selcheck" id="selcheck" bind:checked={checkAgree}>
                    <label for="selcheck">
                        <em></em>
                        <p class="check">{askSubscribeService.texts.agreement}</p>
                    </label>
                </div>
                <ErrorHighlight message={checkMessage}/>
            </div>
            <div class="payBtnBox">
                <div class="koko_cancel unsubscribe_pop_close" on:click={askSubscribeService.handleCancel}>로그아웃</div>
                <div class="koko_go"><button class="tippop" id="tip_btn03" on:click={handleAddCard}>{$userInfoData.paymentDeleteCancel === "1" ? "구독재개" : "카드등록"}</button></div>
            </div>
        </div>
        <div class="koko-popup-close unsubscribe_pop_close" data-popup-close="unsubscribe_pop_close"
             on:click={askSubscribeService.handleCancel}></div>
    </div>
</div>