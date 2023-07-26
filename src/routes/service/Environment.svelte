
<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import {userInfoData} from "../../lib/store.js";
    $: roleCat1 = ['ROLE_MASTER', 'ROLE_ADMIN', 'ROLE_USER'].includes($userInfoData.role);
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>환경설정</h1>
        </div>

        <div class="setListWrap">
            <ul>
                {#if roleCat1 }
                    <li>
                        <a use:link href="/service/environment/personalInfoItem">
                            <div class="setlistBox">
                                <div class="setitemBox">
                                    <div class="seticon"><img src="/assets/images/common/setlist_icon_04.png" alt=""></div>
                                    <div class="settitle">개인정보 항목 관리</div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a use:link href="/service/environment/apikey">
                            <div class="setlistBox">
                                <div class="setitemBox">
                                    <div class="seticon"><img src="/assets/images/common/setlist_icon_01.png" alt=""></div>
                                    <div class="settitle">API키 관리</div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a use:link href="/service/environment/thirdpartyconnection">
                            <div class="setlistBox">
                                <div class="setitemBox">
                                    <div class="seticon"><img src="/assets/images/common/setlist_icon_07.png" alt=""></div>
                                    <div class="settitle">서드파티 연동</div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a use:link href="/service/environment/setting">
                            <div class="setlistBox">
                                <div class="setitemBox">
                                    <div class="seticon"><img src="/assets/images/common/setlist_icon_05.png" alt=""></div>
                                    <div class="settitle">서비스 설정</div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a use:link href="/service/environment/subscription">
                            <div class="setlistBox">
                                <div class="setitemBox">
                                    <div class="seticon"><img src="/assets/images/common/setlist_icon_06.png" alt=""></div>
                                    <div class="settitle">구독 관리</div>
                                </div>
                            </div>
                        </a>
                    </li>
                {/if}
                <li>
                    <a use:link href="/service/environment/mypage">
                        <div class="setlistBox">
                            <div class="setitemBox">
                                <div class="seticon"><img src="/assets/images/common/setlist_icon_02.png" alt=""></div>
                                <div class="settitle">내 정보</div>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a  use:link href="/service/environment/qnaList">
                        <div class="setlistBox">
                            <div class="setitemBox">
                                <div class="seticon"><img src="/assets/images/common/setlist_icon_03.png" alt=""></div>
                                <div class="settitle">1:1 문의</div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</section>