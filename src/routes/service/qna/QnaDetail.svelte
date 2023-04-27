
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import { link, push } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import { backBtn, role } from '../../../lib/store.js'

    import { onMount } from 'svelte';
    import { popOpenBtn } from "../../../lib/common.js";

    import CustumAlert from '../../../components/common/CustumAlert.svelte';

    import restapi from "../../../lib/api.js";

    import {imgView} from "../../../lib/common.js";
    import jQuery from "jquery";

    let qnaId;

    // 나의정보 가져오기
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
        console.log("1:1 문의 상세보기 호출");

        let url = "/v2/api/Qna/qnaDetail/"+qnaId;

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");

                    role.set(json_success.data.sendData.role);
                    qnaDetailData = json_success.data.sendData.qnaDetail;
                    qnaDetailFileData = json_success.data.sendData.qnaDetailFile;

                    // console.log(qnaDetailData);
                    // console.log(qnaDetailFileData);

                    qnaLayout = 1;
                } else if (json_success.data.err_code === "KO053" || json_success.data.err_code === "KO054") {
                    popTitle = "존재하지 않은 문의글"
                    popContents1 = json_success.data.err_msg;
                    imgState = 3;
                    popOpenBtn();
                } else if (json_success.data.err_code === "KO055") {
                    popTitle = "권한없음"
                    popContents1 = "본인이 작성한 문의만 확인 가능합니다.";
                    imgState = 2;
                    popOpenBtn();
                } else {
                    console.log("조회된 데이터가 없습니다.");
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("1:1 문의하기 리스트 호출 실패");
            }
        )

    }

    let qnaLayout = 0;

    let qnaAnswerContents = ""; // 답변내용
    // 답변하기
    function qnaAnswer() {
        if(qnaAnswerContents === "" || qnaAnswerContents.search(/\s/) !== -1) {
            jQuery(".textBlank").css("display","block");
            return false;
        }

        console.log("답변하기 클릭!");

        let url = "/v2/api/Qna/qnaAnswer";

        let sendData = {
            qnaId : qnaId,
            qnaAnswer : qnaAnswerContents
        }

        restapi('v2', 'post', url, "body", sendData, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    $role = "";
                    popTitle = "답변을 완료했습니다."
                    imgState = 1;
                    popOpenBtn();
                } else if (json_success.data.err_code === "KO053" || json_success.data.err_code === "KO054") {
                    popTitle = "존재하지 않은 문의글"
                    popContents1 = json_success.data.err_msg;
                    imgState = 3;
                    popOpenBtn();
                } else if (json_success.data.err_code === "KO001") {
                    popTitle = "권한없음"
                    popContents1 = "답변할 권한이 없습니다.";
                    imgState = 2;
                    popOpenBtn();
                } else {
                    console.log("조회된 데이터가 없습니다.");
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("1:1 답변하기 호출 실패");
            }
        )
    }

</script>

<Header />
<section class="bodyWrap inqdetailContent">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment/qnaList">{$backBtn}</a><h1>1:1 문의</h1>
            <dl>
                서비스 관련 궁금증이 있으신가요?<br>
                궁금한 내용을 남겨주시면 최대한 빠르게 답변을 드리도록 하겠습니다.
            </dl>
        </div>

        {#if qnaLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else if qnaLayout === 1}
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

                        {#if qnaDetailData.qnaState === 0 && $role === "ROLE_SYSTEM"}
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
                    {#if qnaDetailData.qnaState === 0 && $role === "ROLE_SYSTEM"}
                        <div class="wr_BtnBox marT24">
<!--                        <button class="wr_del">삭제하기</button>-->
                            <button class="wr_revise" on:click={qnaAnswer}>답변하기</button>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</section>

<CustumAlert {popType} {imgState} {startFun} {popTitle} {popContents1} {popCheck} />