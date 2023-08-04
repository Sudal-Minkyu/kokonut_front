<script>
    import jQuery from "jquery";
    import {DateRangePicker} from "../../../common/action/DatePicker.js";

    export let searchCondition;
    export let activityList;

    export let activityConfirm;
    export let activityCancel;

    jQuery(document).on("click", ".fccheckBtn", function () {
        jQuery('.floatCheckBox').css("display", 'inline-block');
    });

    export let choseMax;
    export let choseMaxText;

    const handleSelectPeriod = (result) => {
        activityList(0);
    }

    const dateRangePickerProps = {
        callback: handleSelectPeriod,
        handleRendered: handleSelectPeriod,
        periodName: 'period',
        eraseOnCancel: false,
    };
</script>

<!-- 상단 검색 영역 -->
<div class="seaWrap marB28">
    <div class="seaContentBox">
        <div class="seaContentLine borB">
            <div class="seaCont wid500">
                <dl>활동 날짜</dl>
                <div class="calenderBox">
                    <div class="calenderInput">
                        <input id="stime" type="text" class="form-control" placeholer="날짜선택"
                               aria-describedby="stime_addon" readonly use:DateRangePicker={dateRangePickerProps} />
                        <img src="/assets/images/common/callendericon.png" alt="">
                    </div>
                </div>
            </div>
            <div class="seaRadioBox borL">
                <div class="seaRadio">
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="당일" value="1">
                        <label for="당일"><em><dt></dt></em>당일</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 1주일" value="7" >
                        <label for="최근 1주일"><em><dt></dt></em>최근 1주일</label>
                    </div>
                    <div class="check radioCheck">
                        <input type="radio" class="radio" name="period" id="최근 한 달" value="30" checked>
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
        <div class="seaContentLine">
            <div class="seaCont wid100per">
                <dl>활동 선택</dl>
                <div class="sc_multiBox" >
                    <div class="fccheckText">
                        <span class="fccheckBtn" id="result">활동전체</span>
                    </div>

                    <div class="floatCheckBox">
                        <div class="floatCheckList borB">
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="로그인" value="AC_01"/>
                                <label for="로그인">로그인</label>
                            </div>
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="회원정보 변경" value="AC_02"/>-->
<!--                                <label for="회원정보 변경">회원정보 변경</label>-->
<!--                            </div>-->
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="회원정보 삭제" value="AC_03"/>-->
<!--                                <label for="회원정보 삭제">회원정보 삭제</label>-->
<!--                            </div>-->
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="관리자 추가" value="AC_04"/>
                                <label for="관리자 추가">관리자 추가</label>
                            </div>
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="관리자 권한 변경" value="AC_05"/>-->
<!--                                <label for="관리자 권한 변경">관리자 권한 변경</label>-->
<!--                            </div>-->
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="처리이력 다운로드" value="AC_31"/>-->
<!--                                <label for="처리이력 다운로드">처리이력 다운로드</label>-->
<!--                            </div>-->
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="테이블 항목 추가" value="AC_19"/>
                                <label for="테이블 항목 추가">테이블 항목 추가</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="테이블 항목 삭제" value="AC_21"/>
                                <label for="테이블 항목 삭제">테이블 항목 삭제</label>
                            </div>

                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="활동이력 다운로드" value="AC_07"/>
                                <label for="활동이력 다운로드">활동이력 다운로드</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="추가 카테고리 항목 추가" value="AC_42"/>
                                <label for="추가 카테고리 항목 추가">추가 카테고리 항목 추가</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="개인정보제공 등록" value="AC_48"/>
                                <label for="개인정보제공 등록">개인정보제공 등록</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="개인정보제공 다운로드" value="AC_47_2"/>
                                <label for="개인정보제공 다운로드">개인정보제공 다운로드</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="개인정보 열람데이터 다운로드" value="AC_06"/>
                                <label for="개인정보 열람데이터 다운로드">개인정보 열람데이터 다운로드</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="개인정보 처리이력 다운로드" value="AC_10"/>
                                <label for="개인정보 처리이력 다운로드">개인정보 처리이력 다운로드</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="API KEY 재발급" value="AC_25"/>
                                <label for="API KEY 재발급">API KEY 재발급</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="1:1 문의등록" value="AC_41"/>
                                <label for="1:1 문의등록">1:1 문의등록</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="이메일 발송" value="AC_59_3"/>
                                <label for="이메일 발송">이메일 발송</label>
                            </div>
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="정보파기 관리" value="AC_15"/>-->
<!--                                <label for="정보파기 관리">정보파기 관리</label>-->
<!--                            </div>-->
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="전체DB 다운로드" value="AC_32"/>-->
<!--                                <label for="전체DB 다운로드">전체DB 다운로드</label>-->
<!--                            </div>-->
<!--                            <div class="actCheck">-->
<!--                                <input type="checkbox" name="activity" class="act_sel" id="개인정보 관리 변경" value="AC_18"/>-->
<!--                                <label for="개인정보 관리 변경">개인정보 관리 변경</label>-->
<!--                            </div>-->
                        </div>
                        <div class="floatBtnList">
                            <p style="right:10px" class="{choseMax === false ? 'notxt not_work' : 'notxt'}">{choseMaxText}</p>
                            <input type=button  class="activityCancel" on:click={activityCancel} value="초기화" />
                            <input type=button  class="activityConfirm" on:click={activityConfirm} value="선택완료" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>