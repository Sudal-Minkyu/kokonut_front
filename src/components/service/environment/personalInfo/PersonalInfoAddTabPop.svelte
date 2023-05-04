<script>
    import { fade } from 'svelte/transition'
    import {personalInfoTableData} from "../../../../lib/store.js";
    export let personalInfoTableService;
</script>

<!-- [D] 탭추가 팝업 -->
<div class="koko_popup add_tab_pop" data-popup="add_tab_pop" in:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">
                    탭 추가
                </h3>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>이름</label>
                    <input type="text" bind:value={$personalInfoTableData.addTabPop.inputData.ctDesignation} placeholder="이름를 적어주세요." />
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel" on:click={personalInfoTableService.addTabPop.handleClosePop}>취소</div>
                    <div class="koko_go"><button type="submit" on:click={personalInfoTableService.addTabPop.sendAddTab}>추가</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close" on:click={personalInfoTableService.addTabPop.handleClosePop}></div>
    </div>
</div>