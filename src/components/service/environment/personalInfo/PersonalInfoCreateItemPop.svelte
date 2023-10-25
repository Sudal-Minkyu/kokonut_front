<script>
    import { fade } from 'svelte/transition'
    import {personalInfoCategoryData} from "../../../../lib/store.js";
    import ErrorHighlight from "../../../common/ui/ErrorHighlight.svelte";
    import {ajaxParam, reportCatch} from "../../../common/ajax.js";

    export let personalInfoCategoryService;

    const handleCreateItem = () => {
        ajaxParam('/v2/api/Company/saveItem', $personalInfoCategoryData.createItemPop.inputData, (res) => {
            try {
                personalInfoCategoryService.getAdditionalItemList();
                personalInfoCategoryService.createItemPop.initInputData();
                personalInfoCategoryService.createItemPop.hide();
            } catch (e) {
                reportCatch('temp129', e);
            }
        }, (errCode, errMsg) => {
            try {
                if (errCode === 'KO087') {
                    alert('이미 등록되어 있는 항목입니다.');
                }
                personalInfoCategoryService.createItemPop.initInputData();
                personalInfoCategoryService.createItemPop.hide();
            } catch (e) {
                reportCatch('temp130', e);
            }

        });
    }

</script>

<!-- [D] 개인정보 항목 만들기 팝업 -->
<div class="koko_popup create_item_pop" data-popup="create_item_pop" in:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">나만의 항목 만들기</h3>
            </div>
            <div class="kopopinput marB24">
                <label>항목명</label>
                <input type="text" bind:value={$personalInfoCategoryData.createItemPop.inputData.ciName} placeholder="항목명을 적어주세요." />
                <ErrorHighlight message={$personalInfoCategoryData.createItemPop.ciNameErrorMsg} />
            </div>
            <div class="kopopinput">
                <label>암호화</label>
                <div class="popRadio">
                    <div class="check poprCheck">
                        <input type="radio" bind:group={$personalInfoCategoryData.createItemPop.inputData.ciSecurity} class="radio" name="ciSecurity" id="noenc" value="0" checked="">
                        <label for="noenc"><em><dt></dt></em>비암호화</label>
                    </div>
                    <div class="check poprCheck">
                        <input type="radio" bind:group={$personalInfoCategoryData.createItemPop.inputData.ciSecurity} class="radio" name="ciSecurity" id="enc" value="1">
                        <label for="enc"><em><dt></dt></em>암호화</label>
                    </div>
                </div>
            </div>
            <div class="kokopopBtnBox">
                <div class="koko_cancel" on:click={personalInfoCategoryService.createItemPop.hide}>취소</div>
                <div class="koko_go" on:click={personalInfoCategoryService.createItemPop.handleCreateItemClick}><button type="submit">추가</button></div>
            </div>
        </div>
        <div class="koko-popup-close create_item_pop_close" on:click={personalInfoCategoryService.createItemPop.hide}></div>
    </div>
</div>
