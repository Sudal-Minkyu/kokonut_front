
<script>
    import Header from "../../../components/service/layout/Header.svelte";


</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보 검색</h1>
            <dl>
                개인정보 조회 및 열람 시 기록이 남습니다.
            </dl>
        </div>

        <div class="pr_seaIliustBox">
            <img src="/assets/images/common/search_lilust.png" alt="">
        </div>

        <div class="pr_seaWrap">
            <div class="pr_seaInner">
                <div class="mu_SelBox wid180">
                    <div class="selectBox wid100per nonePad">
                        <div class="label" id="">전체</div>
                        <ul class="optionList">
                            <li class="optionItem curv all_sel">전체</li>
                            <li class="optionItem curv email_sel">이메일</li>
                            <li class="optionItem curv name_sel">이름</li>
                            <li class="optionItem curv birth_sel">생년월일</li>
                            <li class="optionItem curv phone_sel">휴대폰번호</li>
                        </ul>
                    </div>
                </div>
<!--                    <div class="filtetBtn" id="filter_pop">기간 필터</div>-->
                <div class="koinputshowhideBox">
                    <div class="koinput allinput">
                        <input type="text" name="all" id="all" class="wid480" placeholder="이름, 이메일, 생년월일, 휴대폰번호 검색"/>
                        <button><img src="/kokonut/member/public/img/common/icon_search_ver2.png" alt=""></button>
                    </div>
                    <div class="koinput emailinput">
                        <input type="text" name="email" id="email" class="wid480" placeholder="이메일"/>
                        <button><img src="/kokonut/member/public/img/common/icon_search_ver2.png" alt=""></button>
                    </div>
                    <div class="koinput nameinput">
                        <input type="text" name="name" id="name" class="wid480" placeholder="이름"/>
                        <button><img src="/kokonut/member/public/img/common/icon_search_ver2.png" alt=""></button>
                    </div>
                    <div class="koinput birthinput">
                        <input type="text" name="birth" id="birth" class="wid480" placeholder="20230130" maxlength="8"/>
                        <button><img src="/kokonut/member/public/img/common/icon_search_ver2.png" alt=""></button>
                    </div>
                    <div class="koinput phoneinput">
                        <input type="text" name="phone" id="phone" class="wid480" placeholder="01012345678" maxlength="11"/>
                        <button><img src="/kokonut/member/public/img/common/icon_search_ver2.png" alt=""></button>
                    </div>
                </div>
            </div>
<!--                <a href="./search-result.html">테스트용 다음 페이지 버튼</a>-->
        </div>

    </div>
</section>
