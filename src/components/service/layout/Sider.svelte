<script>
    import { link } from 'svelte-spa-router'
    import { is_login, page, cpNameSider } from "../../../lib/store.js"
</script>

{#if $is_login}
    <div class="navMenu">
        <div class="navMenuInner">
            <div class="navName">{$cpNameSider}</div>
            <div class="subNav">
                <ul>
                    <li class="onedepth"><img src="/assets/images/common/menu_icon_privacy.png" alt="">개인정보 현황</li>
                    <li><a use:link href="/service">대시보드</a></li>
                    <li><a use:link href="/service/privacy/PrivacySearch">개인정보 검색</a></li>
                    <li><a use:link href="/service/privacy/PrivacyHistory" on:click="{() => {$page = 0}}">개인정보 처리 이력</a></li>
                </ul>
            </div>
            <div class="subNav">
                <ul>
                    <li class="onedepth"><img src="/assets/images/common/menu_icon_admin.png" alt="">관리자 현황</li>
                    <li><a use:link href="/service/adminManagement" on:click="{() => {$page = 0}}">관리자 목록 관리</a></li>
                    <li><a use:link href="/service/adminActivity" on:click="{() => {$page = 0}}">관리자 활동 이력</a></li>
                </ul>
            </div>
            <div class="subNav">
                <ul>
                    <li class="onedepth noneMarB"><a use:link href="/service/emailList"><img src="/assets/images/common/menu_icon_email.png" alt="">이메일 발송 내역</a></li>
                </ul>
            </div>
            <div class="subNav">
                <ul>
                    <li class="onedepth noneMarB"><a use:link href="/service/privacy/privacyList"><img src="/assets/images/common/menu_icon_send.png" alt="">개인정보 제공</a></li>
                </ul>
            </div>
            <div class="subNav">
                <ul>
                    <li class="onedepth noneMarB"><a use:link href="/service/policyList"><img src="/assets/images/common/menu_icon_manage.png" alt="">개인정보처리방침 관리</a></li>
                </ul>
            </div>
            <div class="subNav">
                <ul>
                    <li class="onedepth noneMarB"><a use:link href="/service/environment"><img src="/assets/images/common/menu_icon_setting.png" alt="">환경설정</a></li>
                </ul>
            </div>

<!--            <div class="subNav">-->
<!--                <ul>-->
<!--                    <li>환경설정</li>-->
<!--                    <li><a href="/kokonut/member/setting/personal-information-management.html"><img src="/assets/images/common/m_icon_07.png" alt="">개인정보 항목 관리</a></li>-->
<!--                    <li><a href="/kokonut/member/setting/api-key.html"><img src="/assets/images/common/suvmenu_icon_none.png" alt="">API Key 관리 (완료)</a></li>-->
<!--                    <li><a href="/kokonut/member/setting/service-settings.html"><img src="/assets/images/common/suvmenu_icon_none.png" alt="">서비스 설정 (완료)</a></li>-->
<!--                    <li><a href="/kokonut/member/setting/mypage.html"><img src="/assets/images/common/suvmenu_icon_none.png" alt="">내 정보 (완료)</a></li>-->
<!--                    <li><a href="/kokonut/member/setting/inquiry.html"><img src="/assets/images/common/suvmenu_icon_none.png" alt="">1대1 문의 (완료)</a></li>-->
<!--                </ul>-->
<!--            </div>-->

        </div>
    </div>
<!--    -->
<!--<div class="navMenu">-->
<!--    <div class="navMenuInner">-->
<!--        <div class="navName">{$cpNameSider}</div>-->
<!--        <div class="subNav">-->
<!--            <ul>-->
<!--                <li>개인정보현항</li>-->
<!--                <li><a use:link href="/service"><img src="/assets/images/common/suvmenu_icon_01.png" alt="">대시보드</a></li>-->
<!--                <li><a use:link href="/service"><img src="/assets/images/common/suvmenu_icon_02.png" alt="">개인정보 검색</a></li>-->
<!--                <li><a use:link href="/service"><img src="/assets/images/common/suvmenu_icon_03.png" alt="">개인정보 처리 이력</a></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="subNav">-->
<!--            <ul>-->
<!--                <li>관리자 관리</li>-->
<!--                <li><a use:link href="/service/adminManagement" on:click="{() => {$page = 0}}"><img src="/assets/images/common/suvmenu_icon_03.png" alt="">관리자 목록 관리</a></li>-->
<!--                <li><a use:link href="/service/adminActivity" on:click="{() => {$page = 0}}"><img src="/assets/images/common/suvmenu_icon_04.png" alt="">관리자 활동 이력</a></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="subNav">-->
<!--            <ul>-->
<!--                <li><a use:link href="/service">이메일 발송내역</a></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="subNav">-->
<!--            <ul>-->
<!--                <li><a use:link href="/service">개인정보 제공</a></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="subNav">-->
<!--            <ul>-->
<!--                <li><a use:link href="/service">개인정보처리방침 관리</a></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="subNav">-->
<!--            <ul>-->
<!--                <li><a use:link href="/service/environment">환경설정</a></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
{/if}