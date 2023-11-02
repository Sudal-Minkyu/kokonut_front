<script>
    import {personalInfoCategoryData, personalInfoTableData} from "../../../../lib/store.js";
    import ErrorHighlight from "../../../common/ui/ErrorHighlight.svelte";
    export let personalInfoCategoryService;
</script>

<!-- [D] 개인정보 항목수정 팝업 -->
<div class="koko_popup cateRevise_pop" data-popup="cateRevise_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">항목 수정</h3>
            </div>
            <form>
                <div class="poptabInner">
                    <div class="poptabBox marB40">
                        <div class="poptab tabrevise {$personalInfoCategoryData.editItemPop.currentMode === 'modify' ? 'on_ptab' : ''}"
                             on:click={()=>{personalInfoCategoryService.editItemPop.handleSelectMode('modify')}}>수정</div>
                        <div class="poptab tabdel {$personalInfoCategoryData.editItemPop.currentMode === 'delete' ? 'on_ptab' : ''}"
                             on:click={()=>{personalInfoCategoryService.editItemPop.handleSelectMode('delete')}}>삭제</div>
                    </div>
                    <div class="poptabContentInnner">
                        {#if $personalInfoCategoryData.editItemPop.currentMode === 'modify'}
                            <div class="poptabContent">
                                <div class="kopopinput">
                                    <label>항목명</label>
                                    <input type="text" placeholder="항목명을 적어주세요."
                                           bind:value={$personalInfoCategoryData.editItemPop.inputData.ciName} />
                                </div>
                                <ErrorHighlight bind:message="{$personalInfoCategoryData.editItemPop.ciNameErrorMsg}" />
                            </div>
                        {/if}
                        {#if $personalInfoCategoryData.editItemPop.currentMode === 'delete'}
                            <div class="poptabContent">
                                <div class="popcaseInfoBox pi_noneicon">
                                    <p>주의사항</p>
                                    <dl>분류에서 해당 항목을 삭제합니다. <span>개인정보 항목에 추가된 항목은 삭제되지 않습니다.</span></dl>
                                </div>
                                <div class="koko_check">
                                    <input type="checkbox" value="1" name="catedelcheck" id="catedelcheck"
                                           bind:checked={$personalInfoCategoryData.editItemPop.checkPreCautionAgree}>
                                    <label for="catedelcheck">
                                        <em></em>
                                        <p class="check" >주의사항을 확인하였고 삭제에 동의합니다.</p>
                                    </label>
                                </div>
                                <ErrorHighlight bind:message="{$personalInfoCategoryData.editItemPop.cautionAgreeErrorMsg}" />
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel cateRevise_pop_close"
                         on:click={personalInfoCategoryService.editItemPop.hide}>취소</div>
                    <div class="koko_go"
                         on:click={personalInfoCategoryService.editItemPop.handleCommitAction}>
                        <button type="button">확인</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close cateRevise_pop_close" data-popup-close="cateRevise_pop_close"></div>
    </div>
</div>
<!-- // [D] 개인정보 항목수정 팝업 -->