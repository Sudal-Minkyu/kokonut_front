
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import { link, push } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import { backBtn, userInfoData } from '../../../lib/store.js'

    import { onMount } from 'svelte';
    import { popOpenBtn } from "../../../lib/common.js";
    import CustumAlert from '../../../components/common/CustumAlert.svelte';
    import {imgView} from "../../../lib/common.js";
    import jQuery from "jquery";
    import LoadingOverlay from "../../../components/common/ui/LoadingOverlay.svelte";
    import {ajaxBody, ajaxGet, reportCatch} from "../../../components/common/ajax.js";

    let qnaId;

    onMount( () => {
        qnaId = window.location.href.split('/').pop();
        qnaDetail(qnaId);
    });

    // 리스트로 페이지이동
    function startFun() {
        push("/service/environment/qnaList");
    }

    let qnaDetailData;
    let qnaDetailFileData;

    let popType = 1; // 1: 버튼하나, 2: 여부를 묻는 버튼 두개
    let imgState; // 1 : 성공, 2 : 경고, 3: 실패, 4: 물음표
    let popTitle = "";
    let popContents1 = "";
    let popCheck = "확인";

    // 1:1 문의 상세보기 호출
     function qnaDetail(qnaId) {
        let url = "/v2/api/Qna/qnaDetail/"+qnaId;

        ajaxGet(url, false, (res) => {
            try {
                qnaDetailData = res.data.sendData.qnaDetail;
                qnaDetailFileData = res.data.sendData.qnaDetailFile;
                qnaLayout = 1;
            } catch (e) {
                reportCatch('temp094', e);
            }
        }, (errCode, errMsg) => {
            try {
                if (errCode === "KO053" || errCode === "KO054") {
                    popTitle = "존재하지 않은 문의글"
                    popContents1 = errMsg;
                    imgState = 3;
                    popOpenBtn();
                } else if (errCode === "KO055") {
                    popTitle = "권한없음"
                    popContents1 = "본인이 작성한 문의만 확인 가능합니다.";
                    imgState = 2;
                    popOpenBtn();
                } else {
                }
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp095', e);
            }
        });
    }
    let qnaLayout = 0;

    let qnaAnswerContents = ""; // 답변내용
    // 답변하기
    function qnaAnswer() {
        if(qnaAnswerContents === "" || qnaAnswerContents.search(/\s/) !== -1) {
            jQuery(".textBlank").css("display","block");
            return false;
        }
        let url = "/v2/api/Qna/qnaAnswer";

        let sendData = {
            qnaId : qnaId,
            qnaAnswer : qnaAnswerContents
        }

        ajaxBody(url, sendData, (res) => {
            try {
                popTitle = "답변을 완료했습니다."
                imgState = 1;
                popOpenBtn();
            } catch (e) {
                reportCatch('temp096', e);
            }
        }, (errCode, errMsg) => {
            try {
                if (errCode === "KO053" || errCode === "KO054") {
                    popTitle = "존재하지 않은 문의글"
                    popContents1 = errMsg;
                    imgState = 3;
                    popOpenBtn();
                } else if (errCode === "KO001") {
                    popTitle = "권한없음"
                    popContents1 = "답변할 권한이 없습니다.";
                    imgState = 2;
                    popOpenBtn();
                } else {
                }
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp097', e);
            }
        });
    }

</script>

