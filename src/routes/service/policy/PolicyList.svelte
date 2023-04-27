
<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import { link } from 'svelte-spa-router'
    import { page } from '../../../lib/store.js'

    import {setCustomSelectBox, setDateRangePicker, setOptionItem} from "../../../lib/libSearch.js";
    import {onMount} from "svelte";

    onMount(async ()=>{
        await fatchSearchModule();

    })

    async function fatchSearchModule(){
        setDateRangePicker('stime', true, 'period');
        setCustomSelectBox();
        setOptionItem(customSelectBoxOpt);
    }

    let customSelectBoxOpt = [
        {id : "policySelect", use_all : true, codeName : "policy_search"},
    ]; // 선택 박스 옵션

</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보처리방침 목록</h1>
            <div class="TitleBtn">
                <a use:link href="/service/policyWrite" on:click="{() => {$page = 0}}">
                    <button id="adm_registration_pop">새로 만들기</button>
                </a>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <div class="seaWrap marB50">
            <form>
                <div class="koinput marB32">
                    <input type="text" class="wid360" placeholder="작성자 검색" />
                    <button><img src="/assets/images/common/icon_search.png" alt=""></button>
                </div>
                <div class="seaContentBox">
                    <div class="seaContentLine borB">
                        <div class="seaCont wid662">
                            <dl>제공 날짜</dl>
                            <div class="seaflexBox">
                                <div class="sc_SelBox">
                                    <div class="selectBox wid162">
                                        <div class="label" id="policySelect" ></div>
                                        <ul class="optionList">
                                        </ul>
                                    </div>
                                </div>
                                <div class="calenderBox borL">
                                    <div class="calenderInput">
                                        <input id="stime" type="text" class="form-control" placeholer="날짜선택" aria-describedby="stime_addon" readonly />
                                        <img src="/assets/images/common/callendericon.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seaRadioBox borL">
                            <div class="seaRadio">
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="당일" value="1" checked>
                                    <label for="당일"><em><dt></dt></em>당일</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 1주일" value="7" >
                                    <label for="최근 1주일"><em><dt></dt></em>최근 1주일</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 한 달" value="30" >
                                    <label for="최근 한 달"><em><dt></dt></em>최근 한 달</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 3개월" value="90">
                                    <label for="최근 3개월"><em><dt></dt></em>최근 3개월</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="최근 6개월" value="180">
                                    <label for="최근 6개월"><em><dt></dt></em>최근 6개월</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="사용자 지정" value="0">
                                    <label for="사용자 지정"><em><dt></dt></em>사용자 지정</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- 테이블 영역 -->
        <div class="kotable policyList">
            <div class="kt_tableTopBox marB20">
                <div class="kt_total">총 <span>910</span>건</div>
                <div class="kt_selbox wid120">
                    <div class="selectBox wid100per nonePad">
                        <div class="label" >최근 등록순</div>
                        <ul class="optionList">
                            <li class="optionItem">최근 등록순</li>
                            <li class="optionItem">정확도순</li>
                            <li class="optionItem">오름차순</li>
                            <li class="optionItem">내림차순</li>
                        </ul>
                    </div>
                </div>
            </div>
            <table>
                <caption>개인정보 처리이력 리스트</caption>
                <colgroup>
                    <col style="width:5.48%;">
                    <col style="width:9.59%;">
                    <col style="width:10.96%;">
                    <col style="width:12.33%;">
                    <col style="width:15.07%;">
                    <col style="width:15.07%;">
                    <col style="width:15.07%;">
                    <col style="width:16.44%;">
                </colgroup>
                <thead>
                <tr>
                    <th>No</th>
                    <th>버전</th>
                    <th>작성자</th>
                    <th>등급</th>
                    <th>제작일</th>
                    <th>개정일</th>
                    <th>시행일</th>
                    <th>전문확인</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>10</td>
                        <td>1.4</td>
                        <td>김*코</td>
                        <td>최고관리자<div class="mastericon"></div></td>
                        <td>2023. 03. 28</td>
                        <td>2023. 03. 28</td>
                        <td>2023. 03. 28</td>
                        <td><div class="dlink"><a href="policy-detail.html">상세보기</a></div></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</section>