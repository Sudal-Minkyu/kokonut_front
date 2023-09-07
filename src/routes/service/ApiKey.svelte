<!--API Key 관리 페이지-->

<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import {backBtn, userInfoData} from '../../lib/store'
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition'
    import jQuery from 'jquery';
    import CustumAlert from "../../components/common/CustumAlert.svelte"
    import { popOpenBtn, }from '../../lib/common'
    import ApiKeyIpDelete from '../../components/service/environment/apikey/ApiKeyIpDelete.svelte'
    import ApiKeyIpAdd from '../../components/service/environment/apikey/ApiKeyIpAdd.svelte'
    import ApiKeyExplan from '../../components/service/environment/apikey/ApiKeyExplan.svelte'
    import {logout} from "../../components/common/authActions.js";
    import LoadingOverlay from "../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxGet, ajaxParam, reportCatch} from "../../components/common/ajax.js";
    import {openBanner} from "../../components/common/ui/DialogManager.js";

    $: isModifiable = ['ROLE_MASTER', 'ROLE_ADMIN'].includes($userInfoData.role);

    let allChecked = false;
    let deleteIpList = [];
    // 체크박스 초기화 + deleteIpList 초기화
    function deleteIpListInit() {
        deleteIpList = [];
        allChecked = false;
        for(let i=1; i<ipSize+1; i++){
            jQuery("#ip"+i).prop('checked', false);
        }
    }

    // 삭제 할 IP체크 체크박스 함수
    function checkBoxClick(event) {
        if (jQuery("#"+event.target.id).is(":checked")) {
            let checkIp = jQuery("#"+event.target.value).text();
            deleteIpList.push(checkIp);
        } else {
            for(let i = 0; i < deleteIpList.length; i++) {
                if(deleteIpList[i] === jQuery("#"+event.target.value).text())  {
                    deleteIpList.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
    }

    // 삭제 할 IP 전체체크박스 함수
    function allcheckBox(event) {
        allChecked = !allChecked;
        setTimeout(() => event.target.checked = allChecked, 0);

        if (jQuery("#allcheck").is(":checked")) {
            deleteIpList = [];

            for(let i=1; i<ipSize+1; i++){
                deleteIpList.push(jQuery("#accessIp"+i).text());
            }

            jQuery(".partcheck").prop("checked", true);
        } else {
            deleteIpList = [];

            jQuery(".partcheck").prop("checked", false);
        }
    }

    let ipPopState = 0;
    // IP추가 및 삭제 팝업장치
    function ipChange(val) {
        ipPopState = val;
    }

    let explanState;
    let apikeyTrueFalse = 0;

    let apiKey = "";
    let filterApiKey = "";
    let accessIpList;
    // let accessIpMemoList  = [];

    // 허용ip 사이즈
    let ipSize = 0;
    $: ipSize;

    let addBtn = true;
    let getMyIp;

    // API Key 존재여부가져오기
    onMount(async () => {

        await apiKeyInfo();
        await myIp();
    })

// 내 공인 IP 가져오기
    function myIp() {
        getMyIp = ['192', '168', '0', '123'];
        // 이거 잘 작동이 되는건지 확인 한번 더 해야함. woody
        jQuery.getJSON('https://ipapi.co/json/', function(json) {
            getMyIp = json.ip.split('.');
        });

        // 이거 갑자기 작동안됨..
        // (function(window){
        //     let head = document.getElementsByTagName('head')[0];
        //     let script= document.createElement('script');
        //     window.getIP = function(json) {
        //         getMyIp = json.ip.split('.');
        //     };
        //     script.type= 'text/javascript';
        //     script.src= 'https://api.ipify.org?format=jsonp&callback=getIP';
        //     head.appendChild(script);
        // })(window);
    }

    // APi Key 정보가져오기
    function apiKeyInfo() {
        let url = "/v2/api/ApiKey/apiKeyCheck"

        ajaxGet(url, false, (res) => {
            try {
                apikeyTrueFalse = res.data.sendData.result;
                // apikeyTrueFalse = 0;
                popType = 2;
                if (apikeyTrueFalse === 2) {
                    apiKey = res.data.sendData.apiKey;
                    filterApiKey = res.data.sendData.filterApiKey;
                    accessIpList = res.data.sendData.accessIpList;
                    ipSize = accessIpList.length;
                    if (ipSize === 5) {
                        addBtn = false;
                    }
                    explanState = false;
                    popTitle = "Key를 재발급받으시겠습니까?";
                    popContents1 = "재발급 받으실 경우 이전에 받으신";
                    popContents2 = "API Key의 사용은 불가합니다.";
                    imgState = 2;
                } else {
                    explanState = true;
                    popTitle = "Key를 발급받으시겠습니까?";
                    popContents1 = "";
                    popContents2 = "";
                    imgState = 4;
                }
            } catch (e) {
                reportCatch('temp043', e);
            }
        }, (errCode, errMsg) => {
            try {
                // 유저가 존재하지 않을 시 로그인페이지로 이동시킴
                alert(errMsg);
                logout();
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp044', e);
            }
        });
    }

    // API Key 발급 및 재발급
    let startFun = function apiKeyIssued() {
        let url = "/v2/api/ApiKey/apiKeyIssue"

        ajaxParam(url, {}, (res) => {
            try {
                apiKeyInfo();
            } catch (e) {
                reportCatch('temp045', e);
            }
        });
    }

    // API ket 복사
    function apiKeyCopy() {
        const textarea = document.getElementById("copycode");
        textarea.select();

        document.execCommand('copy');
        openBanner('API키를 클립보드에 복사하였습니다.');
    }

    let change = true;
    // API 보기
    function changeApiKey() {
        if(change) {
            jQuery('.pwcode').css('display','none');
            jQuery(".codeIcon_key").css({"background-image":"url(/assets/images/common/eye_on_icon.png)"});
            jQuery('#copycode').css('display','block');
            jQuery('.codeIcon_copy').css('display','block');
        } else {
            jQuery('.pwcode').css('display','block');
            jQuery(".codeIcon_key").css({"background-image":"url(/assets/images/common/eye_off_icon.png)"});
            jQuery('#copycode').css('display','none');
            jQuery('.codeIcon_copy').css('display','none');
        }
        change = !change
    }

    let popType;
    let imgState;
    let popTitle;
    let popContents1;
    let popContents2;
    let popStart = "예";
    let popCancel = "아니오";
    let popCheck = "확인";

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">

        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a><h1>API Key 발급</h1>
        </div>

        <div class="apikeyBox">
            <LoadingOverlay bind:loadState={apikeyTrueFalse} >
                {#if apikeyTrueFalse === 1 && isModifiable}
                <div class="apikeyBtn" on:click={popOpenBtn} in:fade>API Key 발급</div>
                {:else}
                <div class="apiwrap" in:fade>
                    <div class="apicodeContentBox marB60">
                        <div class="codeContentBox">
                            <div class="codeTitle">
                                <h2>API Key</h2>
                                <div class="codeIconBox">
                                    <div class="codeIcon_key" on:click={changeApiKey}></div>
                                    <div class="codeIcon_copy" style="display: none" on:click={apiKeyCopy}></div>
                                </div>
                            </div>
                            <div class="codeNormalContent">
                                <div class="codeNormal">
                                    <div class="pwcode">{filterApiKey}</div>
                                    <textarea class="cote" id="copycode">{apiKey}</textarea>
                                </div>
                            </div>
                        </div>

                        {#if isModifiable}
                            <button id="excel_download_pop" on:click={popOpenBtn}>API Key 재발급</button>
                        {/if}

                    </div>

                    <div>
                        <div class="ipseaBox marB46">
                            <div class="koinput"></div>
                            <div class="floatBtnBox">
                                {#if ipSize >= 1 && isModifiable}
                                    <button class="del" on:click={() => ipChange(1)} id="ipdel_pop">삭제</button>
                                {/if}
                                {#if ipSize !== 5 && isModifiable}
                                    <button class="add" on:click={() => ipChange(2)} id="ipadd_pop">추가</button>
                                {/if}
                            </div>
                        </div>
                        <div class="prtable">
                            <table>
                                <colgroup>
                                    {#if isModifiable}
                                        <col style="width:8.21%;">
                                    {/if}
                                    <col style="width:71.14%;">
                                    <col>
                                </colgroup>
                                <thead>
                                <tr>
                                    {#if isModifiable}
                                        <th>
                                            <div class="koko_check">
                                                <input type="checkbox" bind:checked="{allChecked}" on:click|preventDefault={allcheckBox} id="allcheck">
                                                <label for="allcheck"><em></em></label>
                                            </div>
                                        </th>
                                    {/if}
                                    <th>공인 IP</th>
                                    <th>메모</th>
                                </tr>
                                </thead>
                                <tbody>
                                {#if ipSize !== 0}
                                    {#each accessIpList as accessIp, i}
                                        <tr>
                                            {#if isModifiable}
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" id="ip{i+1}" class="partcheck" value="accessIp{i+1}" on:click={checkBoxClick} >
                                                        <label for="ip{i+1}"><em></em></label>
                                                    </div>
                                                </td>
                                            {/if}
                                            <td id="accessIp{i+1}">{accessIp.accessIp}</td>
                                            <td id="accessMemo{i+1}">{accessIp.memo}</td>
                                        </tr>
                                    {/each}
                                {:else}
                                    <tr>
                                        <td>
                                            <div class="koko_check">
                                            </div>
                                        </td>
                                        <td>허용된 IP가 없습니다.</td>
                                        <td></td>
                                    </tr>
                                {/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/if}
            </LoadingOverlay>

            {#if apikeyTrueFalse !== 0}
                <ApiKeyExplan {explanState} />
            {/if}
        </div>
    </div>
</section>

{#if ipPopState === 1}
    <ApiKeyIpDelete {apiKeyInfo} {ipChange} {deleteIpListInit} {deleteIpList} />
{:else if ipPopState === 2}
    <ApiKeyIpAdd {apiKeyInfo} {ipChange} {getMyIp} {accessIpList} />
{/if}

<CustumAlert popType = {popType} imgState = {imgState} startFun = {startFun} {popTitle} {popContents1} {popContents2} {popStart} {popCancel} {popCheck} />
