
<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
    import { backBtn } from '../../lib/store'

    import { onMount } from 'svelte';
    import restapi from "../../lib/api.js";
    import { is_login, accessToken } from "../../lib/store.js"

    import { push } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import { popOpenBtn, }from '../../lib/common'

    import jQuery from 'jquery';

    import SettingIpDelete from '../../components/service/environment/servicesetting/SettingIpDelete.svelte'
    import SettingIpAdd from '../../components/service/environment/servicesetting/SettingIpAdd.svelte'

    // 서비스설정 가져오기
    onMount(async () => {

        setTimeout(() => serviceSettingLayout = 1, 500);
    })

    jQuery(function(){

        // 활성 비활성화 체크 여부 스크립트
        jQuery(".non_activate").click(function(){
            jQuery('.ipContentIner').hide();
        });
        jQuery(".activate").click(function(){
            jQuery('.ipContentIner').show();
        });
        jQuery(document).ready(function(){
            if(jQuery(".activate").is(":checked")){
                jQuery('.ipContentIner').show();
            }
            else{
                jQuery('.ipContentIner').hide();
            }
        });

        // 제한 or 기간 체크 여부 스크립트
        jQuery(".nolimit").click(function(){
            jQuery('.disableBox').show();
            jQuery('#period').text('기간선택');
        });
        jQuery(".period").click(function(){
            jQuery('.disableBox').hide();
        });
        jQuery(document).ready(function(){
            if(jQuery(".period").is(":checked")){
                jQuery('.disableBox').hide();
            }
            else{
                jQuery('.disableBox').show();
            }
        });

        // 체크박스 스크립트
        jQuery("#allcheck").click(function(){
            if(jQuery("#allcheck").is(":checked")){
                jQuery(".partcheck").prop("checked",true);
            }
            else{
                jQuery(".partcheck").prop("checked",false);
            }
        });

    })


    let serviceSettingLayout = 0;

    let serviceIpState = 0;
    function changeStatePop(val) {
        serviceIpState = val;
    }

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap serviceSetWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a><h1>서비스 설정</h1>
            <dl>
                해당 페이지는 최고관리자만 수정할 수 있습니다.
            </dl>
        </div>

        {#if serviceSettingLayout === 0}
            <div class="loaderParent">
                <div class="loader"></div>
            </div>
        {:else}
            <div class="seaContentBox" in:fade>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>해당 로그인 설정</dl>
                        <div class="seaRadio">
                            <div class="flex_sel">
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="loginsetting" id="로그인 허용" value="로그인 허용" checked>
                                    <label for="로그인 허용"><em><dt></dt></em>로그인 허용</label>
                                </div>
                                <div class="check radioCheck noneMarR">
                                    <input type="radio" class="radio" name="loginsetting" id="로그인 차단" value="로그인 차단">
                                    <label for="로그인 차단"><em><dt></dt></em>로그인 차단</label>
                                </div>
                                <dd class="marL16">*해외에서 로그인을 시도하는 경우 본인확인 후 로그인이 가능합니다.</dd>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>접속 허용 IP 설정</dl>
                        <div class="ipContentBox">
                            <div class="seaRadio">
                                <div class="check radioCheck">
                                    <input type="radio" class="radio non_activate" name="ipsetting" id="비활성화" value="비활성화">
                                    <label for="비활성화"><em><dt></dt></em>비활성화</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio activate" name="ipsetting" id="활성화" value="활성화" checked>
                                    <label for="활성화"><em><dt></dt></em>활성화</label>
                                </div>
                            </div>

                            <div class="ipContentIner">
                                <div class="ipseaBox marB20">
                                    <div class="koinput">
                                        <input type="text" name="" class="wid236" placeholder="IP 검색" />
                                        <button><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                                    </div>
                                    <div class="floatBtnBox">
                                        <button class="del" id="ipdel_pop">삭제</button>
                                        <button class="add" id="ipadd_pop">추가</button>
                                    </div>
                                </div>
                                <div class="iptable">
                                    <table>
                                        <caption>관리자 활동 이력 리스트</caption>
                                        <colgroup>
                                            <col style="width:2%;">
                                            <col style="width:54%;">
                                            <col style="width:54%;">
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" name="allcheck" id="allcheck">
                                                    <label for="allcheck"><em></em></label>
                                                </div>
                                            </th>
                                            <th>공인 IP</th>
                                            <th>메모</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip01" id="ip01" class="partcheck">
                                                    <label for="ip01"><em></em></label>
                                                </div>
                                            </th>
                                            <th>121.134.227.161</th>
                                            <th>2월대개봉_오피스IP</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip02" id="ip02" class="partcheck">
                                                    <label for="ip02"><em></em></label>
                                                </div>
                                            </th>
                                            <th>121.134.227.161</th>
                                            <th>2월대개봉_오피스IP</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip03" id="ip03" class="partcheck">
                                                    <label for="ip03"><em></em></label>
                                                </div>
                                            </th>
                                            <th>121.134.227.161</th>
                                            <th>2월대개봉_오피스IP</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip04" id="ip04" class="partcheck">
                                                    <label for="ip04"><em></em></label>
                                                </div>
                                            </th>
                                            <th>121.134.227.161</th>
                                            <th>2월대개봉_오피스IP</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div class="koko_check">
                                                    <input type="checkbox" value="" name="ip05" id="ip05" class="partcheck">
                                                    <label for="ip05"><em></em></label>
                                                </div>
                                            </th>
                                            <th>121.134.227.161</th>
                                            <th>2월대개봉_오피스IP</th>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="paginationBox marT20">
                                    <ul class="pagination">
                                        <li class="page-item page-pre disabled"><a class="page-link" aria-label="previous page" href="javascript:void(0)"></a></li>
                                        <li class="page-item active"><a class="page-link" aria-label="to page 1" href="javascript:void(0)">1</a></li>
                                        <li class="page-item"><a class="page-link" aria-label="to page 2" href="javascript:void(0)">2</a></li>
                                        <li class="page-item"><a class="page-link" aria-label="to page 3" href="javascript:void(0)">3</a></li>
                                        <li class="page-item"><a class="page-link" aria-label="to page 4" href="javascript:void(0)">4</a></li>
                                        <li class="page-item"><a class="page-link" aria-label="to page 5" href="javascript:void(0)">5</a></li>
                                        <li class="page-item page-last-separator disabled"><a class="page-link" aria-label="" href="javascript:void(0)">...</a></li>
                                        <li class="page-item"><a class="page-link" aria-label="to page 93" href="javascript:void(0)">93</a></li>
                                        <li class="page-item page-next"><a class="page-link" aria-label="next page" href="javascript:void(0)"></a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>비밀번호 변경주기</dl>
                        <div class="sc_SelBox">
                            <div class="selectBox wid124">
                                <div class="label">선택</div>
                                <ul class="optionList">
                                    <li class="optionItem curv">3개월</li>
                                    <li class="optionItem curv">6개월</li>
                                    <li class="optionItem curv">9개월</li>
                                    <li class="optionItem curv">12개월</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>비밀번호 오류 접속제한</dl>
                        <div class="sc_SelBox">
                            <div class="selectBox wid124">
                                <div class="label">선택</div>
                                <ul class="optionList">
                                    <li class="optionItem curv">5번</li>
                                    <li class="optionItem curv">10번</li>
                                    <li class="optionItem curv">15번</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>자동 로그아웃 시간</dl>
                        <div class="sc_SelBox flex_sel">
                            <p class="marR30">로그인 후</p>
                            <div class="selectBox wid124">
                                <div class="label">선택</div>
                                <ul class="optionList">
                                    <li class="optionItem curv">30분</li>
                                    <li class="optionItem curv">60분</li>
                                    <li class="optionItem curv">90분</li>
                                    <li class="optionItem curv">120분</li>
                                </ul>
                            </div>
                            <p class="marL30">동안 페이지 전환이 없으면 자동 로그아웃</p>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine">
                    <div class="seaCont wid100per">
                        <dl>장기 미접속 접근제한</dl>
                        <div class="seaRadio">
                            <div class="flex_sel">
                                <div class="check radioCheck">
                                    <input type="radio" class="radio nolimit" name="acesssetting" id="제한 없음" value="제한 없음" checked>
                                    <label for="제한 없음"><em><dt></dt></em>제한 없음</label>
                                </div>
                                <div class="check radioCheck noneMarR">
                                    <input type="radio" class="radio period" name="acesssetting" id="기간선택" value="기간선택">
                                    <label for="기간선택"><em><dt></dt></em></label>
                                </div>
                                <div class="selectBox wid124">
<!--                                    <div class="disableBox" onclick="alert('기간선택 옆의 체크박스를 체크해주세요.');return false;"></div>-->
                                    <div class="label" id="period">기간선택</div>
                                    <ul class="optionList">
                                        <li class="optionItem curv">1개월</li>
                                        <li class="optionItem curv">3개월</li>
                                        <li class="optionItem curv">6개월</li>
                                    </ul>
                                </div>
                                <p class="marL30">동안 시스템에 접속하지 않은 경우, 로그인 제한</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

    </div>
</section>

{#if serviceIpState === 1}
<SettingIpAdd />
{:else if serviceIpState === 2}
<SettingIpDelete />
{/if}