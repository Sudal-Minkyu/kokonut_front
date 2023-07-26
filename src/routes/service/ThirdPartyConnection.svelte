<script>
    import Header from "../../components/service/layout/Header.svelte";
    import ConnectionSettingPop
        from "../../components/service/environment/thirdPartyConnection/ConnectionSettingPop.svelte";
    import {onDestroy, onMount} from "svelte";

    onMount(() => {
        document.body.addEventListener('click', handleTabEvent);
    });

    onDestroy(() => {
        document.body.removeEventListener('click', handleTabEvent);
    });

    const handleTabEvent = (event) => {
        if (!event.target.matches('.thirdTab')) return;
        let clickedTab = event.target;
        let tabsContainer = clickedTab.parentElement.parentElement;
        let tabs = Array.from(tabsContainer.getElementsByClassName('thirdTab'));
        let tabIndex = tabs.indexOf(clickedTab);
        tabs.forEach(tab => {
            tab.classList.remove('ontr_tab');
        });
        clickedTab.classList.add('ontr_tab');
        let contentContainer = tabsContainer.parentElement.parentElement.parentElement.parentElement
            .getElementsByClassName('thirdItemWrap')[0];
        let contents = Array.from(contentContainer.children);
        contents.forEach(content => {
            content.style.display = 'none';
        });
        contents[tabIndex].style.display = 'block';
    }



</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>서드파티 연동</h1>
        </div>
        <div class="thirdWrap marT50">
            <div class="thirdTabBox marB50">
                <div class="thirdTab ontr_tab">데이터 분석 서비스</div>
                <div class="thirdTab">SMS 발송 서비스</div>
            </div>
            <div class="thirdItemWrap">
                <div class="thirdItemBox">
                    <ul>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/kakao_icon.png" alt="">
                                        <h2>카카오톡</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/slack_icon.png" alt="">
                                        <h2>슬랙</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/bizmlogo.png" alt="비즈엠로고">
                                        <h2>비즈엠</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_off">사용 안 함</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/slack_icon.png" alt="">
                                        <h2>슬랙</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/kakao_icon.png" alt="">
                                        <h2>카카오톡</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/slack_icon.png" alt="">
                                        <h2>슬랙</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/google_forms_icon.png" alt="">
                                        <h2>Google Forms</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_off">사용 안 함</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/slack_icon.png" alt="">
                                        <h2>슬랙</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="thirdItemBox">
                    <ul>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/kakao_icon.png" alt="">
                                        <h2>카카오톡</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/slack_icon.png" alt="">
                                        <h2>슬랙</h2>
                                        <a href="">사용가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="thirdItem_on">사용중</div>
                                    <button class="open_change_pop">연동 설정</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

{#if false}
    <ConnectionSettingPop />
{/if}