
<script>

    // 레이아웃
    import Header from "../../../components/service/layout/Header.svelte"
    import Error from "../../../components/common/error/Error.svelte";

    // 컴포넌트
    import TitleAlarm from "../../../components/common/TitleAlarm.svelte";

    import { link } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import {onMount} from "svelte";

    import {backBtn} from '../../../lib/store.js'
    import restapi from "../../../lib/api.js";

    let piId;

    onMount( () => {
        setTimeout(() => policyDetailLayout = 1, 500);

        piId = window.location.href.split('/').pop();
        policyDetail(piId);
    });

    let step = 1;
    let policyInfoData = {
        policyData: {
            piVersion : '',
            piDate : '',
            piHeader : '',
            knName : '',
            piInternetChose : false,
            piContractChose : false,
            piPayChose : false,
            piConsumerChose : false,
            piAdvertisementChose : false,
            piOutChose : false,
            piThirdChose : false,
            piThirdOverseasChose : false,
            piChangeChose : false,
            piYear : '',
            piMonth : '',
            piDay : '',
        },

        purposeDataList: [],

        beforeDataList: [],
        afterDataList: [],
        serviceAutoDataList: [],

        outDataList: [],
        outDetailDataList: [],

        thirdDataList: [],
        thirdOverseasDataList: [],

        reponsibleDataList: [],
    };

    // 상세조회
    function policyDetail(piId) {
        console.log("개인정보처리방침 상세보기 호출");

        let url = "/v2/api/Policy/policyDetail/"+piId;

        restapi('v2', 'get', url, "", {}, 'application/json',
            (json_success) => {
                console.log(json_success);
                if(json_success.data.status === 200) {
                    console.log("조회된 데이터가 있습니다.");

                    console.log(json_success)
                    policyInfoData.policyData = json_success.data.sendData.policyData;

                    policyInfoData.purposeDataList = json_success.data.sendData.purposeDataList;

                    policyInfoData.beforeDataList = json_success.data.sendData.beforeDataList;
                    policyInfoData.afterDataList = json_success.data.sendData.afterDataList;
                    policyInfoData.serviceAutoDataList = json_success.data.sendData.serviceAutoDataList;

                    policyInfoData.outDataList = json_success.data.sendData.outDataList;
                    if(policyInfoData.policyData.piOutChose) {
                        policyInfoData.outDetailDataList = json_success.data.sendData.outDetailDataList;
                    }

                    if(policyInfoData.policyData.piThirdChose) {
                        policyInfoData.thirdDataList = json_success.data.sendData.thirdDataList;
                    }

                    if(policyInfoData.policyData.piThirdOverseasChose) {
                        policyInfoData.thirdOverseasDataList = json_success.data.sendData.thirdOverseasDataList;
                    }

                    policyInfoData.reponsibleDataList = json_success.data.sendData.reponsibleDataList;

                    console.log(policyInfoData)

                    policyDetailLayout = 1;
                }
                else {
                    state = 1;
                    pageErrMsg1 = "선택하신 페이지가 존재하지 않습니다."
                    pageErrMsg2 = "다시 시도해주사길 바랍니다."
                    pageErrUrl = "/service/policyList"

                    console.log("조회된 데이터가 없습니다.");
                }
            },
            (json_error) => {
                console.log(json_error);
                console.log("개인정보처리방침 상세 호출 실패");
            }
        )


    }

    let state = 0;
    let pageErrMsg1;
    let pageErrMsg2;
    let pageErrUrl;

    let policyDetailLayout= 0;
</script>

<Header />

