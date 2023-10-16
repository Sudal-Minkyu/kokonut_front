<script>
    import {SelectBoxManager} from "../../../common/action/SelectBoxManager.js";
    export let adminList;
    export let searchCondition;

    const handleFilterRole = (el) => {
        searchCondition.filterRole = el.dataset.value;
        adminList(0);
    }
    const handleFilterState = (el) => {
        searchCondition.filterState = el.dataset.value;
        adminList(0);
    }
</script>

<div class="seaWrap marB28">
    <div class="seaContentBox">
        <div class="seaContentLine">
            <div class="seaCont wid50per">
                <dl>관리자 등급</dl>
                <div class="sc_SelBox">
                    <div class="selectBox wid164" use:SelectBoxManager={{callback: handleFilterRole}}>
                        <div class="label grade" id="roleSelect" data-value="">전체</div>
                        <ul class="optionList">
                            <li class="optionItem anoGrade" data-value="">전체</li>
                            <li class="optionItem masterSel" data-value="ROLE_MASTER">최고관리자<span></span></li>
                            <li class="optionItem anoGrade" data-value="ROLE_ADMIN">최고관리자</li>
                            <li class="optionItem anoGrade" data-value="ROLE_USER">관리자</li>
                            <li class="optionItem anoGrade" data-value="ROLE_GUEST">게스트</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="seaCont wid50per">
                <dl>계정 상태</dl>
                <div class="sc_SelBox">
                    <div class="selectBox wid164" use:SelectBoxManager={{callback: handleFilterState}}>
                        <div class="label grade" id="stateSelect" data-value="">전체</div>
                        <ul class="optionList">
                            <li class="optionItem anoGrade" data-value="">전체</li>
                            <li class="optionItem anoGrade" data-value="1">활성</li>
                            <li class="optionItem anoGrade" data-value="0">비활성</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>