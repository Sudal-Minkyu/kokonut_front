<script>
    import restapi from "../../../../lib/api.js";
    import {personalInfoCategoryData} from "../../../../lib/store.js";

    export let addItemList;

    const createItemData = {
        ciName: '',
        ciSecurity: '0',
    }

    const initCreateItemData = () => {
        createItemData.ciName = '';
        createItemData.ciSecurity = '0';
    }

    const handleCreateItem = () => {
        restapi('v2', 'post', '/v2/api/Company/saveItem', "param", createItemData, 'application/json',
            (json_success) => {
                console.log('아이템 추가 성공', json_success);
                if(json_success.data.status === 200) {
                    addItemList();
                } else if (json_success.data.err_code === 'KO087') {
                    alert('이미 등록되어 있는 항목입니다.');
                }
                initCreateItemData();
            },
            (json_error) => {
                console.log('아이템 추가 실패', json_error);
                initCreateItemData();
            }
        );
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
                <div class="koko_cancel" on:click={()=>{personalInfoCategoryData.update(obj => {obj.createItemPop.visible = false; return obj;})}}>취소</div>
                <div class="koko_go" on:click={handleCreateItem}><button type="submit">추가</button></div>
            </div>
        </div>
        <div class="koko-popup-close create_item_pop_close" on:click={()=>{personalInfoCategoryData.update(obj => {obj.createItemPop.visible = false; return obj;})}}></div>
    </div>
</div>
