
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import {link, push} from 'svelte-spa-router'
    import {
        backBtn,
        privacySearchData,
        emailSendData,
        initialEmailSend,
        initialPrivacySearch, mainScreenBlockerVisibility,
    } from '../../../lib/store'
    import TextEditor from "../../../components/common/TextEditor.svelte";
    import EmailPersonSelectPop from "../../../components/service/email/EmailPersonSelectPop.svelte";
    import EmailBookPop from "../../../components/service/email/EmailBookPop.svelte";
    import {SelectBoxManager} from "../../../components/common/action/SelectBoxManager.js";
    import {onMount} from "svelte";
    import {ajaxMultipart} from "../../../components/common/ajax.js";
    import {openConfirm} from "../../../components/common/ui/DialogManager.js";

    let textEditorComponent;

    onMount(() => {
        emailSendData.set(JSON.parse(initialEmailSend));
        privacySearchData.set(JSON.parse(initialPrivacySearch));
    });

    const handleEmPurposeSelect = (el) => {
        emailSendData.update(obj => {
            obj.emPurpose = el.dataset.value;
            return obj;
        });
    }

    let isEmailPersonSelectPop = false;

    const openEmailPersonSelectPop = () => {
        isEmailPersonSelectPop = true;
    }

    const closeEmailPersonSelectPop = () => {
        isEmailPersonSelectPop = false;
    }

    let isEmailBookPop = false;

    const openEmailBookPop = () => {
        isEmailBookPop = true;
    }

    const closeEmailBookPop = () => {
        isEmailBookPop = false;
    }

    const formatMiniBarDate = (datetime) => {
        if (datetime) {
            const date = new Date(datetime);
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');

            const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
            let weekday = weekdays[date.getDay()];

            return `${year}. ${month}. ${day} (${weekday}) ${hours}:${minutes}`;
        } else {
            return '';
        }
    }

    $: miniBarDate = formatMiniBarDate($emailSendData.emReservationDate);

    const handleResetEmReservationDate = () => {
        emailSendData.update(obj => {
            obj.emReservationDate = 0;
            obj.emType = '1';
            return obj;
        });
    }

    const FILE_SIZE_LIMIT = 20 * 1024 * 1024 // 20MB
    let totalSize = '0.0';
    const handleAddFile = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);

            const currentFilesSize = $emailSendData.multipartFiles.reduce((total, file) => total + file.size, 0);

            const newFilesSize = newFiles.reduce((total, file) => total + file.size, 0);

            if (newFiles.some(file => file.size > 10*1024*1024) && false) {
                openConfirm({
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '첨부 파일 용량 초과', // 제목
                    contents1: '단일 첨부파일 용량은 10MB를 초과할 수 없습니다.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
            } else if (currentFilesSize + newFilesSize > FILE_SIZE_LIMIT) {
                openConfirm({
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '첨부 파일 용량 초과', // 제목
                    contents1: '첨부파일의 총 용량은 ' + FILE_SIZE_LIMIT / 1024 / 1024 + 'MB 를 초과할 수 없습니다.',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
            } else {
                totalSize = ((currentFilesSize + newFilesSize) / (1024 * 1024)).toFixed(1);
                emailSendData.update(obj => {
                    obj.multipartFiles = [...obj.multipartFiles, ...newFiles];
                    return obj;
                });
            }
            e.target.value = '';
        }
    }

    const handleRemoveFile = (e) => {
        emailSendData.update(obj => {
            obj.multipartFiles = obj.multipartFiles.filter((_, i) => i !== Number(e.target.dataset.index));
            const currentFilesSize = obj.multipartFiles.reduce((total, file) => total + file.size, 0);
            totalSize = (currentFilesSize / (1024 * 1024)).toFixed(1);
            return obj;
        });
    }

    const handleOnSubmitBtnClick = () => {
        mainScreenBlockerVisibility.set(true);
        emailSendData.update(obj => {
            obj.emContents = textEditorComponent.getText();
            return obj;
        });
        const sendForm = new FormData();
        const es = $emailSendData;
        sendForm.set('emType', es.emType);
        sendForm.set('emReservationDate', es.emReservationDate);
        sendForm.set('emPurpose', es.emPurpose);
        sendForm.set('emEtc', es.emEtc);
        sendForm.set('emReceiverType', es.emReceiverType);
        sendForm.set('emEmailSend', es.emEmailSend);
        sendForm.set('emTitle', es.emTitle);
        sendForm.set('emContents', es.emContents);
        for (const email of es.emailSendChoseList) {
            sendForm.append('emailSendChoseList', email);
        }
        for (const file of es.multipartFiles) {
            sendForm.append('multipartFiles', file);
        }

        console.log('결과 송신 데이터', Object.fromEntries(sendForm));
        ajaxMultipart('/v2/api/Email/sendEmailService', sendForm, (res) => {
            console.log('발송성공응답', res);
            emailSendData.set(JSON.parse(initialEmailSend));
            privacySearchData.set(JSON.parse(initialPrivacySearch));
            document.getElementById('emPurposeLabel').innerHTML = '주요공지';
            textEditorComponent.resetText();
            openConfirm({
                icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "메일 발송을 성공 하였습니다.", // 제목
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    push($emailSendData.emType === '1' ? '/service/emailSendComplete' : '/service/emailBookComplete');
                }
            });
            mainScreenBlockerVisibility.set(false);
        }, (errCode, errMsg) => {
            mainScreenBlockerVisibility.set(false);
        });
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/emailList">{$backBtn}</a>
            <h1>이메일 발송</h1>
        </div>

        <!-- 이메일 발송 영역 -->
        <div class="semailWrap">
            <form>
                <div>
                    <div class="semBtnBox">
                        <div><button type="button" class="semBtn" on:click={handleOnSubmitBtnClick}>발송하기</button></div>
                        <div class="mail_reserveBtn" on:click={openEmailBookPop}>예약</div>
                    </div>
                    <!-- 이메일 예약 팝업 영역 -->
                    {#if isEmailBookPop}
                        <EmailBookPop {closeEmailBookPop}/>
                    {/if}
                    {#if $emailSendData.emReservationDate}
                        <!-- 이메일 예약 선택된 정보 영역 -->
                        <div class="cur_reserve marT16">
                            <p>예약</p>
                            <dl>{miniBarDate}</dl>
                            <div class="reserve_close" on:click={handleResetEmReservationDate} ></div>
                        </div>
                    {/if}
                </div>

                <div class="semailContentBox marT24">
                    <div class="semailitemBox marB20">
                        <dl>발송목적</dl>
                        <div class="se_item seselCont">
                            <div class="selectBox wid122 nonePad" use:SelectBoxManager={{callback: handleEmPurposeSelect}}>
                                <div class="label" id="emPurposeLabel">주요공지</div>
                                <ul class="optionList">
                                    <li class="optionItem curv" data-value="1">주요공지</li>
                                    <li class="optionItem curv" data-value="2">광고/홍보</li>
                                    <li class="optionItem curv" data-value="3">기타</li>
                                </ul>
                            </div>
                            {#if $emailSendData.emPurpose === '3'}
                                <div class="se_item wid220 marL30">
                                    <input type="text" placeholder="발송목적을 적어주세요."
                                           bind:value={$emailSendData.emEtc} />
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class="semailitemBox marB20">
                        <dl>발송대상</dl>
                        <div class="se_item seradio">
                            <div class="popRadio">
                                <div class="check poprCheck">
                                    <input type="radio" class="radio" name="use_noneuse" id="전체 회원" value="1"
                                           bind:group={$emailSendData.emReceiverType} >
                                    <label for="전체 회원">
                                        <em><dt></dt></em>
                                        전체 회원
                                    </label>
                                </div>
                                <div class="check poprCheck">
                                    <input type="radio" class="radio" name="use_noneuse" id="선택 회원" value="2"
                                           bind:group={$emailSendData.emReceiverType} >
                                    <label for="선택 회원">
                                        <em><dt></dt></em>
                                        선택 회원
                                        <span>{$emailSendData.emailSendChoseList.length}</span>
                                        <div class="sendMemberBtn" id="email_member_pop" on:click={openEmailPersonSelectPop}>회원선택</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="semailitemBox marB20">
                        <dl>발신자 설정</dl>
                        <div class="se_item ">
                            <input type="text" placeholder="발신자의 이메일을 적어주세요."
                                   bind:value={$emailSendData.emEmailSend} />
                        </div>
                    </div>
                    <div class="semailitemBox marB20">
                        <dl>제목</dl>
                        <div class="se_item ">
                            <input type="text" placeholder="제목을 적어주세요." bind:value={$emailSendData.emTitle} />
                        </div>
                    </div>
                    <div class="semailitemBox sefileCont">
                        <dl>파일첨부</dl>
                        <div class="se_item">
                            <div class="sc_fileBox">
                                <div class="fileInner">
                                    <div class="file-list">
                                        {#each $emailSendData.multipartFiles as {name}, i }
                                            <div id="file{i}" class="filebox">
                                                <p class="name">{name}</p>
                                                <div class="delete" data-index={i} on:click={handleRemoveFile}></div>
                                            </div>
                                        {/each}
                                    </div>
                                    <label for="file">첨부</label>
                                    <input type="file" id="file" multiple on:change={handleAddFile} />
                                    <span style="font-size: 1.6rem; line-height: 3.8rem;color: #00C389;margin-left: 1rem;">
                                        {totalSize}MB / 20MB
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="writeToolBox marT40">
                        <TextEditor bind:this={textEditorComponent}/>
                    </div>
                </div>
            </form>
            <div class="bottomInfoBox marT24">
                <dl>광고/홍보 목적의 메시지 발송은 반드시 수신 허용한 회원에게만 발송해야 합니다. (개인정보 보호법)</dl>
                <dl>회원정보 DB항목 중 광고/홍보 수신설정 항목이 없는 경우 광고/홍보를 선택할 수 없으며, 임의로 광고/홍보 메시지 발송 시 모든 책임은 관리담당자에게 있습니다.</dl>
            </div>
        </div>
    </div>

    {#if isEmailPersonSelectPop}
        <EmailPersonSelectPop {closeEmailPersonSelectPop}/>
    {/if}
</section>

