<script>
    import {backBtn} from "../../lib/store.js";
    import {link} from "svelte-spa-router";
    import {fade} from "svelte/transition";
    import Header from "../../components/service/layout/Header.svelte";
    import {Swiper} from "swiper/bundle";
    import 'swiper/css/bundle';
    import {onMount} from "svelte";
    import {ajaxMultipart, reportCatch} from "../../components/common/ajax.js";

    onMount(() => {
        const galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 0,
            slidesPerView: 'auto',
            loop: false,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        const galleryTop = new Swiper('.gallery-top', {
            effect : 'fade',
            fadeEffect: {
                crossFade: true
            },
            spaceBetween: 0,
            slidesPerView: 1,
            loop:false,
            touchRatio: 0,
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    });

    const testAddCustomer = () => {
        let input = document.getElementById('myFile');
        let file = input.files[0];

        let formData = new FormData();
        formData.set('1_ID', 'testAjaxID');
        formData.set('1_PASSWORD', '123789');
        formData.set('1_1', '테스트문자열');
        // formData.set('1_3', file);
        formData.set('2_3', '추가테이블문자열');

        ajaxMultipart('/v1/abcdef', formData, (success_response) => {
            try {
            } catch (e) {
                reportCatch('temp046', e);
            }
        });
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB70">
            <a use:link href="/service/environment">{$backBtn}</a>
            <h1>개발자 테이블 관리</h1>
            <input type="file" id="myFile">
            <button type="button" on:click={testAddCustomer}>회원가입테스트</button>
        </div>
        <div class="prDivideBox" in:fade>
            <div class="categorydivision_box" >
                <div class="prptitle marB24">
                    <h2>개인정보 항목</h2>
                </div>

                <div class="prslideTabBox">
                    <div class="swiper-container gallery-thumbs" scrollbar-hide="true">
                        <div class="swiper-wrapper disflextop">
                            <div class="swiper-slide">
                                <div class="sl_tab">테이블명1<div class="tab_delteBtn open_revise_tab_pop"></div></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="sl_tab">테이블명2<div class="tab_delteBtn open_revise_tab_pop"></div></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="sl_tab">테이블명3<div class="tab_delteBtn open_revise_tab_pop"></div></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="sl_tab">테이블명4<div class="tab_delteBtn open_revise_tab_pop"></div></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="sl_tab">테이블명5<div class="tab_delteBtn open_revise_tab_pop"></div></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="sl_tab">테이블명6<div class="tab_delteBtn open_revise_tab_pop"></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="boaTabBox">
                    <div class="bo_tabContentBox">
                        <div class="swiper-container gallery-top">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                    <div class="prtable">
                                        <table>
                                            <colgroup>
                                                <col style="width:8.21%;">
                                                <col style="width:71.14%;">
                                                <col style="width:20.66%;">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>선택</th>
                                                <th>항목</th>
                                                <th>수정</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip01" id="ip01" class="partcheck">
                                                        <label for="ip01"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="lockicon"></div>
                                                    주민등록번호
                                                    <span class="subElement redtext">민감정보</span>
                                                </td>
                                                <td>
                                                    <button>수정하기</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip02" id="ip02" class="partcheck">
                                                        <label for="ip02"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="lockicon"></div>
                                                    휴대전화번호
                                                    <span class="subElement yeltext">휴대전화번호</span>
                                                </td>
                                                <td>
                                                    <button>수정하기</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip03" id="ip03" class="partcheck">
                                                        <label for="ip03"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="lockicon"></div>
                                                    생년월일
                                                    <span class="subElement bluetext">전자상거래법</span>
                                                </td>
                                                <td>
                                                    <button>수정하기</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip04" id="ip04" class="partcheck">
                                                        <label for="ip04"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="lockicon"></div>
                                                    패스워드
                                                    <span class="subElement bluetext">전자상거래법</span>
                                                </td>
                                                <td>
                                                    <button>수정하기</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip05" id="ip05" class="partcheck">
                                                        <label for="ip05"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    아이디
                                                </td>
                                                <td>
                                                    <div class="nonereviseBtn">수정불가</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip06" id="ip06" class="partcheck">
                                                        <label for="ip06"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    아이디
                                                </td>
                                                <td>
                                                    <div class="nonereviseBtn">수정불가</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip07" id="ip07" class="partcheck">
                                                        <label for="ip07"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    아이디
                                                </td>
                                                <td>
                                                    <div class="nonereviseBtn">수정불가</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip08" id="ip08" class="partcheck">
                                                        <label for="ip08"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    아이디
                                                </td>
                                                <td>
                                                    <div class="nonereviseBtn">수정불가</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="koko_check">
                                                        <input type="checkbox" value="" name="ip09" id="ip09" class="partcheck">
                                                        <label for="ip09"><em></em></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    아이디
                                                </td>
                                                <td>
                                                    <div class="nonereviseBtn">수정불가</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                    <div class="prtable">
                                        <table>
                                            <colgroup>
                                                <col style="width:8.21%;">
                                                <col style="width:71.14%;">
                                                <col style="width:20.66%;">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>선택</th>
                                                <th>항목</th>
                                                <th>수정</th>
                                            </tr>
                                            </thead>
                                        </table>
                                        <div class="noneprtable">항목을 추가해 주세요</div>
                                    </div>
                                </div>
                                <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                    <div class="prtable">
                                        <table>
                                            <colgroup>
                                                <col style="width:8.21%;">
                                                <col style="width:71.14%;">
                                                <col style="width:20.66%;">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>선택</th>
                                                <th>항목</th>
                                                <th>수정</th>
                                            </tr>
                                            </thead>
                                        </table>
                                        <div class="noneprtable">항목을 추가해 주세요</div>
                                    </div>
                                </div>
                                <div class="swiper-slide"><!-- 탭컨텐츠 영역 -->
                                    <div class="prtable">
                                        <table>
                                            <colgroup>
                                                <col style="width:8.21%;">
                                                <col style="width:71.14%;">
                                                <col style="width:20.66%;">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>선택</th>
                                                <th>항목</th>
                                                <th>수정</th>
                                            </tr>
                                            </thead>
                                        </table>
                                        <div class="noneprtable">항목을 추가해 주세요</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="boaTabBox">
                    <div class="bo_tabContentBox">
                        <div class="prtable" style="height: 38em;">
                            <table>
                                <colgroup>
                                    <col style="width:8.21%;">
                                    <col style="width:11.00%;">
                                    <col style="width:20.66%;">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>고유번호</th>
                                    <th>항목</th>
                                    <th>기본키 지정</th>
                                    <th>고유키 지정</th>
                                    <th>인덱스 지정</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1_1</td>
                                        <td>
                                            <div class="lockicon"></div>
                                            항목명
                                        </td>
                                    </tr>
                                    <tr class="none_inq">
                                        <td>추가된 항목이 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>