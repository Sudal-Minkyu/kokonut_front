import{S as k,i as g,s as w,K as C,c as $,a as _,e as o,t as S,b as m,m as L,h as y,j as t,o as E,L as H,q as M,r as P,u as W,w as j,v as T,H as q,y as a,M as D}from"./index-86073da7.js";function F(p){let e,c,s,l,d,n,B,I,f,b,u,r,x,h;return e=new C({}),{c(){$(e.$$.fragment),c=_(),s=o("section"),l=o("div"),d=o("div"),n=o("a"),B=S(p[0]),I=_(),f=o("h1"),f.textContent="이메일 발송",b=_(),u=o("div"),u.innerHTML=`<form><div><div class="semBtnBox"><div><button type="submit" class="semBtn">발송하기</button></div> 
                        <div class="mail_reserveBtn">예약</div></div> 
                    
                    <div class="mail_reserveBox"><div class="mrTopBox"><div class="mrTopTitle marB12">발송 예약</div> 
                            <div class="mrtContent marB12 mrtType01"><dl>기준시간</dl> 
                                <div class="mrtBox"><div class="mrtSelBox"><div class="selectBox wid100per nonePad"><div class="label" id="standardTime">전체</div> 
                                            <ul class="optionList"><li class="optionItem curv">항목1</li> 
                                                <li class="optionItem curv">항목2</li></ul></div></div></div></div> 
                            <div class="mrtContent mrtType02"><dl>예약시간</dl> 
                                <div class="mrtBox"><div class="time_input"><input type="text" name="startdate" id="datepicker" class="" placeholder="시작일" autocomplete="off" maxlength="10" value=""/></div> 
                                    <div class="mrtSelBox"><div class="selectBox wid100per nonePad"><div class="label" id="timeSelection">시간선택</div> 
                                            <ul class="optionList"><li class="optionItem curv">1시</li> 
                                                <li class="optionItem curv">2시</li> 
                                                <li class="optionItem curv">3시</li> 
                                                <li class="optionItem curv">4시</li> 
                                                <li class="optionItem curv">5시</li> 
                                                <li class="optionItem curv">6시</li> 
                                                <li class="optionItem curv">7시</li> 
                                                <li class="optionItem curv">8시</li> 
                                                <li class="optionItem curv">9시</li> 
                                                <li class="optionItem curv">10시</li> 
                                                <li class="optionItem curv">11시</li> 
                                                <li class="optionItem curv">12시</li> 
                                                <li class="optionItem curv">13시</li> 
                                                <li class="optionItem curv">14시</li> 
                                                <li class="optionItem curv">15시</li> 
                                                <li class="optionItem curv">16시</li> 
                                                <li class="optionItem curv">17시</li> 
                                                <li class="optionItem curv">18시</li> 
                                                <li class="optionItem curv">19시</li> 
                                                <li class="optionItem curv">20시</li> 
                                                <li class="optionItem curv">21시</li> 
                                                <li class="optionItem curv">22시</li> 
                                                <li class="optionItem curv">23시</li> 
                                                <li class="optionItem curv">24시</li></ul></div></div></div></div></div> 
                        <div class="mrBottomBox"><div class="floatBtnBox"><div class="del mailreserve_cancal" id="">취소</div> 
                                <div class="add mailreserve_confirm" id="">확인</div></div></div></div> 
                    
                    <div class="cur_reserve marT16"><p>예약</p> 
                        <dl><span>2023. 03. 20</span><span>(월)</span><span>14:00</span></dl> 
                        <div class="reserve_close" id=""></div></div></div> 
                
                <div class="semailContentBox marT24"><div class="semailitemBox marB20"><dl>발송목적</dl> 
                        <div class="se_item seselCont"><div class="selectBox wid122 nonePad"><div class="label" id="">선택</div> 
                                <ul class="optionList"><li class="optionItem curv">주요공지</li> 
                                    <li class="optionItem curv">광고/홍보</li></ul></div></div></div> 
                    <div class="semailitemBox marB20"><dl>발송대상</dl> 
                        <div class="se_item seradio"><div class="popRadio"><div class="check poprCheck"><input type="radio" class="radio" name="use_noneuse" id="전체 회원" value="전체 회원" checked=""/> 
                                    <label for="전체 회원"><em><dt></dt></em>
                                        전체 회원
                                        <span>500명</span></label></div> 
                                <div class="check poprCheck"><input type="radio" class="radio" name="use_noneuse" id="선택 회원" value="선택 회원"/> 
                                    <label for="선택 회원"><em><dt></dt></em>
                                        선택 회원
                                        <span>20명</span> 
                                        <div class="sendMemberBtn" id="email_member_pop">회원선택</div></label></div></div></div></div> 
                    <div class="semailitemBox marB20"><dl>발신자 설정</dl> 
                        <div class="se_item "><input type="text" name="" id="" placeholder="발신자의 이메일을 적어주세요."/></div></div> 
                    <div class="semailitemBox marB20"><dl>제목</dl> 
                        <div class="se_item "><input type="text" name="" id="" placeholder="제목을 적어주세요."/></div></div> 
                    <div class="semailitemBox sefileCont"><dl>파일첨부</dl> 
                        <div class="se_item"><div class="sc_fileBox"><div class="fileInner"><div class="file-list"></div> 
                                    <label for="file">첨부</label> 
                                    <input type="file" id="file" onchange="addFile(this);" multiple=""/></div></div></div></div> 

                    <div class="writeToolBox marT40"><img src="/kokonut/member/public/img/common/writetool_testimg.png" alt="" style="max-width:100%;"/></div></div></form> 
            <div class="bottomInfoBox marT24"><dl>광고/홍보 목적의 메시지 발송은 반드시 수신 허용한 회원에게만 발송해야 합니다. (개인정보 보호법)</dl> 
                <dl>회원정보 DB항목 중 광고/홍보 수신설정 항목이 없는 경우 광고/홍보를 선택할 수 없으며, 임의로 광고/홍보 메시지 발송 시 모든 책임은 관리담당자에게 있습니다.</dl></div>`,m(n,"href","/service/emailList"),m(d,"class","pageTitleBtn marB50"),m(u,"class","semailWrap"),m(l,"class","contentInnerWrap"),m(s,"class","bodyWrap")},m(i,v){L(e,i,v),y(i,c,v),y(i,s,v),t(s,l),t(l,d),t(d,n),t(n,B),t(d,I),t(d,f),t(l,b),t(l,u),r=!0,x||(h=E(H.call(null,n)),x=!0)},p(i,[v]){(!r||v&1)&&M(B,i[0])},i(i){r||(P(e.$$.fragment,i),r=!0)},o(i){W(e.$$.fragment,i),r=!1},d(i){j(e,i),i&&T(c),i&&T(s),x=!1,h()}}}function K(p,e,c){let s;return q(p,D,l=>c(0,s=l)),a(".mail_reserveBtn").click(function(){a(".mail_reserveBox").show()}),a(".mailreserve_cancal").click(function(){document.getElementById("standardTime").innerText="전체",a("#datepicker").val(""),document.getElementById("timeSelection").innerText="시간선택",a(".mail_reserveBox").hide()}),a(".mailreserve_confirm").click(function(){a(".mail_reserveBox").hide()}),[s]}class R extends k{constructor(e){super(),g(this,e,K,F,w,{})}}export{R as default};
