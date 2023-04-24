<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import jQuery from "jquery";
    
    // 미니 툴팁 스크립트
    jQuery(".tiptool").each(function(i){

        var thisId = jQuery(this).attr("id");
        var idNum = thisId.substring(thisId.length-2);

        jQuery('#tool_btn' + idNum).on('click', function(){
            var display = jQuery('#tool_box' + idNum).css('display');
            if(display == 'none'){
                jQuery('#tool_box' + idNum).addClass('dp_b');
            };
        });

        jQuery('#tool_close' + idNum).on('click', function(){
            jQuery('#tool_box' + idNum).removeClass('dp_b');
        });
    });
    jQuery(document).click(function() {
        var container = jQuery(".tiptool");
        if (!container.is(event.target) && !container.has(event.target).length) {
            jQuery('.layerToolType').removeClass('dp_b');
        }
    });

    jQuery(document).ready(function() {
        var max_fields2     = 5;
        var wrapper2        = jQuery(".prcontainer5");
        var add_button2      = jQuery(".add_pr_field5");
        var x = 1;

        jQuery(add_button2).click(function(e){
            e.preventDefault();
            if(x < max_fields2){
                x++;
                jQuery(wrapper2).append(
                    '<div class="addelement">' +
                    '<div class="prtextTableBox">' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '<div class="prtextTable colum7">' +
                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                    '</div>' +
                    '</div>' +
                    '<a href="#" class="pr_delete"></a></div>'
                ); //add input box
            }
            else
            {
                alert('해당 정보는 4개 입력이 최대입니다.')
            }
        });

        jQuery(wrapper2).on("click",".pr_delete", function(e){
            e.preventDefault(); jQuery(this).parent('div').remove(); x--;
        })
    });
    
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보처리방침 제작</h1>
            <dl>해당 페이지는 최고관리자만 수정할 수 있습니다.</dl>
        </div>

        <div class="pri_versionBox marB50">
            <div class="priverBox">
                <dl>개정본 버전</dl>
                <div class="priverInput">
                    <p>Ver.</p>
                    <div class="koinput">
                        <input type="text" placeholder="버전을 입력해 주세요">
                    </div>
                </div>
            </div>
            <div class="priv_divider"></div>
            <div class="priverBox">
                <dl>개정일</dl>
                <div class="priverCal">
                    <div class="time_input">
                        <input type="text" name="startdate" id="datepicker" class="" placeholder="개정일을 선택해 주세요." autocomplete="off" maxlength="10" value="">
                    </div>
                </div>
            </div>
            <div class="priv_divider"></div>
            <div class="priverBox">
                <dl>시행일</dl>
                <span>개정일의 2주 뒤로 자동 입력됩니다.</span>
            </div>
            <div class="priv_divider"></div>
            <div class="priverBox">
                <dl>개정본 버전</dl>
                <span>저장한 작성자 명이 자동 입력됩니다.</span>
            </div>
        </div>

        <div class="priContentBox">
            <div class="priC_title marB24">머리말</div>
            <div class="priCIntrotext marB24">
                (주)
                <div class="koinput wid220">
                    <input type="text" placeholder="기업명">
                </div>
                개인정보 처리방침
            </div>
            <div class="priCIntrotext">
                (주)
                <div class="koinput wid220">
                    <input type="text" placeholder="기업명">
                </div>
                (이하 회사)은(는) 고객의 개인정보를 중시하며, 개인정보보호법 등 관련 법규를 준수하기 위해 노력하고 있습니다.
                <dl>회사는 개인정보 처리방침을 통해 고객의 개인정보를 어떠한 용도와 방식으로 이용하고 있으며, 개인정보보호를 위해 어떠한 조치를 취하고 있는지 알려드립니다.</dl>
                <dl>회사의 개인정보 처리방침은 다음과 같습니다.</dl>
            </div>
        </div>

        <!------------ No.1 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">1. 개인정보의 처리 목적</div>
            <div class="pr_wrap">
                <div class="prbox">
                    <div class="prti w1528per">서비스 제공 및 운영</div>
                    <div class="prst w8472per">사용자 인증, 회원 관리, 서비스 제공, 서비스의 보안, 이용약관 위반 고객 제재 등 서비스의 제공과 운영을 위해 이용합니다.</div>
                </div>
                <div class="prbox">
                    <div class="prti w1528per">서비스 개선</div>
                    <div class="prst w8472per">사용자 인증, 회원 관리, 서비스 제공, 서비스의 보안, 이용약관 위반 고객 제재 등 서비스의 제공과 운영을 위해 이용합니다.</div>
                </div>
                <div class="prcontainer1"></div>
                <div class="pr_fieldBtnInner">
                    <button class="add_pr_field1 pr_fieldBtn"></button>
                </div>
            </div>
        </div>

        <!------------ No.2 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">2. 수집하는 개인정보의 항목 및 수집방법</div>
            <div class="prtextaddbox marB40">
                <dl>(1) 서비스 가입 시 수집하는 개인정보</dl>
                <div class="prtextTableBox">
                    <div class="prtextTable wid25per">
                        <div class="prtti">처리목적
                            <span class="tiptool" id="tool_btn01">
                                    <!-- [D] tooltip : 처리목적 -->
                                    <div class="layerToolType pmtool_01" id="tool_box01">
                                        <div class="tipContents">
                                            <p>
                                                다른 처리 목적이 있으면 변경합니다.
                                            </p>
                                        </div>
                                    </div>
                                <!-- // [D] 처리목적 -->
                                </span>
                        </div>
                        <div class="prtt_area"><textarea type="text" name="" placeholder="">서비스 제공 및 운영, 개선</textarea></div>
                    </div>
                    <div class="prtextTable wid25per">
                        <div class="prtti">수집 항목
                            <span class="tiptool" id="tool_btn02">
                                    <!-- [D] tooltip : 수집 항목 -->
                                    <div class="layerToolType pmtool_02" id="tool_box02">
                                        <div class="tipContents">
                                            <p>
                                                회사가 수집하는 모든 개인정보 항목을 작성합니다.
                                            </p>
                                        </div>
                                    </div>
                                <!-- // [D] 수집 항목 -->
                                </span>
                        </div>
                        <div class="prtt_area reviseBtn"><textarea type="text" name="" placeholder="">아이디, 이메일 주소, 이름, 휴대전화 번호, 비밀번호</textarea></div>
                    </div>
                    <div class="prtextTable wid50per">
                        <div class="prtti">처리 및 보유 기간
                            <span class="tiptool" id="tool_btn03">
                                    <!-- [D] tooltip : 처리 및 보유 기간 -->
                                    <div class="layerToolType pmtool_02" id="tool_box03">
                                        <div class="tipContents">
                                            <p>
                                                별도 보유기간이 있다면 ‘1년', ‘3년' 등 기간을 작성합니다.
                                            </p>
                                        </div>
                                    </div>
                                <!-- // [D] 처리 및 보유 기간 -->
                                </span>
                        </div>
                        <div class="prtt_area"><textarea type="text" name="" placeholder="">탈퇴 또는 계약 종료 시까지</textarea></div>
                    </div>
                </div>
                <script>
                    jQuery(document).ready(function() {
                        var max_fields2     = 5;
                        var wrapper2        = jQuery(".prcontainer2");
                        var add_button2      = jQuery(".add_pr_field2");
                        var x = 1;

                        jQuery(add_button2).click(function(e){
                            e.preventDefault();
                            if(x < max_fields2){
                                x++;
                                jQuery(wrapper2).append(
                                    '<div class="addelement">' +
                                    '<div class="prtextTableBox">' +
                                    '<div class="prtextTable wid25per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '<div class="prtextTable wid25per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '<div class="prtextTable wid50per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<a href="#" class="pr_delete"></a></div>'
                                ); //add input box
                            }
                            else
                            {
                                alert('해당 정보는 4개 입력이 최대입니다.')
                            }
                        });

                        jQuery(wrapper2).on("click",".pr_delete", function(e){
                            e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                        })
                    });
                </script>
                <div class="prcontainer2"></div>
                <div class="pr_fieldBtnInner">
                    <button class="add_pr_field2 pr_fieldBtn"></button>
                </div>
            </div>
            <div class="prtextaddbox marB40">
                <dl>(2) 서비스 이용 중 생성, 수집하는 정보
                    <span class="tiptool" id="tool_btn04">
                            <!-- [D] tooltip : 서비스 이용 중 생성, 수집하는 정보 -->
                            <div class="layerToolType pmtool_02" id="tool_box04">
                                <div class="tipContents">
                                    <p>
                                        이용자가 서비스를 사용할 때 자동으로 수집하는 정보입니다.
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 서비스 이용 중 생성, 수집하는 정보 -->
                        </span>
                </dl>
                <div class="prtextTableBox">
                    <div class="prtextTable wid25per">
                        <div class="prtti">처리목적</div>
                        <div class="prtt_area"><textarea type="text" name="" placeholder="">서비스 제공 및 운영</textarea></div>
                    </div>
                    <div class="prtextTable wid25per">
                        <div class="prtti">수집 항목</div>
                        <div class="prtt_area reviseBtn"><textarea type="text" name="" placeholder="">IP 주소, 기기 정보, 서비스 접속 및 이용 기록</textarea></div>
                    </div>
                    <div class="prtextTable wid25per">
                        <div class="prtti">수집 방법</div>
                        <div class="prtt_area"><textarea type="text" name="" placeholder="">서비스 이용 시 생성, 수집</textarea></div>
                    </div>
                    <div class="prtextTable wid25per">
                        <div class="prtti">처리 및 보유 기간</div>
                        <div class="prtt_area"><textarea type="text" name="" placeholder="">탈퇴 또는 계약 종료 시까지</textarea></div>
                    </div>
                </div>
                <script>
                    jQuery(document).ready(function() {
                        var max_fields2     = 5;
                        var wrapper2        = jQuery(".prcontainer3");
                        var add_button2      = jQuery(".add_pr_field3");
                        var x = 1;

                        jQuery(add_button2).click(function(e){
                            e.preventDefault();
                            if(x < max_fields2){
                                x++;
                                jQuery(wrapper2).append(
                                    '<div class="addelement">' +
                                    '<div class="prtextTableBox">' +
                                    '<div class="prtextTable wid25per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '<div class="prtextTable wid25per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '<div class="prtextTable wid25per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '<div class="prtextTable wid25per">' +
                                    '<div class="prtt_area"><textarea type="text" name="" placeholder="내용입력"></textarea></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<a href="#" class="pr_delete"></a></div>'
                                ); //add input box
                            }
                            else
                            {
                                alert('해당 정보는 4개 입력이 최대입니다.')
                            }
                        });

                        jQuery(wrapper2).on("click",".pr_delete", function(e){
                            e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                        })
                    });
                </script>
                <div class="prcontainer3"></div>
                <div class="pr_fieldBtnInner">
                    <button class="add_pr_field3 pr_fieldBtn"></button>
                </div>
                <div class="prdot_text marT16">기기 정보를 수집하는 경우에는 일방향 암호화(Hash)를 통해 기기를 식별할 수 없는 방법으로 변환하여 보관합니다.</div>
            </div>
            <div class="prtextaddbox marB40">
                <dl>(3) 법령에 따른 개인정보의 보유기간
                    <span class="tiptool" id="tool_btn05">
                            <!-- [D] tooltip : 법령에 따른 개인정보의 보유기간 -->
                            <div class="layerToolType pmtool_02" id="tool_box05">
                                <div class="tipContents">
                                    <p>
                                        회사에서 저장하는 수집 항목과 근거법에 따라 해당하는 항목을 선택합니다.
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 법령에 따른 개인정보의 보유기간 -->
                        </span>
                </dl>
                <div class="prarea_table">
                    <table>
                        <colgroup>
                            <col style="width:5.48%;">
                            <col style="width:31.51%;">
                            <col style="width:31.51%;">
                            <col style="width:31.51%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th class="praLeft">수집항목</th>
                            <th class="praLeft">근거법</th>
                            <th class="praLeft">보유기간</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="prarea">
                                    <input type="checkbox" value="" name="prt01" id="prt01" class="">
                                    <label for="prt01"><em></em></label>
                                </div>
                            </td>
                            <td class="praLeft">인터넷 접속 로그</td>
                            <td class="praLeft">통신비밀보호법 제2조</td>
                            <td class="praLeft">3개월</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="prarea">
                                    <input type="checkbox" value="" name="prt02" id="prt02" class="">
                                    <label for="prt02"><em></em></label>
                                </div>
                            </td>
                            <td class="praLeft">계약 또는 청약철회 등에 관한 기록</td>
                            <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률</td>
                            <td class="praLeft">5년</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="prarea">
                                    <input type="checkbox" value="" name="prt03" id="prt03" class="">
                                    <label for="prt03"><em></em></label>
                                </div>
                            </td>
                            <td class="praLeft">대금결제 및 재화 등의 공급에 관한 기록</td>
                            <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                            <td class="praLeft">5년</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="prarea">
                                    <input type="checkbox" value="" name="prt04" id="prt04" class="">
                                    <label for="prt04"><em></em></label>
                                </div>
                            </td>
                            <td class="praLeft">소비자의 불만 또는 분쟁처리에 관한 기록</td>
                            <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                            <td class="praLeft">3년</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="prarea">
                                    <input type="checkbox" value="" name="prt05" id="prt05" class="">
                                    <label for="prt05"><em></em></label>
                                </div>
                            </td>
                            <td class="praLeft">표시·광고에 관한 기록</td>
                            <td class="praLeft">전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                            <td class="praLeft">6개월</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="prtextaddbox nonebor">
                <dl>(4) 개인정보를 자동으로 수집하는 장치의 설치운영 및 그 거부에 관한 사항
                    <span class="tiptool" id="tool_btn06">
                            <!-- [D] tooltip : 개인정보를 자동으로 수집하는 장치의 설치운영 및 그 거부에 관한 사항 -->
                            <div class="layerToolType pmtool_03" id="tool_box06">
                                <div class="tipContents">
                                    <p>
                                        ‘쿠키'에 관한 조항입니다.
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 개인정보를 자동으로 수집하는 장치의 설치운영 및 그 거부에 관한 사항 -->
                        </span>
                </dl>
                <div class="prnor_text">
                    <div class="pttext"><dt>1.</dt>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용할 수 있습니다.</div>
                </div>
                <div class="prnor_text">
                    <p class="marB4"><span>2.</span>쿠키는 웹사이트를 운영하는데 이용되는 웹서버가 이용자의 웹브라우저에게 보내는 소량의 정보이며 웹브라우저가 실행되는 이용자 기기의 저장장치에 저장되기도 합니다.</p>
                    <dd><span></span>쿠키의 사용목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공 또는 서비스 개선을 위해 사용됩니다.</dd>
                </div>
                <div class="prnor_text">
                    <div class="pttext">
                        <dt>3.</dt>
                        회사는 이용자에게 적합하고 보다 유용한 서비스를 제공하기 위해 구글(알파벳)의 Google Analytics를 이용하고 있습니다. Google Analytics 쿠키를 통하여 당사 웹사이트 이용자의 행태정보를 수집하게 되며, 이 경우 이용자 개인을 식별할 수 없는 비식별정보만이 수집됩니다.
                        <span class="tiptool" id="tool_btn07">
                                <!-- [D] tooltip : Google Analytics 쿠키 -->
                                <div class="layerToolType pmtool_02" id="tool_box07">
                                    <div class="tipContents">
                                        <p>
                                             Google Analytics, Pixel 등 쿠키를 활용하는 툴을 사용할 때만 작성합니다.
                                        </p>
                                    </div>
                                </div>
                            <!-- // [D] Google Analytics 쿠키 -->
                            </span>
                    </div>
                </div>
                <div class="prnor_text">
                    <p class="marB4"><span>4.</span>이용자는 다음과 같은 방법으로 쿠키 사용을 거부할 수 있습니다.</p>
                    <dd><span></span>브라우저에서 쿠키를 차단하는 방법</dd>
                </div>
            </div>
        </div>

        <!------------ No.3 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">3. 개인정보의 파기에 관한 사항</div>
            <div class="prinortext">
                회사는 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. 이때, DB로 옮겨진 개인정보는 해당 법령에서 허용된 목적 이외의 다른 목적으로 이용되지 않습니다.
            </div>
            <div class="prinortext">
                회사의 개인정보 파기절차 및 방법은 다음과 같습니다.
            </div>
            <div class="prnor_text">
                <div class="pttext">
                    <dt>1.</dt>
                    파기절차
                    <span class="tiptool" id="tool_btn08">
                            <!-- [D] tooltip : 파기절차 -->
                            <div class="layerToolType pmtool_04" id="tool_box08">
                                <div class="tipContents">
                                    <p>
                                        1. 코코넛에 위탁 관리하는 개인정보는 고객 탈퇴 시 자동 파기할 수 있습니다. 보유기간이 설정된 개인정보는 해당 기간이 지나면 자동 파기됩니다.<br>
                                        2. 법령 등에 따라 별도 보존기간이 설정된 개인정보는 별도 DB의 테이블로 옮겨져 해당 기간만큼 보존 후 파기합니다.(2-3 법령에 따른 개인정보의 보유기간)
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 파기절차 -->
                        </span>
                </div>
                <dd>회사는 보유기간의 경과, 처리목적 달성으로 인해 불필요하게 되었거나 동의 철회, 처리 정지 등 정보주체의 요구가 있은 개인정보를 지체없이 파기합니다. 개인정보보호책임자는 정기적으로 파기된 개인정보 현황을 확인합니다.</dd>
            </div>
            <div class="prnor_text">
                <p><span>2.</span>파기 방법</p>
                <dd>회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</dd>
            </div>
        </div>

        <!------------ No.4 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">4. 서비스 미이용자의 개인정보 파기 등에 관한 조치
                <span class="tiptool" id="tool_btn09">
                        <!-- [D] tooltip : 서비스 미이용자의 개인정보 파기 등에 관한 조치 -->
                        <div class="layerToolType pmtool_02" id="tool_box09">
                            <div class="tipContents">
                                <p>
                                    2023년 3월 14일에 개정된 개인정보보호법에서 삭제되었습니다. 2023년 9월 14일까지만 유효한 항목입니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 서비스 미이용자의 개인정보 파기 등에 관한 조치 -->
                    </span>
            </div>
            <div class="prinortext">
                회사는 1년 동안 서비스를 이용하지 않은 이용자의 개인정보는 파기하거나 별도로 보관합니다. 별도 보관하는 개인정보는 서비스에 이용하지 않습니다. 
            </div>
        </div>

        <!------------ No.5 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">5. 개인정보 처리 업무의 위탁에 관한 사항
                <span class="tiptool" id="tool_btn10">
                        <!-- [D] tooltip : 개인정보 처리 업무의 위탁에 관한 사항 -->
                        <div class="layerToolType pmtool_02" id="tool_box10">
                            <div class="tipContents">
                                <p>
                                    개인정보 업무를 위탁 처리하는 사항에 관해서 작성합니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 개인정보 처리 업무의 위탁에 관한 사항 -->
                    </span>
            </div>
            <div class="prtextTableBox borT">
                <div class="prtextTable wid25per">
                    <div class="prtti">수탁 업체
                        <span class="tiptool" id="tool_btn11">
                                <!-- [D] tooltip : 위탁 업무 -->
                                <div class="layerToolType pmtool_02" id="tool_box11">
                                    <div class="tipContents">
                                        <p>
                                            코코넛을 제공하는 (주)2월대개봉은 필<br>수로 포함합니다.
                                        </p>
                                    </div>
                                </div>
                            <!-- // [D] 위탁 업무 -->
                            </span>
                    </div>
                    <div class="prtt_area"><input type="text" name="" placeholder="" value="(주)2월대개봉"/></div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">필수 / 선택</div>
                    <div class="prtt_area"><input type="text" name="" placeholder="" value="필수"/></div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">위탁 업무
                        <span class="tiptool" id="tool_btn12">
                                <!-- [D] tooltip : 위탁 업무 -->
                                <div class="layerToolType pmtool_02" id="tool_box12">
                                    <div class="tipContents">
                                        <p>
                                            개인정보 처리 업무 위탁에 관해서 작성합니다. ex) 물품 배송, IT 개발 및 운영, 콜센터 업무 등
                                        </p>
                                    </div>
                                </div>
                            <!-- // [D] 위탁 업무 -->
                            </span>
                    </div>
                    <div class="prtt_area"><input type="text" name="" placeholder="" value="개인정보의 처리"/></div>
                </div>
                <div class="prtextTable wid25per">
                    <div class="prtti">처리 및 보유 기간</div>
                    <div class="prtt_area"><input type="text" name="" placeholder="" value="탈퇴 또는 보유기간 만료까지"/></div>
                </div>
            </div>
            <script>
                jQuery(document).ready(function() {
                    var max_fields2     = 5;
                    var wrapper2        = jQuery(".prcontainer4");
                    var add_button2      = jQuery(".add_pr_field4");
                    var x = 1;

                    jQuery(add_button2).click(function(e){
                        e.preventDefault();
                        if(x < max_fields2){
                            x++;
                            jQuery(wrapper2).append(
                                '<div class="addelement">' +
                                '<div class="prtextTableBox">' +
                                '<div class="prtextTable wid25per">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable wid25per">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable wid25per">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable wid25per">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '</div>' +
                                '<a href="#" class="pr_delete"></a></div>'
                            ); //add input box
                        }
                        else
                        {
                            alert('해당 정보는 4개 입력이 최대입니다.')
                        }
                    });

                    jQuery(wrapper2).on("click",".pr_delete", function(e){
                        e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                    })
                });
            </script>
            <div class="prcontainer4"></div>
            <div class="pr_fieldBtnInner">
                <button class="add_pr_field4 pr_fieldBtn"></button>
            </div>
        </div>

        <!------------ No.5-1 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">5-1. 개인정보 처리 업무의 위탁에 관한 사항
                <span class="tiptool" id="tool_btn13">
                        <!-- [D] tooltip : 개인정보 처리 업무의 위탁에 관한 사항 -->
                        <div class="layerToolType pmtool_02" id="tool_box13">
                            <div class="tipContents">
                                <p>
                                    개인정보의 국외 처리위탁이 있을 경우에만 작성합니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 개인정보 처리 업무의 위탁에 관한 사항 -->
                    </span>
                <div class="title_check">
                    <input type="checkbox" value="1" name="pr5-1_involve" id="pr5-1_involve" checked>
                    <label for="pr5-1_involve">
                        <p class="check">포함</p>
                        <em></em>
                    </label>
                </div>
            </div>
            <div class="prtextTablethBox colum7Line borT">
                <div class="prtti">수탁 업체</div>
                <div class="prtti">수탁업체의 위치(국가, 도시 등 구체적 주소 작성)</div>
                <div class="prtti">위탁 일시 및 방법</div>
                <div class="prtti">정보관리책임자의 연락처</div>
                <div class="prtti">위탁하는 개인정보 항목</div>
                <div class="prtti">위탁 업무 내용</div>
                <div class="prtti">위탁 업무 내용개인정보의 보유 및 이용기간</div>
            </div>
            <div class="prtextTableBox">
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="(주)2월대개봉"></textarea></div>
                </div>
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="○국가 ○시 ○구 ○동 건물명"></textarea></div>
                </div>
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="○년 ○월 ○일 인터넷을 이용한 원격지 전송"></textarea></div>
                </div>
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="010-0000-0000"></textarea></div>
                </div>
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="이름, 주소, 이메일"></textarea></div>
                </div>
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="데이터 보호를 위한 국가간 데이터 백업(보관)"></textarea></div>
                </div>
                <div class="prtextTable colum7">
                    <div class="prtt_area"><textarea type="text" name="" placeholder="탈퇴 또는 보유기간 만료까지"></textarea></div>
                </div>
            </div>

            <div class="prcontainer5"></div>
            <div class="pr_fieldBtnInner">
                <button class="add_pr_field5 pr_fieldBtn"></button>
            </div>
        </div>

        <!------------ No.6 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">6. 개인정보 제3자 제공에 관한 사항
                <span class="tiptool" id="tool_btn14">
                        <!-- [D] tooltip : 개인정보 제3자 제공에 관한 사항 -->
                        <div class="layerToolType pmtool_02" id="tool_box14">
                            <div class="tipContents">
                                <p>
                                    개인정보를 제3자에 제공하는 고객사만 작성합니다. 개인정보 처리 위탁에 관한 사항은 5. 개인정보 처리 업무의 위탁에 관한 사항에 작성합니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 개인정보 제3자 제공에 관한 사항 -->
                    </span>
                <div class="title_check">
                    <input type="checkbox" value="1" name="pr6_involve" id="pr6_involve" checked>
                    <label for="pr6_involve">
                        <p class="check">포함</p>
                        <em></em>
                    </label>
                </div>
            </div>
            <div class="prinortext marB24">
                회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 개인정보보호법에 근거해 정보주체의 별도 동의나 관련 법령에 의해 개인정보 제출의 의무가 있는 경우, 또는 정보주체의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한 경우에 한하여 개인정보를 제공합니다.
            </div>
            <div class="prtextTablethBox colum4Line borT">
                <div class="prtti">제공받는 자</div>
                <div class="prtti">제공받는 자의 이용 목적</div>
                <div class="prtti">제공하는 개인정보 항목</div>
                <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
            </div>
            <div class="prtextTableBox">
                <div class="prtextTable colum4">
                    <div class="prtt_area"><input type="text" name="" placeholder="김코코" value=""/></div>
                </div>
                <div class="prtextTable colum4">
                    <div class="prtt_area"><input type="text" name="" placeholder="보험 권유" value=""/></div>
                </div>
                <div class="prtextTable colum4">
                    <div class="prtt_area"><input type="text" name="" placeholder="이름, 휴대전화번호" value=""/></div>
                </div>
                <div class="prtextTable colum4">
                    <div class="prtt_area"><input type="text" name="" placeholder="1년" value=""/></div>
                </div>
            </div>
            <script>
                jQuery(document).ready(function() {
                    var max_fields2     = 5;
                    var wrapper2        = jQuery(".prcontainer6");
                    var add_button2      = jQuery(".add_pr_field6");
                    var x = 1;

                    jQuery(add_button2).click(function(e){
                        e.preventDefault();
                        if(x < max_fields2){
                            x++;
                            jQuery(wrapper2).append(
                                '<div class="addelement">' +
                                '<div class="prtextTableBox">' +
                                '<div class="prtextTable colum4">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum4">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum4">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum4">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '</div>' +
                                '<a href="#" class="pr_delete"></a></div>'
                            ); //add input box
                        }
                        else
                        {
                            alert('해당 정보는 4개 입력이 최대입니다.')
                        }
                    });

                    jQuery(wrapper2).on("click",".pr_delete", function(e){
                        e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                    })
                });
            </script>
            <div class="prcontainer6"></div>
            <div class="pr_fieldBtnInner">
                <button class="add_pr_field6 pr_fieldBtn"></button>
            </div>
        </div>

        <!------------ No.6-1 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">6-1. 개인정보의 국외 제3자 제공에 관한 사항
                <span class="tiptool" id="tool_btn15">
                        <!-- [D] tooltip : 개인정보의 국외 제3자 제공에 관한 사항 -->
                        <div class="layerToolType pmtool_02" id="tool_box15">
                            <div class="tipContents">
                                <p>
                                    개인정보를 국외의 업체에 제3자 제공 방식으로 이전할 때 작성합니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 개인정보의 국외 제3자 제공에 관한 사항 -->
                    </span>
                <div class="title_check">
                    <input type="checkbox" value="1" name="pr6-1_involve" id="pr6-1_involve" checked>
                    <label for="pr6-1_involve">
                        <p class="check">포함</p>
                        <em></em>
                    </label>
                </div>
            </div>
            <div class="prtextTablethBox colum5Line borT">
                <div class="prtti">제공받는 자</div>
                <div class="prtti">제공받는 자의 이용 목적</div>
                <div class="prtti">제공하는 개인정보 항목</div>
                <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
                <div class="prtti">제공받는 자의 개인정보 보유 및 이용 기간</div>
            </div>
            <div class="prtextTableBox">
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="김코코" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="미국, 샌프란시스코, www.xyz.com" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="마케팅 제휴" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="이름, 이메일, 성별, 생년월일" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="1년" value=""/></div>
                </div>
            </div>
            <script>
                jQuery(document).ready(function() {
                    var max_fields2     = 5;
                    var wrapper2        = jQuery(".prcontainer7");
                    var add_button2      = jQuery(".add_pr_field7");
                    var x = 1;

                    jQuery(add_button2).click(function(e){
                        e.preventDefault();
                        if(x < max_fields2){
                            x++;
                            jQuery(wrapper2).append(
                                '<div class="addelement">' +
                                '<div class="prtextTableBox">' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '</div>' +
                                '<a href="#" class="pr_delete"></a></div>'
                            ); //add input box
                        }
                        else
                        {
                            alert('해당 정보는 4개 입력이 최대입니다.')
                        }
                    });

                    jQuery(wrapper2).on("click",".pr_delete", function(e){
                        e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                    })
                });
            </script>
            <div class="prcontainer7"></div>
            <div class="pr_fieldBtnInner">
                <button class="add_pr_field7 pr_fieldBtn"></button>
            </div>
        </div>

        <!------------ No.7 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">7. 정보주체의 권리**·의무** 및 그 행사방법에 관한 사항</div>
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
        <div class="priContentBox">
            <div class="priC_title marB24">8. 개인정보의 안전성 확보 조치에 관한 사항</div>
            <div class="prinortext marB16">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                <span class="tiptool" id="tool_btn16">
                        <!-- [D] tooltip : 개인정보의 안전성 확보 -->
                        <div class="layerToolType pmtool_02" id="tool_box16">
                            <div class="tipContents">
                                <p>
                                    코코넛에서 관리하는 개인정보는 아래와 같은 관리적 기술적 물리적 보호조치를 충족합니다. 서류에 작성된 개인정보는 고객사가 직접 관리하는 개인정보에만 해당합니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 개인정보의 안전성 확보 -->
                    </span>
            </div>
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

        <!------------ No.9 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">9. 개인정보보호 책임자에 관한 사항
                <span class="tiptool" id="tool_btn17">
                        <!-- [D] tooltip : 개인정보보호 책임자에 관한 사항 -->
                        <div class="layerToolType pmtool_02" id="tool_box17">
                            <div class="tipContents">
                                <p>
                                    개인정보보호책임자(CPO)는 반드시 임원으로 선임해야 합니다. 선임하지 않으면 CEO가 개인정보보호책임자(CPO)인 것으로 간주됩니다. 반드시 한 명일 필요는 없습니다.
                                </p>
                            </div>
                        </div>
                    <!-- // [D] 개인정보보호 책임자에 관한 사항 -->
                    </span>
            </div>
            <div class="prinortext marB24">
                정보주체는 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호 책임자에게 문의하실 수 있습니다. 개인정보보호 책임자는 이용자의 문의에 대해 지체없이 답변 및 처리해 드릴 것입니다.
            </div>
            <div class="prtextTablethBox colum5Line borT">
                <div class="prtti">성명</div>
                <div class="prtti">직책</div>
                <div class="prtti">이메일</div>
                <div class="prtti">연락처
                    <span class="tiptool" id="tool_btn18">
                            <!-- [D] tooltip : 연락처 -->
                            <div class="layerToolType pmtool_02" id="tool_box18">
                                <div class="tipContents">
                                    <p>
                                        실제 연락 가능한 연락처를 작성합니다.
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 연락처 -->
                        </span>
                </div>
                <div class="prtti">담당부서</div>
            </div>
            <div class="prtextTableBox">
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="김코코" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="CEO" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="privacy@abc.com" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="02-1234-7890" value=""/></div>
                </div>
                <div class="prtextTable colum5">
                    <div class="prtt_area"><input type="text" name="" placeholder="보안팀" value=""/></div>
                </div>
            </div>
            <script>
                jQuery(document).ready(function() {
                    var max_fields2     = 5;
                    var wrapper2        = jQuery(".prcontainer8");
                    var add_button2      = jQuery(".add_pr_field8");
                    var x = 1;

                    jQuery(add_button2).click(function(e){
                        e.preventDefault();
                        if(x < max_fields2){
                            x++;
                            jQuery(wrapper2).append(
                                '<div class="addelement">' +
                                '<div class="prtextTableBox">' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '<div class="prtextTable colum5">' +
                                '<div class="prtt_area"><input type="text" name="" placeholder="내용입력" value=""/></div>' +
                                '</div>' +
                                '</div>' +
                                '<a href="#" class="pr_delete"></a></div>'
                            ); //add input box
                        }
                        else
                        {
                            alert('해당 정보는 4개 입력이 최대입니다.')
                        }
                    });

                    jQuery(wrapper2).on("click",".pr_delete", function(e){
                        e.preventDefault(); jQuery(this).parent('div').remove(); x--;
                    })
                });
            </script>
            <div class="prcontainer8"></div>
            <div class="pr_fieldBtnInner">
                <button class="add_pr_field8 pr_fieldBtn"></button>
            </div>
        </div>

        <!------------ No.10 ------------>
        <div class="priContentBox">
            <div class="priC_title marB24">10. 개인정보 처리방침의 변경에 관한 사항</div>
            <div class="prinortext marB16">
                개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 홈페이지 또는 이메일 등 개별 통지 방법을 통해 고지할 것입니다.
            </div>
            <div class="prnor_text">
                <div class="prnort dateinput">
                    <dt></dt>
                    현 개인정보 처리방침 시행 일자 :
                    <div class="koinput wid64 marL8">
                        <input type="text" name="" id="" class="" placeholder="2023">
                    </div>
                    년
                    <div class="koinput wid44 marL16">
                        <input type="text" name="" id="" class="" placeholder="01">
                    </div>
                    월
                    <div class="koinput wid44 marL16">
                        <input type="text" name="" id="" class="" placeholder="01">
                    </div>
                    일

                    <span class="tiptool" id="tool_btn19">
                            <!-- [D] tooltip : 현 개인정보 처리방침 시행 일자 -->
                            <div class="layerToolType pmtool_02" id="tool_box19">
                                <div class="tipContents">
                                    <p>
                                        현 개인정보 처리방침에서 이전 개인정보 처리방침을 찾을 수 있어야 합니다.
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 현 개인정보 처리방침 시행 일자 -->
                        </span>
                </div>
            </div>
            <div class="prnor_text">
                <div class="prnort"><dt></dt>이전 개인정보 처리방침 시행 일자 : 2022. 12. 12.
                    <span class="tiptool" id="tool_btn20">
                            <!-- [D] tooltip : 이전 개인정보 처리방침 시행 일자 -->
                            <div class="layerToolType pmtool_02" id="tool_box20">
                                <div class="tipContents">
                                    <p>
                                        코코넛에 개인정보 처리방침을 저장했다면, 그 링크를 이용할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        <!-- // [D] 이전 개인정보 처리방침 시행 일자 -->
                        </span>
                </div>
            </div>
        </div>

        <!------------ No.11 ------------>
        <div class="priContentBox noneMarB">
            <div class="priC_title marB24">11. 개인정보의 권익침해에 대한 구제방법</div>
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

        <div class="prformBtnBox marT64">
            <button type="submit">저장하기</button>
        </div>
    </div>
</section>