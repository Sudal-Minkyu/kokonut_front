<script>

</script>

<div class="another_koko_popup step_filter_pop filter_pop" data-popup="filter_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">기간 필터</h3>
            </div>
            <form>
                <div class="filtercontbox marB50">
                    <p>회원가입 일시</p>
                    <div class="start_end_search_box">
                        <div class="start_end_search_Inner">
                            <div class="time_input l_time_input">
                                <input type="text" name="startdate" id="datepicker" class="" placeholder="시작일" autocomplete="off" maxlength="10" value="">
                            </div>
                            <div class="time_text">
                                ~
                            </div>
                            <div class="time_input r_time_input">
                                <input type="text" name="enddate" id="datepicker2" class="" placeholder="종료일" autocomplete="off" maxlength="10" value="">
                            </div>
                        </div>
                    </div>
                    <div class="seaRadio">
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="today" value="today" checked>
                            <label for="today"><em><dt></dt></em>오늘</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="week" value="week">
                            <label for="week"><em><dt></dt></em>1주일</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="month1" value="month1">
                            <label for="month1"><em><dt></dt></em>1개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="month6" value="month6">
                            <label for="month6"><em><dt></dt></em>6개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="period" id="all" value="all">
                            <label for="all"><em><dt></dt></em>전체</label>
                        </div>
                    </div>
                </div>
                <div class="filtercontbox">
                    <p>마지막 로그인 일시</p>
                    <div class="start_end_search_box">
                        <div class="start_end_search_Inner">
                            <div class="time_input l_time_input">
                                <input type="text" name="last_startdate" id="datepicker3" class="" placeholder="시작일" autocomplete="off" maxlength="10" value="">
                            </div>
                            <div class="time_text">
                                ~
                            </div>
                            <div class="time_input r_time_input">
                                <input type="text" name="last_enddate" id="datepicker4" class="" placeholder="종료일" autocomplete="off" maxlength="10" value="">
                            </div>
                        </div>
                    </div>
                    <div class="seaRadio">
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="last_period" id="last_today" value="last_today" checked>
                            <label for="last_today"><em><dt></dt></em>오늘</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="last_period" id="last_week1" value="last_week1">
                            <label for="last_week1"><em><dt></dt></em>1주일</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="last_period" id="last_month1" value="last_month1">
                            <label for="last_month1"><em><dt></dt></em>1개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="last_period" id="last_month6" value="last_month6">
                            <label for="last_month6"><em><dt></dt></em>6개월</label>
                        </div>
                        <div class="check radioCheck">
                            <input type="radio" class="radio" name="last_period" id="last_all" value="last_all">
                            <label for="last_all"><em><dt></dt></em>전체</label>
                        </div>
                    </div>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_reset" id="reset">초기화</div>
                    <div class="koko_go"><button type="button">적용하기</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close filter_pop_close" data-popup-close="filter_pop_close"></div>
    </div>
</div>