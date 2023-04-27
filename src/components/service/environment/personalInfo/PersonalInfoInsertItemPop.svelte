<script>
    import {personalInfoCategoryData} from "../../../../lib/store.js";

    export let personalInfoCategoryService;

</script>

<!-- [D] 개인정보 선택 항목 삭제 팝업 -->
<div class="koko_popup delete_pr_pop" data-popup="delete_pr_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_titleh4">
                <h4 class="">
                    선택하신 <span>{$personalInfoCategoryData.insertItemPop.checkedItemNameString}</span> 항목을<br>
                    추가하시겠습니까?
                </h4>
            </div>
            <form>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel delete_pr_pop_close" on:click={personalInfoCategoryService.insertItemPop.hide} >취소</div>
                    <div class="koko_go"><button type="submit" on:click={personalInfoCategoryService.insertItemPop.addItemListToTable}>확인</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close delete_pr_pop_close" data-popup-close="delete_pr_pop_close" on:click={personalInfoCategoryService.insertItemPop.hide} ></div>
    </div>
</div>