{#if state === 0}
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/policyList">{$backBtn}</a><h1>개인정보처리방침 상세보기</h1>

            {#if policyDetailLayout === 1}}
                <div class="copyBtnBox" in:fade>
                    <div class="copyBtn">
                        <dt id="urlcopy">URL 복사</dt>
                        <span class="tiptool" id="tool_btn01">
                            <div class="layerToolType pmtool_02" id="tool_box01">
                                <div class="tipContents">
                                    <p>
                                        개인정보처리방침을 위한 별도 페이지를 만들지 않고, 개인정보처리방침 버튼에 링크로 연결해서 사용 가능합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="copyBtn">
                        <dt id="htmlcopy">HTML 복사</dt>
                        <span class="tiptool" id="tool_btn02">
                            <div class="layerToolType righttool_type" id="tool_box02">
                                <div class="tipContents">
                                    <p>
                                        개인정보처리방침을 위한 별도 페이지가 존재하는 경우, HTML 복사를 이용해 작성하신 개인정보처리방침의 레이아웃까지 빠르게 복사가 가능합니다.
                                    </p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            {/if}
        </div>

        {#if policyDetailLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else if policyDetailLayout === 1}
            <div in:fade>

                <div class="pri_versionBox marB50">
                    <div class="priverBox hei60">
                        <dl>개정본 버전</dl>
                        <p>Ver. {policyInfoData.policyData.piVersion}</p>
                    </div>
                    <div class="priv_divider"></div>
                    <div class="priverBox hei60">
                        <dl>개정일</dl>
                        <p>{policyInfoData.policyData.modify_date}</p>
                    </div>
                    <div class="priv_divider"></div>
                    <div class="priverBox hei60">
                        <dl>시행일</dl>
                        <p>{policyInfoData.policyData.piDate.replaceAll("-",". ")}</p>
                    </div>
                    <div class="priv_divider"></div>
                    <div class="priverBox hei60">
                        <dl>작성자</dl>
                        <p>{policyInfoData.policyData.knName}</p>
                    </div>
                </div>

                <div class="priContentBox">
                    <div class="priC_title marB24">머리말</div>
                    <div class="priCIntrotext">
                        <dl>개인정보 처리방침 {policyInfoData.policyData.piHeader}(이하 회사)은(는) 고객의 개인정보를 중시하며, 개인정보보호법 등 관련 법규를 준수하기 위해 노력하고 있습니다.</dl>
                        <dl>회사는 개인정보 처리방침을 통해 고객의 개인정보를 어떠한 용도와 방식으로 이용하고 있으며, 개인정보보호를 위해 어떠한 조치를 취하고 있는지 알려드립니다.</dl>
                        <dl>회사의 개인정보 처리방침은 다음과 같습니다.</dl>
                    </div>
                </div>

                <!------------ No.1 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{step}. 개인정보의 처리 목적</div>
                    <div class="pr_wrap">
                        <div class="prbox">
                            <div class="prti w1528per">서비스 제공 및 운영</div>
                            <div class="prst w8472per">사용자 인증, 회원 관리, 서비스 제공, 서비스의 보안, 이용약관 위반 고객 제재 등 서비스의 제공과 운영을 위해 이용합니다. </div>
                        </div>
                        <div class="prbox">
                            <div class="prti w1528per">서비스 개선</div>
                            <div class="prst w8472per">기존 서비스의 개선, 신규 서비스의 발굴 등 고객에 대한 서비스를 개선하는 데 이용합니다.</div>
                        </div>
                        {#each policyInfoData.purposeDataList as {pipTitle, pipContent}, i}
                            <div class="prbox">
                                <div class="prti w1528per">{pipTitle}</div>
                                <div class="prst w8472per">{pipContent}</div>
                            </div>
                        {/each}
                    </div>
                </div>

                <!------------ No.2 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 수집하는 개인정보의 항목 및 수집방법</div>
                    <div class="prtextaddbox marB40">
                        <dl>(1) 서비스 가입 시 수집하는 개인정보</dl>
                        <div class="prtextTablethBox colum4Line borT">
                            <div class="prtti">처리목적</div>
                            <div class="prtti">수집 항목</div>
                            <div class="prtti">필수/선택</div>
                            <div class="prtti">처리 및 보유 기간</div>
                        </div>
                        {#each policyInfoData.beforeDataList as {pibPurpose, pibInfo, pibChose, pibPeriod}, i}
                            <div class="prtextTableBox">
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pibPurpose}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pibInfo}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pibChose}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pibPeriod}</div>
                                </div>
                            </div>
                        {/each}
                        <div class="prdot_text marT16">기기 정보를 수집하는 경우에는 일방향 암호화(Hash)를 통해 기기를 식별할 수 없는 방법으로 변환하여 보관합니다.</div>
                    </div>

                    <div class="prtextaddbox marB40">
                        <dl>(2) 서비스 가입 후 수집하는 개인정보</dl>

                        <div class="prtextTablethBox colum4Line borT">
                            <div class="prtti">처리목적</div>
                            <div class="prtti">수집 항목</div>
                            <div class="prtti">필수/선택</div>
                            <div class="prtti">처리 및 보유 기간</div>
                        </div>

                        {#each policyInfoData.afterDataList as {piaPurpose, piaInfo, piaChose, piaPeriod}, i}
                            <div class="prtextTableBox">
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{piaPurpose}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{piaInfo}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{piaChose}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{piaPeriod}</div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    <div class="prtextaddbox marB40">
                        <dl>(3) 서비스 이용 중 자동 생성 및 수집하는 정보</dl>
                        <div class="prtextTablethBox colum4Line borT">
                            <div class="prtti">처리목적</div>
                            <div class="prtti">수집 항목</div>
                            <div class="prtti">필수/선택</div>
                            <div class="prtti">처리 및 보유 기간</div>
                        </div>

                        {#each policyInfoData.serviceAutoDataList as {pisaPurpose, pisaInfo, pisaMethodology, pisaPeriod}, i}
                            <div class="prtextTableBox">
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pisaPurpose}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pisaInfo}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pisaMethodology}</div>
                                </div>
                                <div class="prtextTable colum4">
                                    <div class="prtt_value_area">{pisaPeriod}</div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    <div class="prtextaddbox marB40">
                        <dl>(4) 법령에 따른 개인정보의 보유기간</dl>
                        <div class="prarea_table">
                            <table>
                                <colgroup>
                                    <col style="width:33.3333333%;">
                                    <col style="width:33.3333333%;">
                                    <col style="width:33.3333333%;">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th class="praLeft">수집항목</th>
                                    <th class="praLeft">근거법</th>
                                    <th class="praLeft">보유기간</th>
                                </tr>
                                </thead>
                                <tbody>
                                {#if policyInfoData.policyData.piInternetChose}
                                    <tr>
                                        <td class="praLeft">인터넷 접속 로그</td>
                                        <td class="praLeft">통신비밀보호법 제2조</td>
                                        <td class="praLeft">3개월</td>
                                    </tr>
                                {/if}
                                {#if policyInfoData.policyData.piContractChose}
                                    <tr>
                                        <td class="praLeft">계약 또는 청약철회 등에 관한 기록</td>
                                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률</td>
                                        <td class="praLeft">5년</td>
                                    </tr>
                                {/if}
                                {#if policyInfoData.policyData.piPayChose}
                                    <tr>
                                        <td class="praLeft">대금결제 및 재화 등의 공급에 관한 기록</td>
                                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                                        <td class="praLeft">5년</td>
                                    </tr>
                                {/if}
                                {#if policyInfoData.policyData.piConsumerChose}
                                    <tr>
                                        <td class="praLeft">소비자의 불만 또는 분쟁처리에 관한 기록</td>
                                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                                        <td class="praLeft">3년</td>
                                    </tr>
                                {/if}
                                {#if policyInfoData.policyData.piAdvertisementChose}
                                    <tr>
                                        <td class="praLeft">표시·광고에 관한 기록</td>
                                        <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                                        <td class="praLeft">6개월</td>
                                    </tr>
                                {/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="prtextaddbox nonebor">
                        <dl>(5) 개인정보를 자동으로 수집하는 장치의 설치운영 및 그 거부에 관한 사항</dl>
                        <div class="prnor_text">
                            <div class="pttext"><dt>1.</dt>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용할 수 있습니다.</div>
                        </div>
                        <div class="prnor_text">
                            <p class="marB4"><span>2.</span>쿠키는 웹사이트를 운영하는데 이용되는 웹서버가 이용자의 웹브라우저에게 보내는 소량의 정보이며 웹브라우저가 실행되는 이용자 기기의 저장장치에 저장되기도 합니다.</p>
                            <dd><span></span>쿠키의 사용목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공 또는 서비스 개선을 위해 사용됩니다.</dd>
                        </div>
                        <div class="prnor_text">
                            <p class="marB4"><span>3.</span>회사는 이용자에게 적합하고 보다 유용한 서비스를 제공하기 위해 구글(알파벳)의 Google Analytics를 이용하고 있습니다. Google Analytics 쿠키를 통하여 당사 웹사이트 이용자의 행태정보를 수집하게 되며, 이 경우 이용자 개인을 식별할 수 없는 비식별정보만이 수집됩니다.</p>
                        </div>
                        <div class="prnor_text">
                            <p class="marB4"><span>4.</span>이용자는 다음과 같은 방법으로 쿠키 사용을 거부할 수 있습니다.</p>
                            <dd><span></span>브라우저에서 쿠키를 차단하는 방법</dd>
                        </div>
                    </div>
                </div>

                <!------------ No.5 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 개인정보 처리 업무의 위탁에 관한 사항</div>

                    <div class="prtextTablethBox colum4Line borT">
                        <div class="prtti">수탁 업체</div>
                        <div class="prtti">필수 / 선택</div>
                        <div class="prtti">위탁 업무</div>
                        <div class="prtti">처리 및 보유 기간</div>
                    </div>

                    {#each policyInfoData.outDataList as {pioOutsourcingCompany, pioChose, pioConsignmentCompany, pioPeriod}, i}
                        <div class="prtextTableBox">
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pioOutsourcingCompany}</div>
                            </div>
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pioChose}</div>
                            </div>
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pioConsignmentCompany}</div>
                            </div>
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pioPeriod}</div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!------------ No.5-1 ------------>
                {#if policyInfoData.policyData.piOutChose}
                <div class="priContentBox">
                    <div class="priC_title marB24">{step}-1. 개인정보 처리 업무의 위탁에 관한 사항</div>
                    <div class="prtextTablethBox colum7Line borT">
                        <div class="prtti">수탁 업체</div>
                        <div class="prtti">수탁업체의 위치(국가, 도시 등 구체적 주소 작성)</div>
                        <div class="prtti">위탁 일시 및 방법</div>
                        <div class="prtti">정보관리책임자의 연락처</div>
                        <div class="prtti">위탁하는 개인정보 항목</div>
                        <div class="prtti">위탁 업무 내용</div>
                        <div class="prtti">위탁 업무 내용개인정보의 보유 및 이용기간</div>
                    </div>
                    {#each policyInfoData.outDetailDataList as
                        {piodCompany, piodLocation, piodMethod, piodContact, piodInfo, piodDetail, piodPeriod}, i}
                        <div class="prtextTableBox">
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodCompany}</div>
                            </div>
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodLocation}</div>
                            </div>
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodMethod}</div>
                            </div>
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodContact}</div>
                            </div>
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodInfo}</div>
                            </div>
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodDetail}</div>
                            </div>
                            <div class="prtextTable colum7">
                                <div class="prtt_value_area">{piodPeriod}</div>
                            </div>
                        </div>
                    {/each}
                </div>
                {/if}

                <!------------ No.6 ------------>
                {#if policyInfoData.policyData.piThirdChose}
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 개인정보 제3자 제공에 관한 사항</div>
                    <div class="prinortext">
                        회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 개인정보보호법에 근거해 정보주체의 별도 동의나 관련 법령에 의해 개인정보 제출의 의무가 있는 경우, 또는 정보주체의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한 경우에 한하여 개인정보를 제공합니다.
                    </div>
                    <div class="prtextTablethBox colum4Line borT">
                        <div class="prtti">제공받는 자</div>
                        <div class="prtti">제공받는 자의 이용 목적</div>
                        <div class="prtti">제공하는 개인정보 항목</div>
                        <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
                    </div>

                    {#each policyInfoData.thirdDataList as {pitRecipient, pitPurpose, pitInfo, pitPeriod}, i}
                        <div class="prtextTableBox">
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pitRecipient}</div>
                            </div>
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pitPurpose}</div>
                            </div>
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pitInfo}</div>
                            </div>
                            <div class="prtextTable colum4">
                                <div class="prtt_value_area">{pitPeriod}</div>
                            </div>
                        </div>
                    {/each}
                </div>
                {/if}

                <!------------ No.6-1 ------------>
                {#if policyInfoData.policyData.piThirdOverseasChose}
                <div class="priContentBox">
                    <div class="priC_title marB24">{step}-1. 개인정보의 국외 제3자 제공에 관한 사항</div>
                    <div class="prtextTablethBox colum5Line borT">
                        <div class="prtti">제공받는 자</div>
                        <div class="prtti">제공받는 자의 이용 목적</div>
                        <div class="prtti">제공하는 개인정보 항목</div>
                        <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
                        <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
                    </div>

                    {#each policyInfoData.thirdOverseasDataList as
                        {pitoRecipient, pitoLocation, pitoPurpose, pitoPurpose, pitoPeriod}, i}
                        <div class="prtextTableBox">
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pitoRecipient}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pitoLocation}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pitoPurpose}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pitoPurpose}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pitoPeriod}</div>
                            </div>
                        </div>
                    {/each}
                </div>
                {/if}

                <!------------ No.9 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 개인정보보호 책임자에 관한 사항</div>
                    <div class="prinortext marB24">
                        정보주체는 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호 책임자에게 문의하실 수 있습니다. 개인정보보호 책임자는 이용자의 문의에 대해 지체없이 답변 및 처리해 드릴 것입니다.
                    </div>
                    <div class="prtextTablethBox colum5Line borT">
                        <div class="prtti">성명</div>
                        <div class="prtti">직책</div>
                        <div class="prtti">이메일</div>
                        <div class="prtti">연락처</div>
                        <div class="prtti">담당부서</div>
                    </div>
                    {#each policyInfoData.reponsibleDataList as
                        {pirName, pirPosition, pirEmail, pirContact, pirDepartment}, i}
                        <div class="prtextTableBox">
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pirName}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pirPosition}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pirEmail}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pirContact}</div>
                            </div>
                            <div class="prtextTable colum5">
                                <div class="prtt_value_area">{pirDepartment}</div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!------------ No.10 ------------>
                {#if policyInfoData.policyData.piChangeChose}
                    <div class="priContentBox">
                        <div class="priC_title marB24">{++step}. 개인정보 처리방침의 변경에 관한 사항</div>
                        <div class="prinortext marB16">
                            개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 홈페이지 또는 이메일 등 개별 통지 방법을 통해 고지할 것입니다.
                        </div>
                        <div class="prnor_text">
                            <div class="prnort"><dt></dt>
                                이전 개인정보 처리방침 시행 일자 :
                                {policyInfoData.policyData.piYear}.
                                {policyInfoData.policyData.piMonth}.
                                {policyInfoData.policyData.piDay}
                            </div>
                        </div>
                    </div>
                {/if}

                <!------------ No.3 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 개인정보의 파기에 관한 사항</div>
                    <div class="prinortext">
                        회사는 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. 이때, DB로 옮겨진 개인정보는 해당 법령에서 허용된 목적 이외의 다른 목적으로 이용되지 않습니다.
                    </div>
                    <div class="prinortext">
                        회사의 개인정보 파기절차 및 방법은 다음과 같습니다.
                    </div>
                    <div class="prnor_text">
                        <div class="pttext"><dt>1.</dt>파기절차</div>
                        <dd>회사는 보유기간의 경과, 처리목적 달성으로 인해 불필요하게 되었거나 동의 철회, 처리 정지 등 정보주체의 요구가 있은 개인정보를 지체없이 파기합니다. 개인정보보호책임자는 정기적으로 파기된 개인정보 현황을 확인합니다.</dd>
                    </div>
                    <div class="prnor_text">
                        <p><span>2.</span>파기 방법</p>
                        <dd>회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</dd>
                    </div>
                </div>

                <!------------ No.4 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 서비스 미이용자의 개인정보 파기 등에 관한 조치</div>
                    <div class="prinortext">
                        회사는 1년 동안 서비스를 이용하지 않은 이용자의 개인정보는 파기하거나 별도로 보관합니다. 별도 보관하는 개인정보는 서비스에 이용하지 않습니다.
                    </div>
                </div>


                <!------------ No.7 ------------>
                <div class="priContentBox">
                    <div class="priC_title marB24">{++step}. 정보주체의 권리**·의무** 및 그 행사방법에 관한 사항</div>
                    <div class="prnor_text">
                        <p><span>1.</span>이용자는 계약 기간 내에 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 자신의 개인정보에 대해 정보삭제 및 처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                    </div>
                    <div class="prnor_text">
                        <p><span>2.</span>온라인으로 제공되지 않는 정보주체의 권리 행사는 개인정보보호 담당부서(privacy@kokonut.me)로 전자우편을 보내주시면, 회사는 이에 대해 지체없이 조치하겠습니다.</p>
                    </div>
                    <div class="prnor_text">
                        <p><span>3.</span>권리 행사는 법정 대리인 또는 정보주체의 위임을 받은 자 등 대리인을 통하여 할 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하여야 합니다.</p>
                    </div>
                    <div class="prnor_text">
                        <p><span>4.</span>회사는 정보주체의 권리에 따른 열람·정정·삭제·처리정지의 요구 시 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
                    </div>
                </div>

                <!------------ No.8 ------------>
                <div class="priContentBox pri8cont">
                    <div class="priC_title marB24">{++step}. 개인정보의 안전성 확보 조치에 관한 사항</div>
                    <div class="prinortext marB16">
                        회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>관리적 보호 조치 : 개인정보 내부관리계획 수립·시행, 임직원에 대한 개인정보 보호 교육</dd>
                    </div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>기술적 보호 조치 : 개인정보처리시스템에 대한 접근권한 관리 및 원격 접속 시 2단계 인증, 접속기록 관리, 접근 통제, 개인정보 암호화, 보안 프로그램 운영</dd>
                    </div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>물리적 보호조치 : 개인정보가 포함된 서류는 잠금장치가 있는 장소에 보관</dd>
                    </div>
                </div>


                <!------------ No.11 ------------>
                <div class="priContentBox noneMarB">
                    <div class="priC_title marB24">{++step}. 개인정보의 권익침해에 대한 구제방법</div>
                    <div class="prinortext marB16">
                        이용자는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                    </div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</dd>
                    </div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</dd>
                    </div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</dd>
                    </div>
                    <div class="prnor_text">
                        <dd class="pradfont"><span></span>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</dd>
                    </div>
                </div>

            </div>
        {/if}

    </div>
</section>

{:else}
    <Error {pageErrMsg1} {pageErrMsg2} {pageErrUrl} />
{/if}