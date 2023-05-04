
<script>

    import { fade } from 'svelte/transition'

    export let policyWriting;
    export let startFun;
    export let writingCheckChange;

    function yesClick() {
        policyWriting();
        writingCheckChange();
    }

    function noClick() {
        startFun();
        writingCheckChange();
    }

</script>

<div class="another_koko_popup confirm_pop" in:fade out:fade>
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_titleh4">
                <h4 class="">
                    마지막으로 작성중인 문서가 있습니다.<br>
                    해당 문서로 돌아가시겠습니까?
                </h4>
            </div>
            <form>
                <div class="popcaseInfoBox pi_noneicon">
                    <p>주의사항</p>
                    <dl>취소 시 작성중인 문서는 삭제됩니다.</dl>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_go">
                        <button type="button" on:click={yesClick}>예</button>
                    </div>
                    <div class="koko_cancel" on:click={noClick}>아니오</div>
                </div>
            </form>
        </div>
    </div>
</div>