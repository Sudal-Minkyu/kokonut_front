<script>
    import jQuery from 'jquery';
    import {onMount} from "svelte";

    jQuery(window).scroll(function() {
        var j$window = jQuery(window),
            j$tech = jQuery('#technical'),
            j$techCont = jQuery('#technical .section');

        var windowTop = jQuery(window).scrollTop();
        var scroll = j$window.scrollTop() + (j$window.height() / 2);
        var area = jQuery(window).scrollTop();

        j$techCont.each(function () {
            var j$this = jQuery(this);
            if (j$this.position().top <= scroll && j$this.position().top + j$this.height() > scroll) {
                j$tech.addClass("titleUp");
                j$tech.addClass('showArea-' + jQuery(this).data('show'));
            }
        });
    }).scroll();

    onMount(() => {

        class TextScramble {
            constructor(el) {
                this.el = el
                this.chars = '!<>-_\\/[{}—=+*^?#_'
                this.update = this.update.bind(this)
            }
            setText(newText) {
                const oldText = this.el.innerText
                const length = Math.max(oldText.length, newText.length)
                const promise = new Promise((resolve) => this.resolve = resolve)
                this.queue = []
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || ''
                    const to = newText[i] || ''
                    const start = Math.floor(Math.random() * 70)
                    const end = start + Math.floor(Math.random() * 70)
                    this.queue.push({ from, to, start, end })
                }
                cancelAnimationFrame(this.frameRequest)
                this.frame = 0
                this.update()
                return promise
            }
            update() {
                let output = ''
                let complete = 0
                for (let i = 0, n = this.queue.length; i < n; i++) {
                    let { from, to, start, end, char } = this.queue[i]
                    if (this.frame >= end) {
                        complete++
                        output += to
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.007) {
                            char = this.randomChar()
                            this.queue[i].char = char
                        }
                        output += `<span class="dud">${char}</span>`
                    } else {
                        output += from
                    }
                }
                this.el.innerHTML = output
                if (complete === this.queue.length) {
                    this.resolve()
                } else {
                    this.frameRequest = requestAnimationFrame(this.update)
                    this.frame++
                }
            }
            randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)]
            }
        }

        const phrases = [
            `홍길동<br>
            010-1234-5678<br>
            contact@kokonut.me<br>
            서울시 강남구 역삼로 165`,
                    `$6Tg#9l!4aR%0xV*3Ee@<br>
            &P8m^4jV$5uO#1pT!3D-<br>
            +k4G~5j?6L0mN!1bV_9c<br>
            !qR&3t#8uI%5oP$9lM@2`,
        ]


        const el = document.querySelector('.text-change')
        const fx = new TextScramble(el)

        let counter = 0
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2500)
            })
            counter = (counter + 1) % phrases.length
        }

        next()
    });
</script>


<!-- 기술적 보호조치 -->
<div id="technical" class="technicalC titleUp showArea-show01">
    <div class="sstic">
        <div class="ssticInner">
            <div class="s_Title">
                <div class="s_TitleBox wow AFadeInUp" data-wow-delay="0.0s">
                    <p class="boldTxt"><span>보안</span> 기능</p>
                </div>
            </div>
        </div>
    </div>
    <div class="sc_cont_area">
        <!-- 보안 -->
        <div class="section" id="ta" data-show="show01">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple wow TitleUp" data-wow-delay="0.1s">접근통제 및 보안 조치</p>
                        <p class="mContTitle wow TitleUp" data-wow-delay="0.2s">클라우드 기반 철저한 보안 체계 구축</p>
                        <p class="mContsTxt wow TitleUp" data-wow-delay="0.3s">외부 공격으로부터 접근을 통제하고, 필수적인 보안 체계를 구축하였습니다.</p>
                    </div>
                    <div class="t_ContBoxCont wow m_ConttxtBoxUp" data-wow-delay="0.4s">
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">접근 통제</p>
                                <ul>
                                    <li><p class="t_CBTxt">방화벽, 2단계 인증, 최대 접속시간 제한</p></li>
                                    <li><p class="t_CBTxt">로그 모니터링, 탐지, 대응</p></li>
                                    <li><p class="t_CBTxt">취약점 점검</p></li>
                                </ul>
                            </div>
                            <div class="t_CBImg">
                                <figure><img src="/assets/images/main/lock_icon01.png"></figure>
                            </div>
                        </div>
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">안전 조치</p>
                                <ul>
                                    <li><p class="t_CBTxt">소프트웨어 안전조치</p></li>
                                    <li><p class="t_CBTxt">DDOS 대응</p></li>
                                </ul>
                            </div>
                            <div class="t_CBImg">
                                <figure><img src="/assets/images/main/lock_icon02.png"></figure>
                            </div>
                        </div>
                        <div class="t_CB">
                            <div class="t_CBTxtBox">
                                <p class="t_CBTitle">권한 관리</p>
                                <ul>
                                    <li><p class="t_CBTxt">취급자별 계정 할당</p></li>
                                    <li><p class="t_CBTxt">비밀번호 규칙 고도화</p></li>
                                </ul>
                            </div>
                            <div class="t_CBImg">
                                <figure><img src="/assets/images/main/lock_icon03.png"></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 암호화 -->
        <div class="section" id="tb" data-show="show02">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple wow TitleUp" data-wow-delay="0.0s">암호화</p>
                        <p class="mContTitle wow TitleUp" data-wow-delay="0.1s">정교한 알고리즘과 키관리를 통한 개인정보 암호화</p>
                    </div>
                    <div class="m_ContBoxCont wow m_ConttxtBoxUp" data-wow-delay="0.2s">
                        <div class="m_ContImgBox cbcw100">
                            <div class="cont">
                                <div class="text-change-container">
                                    <div class="text-change"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 재난 대비 -->
        <div class="section" id="tc" data-show="show03">
            <div class="mInner">
                <div class="m_ContBox">
                    <div class="m_ContTitleBox">
                        <p class="mContpurple wow TitleUp" data-wow-delay="0.0s">재난 대비</p>
                        <p class="mContTitle wow TitleUp" data-wow-delay="0.1s">재해 재난으로 인한 긴급한 상황에도 안전하게</p>
                        <p class="mContsTxt wow TitleUp" data-wow-delay="0.2s">원격에 개인정보를 백업하고 문제 발생 시 신속하게 복구합니다.</p>
                    </div>
                    <div class="m_ContBoxCont four wow m_ConttxtBoxUp" data-wow-delay="0.3s">
                        <div class="m_ContImgBox cbcw100 wow FadeInUp" data-wow-delay="0.4s">
                            <img src="/assets/images/main/calamity.jpg" class="pc_only" alt="">
                            <img src="/assets/images/main/calamity_mo.png" class="mo_only" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>