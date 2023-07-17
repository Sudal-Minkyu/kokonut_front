
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import {link} from 'svelte-spa-router'
    import {backBtn} from '../../../lib/store'
    import jQuery from 'jquery';
    import TextEditor from "../../../components/common/TextEditor.svelte";
    import EmailPersonSelectPop from "../../../components/service/email/EmailPersonSelectPop.svelte";
    import EmailBookPop from "../../../components/service/email/EmailBookPop.svelte";
    import {SelectBoxManager} from "../../../components/common/action/SelectBoxManager.js";
    import {emailSendData, initialEmailSend} from "../../../lib/store";
    import {onMount} from "svelte";
    import {getColumnList} from "../../../components/common/privacySearch/privacySearch.js";

    // 이메일 예약 팝업 버튼 스크립트
    jQuery(".mail_reserveBtn").click(function(){
        jQuery('.mail_reserveBox').show();
    });

    jQuery(".mailreserve_cancal").click(function(){
        document.getElementById('standardTime').innerText = '전체';
        jQuery('#datepicker').val('');
        document.getElementById('timeSelection').innerText = '시간선택';
        jQuery('.mail_reserveBox').hide();
    });

    jQuery(".mailreserve_confirm").click(function(){
        jQuery('.mail_reserveBox').hide();
    });

    onMount(() => {
        emailSendData.set(JSON.parse(initialEmailSend));
        getColumnList();
    });

    const handleEmPurposeSelect = (el) => {
        console.log(el.dataset.value);
    }

    let isEmailPersonSelectPop = false;
    const handleEmReceiverTypeSelect = (e) => {
        console.log(e.target.value);
        if (e.target.value === '1') {
            isEmailPersonSelectPop = false;
        } else if (e.target.value === '2') {
            isEmailPersonSelectPop = true;
        }
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
                        <div><button type="submit" class="semBtn">발송하기</button></div>
                        <div class="mail_reserveBtn">예약</div>
                    </div>
                    <!-- 이메일 예약 팝업 영역 -->
                    {#if false}
                        <EmailBookPop />
                    {/if}
                    {#if false}
                        <!-- 이메일 예약 선택된 정보 영역 -->
                        <div class="cur_reserve marT16">
                            <p>예약</p>
                            <dl><span>2023. 03. 20</span> <span>(월)</span> <span>14:00</span></dl>
                            <div class="reserve_close"></div>
                        </div>
                    {/if}
                </div>

                <div class="semailContentBox marT24">
                    <div class="semailitemBox marB20">
                        <dl>발송목적</dl>
                        <div class="se_item seselCont">
                            <div class="selectBox wid122 nonePad" use:SelectBoxManager={{callback: handleEmPurposeSelect}}>
                                <div class="label">주요공지</div>
                                <ul class="optionList">
                                    <li class="optionItem curv" data-value="1">주요공지</li>
                                    <li class="optionItem curv" data-value="2">광고/홍보</li>
                                    <li class="optionItem curv" data-value="3">기타</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="semailitemBox marB20">
                        <dl>발송대상</dl>
                        <div class="se_item seradio">
                            <div class="popRadio">
                                <div class="check poprCheck">
                                    <input type="radio" class="radio" name="use_noneuse" id="전체 회원" value="1"
                                           bind:group={$emailSendData.emReceiverType} on:click={handleEmReceiverTypeSelect} >
                                    <label for="전체 회원">
                                        <em><dt></dt></em>
                                        전체 회원
                                        <span>500명</span>
                                    </label>
                                </div>
                                <div class="check poprCheck">
                                    <input type="radio" class="radio" name="use_noneuse" id="선택 회원" value="2"
                                           bind:group={$emailSendData.emReceiverType} on:click={handleEmReceiverTypeSelect} >
                                    <label for="선택 회원">
                                        <em><dt></dt></em>
                                        선택 회원
                                        <span>20명</span>
                                        <div class="sendMemberBtn" id="email_member_pop">회원선택</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="semailitemBox marB20">
                        <dl>발신자 설정</dl>
                        <div class="se_item ">
                            <input type="text" placeholder="발신자의 이메일을 적어주세요."/>
                        </div>
                    </div>
                    <div class="semailitemBox marB20">
                        <dl>제목</dl>
                        <div class="se_item ">
                            <input type="text" placeholder="제목을 적어주세요."/>
                        </div>
                    </div>
                    <div class="semailitemBox sefileCont">
                        <dl>파일첨부</dl>
                        <div class="se_item">
                            <div class="sc_fileBox">
                                <div class="fileInner">
                                    <div class="file-list"></div>
                                    <label for="file">첨부</label>
                                    <input type="file" id="file" onchange="addFile(this);" multiple />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="writeToolBox marT40">
                        <TextEditor />
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
        <EmailPersonSelectPop bind:isEmailPersonSelectPop={isEmailPersonSelectPop}/>
    {/if}
</section>