<Header />
<section class="bodyWrap inqdetailContent">
    <div class="contentInnerWrap">
        <div class="spcontWrap">
            <div class="pageTitleBtn marB50">
                <a use:link href="/service/environment/qnaList">{$backBtn}</a><h1>1:1 문의</h1>
                <dl>
                    💡 서비스 관련 궁금증이 있으신가요?<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;궁금한 내용을 남겨주시면 최대한 빠르게 답변을 드리도록 하겠습니다.
                </dl>
            </div>
        </div>

        <LoadingOverlay bind:loadState={qnaLayout} top={150}>
            <div class="seaWrap marT24" in:fade>
                <div class="seaContentBox">
                    <div class="seaContentLine borB">
                        <div class="seaCont wid50per">
                            <dl>분류</dl>
                            <div class="sctextBox">
                                {#if qnaDetailData.qnaType === 0 }
                                    <span>기타</span>
                                {:else if qnaDetailData.qnaType === 1}
                                    <span>회원정보</span>
                                {:else if qnaDetailData.qnaType === 2}
                                    <span>사업자정보</span>
                                {:else if qnaDetailData.qnaType === 3}
                                    <span>Kokonut서비스</span>
                                {:else if qnaDetailData.qnaType === 4}
                                    <span>결제</span>
                                {:else}
                                    <span>없음</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="seaContentLine borB">
                        <div class="seaCont wid100per">
                            <dl>제목</dl>
                            <div class="sctextBox">
                                <span>{qnaDetailData.qnaTitle}</span>
                            </div>
                        </div>
                    </div>
                    <div class="seaContentLine borB">
                        <div class="seaCont wid100per">
                            <dl>문의내용</dl>
                            <div class="sctextBox">
                                <span>{qnaDetailData.qnaContent}</span>
                            </div>
                        </div>
                    </div>
                    <div class="seaContentLine ">
                        <div class="seaCont wid100per">
                            <dl>참고 이미지 첨부</dl>
                            <div class="sc_fileBox">
                                <div class="fileInner">
                                    <div class="file-list">
                                        {#if qnaDetailFileData.length !== 0}
                                            {#each qnaDetailFileData as qnaDetailFile, i}
                                                <div class="filebox">
                                                    <p class="name">
                                                        <!-- 파일 다운로드 할 수 있게 ? 또는 썸네일 이미지 클릭시 크게 볼 수 있도록 -->
                                                        <a>{qnaDetailFile.qfOriginalFilename}</a>
                                                        <br/>
                                                        <img src="{qnaDetailFile.qfBucket}" alt="{qnaDetailFile.qfOriginalFilename}" on:click={() => imgView(qnaDetailFile.qfFilename)} />
                                                    </p>
                                                </div>
                                            {/each}
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--            <div class="wr_BtnBox marT24">-->
                <!--                <button class="wr_del">삭제하기</button>-->
                <!--                <button class="wr_revise">수정하기</button>-->
                <!--            </div>-->
                <div class="seaWrap marT60">
                    <div class="seaContentBox">
                        <div class="seaContentLine borB">
                            <div class="seaCont wid50per">
                                <dl>상태</dl>
                                <div class="sctextBox">
                                    {#if qnaDetailData.qnaState === 0 }
                                        <span>답변대기</span>
                                    {:else if qnaDetailData.qnaState === 1}
                                        <span>답변완료</span>
                                    {:else}
                                        <span>없음</span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        {#if qnaDetailData.qnaState === 1 }
                            <div class="seaContentLine borB">
                                <div class="seaCont wid50per">
                                    <dl>답변일시</dl>
                                    <div class="sctextBox">
                                        <span>{qnaDetailData.modify_date}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="seaContentLine borB">
                                <div class="seaCont wid100per">
                                    <dl>답변내용</dl>
                                    <div class="sctextBox">
                                        <span class="font400">
                                            {qnaDetailData.qnaAnswer}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        {/if}

                        {#if qnaDetailData.qnaState === 0 && $userInfoData.role === "ROLE_SYSTEM"}
                            <div class="seaContentLine borB">
                                <div class="seaCont wid100per">
                                    <dl>답변내용</dl>
                                    <div class="sc_textareaBox">
                                        <p style="margin: 0" class="textBlank">답변내용을 입력해주세요.</p>
                                        <textarea bind:value={qnaAnswerContents} placeholder="답변 내용을 적어주세요."></textarea>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                    {#if qnaDetailData.qnaState === 0 && $userInfoData.role === "ROLE_SYSTEM"}
                        <div class="wr_BtnBox marT24">
                            <!--                        <button class="wr_del">삭제하기</button>-->
                            <button class="wr_revise" on:click={qnaAnswer}>답변하기</button>
                        </div>
                    {/if}
                </div>
            </div>
        </LoadingOverlay>
    </div>
</section>

<CustumAlert {popType} {imgState} {startFun} {popTitle} {popContents1} {popCheck} />