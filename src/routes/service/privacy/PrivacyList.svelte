
<script>
    import Header from "../../../components/service/layout/Header.svelte"
    import { link } from 'svelte-spa-router'
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>개인정보 제공리스트</h1>
            <div class="TitleBtn">
                <a use:link href="/service/privacyWrite">
                    <button id="adm_registration_pop">개인정보 제공</button>
                </a>
            </div>
        </div>

        <!-- 상단 검색 영역 -->
        <div class="seaWrap marB50">
            <div class="kotopBtn"><button><img src="/assets/images/common/top_down_arrow.png" alt="" class="top_down_arrow">이력 다운로드</button></div>
            <form>
                <div class="koinput marB32">
                    <input type="text" class="wid360" placeholder="담당자 검색" />
                    <button><img src="/assets/images/common/icon_search.png" alt=""></button>
                </div>
                <div class="seaContentBox">
                    <div class="seaContentLine borB">
                        <div class="seaCont wid500">
                            <dl>제공 날짜</dl>
                            <div class="calenderBox">
                                <div class="calenderInput">
                                    <input id="stime" type="text" name="stime" class="form-control" placeholer="날짜선택" aria-describedby="stime_addon" />
                                </div>
                            </div>
                        </div>
                        <div class="seaRadioBox borL">
                            <div class="seaRadio">
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="오늘" value="오늘" checked>
                                    <label for="오늘"><em><dt></dt></em>오늘</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="1주일" value="1주일">
                                    <label for="1주일"><em><dt></dt></em>1주일</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="1개월" value="1개월">
                                    <label for="1개월"><em><dt></dt></em>1개월</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="3개월" value="3개월">
                                    <label for="3개월"><em><dt></dt></em>3개월</label>
                                </div>
                                <div class="check radioCheck">
                                    <input type="radio" class="radio" name="period" id="6개월" value="6개월">
                                    <label for="6개월"><em><dt></dt></em>6개월</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="seaContentLine">
                        <div class="seaCont wid33per">
                            <dl>다운로드 유무</dl>
                            <div class="sc_SelBox">
                                <div class="selectBox wid164">
                                    <div class="label" id="">활동 전체</div>
                                    <ul class="optionList">
                                        <li class="optionItem">Y</li>
                                        <li class="optionItem">N</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="seaCont wid33per">
                            <dl>제공 현황</dl>
                            <div class="sc_SelBox">
                                <div class="selectBox wid164">
                                    <div class="label" id="">활동 전체</div>
                                    <ul class="optionList">
                                        <li class="optionItem">제공 함</li>
                                        <li class="optionItem">제공 받음</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="seaCont wid33per">
                            <dl>상태</dl>
                            <div class="sc_SelBox">
                                <div class="selectBox wid164">
                                    <div class="label" id="">활동 전체</div>
                                    <ul class="optionList">
                                        <li class="optionItem">대기 중</li>
                                        <li class="optionItem">제공 중</li>
                                        <li class="optionItem">제공 완료</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- 테이블 영역 -->
        <div class="kotable privacyList">

            <table>
                <caption>개인정보 처리이력 리스트</caption>
                <colgroup>
                    <col style="width:5.48%;">
                    <col style="width:9.59%;">
                    <col style="width:10.96%;">
                    <col style="width:10.96%;">
                    <col style="width:13.70%;">
                    <col style="width:19.18%;">
                    <col style="width:9.59%;">
                    <col style="width:9.59%;">
                    <col style="width:10.96%;">
                </colgroup>
                <thead>
                <tr>
                    <th>No</th>
                    <th>상태</th>
                    <th>제공 현황</th>
                    <th>담당자</th>
                    <th>만든 날짜</th>
                    <th>제공 기간</th>
                    <th>다운로드 유무</th>
                    <th>다운로드 횟수</th>
                    <th>IP</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>10</td>
                    <td>
                        <div class="condition waiting">대기중</div>
                    </td>
                    <td>대기 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>
                        <div class="condition ing">제공중</div>
                    </td>
                    <td>제공 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>
                        <div class="condition complete">제공완료</div>
                    </td>
                    <td>제공 완료</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>
                        <div class="condition waiting">대기중</div>
                    </td>
                    <td>대기 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>
                        <div class="condition ing">제공중</div>
                    </td>
                    <td>제공 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>
                        <div class="condition complete">제공완료</div>
                    </td>
                    <td>제공 완료</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>
                        <div class="condition waiting">대기중</div>
                    </td>
                    <td>대기 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>
                        <div class="condition ing">제공중</div>
                    </td>
                    <td>제공 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>
                        <div class="condition complete">제공완료</div>
                    </td>
                    <td>제공 완료</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>
                        <div class="condition waiting">대기중</div>
                    </td>
                    <td>대기 중</td>
                    <td>최*리</td>
                    <td>2023. 01. 01</td>
                    <td>23.03.03 ~ 23.04.04</td>
                    <td>Y</td>
                    <td><div class="dcount downcountPop">3</div></td>
                    <td><div class="dlink dlinkPop">상세보기</div></td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 페이징 영역 -->
        <div class="paginationBox marT40">
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
</section>