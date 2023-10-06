
<script>
    import { onMount } from 'svelte';
    import {querystring} from 'svelte-spa-router'

    import Error from '../../components/common/error/Error.svelte'

    import CreateMain from '../../components/home/create/CreateMain.svelte'
    import PwChangeMain from '../../components/home/pwchange/PwChangeMain.svelte'

    import LoadingOverlay from "../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxBody, reportCatch} from "../../components/common/ajax.js";

    let userEmail = "";
    let pagetext = "";
    let createLayout = 0;
    let pageErrMsg1 = "";
    let pageErrMsg2 = "";
    let pageErrUrl = "/";

    onMount(async () => {
        // 관리자등록 검증
        await createCheck();
    });

    let searchParams = new URLSearchParams($querystring);

    function createCheck() {
        if(searchParams.has("evKo") && searchParams.has("kvKo") && searchParams.has("ivKo")) {
            let url = "/v1/api/Auth/createCheck"

            let sendData = {
                sendType : searchParams.get("send"),
                evKoData : searchParams.get("evKo"),
                kvKoData : decodeURIComponent(searchParams.get("kvKo")).replaceAll(" ","+"),
                ivKoData : decodeURIComponent(searchParams.get("ivKo")).replaceAll(" ","+")
            }

            ajaxBody(url, sendData, (res) => {
                try {
                    pagetext = res.data.sendData.pagetext;
                    userEmail = res.data.sendData.userEmail;

                    createLayout = 1;
                } catch (e) {
                    reportCatch('temp041', e);
                }
            }, (errCode, errMsg) => {
                try {
                    if (errCode === "KO084") {
                        pageErrMsg1 = "인증키가 일치하지 않습니다."
                        pageErrMsg2 = "메일을 다시 확인해주시고 제공해드린 링크로 다시 진행해주세요."
                        pageErrUrl = "/"
                        createLayout = 2;
                    } else if (errCode === "KO085_1") {
                        pageErrMsg1 = "해당페이지가 만료되었습니다."
                        pageErrMsg2 = "관리자에게 이메일 재인증 요청을 해주시길 바랍니다."
                        pageErrUrl = "/"
                        createLayout = 2;
                    } else if (errCode === "KO085_2") {
                        pageErrMsg1 = "해당페이지가 만료되었습니다."
                        pageErrMsg2 = "이미 비밀번호 변경을 하였습니다. 관리자에게 다시 비밀번호변경 요청을 해주시길 바랍니다."
                        pageErrUrl = "/"
                        createLayout = 2;
                    } else if (errCode === "KO086") {
                        pageErrMsg1 = errMsg;
                        pageErrMsg2 = "로그인창으로 돌아가 로그인해보시길 바랍니다."
                        pageErrUrl = "/login"
                        createLayout = 2;
                    } else if (errCode === "KO004") {
                        pageErrMsg1 = errMsg;
                        pageErrMsg2 = "등록해주신 관리자에게 문의해주시길 바랍니다."
                        pageErrUrl = "/"
                        createLayout = 2;
                    } else {
                        pageErrMsg1 = "관리자 등록 키 검증 실패";
                        pageErrMsg2 = errMsg;
                        pageErrUrl = "/login"
                        createLayout = 2;
                    }
                    return {action: 'NONE'};
                } catch (e) {
                    reportCatch('temp042', e);
                }
            });
        }
    }
</script>

<LoadingOverlay bind:loadState={createLayout} top={300} >
    {#if createLayout === 1}
        <div class="join_membership" id="joinWrap">
            <div class="joinCont">
                <div class="joinBg"></div>
                <div class="joinContArea">
                    {#if pagetext === "관리자 등록"}
                        <CreateMain {userEmail} {pagetext} />
                    {:else}
                        <PwChangeMain {userEmail} {pagetext} />
                    {/if}
                </div>
            </div>
        </div>
    {:else if createLayout === 2}
        <Error {pageErrMsg1} {pageErrMsg2} {pageErrUrl} />
    {/if}
</LoadingOverlay>