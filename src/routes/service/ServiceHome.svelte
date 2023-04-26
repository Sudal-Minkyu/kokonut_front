<script>
    // 레이아웃
    import Header from "../../components/service/layout/Header.svelte"
    import { knEmailHeader } from "../../lib/store.js"

    import Swiper from 'swiper';
    import 'swiper/css';
    import 'swiper/css/bundle';

    import {onMount} from "svelte";

    onMount(async () => {
        new Swiper(".mySwiper", {
            direction: "vertical",
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {   // 버튼
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    })
    console.log(Swiper);
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="maincontent">
            <div class="pageH1_type01">
                <h1><span>{$knEmailHeader}</span>님, 안녕하세요!</h1>
            </div>

            <div class="currentWrap">
                <div class="curTitmeInfoBox">
                    <span>23. 03. 31</span>
                    <dl>오후 5시 30분</dl>
                </div>
                <div class="currentSlideBox">
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="cursItem">금일 파기된(될) 개인정보 <span class="curCou">32</span><dt>건</dt></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cursItem">오늘의 개인정보 다운로드 <span class="curCou">32</span><dt>건</dt>, <span class="curCou">50</span><dt>회</dt>, <span class="curCou">김코코</span></div>
                            </div>
                            <div class="swiper-slide">
                                <div class="cursItem">개인정보 제공건수 : 외부 <span class="curCou">32</span><dt>건</dt>, 내부 <span class="curCou">50</span><dt>건</dt></div>
                            </div>
                        </div>
                        <div class="curs_btnBox">
                            <div class="curs_btnInner">
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="curUpdateBox">
                    <button>새로고침</button>
                    <dl>30분 간격 자동 업데이트</dl>
                </div>
            </div>
        </div>
    </div>
</section>