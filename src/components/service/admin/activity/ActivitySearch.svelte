<script>
    import {DateRangePicker} from "../../../common/action/DatePicker.js";
    import {onDestroy, onMount} from "svelte";
    import {SelectBoxManager} from "../../../common/action/SelectBoxManager.js";

    export let searchCondition;
    export let activityList;

    export let activityConfirm;
    export let activityCancel;

    onMount(() => {
        document.addEventListener('click', floatCheckboxEvent);
    });

    onDestroy(() => {
        document.removeEventListener('click', floatCheckboxEvent);
    });

    const floatCheckboxEvent = (event) => {
        let targetElement = event.target;
        const elements = document.querySelectorAll('.floatCheckBox');
        const isOpenBtn = targetElement.matches('.fccheckBtn');
        const isInsideFloatBoxBtn = targetElement.matches('.activityConfirm') || targetElement.matches('.activityCancel');
        let isFloatBox = false;
        while (targetElement != null) {
            if (targetElement.classList.contains('floatCheckBox')) {
                isFloatBox = true;
            }
            targetElement = targetElement.parentElement;
        }
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = (isOpenBtn || isFloatBox) && !isInsideFloatBoxBtn ? 'inline-block' : 'none';
        }

    }

    export let choseMax;
    export let choseMaxText;

    const handleSelectPeriod = () => {
        activityList(0);
    }

    const dateRangePickerProps = {
        callback: handleSelectPeriod,
        handleRendered: handleSelectPeriod,
        periodName: 'period',
        eraseOnCancel: false,
    };

    const handleFilterRole = (el) => {
        searchCondition.filterRole = el.dataset.value;
        activityList(0);
    }
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
            <div class="seaCont wid50per">
                <dl>관리자등급</dl>
                <div class="sc_SelBox">
                    <div class="selectBox wid164" use:SelectBoxManager={{callback: handleFilterRole}}>
                        <div class="label grade" data-value="">전체</div>
                        <ul class="optionList">
                            <li class="optionItem anoGrade" data-value="">전체</li>
                            <li class="optionItem masterSel" data-value="ROLE_MASTER">최고관리자<span></span></li>
                            <li class="optionItem anoGrade" data-value="ROLE_ADMIN">최고관리자</li>
                            <li class="optionItem anoGrade" data-value="ROLE_USER">관리자</li>
                            <li class="optionItem anoGrade" data-value="ROLE_GUEST">게스트</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="seaCont wid50per">
                <dl>활동 선택</dl>
                <div class="sc_multiBox" >
                    <div class="fccheckText">
                        <span class="fccheckBtn" id="result">활동전체</span>
                    </div>
                    <div class="floatCheckBox" style="margin-left: -300px">
                        <div class="floatCheckList borB">
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="로그인" value="AC_01"/>
                                <label for="로그인">로그인</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="관리자 등록" value="AC_04"/>
                                <label for="관리자 등록">관리자 등록</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="관리자 수정" value="AC_39"/>
                                <label for="관리자 수정">다른 관리자 수정</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="관리자 인증메일 재전송" value="AC_05"/>
                                <label for="관리자 인증메일 재전송">관리자 인증메일 재전송</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="테이블 항목 추가" value="AC_19"/>
                                <label for="테이블 항목 추가">테이블 항목 추가</label>
                            </div>
                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="테이블 항목 삭제" value="AC_21"/>
                                <label for="테이블 항목 삭제">테이블 항목 삭제</label>
                            </div>

                            <div class="actCheck">
                                <input type="checkbox" name="activity" class="act_sel" id="관리자 활동이력 다운로드" value="AC_07_2"/>
                                <label for="관리자 활동이력 다운로드">관리자 활동이력 다운로드</label>
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