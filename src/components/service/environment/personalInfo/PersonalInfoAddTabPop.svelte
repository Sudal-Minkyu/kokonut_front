<script>
    import {onDestroy} from "svelte";
    import restapi from "../../../../lib/api.js";

    export let addTabPopController;
    export let userTableList;

    const addTabData = {
        ctDesignation: '',
    }

    const initAddTabPop = () => {
        addTabData.ctDesignation = '';
    }

    const handleAddItem = () => {
        console.log(addTabData);
        restapi('v2', 'post', '/v2/api/Company/userTableSave', "body", addTabData, 'application/json',
            (json_success) => {
                console.log('아이템 추가 성공', json_success);
                if(json_success.data.status === 200) {
                    userTableList();
                } else if (json_success.data.err_code === 'KO088') {
                    alert('이미 등록되어 있는 테이블 명입니다.');
                }
                addTabPopController.hide();
                initAddTabPop();
            },
            (json_error) => {
                console.log('아이템 추가 실패', json_error);
                addTabPopController.hide();
                initAddTabPop();
            }
        );
    }

    const handleCancel = () => {
        addTabPopController.hide();
        initAddTabPop();
    }

</script>

<!-- [D] 탭추가 팝업 -->
<div class="koko_popup add_tab_pop" data-popup="add_tab_pop">
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
                    <input type="text" bind:value={addTabData.ctDesignation} placeholder="이름를 적어주세요." />
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel" on:click={handleCancel}>취소</div>
                    <div class="koko_go"><button type="submit" on:click={handleAddItem}>추가</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close" on:click={handleCancel}></div>
    </div>
</div>