<script>
    import Header from "../../components/service/layout/Header.svelte";
    import ConnectionSettingPop
        from "../../components/service/environment/thirdPartyConnection/ConnectionSettingPop.svelte";
    import {onDestroy, onMount} from "svelte";
    import {ajaxGet, reportCatch} from "../../components/common/ajax.js";
    import {backBtn} from "../../lib/store.js";
    import {link} from 'svelte-spa-router'
    import { fade } from 'svelte/transition'

    onMount(() => {
        getThirdPartyInfo();
        getColumnLIst();
        getBizmSetting();
        // document.body.addEventListener('click', handleTabEvent);
    });

    onDestroy(() => {
        // document.body.removeEventListener('click', handleTabEvent);
    });

    let thirdPartyInfo = {
        bizmUseType: '0',
    }
    const getThirdPartyInfo = () => {
        ajaxGet('/v2/api/Index/thirdPartyInfo', false, (res) => {
            try {
                thirdPartyInfo = res.data.sendData;
            } catch (e) {
                reportCatch('temp056', e);
            }
        });
    }

    let columnList = [];
    const getColumnLIst = () => {
        ajaxGet('/v2/api/DynamicUser/searchColumnCall', false, (res) => {
            try {
                if (res.data.sendData.fieldList.length) {
                    columnList = res.data.sendData.fieldList;
                }
            } catch (e) {
                reportCatch('temp057', e);
            }
        });
    }

    const updateReceiverSelectBoxString = (selectedCode) => {
        const selectedColumnArray = columnList.filter(obj => obj.fieldCode === selectedCode);
        document.getElementById('emailColumnLabel').innerHTML = selectedColumnArray.length ? selectedColumnArray[0].fieldComment : '미지정';
    }

    let bizmSettingData = {
        tsBizmReceiverNumCode: '',
        tsBizmAppUserIdCode: '',
    }
    $: isBizmOn = !!bizmSettingData.choseCode;

    const getBizmSetting = () => {
        ajaxGet('/v2/api/ThirdParty/bizmGetCode', false, (res) => {
            try {
                bizmSettingData = res.data.sendData.thirdPartySettingInfo;
            } catch (e) {
                reportCatch('temp058', e);
            }
        });
    }

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

    const connectionSettingPop = {
        visible: false,
        open: () => {
            connectionSettingPop.visible = true;
        },
        close: () => {
            connectionSettingPop.visible = false;
        },
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a>
            <h1>서드파티 연동</h1>
        </div>
        <div class="thirdWrap marT50" in:fade >
            <div class="thirdTabBox marB50">
                <div class="thirdTab ontr_tab">메시징 서비스</div>
            </div>
            <div class="thirdItemWrap">
                <div class="thirdItemBox">
                    <ul>
                        <li>
                            <div class="thirdItem">
                                <div class="thirdItemIconLine">
                                    <div class="thirdItemIcon">
                                        <img src="/assets/images/common/bizmlogo.png" alt="비즈엠로고">
                                        <h2>카카오 알림톡</h2>
                                        <a href="../../../public/assets/file/알림톡%20템플릿%20검수가이드.pdf" download="알림톡 템플릿 검수가이드.pdf">알림톡 가이드<span></span></a>
                                    </div>
                                </div>
                                <div class="thirdItemBtnLine">
                                    <div class="{thirdPartyInfo.bizmUseType === '1' ? 'thirdItem_on' : 'thirdItem_off'}">{thirdPartyInfo.bizmUseType === '1'  ? '사용중' : '사용안함'}</div>
                                    <button class="open_change_pop" on:click={connectionSettingPop.open}>연동 설정</button>
                                </div>
                            </div>
                        </li>
<!--                        <li>-->
<!--                            <div class="thirdItem">-->
<!--                                <div class="thirdItemIconLine">-->
<!--                                    <div class="thirdItemIcon">-->
<!--                                        <img src="/assets/images/common/slack_icon.png" alt="">-->
<!--                                        <h2>슬랙</h2>-->
<!--                                        <a href="">사용가이드<span></span></a>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="thirdItemBtnLine">-->
<!--                                    <div class="thirdItem_on">사용중</div>-->
<!--                                    <button class="open_change_pop">연동 설정</button>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </li>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

{#if connectionSettingPop.visible}
    <ConnectionSettingPop {connectionSettingPop} {columnList} {getThirdPartyInfo} bind:savedBizmSettingData={bizmSettingData} />
{/if}