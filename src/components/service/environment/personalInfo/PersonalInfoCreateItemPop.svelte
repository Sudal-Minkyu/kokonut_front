<script>
    export let createItemPopController;

    const createItemData = {
        ciName: '',
        ciSecurity: '0',
    }

    const initCreateItemData = () => {
        createItemData.ciName = '';
        createItemData.ciSecurity = '0';
    }

    const handleCreateItem = () => {

        console.log(createItemData);
        initCreateItemData();
    }

</script>

<!-- [D] 개인정보 항목 만들기 팝업 -->
<div class="koko_popup create_item_pop" data-popup="create_item_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">나만의 항목 만들기</h3>
            </div>
            <div class="kopopinput marB24">
                <label>항목명</label>
                <input type="text" bind:value={createItemData.ciName} placeholder="항목명을 적어주세요." />
            </div>
            <div class="kopopinput ">
                <label>암호화</label>
                <div class="popRadio">
                    <div class="check poprCheck">
                        <input type="radio" bind:group={createItemData.ciSecurity} class="radio" name="ciSecurity" id="noenc" value="0" checked="">
                        <label for="noenc"><em><dt></dt></em>비암호화</label>
                    </div>
                    <div class="check poprCheck">
                        <input type="radio" bind:group={createItemData.ciSecurity} class="radio" name="ciSecurity" id="enc" value="1">
                        <label for="enc"><em><dt></dt></em>암호화</label>
                    </div>
                </div>
            </div>
            <div class="kokopopBtnBox">
                <div class="koko_cancel" on:click={createItemPopController.hide}>취소</div>
                <div class="koko_go" on:click={handleCreateItem}><button type="submit">추가</button></div>
            </div>
        </div>
        <div class="koko-popup-close create_item_pop_close" on:click={createItemPopController.hide}></div>
    </div>
</div>
