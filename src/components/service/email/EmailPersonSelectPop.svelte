<script>
    import {SEARCH_CONDITION_LIMIT, addSearchCondition, removeSearchCondition, handleChangeColumnBox,
        getUserListByCondition, handleEnterSearchText, handleOpenDetail, handleChangePage,
        distinguishSearchTextPlaceholder} from "../../common/privacySearch/privacySearch.js";
    import {privacySearchData} from "../../../lib/store.js";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";

    export let closeEmailPersonSelectPop;
</script>

<!-- [D] 회원선택 팝업 -->
<div class="koko_popup email_member_pop" data-popup="email_member_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_title">
                <h3 class="">회원선택 <span>11</span></h3>
            </div>
            {#each $privacySearchData.searchConditionList as {searchCode, currentColumnName, key}, i (key)}
                <div class="memseaBox marB24" style="justify-content: center">
                    <div class="mu_SelBox wid130">
                        <div class="selectBox wid100per nonePad" use:SelectBoxManager={{callback: (e) => {handleChangeColumnBox(e, i)}}}>
                            <div class="label">{currentColumnName}</div>
                            <ul class="optionList" style="z-index: 21;">
                                {#each $privacySearchData.columnList as {fieldCode, fieldComment, fieldSecrity}, j (fieldCode)}
                                    <li class="optionItem curv" data-value={fieldCode} data-secrity={fieldSecrity}>{fieldComment}</li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                    <div class="memselBox wid320">
                        <div class="koinput wid100per">
                            <input type="text" class="wid320"
                                   placeholder={distinguishSearchTextPlaceholder($privacySearchData.searchConditionList[i])}
                                   bind:value={$privacySearchData.searchConditionList[i].searchText}
                                   on:keypress={handleEnterSearchText} />
                            <button on:click={() => {getUserListByCondition()}}><img src="/assets/images/common/icon_search_ver2.png" alt=""></button>
                        </div>
                    </div>
                </div>
            {/each}


            <div class="memselBox marB36">
                <div class="memName">김코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">정코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">최코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">이코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">오코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">한코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">박코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">강코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">장코코(인사팀)<button class="memdel"></button></div>
                <div class="memName">주코코(인사팀)<button class="memdel"></button></div>
            </div>



            <div class="emailtableWrap">
                <div class="kt_tableTopBox marB16">
                    <div class="kt_total">총 <span>11</span>건</div>
                    <div class="kt_selbox wid108">
                        <div class="selectBox wid100per nonePad">
                            <div class="label">최근 등록순</div>
                            <ul class="optionList">
                                <li class="optionItem">최근 등록순</li>
                                <li class="optionItem">정확도순</li>
                                <li class="optionItem">오름차순</li>
                                <li class="optionItem">내림차순</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="emailtableBox">
                    <div class="prtable">
                        <table>
                            <colgroup>
                                <col style="width:7.27%;">
                                <col style="width:41.82%;">
                                <col style="width:14.55%;">
                                <col style="width:14.55%;">
                                <col style="width:21.82%;">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>
                                    <div class="koko_check">
                                        <input type="checkbox" name="allcheck" id="allcheck">
                                        <label for="allcheck"><em></em></label>
                                    </div>
                                </th>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>부서</th>
                                <th>관리자 등급</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem01" id="mem01" class="partcheck">
                                        <label for="mem01"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem02" id="mem02" class="partcheck">
                                        <label for="mem02"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem03" id="mem03" class="partcheck">
                                        <label for="mem03"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem04" id="mem04" class="partcheck">
                                        <label for="mem04"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem05" id="mem05" class="partcheck">
                                        <label for="mem05"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem06" id="mem06" class="partcheck">
                                        <label for="mem06"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem07" id="mem07" class="partcheck">
                                        <label for="mem07"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem08" id="mem08" class="partcheck">
                                        <label for="mem08"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem09" id="mem09" class="partcheck">
                                        <label for="mem09"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem10" id="mem10" class="partcheck">
                                        <label for="mem10"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="koko_check">
                                        <input type="checkbox" value="" name="mem11" id="mem11" class="partcheck">
                                        <label for="mem11"><em></em></label>
                                    </div>
                                </td>
                                <td>koko1@kokonut.me</td>
                                <td>김코코</td>
                                <td>인사팀</td>
                                <td>최고관리자</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="kokopopBtnBox">
                <div class="koko_cancel email_member_pop_close" on:click={closeEmailPersonSelectPop}>취소</div>
                <div class="koko_go"><button type="submit">선택</button></div>
            </div>
        </div>
        <div class="koko-popup-close email_member_pop_close" data-popup-close="email_member_pop_close" on:click={closeEmailPersonSelectPop}></div>
    </div>
</div>
<!-- // [D] 회원선택 팝업 -->