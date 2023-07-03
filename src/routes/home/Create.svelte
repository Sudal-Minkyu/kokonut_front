
<script>
    import { onMount } from 'svelte';
    import {querystring} from 'svelte-spa-router'

    import Error from '../../components/common/error/Error.svelte'
    import CreateMain from '../../components/home/create/CreateMain.svelte'
    import LoadingOverlay from "../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxBody} from "../../components/common/ajax.js";

    onMount(async () => {
        // 관리자등록 검증
        await createCheck();
    })


    let searchParams = new URLSearchParams($querystring);

    function createCheck() {
        console.log("관리자 등록 키 검증");

        // console.log("searchParams : "+searchParams);
        // console.log("evKoData : "+searchParams.get("evKo"));
        // console.log("kvKoData : "+searchParams.get("kvKo"));

        if(searchParams.has("evKo") && searchParams.has("kvKo") && searchParams.has("ivKo")) {
            let url = "/v1/api/Auth/createCheck"

            let sendData = {
                evKoData : searchParams.get("evKo"),
                kvKoData : decodeURIComponent(searchParams.get("kvKo")).replaceAll(" ","+"),
                ivKoData : decodeURIComponent(searchParams.get("ivKo")).replaceAll(" ","+")
            }

            ajaxBody(url, sendData, (res) => {
                userEmail = res.data.sendData.userEmail
                createLayout = 1;
            }, (errCode, errMsg) => {
                if(errCode === "KO084") {
                    pageErrMsg1 = "인증키가 일치하지 않습니다."
                    pageErrMsg2 = "메일을 다시 확인해주시고 제공해드린 링크로 다시 진행해주세요."
                    pageErrUrl = "/"
                    createLayout = 2;
                } else if(errCode === "KO085") {
                    pageErrMsg1 = "해당페이지가 만료되었습니다."
                    pageErrMsg2 = "관리자에게 이메일 재인증요청을 해주시길 바랍니다."
                    pageErrUrl = "/"
                    createLayout = 2;
                } else if(errCode === "KO086") {
                    pageErrMsg1 = errMsg;
                    pageErrMsg2 = "로그인창으로 돌아가 로그인해보시길 바랍니다."
                    pageErrUrl = "/login"
                    createLayout = 2;
                } else if(errCode === "KO004") {
                    pageErrMsg1 = errMsg;
                    pageErrMsg2 = "등록해주신 관리자에게 문의해주시길 바랍니다."
                    pageErrUrl = "/"
                    createLayout = 2;
                } else {
                    createLayout = 2;
                    console.error("관리자 등록 키 검증 실패");
                    console.error(errMsg);
                }
                return {action: 'NONE'};
            });
        }
    }

    let userEmail = "";

    let createLayout = 0;
    let pageErrMsg1 = "";
    let pageErrMsg2 = "";
    let pageErrUrl = "";
</script>


<LoadingOverlay left={45} top={30}>
    {#if createLayout === 1}
        <div class="join_membership" id="joinWrap">
            <div class="joinCont">
                <div class="joinBg"></div>
                <div class="joinContArea">
                    <CreateMain {userEmail} />
                </div>
            </div>
        </div>
    {:else}
        <Error {pageErrMsg1} {pageErrMsg2} {pageErrUrl} />
    {/if}
</LoadingOverlay>