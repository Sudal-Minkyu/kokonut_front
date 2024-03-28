<script>
    import { push, location as spaLocation } from 'svelte-spa-router'
    import {get} from "svelte/store";

    const handleGoTo = (href) => {
        if (get(spaLocation) === href) {
            window.location.reload();
        } else {
            push(href);
        }
    }

    const handleInformPIS = () => {
        alert('아직 준비중인 페이지입니다.');
    }
</script>

<div class="navMenu">
    <div class="navMenuInner">
        <div class="navName">코코넛 관리자</div>
        <div class="subNav">
            <ul>
                <li class="onedepth"><a class="cursorPointer" on:click={() => {handleGoTo("/admin/accountManagement")}}><img src="/assets/images/common/menu_icon_admin.png" alt="">코코넛 관리자 목록 관리</a></li>
                <li class="onedepth"><a class="cursorPointer" on:click={() => {handleGoTo("/admin/companyList")}}><img src="/assets/images/common/menu_icon_admin.png" alt="">고객기업 목록 관리</a></li>
                <li class="onedepth"><a class="cursorPointer" on:click={() => {handleGoTo("/admin/emailList")}}><img src="/assets/images/common/menu_icon_email.png" alt="">관리자 이메일 발송 내역</a></li>
                <li class="onedepth"><a class="cursorPointer" on:click={() => {handleGoTo("/admin/paymentList")}}><img src="/assets/images/common/setlist_icon_06.png" alt="">기업별 결제 관리</a></li>
                <li class="onedepth"><a class="cursorPointer" on:click={() => {handleGoTo("/admin/historyList")}}><img src="/assets/images/common/menu_icon_privacy.png" alt="">시스템 관리자 이력관리</a></li>
            </ul>
        </div>
    </div>
</div>