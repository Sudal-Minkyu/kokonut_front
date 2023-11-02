<script>
    import { push, location as spaLocation } from 'svelte-spa-router'
    import {is_login, userInfoData} from "../../../lib/store.js"
    import {get} from "svelte/store";

    const handleGoTo = (href) => {
        if (get(spaLocation) === href) {
            window.location.reload();
        } else {
            push(href);
        }
    }

    $: roleCat1 = ['ROLE_MASTER', 'ROLE_ADMIN', 'ROLE_USER'].includes($userInfoData.role);
</script>

{#if $is_login}
    <div class="navMenu">
        <div class="navMenuInner">
            <div class="navName">{$userInfoData.cpName}</div>
            {#if roleCat1}
                <div class="subNav">
                    <ul>
                        <li class="onedepth"><img src="/assets/images/common/menu_icon_privacy.png" alt="">개인정보 검색</li>
<!--                        <li><a use:link href="/service">대시보드</a></li>-->
                        <li><a class="cursorPointer" on:click={() => {handleGoTo("/service/privacy/PrivacySearch")}}>개인정보 검색</a></li>
                        <li><a class="cursorPointer" on:click={() => {handleGoTo("/service/privacy/PrivacyHistory")}}>개인정보 처리 이력</a></li>
                    </ul>
                </div>
                <div class="subNav">
                    <ul>
                        <li class="onedepth"><img src="/assets/images/common/menu_icon_admin.png" alt="">관리자 현황</li>
                        <li><a class="cursorPointer" on:click={() => {handleGoTo("/service/adminManagement")}}>관리자 목록 관리</a></li>
                        <li><a class="cursorPointer" on:click={() => {handleGoTo("/service/adminActivity")}}>관리자 활동 이력</a></li>
                    </ul>
                </div>
                <div class="subNav">
                    <ul>
                        <li class="onedepth noneMarB"><a class="cursorPointer" on:click={() => {handleGoTo("/service/emailList")}}><img src="/assets/images/common/menu_icon_email.png" alt="">이메일 발송 내역</a></li>
                    </ul>
                </div>
            {/if}
            <div class="subNav">
                <ul>
                    <li class="onedepth noneMarB"><a class="cursorPointer" on:click={() => {handleGoTo("/service/privacy/privacyList")}}><img src="/assets/images/common/menu_icon_send.png" alt="">개인정보 제공</a></li>
                </ul>
            </div>
            {#if roleCat1}
                <div class="subNav">
                    <ul>
                        <li class="onedepth noneMarB"><a class="cursorPointer" on:click={() => {handleGoTo("/service/policyList")}}><img src="/assets/images/common/menu_icon_manage.png" alt="">개인정보처리방침 관리</a></li>
                    </ul>
                </div>
            {/if}
            <div class="subNav">
                <ul>
                    <li class="onedepth noneMarB"><a class="cursorPointer" on:click={() => {handleGoTo("/service/environment")}}><img src="/assets/images/common/menu_icon_setting.png" alt="">환경설정</a></li>
                </ul>
            </div>
        </div>
    </div>
{/if}