<script>
    import {privacySearchData} from "../../../lib/store.js";
    import {onMount} from "svelte";

    onMount(async => {

    });

    const handleToPreviousPage = () => {
        privacySearchData.update(obj => {
            obj.currentPage = 'result';
            return obj;
        });
    }
</script>
<div class="contentInnerWrap sea_detail">
    <div class="page_backLine marB40">
        <a on:click={handleToPreviousPage}><div class="page_backarrow"></div></a>
    </div>
    <div class="seaTitle seaWrap marB50">
        <dl>김코코</dl>
        <div class="kotopBtn"><button>전체 엑셀 다운로드</button></div>
    </div>

    <div>
        <div class="seaPrivacyContentBox">
            <h2>기본정보
                <button class="seapDownBtn">엑셀 다운로드</button>
            </h2>
            <div class="seaContentBox">
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이메일</dl>
                        <div class="myInfoBox">
                            <span>kimkoko@kokonut.me</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>이름</dl>
                        <div class="myInfoBox">
                            <span>김코코</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>생년월일</dl>
                        <div class="myInfoBox">
                            <span>1991. 01. 01</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>성별</dl>
                        <div class="myInfoBox">
                            <span>여성</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine">
                    <div class="seaCont wid100per">
                        <dl>휴대전화</dl>
                        <div class="myInfoBox">
                            <span>010-1234-5678</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="seaPrivacyContentBox">
            <h2>인적정보
                <button class="seapDownBtn">엑셀 다운로드</button>
            </h2>
            <div class="seaContentBox">
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>주소(시군구)</dl>
                        <div class="myInfoBox">
                            <span>서울특별시 용산구 독서당로 111</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>주소(동호수)</dl>
                        <div class="myInfoBox">
                            <span>한남더힐 104동 301호</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>출생지</dl>
                        <div class="myInfoBox">
                            <span>서울시 성북구 수유동</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="seaPrivacyContentBox">
            <h2>신체정보
                <button class="seapDownBtn">엑셀 다운로드</button>
            </h2>
            <div class="seaContentBox">
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>키</dl>
                        <div class="myInfoBox">
                            <span>182cm</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>몸무게</dl>
                        <div class="myInfoBox">
                            <span>78kg</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>발사이즈</dl>
                        <div class="myInfoBox">
                            <span>285mm</span>
                        </div>
                    </div>
                </div>
                <div class="seaContentLine borB">
                    <div class="seaCont wid100per">
                        <dl>혈액형</dl>
                        <div class="myInfoBox">
                            <span>O+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>