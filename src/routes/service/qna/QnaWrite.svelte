
<script>
    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import {link, push} from 'svelte-spa-router'
    import { backBtn } from '../../../lib/store.js'
    import {onMount} from "svelte";
    import {popOpenBtn} from "../../../lib/common.js";
    import jQuery from "jquery";
    import restapi from "../../../lib/api.js";
    import CustumAlert from '../../../components/common/CustumAlert.svelte';
    import {ajaxMultipart, reportCatch} from "../../../components/common/ajax.js";

    onMount(async ()=>{
        await fatchSearchModule();
    });

    async function fatchSearchModule(){
        let libSearch = await import('../../../lib/libSearch.js');
        libSearch.setCustomSelectBox();
        libSearch.setOptionItem(customSelectBoxOpt);
    }

    let customSelectBoxOpt = [
        {id : "qnaType", use_all : false, codeName : "qna_type"},
    ];

    let popType; // 1: 버튼하나, 2: 여부를 묻는 버튼 두개
    let imgState; // 1 : 성공, 2 : 경고, 3: 실패, 4: 물음표
    let popTitle = ""; // 제목 텍스트
    let popContents1 = ""; // 내용1 텍스트
    let popStart = ""; // 예 텍스트
    let popCancel = ""; // 아니오 텍스트
    let popCheck = "";
    let qnaTitle = "";
    let qnaContent = "";
    let startFun;

    let textState= 0;
    function qnaStart() {
        if(!qnaTitle.trim()) {
            textState = 1;
            return false;
        }

        popType = 2;
        imgState = 2;
        popTitle = "1:1 문의를 하시겠습니까?";
        popContents1 = "답변은 최소 3~5일 정도 걸립니다."
        popStart = "예";
        popCancel = "아니오";
        startFun = qnaWrite;
        popOpenBtn();
    }

    function qnaWrite() {
        console.log("문의하기 클릭!");

        console.log(filesArr);
        console.log(filesArr.length);

        let url =  '/v2/api/Qna/qnaWrite';

        let formData = new FormData();
        formData.append("qnaType",jQuery("#qnaType").text());
        formData.append("qnaTitle",qnaTitle);
        formData.append("qnaContent",qnaContent);
        if(filesArr.length !== 0) {
            for(let i=0; i<filesArr.length; i++){
                formData.append('multipartFiles', new Blob([filesArr[i]], {type: filesArr[i].type}), filesArr[i].name);
            }
        }

        ajaxMultipart(url, formData, (res) => {
            try {
                console.log(res);
                push('/service/environment/qnaList');
            } catch (e) {
                reportCatch('temp100', e);
            }
        });
    }

    let filesArr = [];
    let files;
    $: if (files) {
        console.log("파일업로드 파일선택!");

        let start = true;
        let maxFileCnt = 5;   // 첨부파일 최대 개수
        let attFileCnt = document.querySelectorAll('.filebox').length; // 기존 추가된 첨부파일 개수
        let remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
        let curFileCnt = files.length;  // 현재 선택된 첨부파일 개수

        // console.log("maxFileCnt : "+maxFileCnt);
        // console.log("curFileCnt : "+curFileCnt);

        popType = 1;
        imgState = 3;
        popTitle = "지원하지 않은 첨부파일";
        popCheck = "확인";
        startFun = undefined;

        // 첨부파일 개수 확인
        if (curFileCnt > remainFileCnt) {
            popTitle = "첨부파일 초과"
            popContents1 = "첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다."
            popOpenBtn();
            start = false;
        }

        // console.log(files);
        if(start) {
            for (let i = 0; i < curFileCnt; i++) {
                // 첨부파일 검증
                if (validation(files[i])) {
                    // 파일 배열에 담기
                    filesArr = [...filesArr, files[i]];
                    // filesArr.push(files[i]); -> 이렇게하면 동적으로 생성이 안됨. 왜 그런지 모르겠네..ㅜ
                }
            }
            console.log("첨부파일 배열 넣음");
            console.log(filesArr);
            // console.log(filesArr[0]);
            // console.log(filesArr[0].name);
            console.log(filesArr.length);
            // console.log(typeof filesArr);
        }

        // 초기화
        document.querySelector("input[type=file]").value = "";
    }

    /* 첨부파일 검증 */
    function validation(obj){
        const fileTypes = ['application/pdf', 'image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif', 'application/haansofthwp', 'application/x-hwp'];
        if (obj.name.length > 100) {
            popContents1 = "파일명이 100자 이상인 파일은 제외되었습니다."
            popOpenBtn();
            return false;
        } else if (obj.size > (100 * 1024 * 1024)) {
            popContents1 = "최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다."
            popOpenBtn();
            return false;
        } else if (obj.name.lastIndexOf('.') === -1) {
            popContents1 = "확장자가 없는 파일은 제외되었습니다."
            popOpenBtn();
            return false;
        } else if (!fileTypes.includes(obj.type)) {
            popContents1 = "첨부가 불가능한 파일은 제외되었습니다."
            popOpenBtn();
            return false;
        } else {
            return true;
        }
    }

    /* 첨부파일 삭제 */
    function deleteFile(num) {
        console.log("삭제 할 파일 num번째 : "+num);
        document.querySelector("#file" + num).remove();
        console.log("filesArr.length : "+filesArr.length);
        console.log("delete before filesArr : "+filesArr);

        // filesArr = filesArr.filter((file, i) => i !== num);
        // filesArr = [...filesArr.slice(0, num), ...filesArr.slice(num + 1)];

        console.log("delete after filesArr : "+filesArr);

    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment/qnaList">{$backBtn}</a><h1>1:1 문의</h1>
            <dl>
                서비스 관련 궁금증이 있으신가요?<br>
                궁금한 내용을 남겨주시면 최대한 빠르게 답변을 드리도록 하겠습니다.
            </dl>
        </div>
        <div class="seaWrap marT24">
            <div class="seaContentBox">
                <div class="seaContentLine borB">
                    <div class="seaCont wid50per">
                        <dl>분류</dl>
                        <div class="sc_SelBox">
                            <div class="selectBox wid162">
                                <div class="label" id="qnaType">선택</div>
                                <ul class="optionList">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>제목<p class="{textState === 1 ? 'textShake' : 'noText'}">제목을 입력해주세요.</p></dl>
                        <div class="sc_inputBox">
                            <input type="text" bind:value={qnaTitle} placeholder="제목을 적어주세요.">
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>문의내용</dl>
                        <div class="sc_textareaBox">
                            <textarea bind:value={qnaContent} placeholder="문의 내용을 적어주세요."></textarea>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine ">
                    <div class="seaCont wid100per">
                        <dl>참고 이미지 첨부</dl>
                        <div class="sc_fileBox">
                            <div class="fileInner">
                                <div class="file-list">
                                    {#each filesArr as {name}, i}
                                        <div class="filebox" id="file{i}">
                                            <p class="name">{name}</p>
                                            <div class="delete" on:click={() => deleteFile(i)}></div>
                                        </div>
                                    {/each}
                                </div>
                                <label for="files" >첨부파일</label>
                                <input id="files" bind:files type="file" accept="image/*" multiple>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomBtnBox marT24">
                <a type="submit" class="myinfoChangeBtn" style="padding: 14px;margin-right: 10px;" use:link href="/service/environment/qnaList">목록가기</a>
                <button type="submit" class="bottomBtn" on:click={qnaStart}>문의하기</button>
            </div>
        </div>

    </div>
</section>

<CustumAlert {popType} {imgState} {startFun} {popTitle} {popContents1} {popStart} {popCancel} {popCheck} />