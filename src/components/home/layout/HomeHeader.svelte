
<script>

    import jQuery from 'jquery';
    import { link, push } from 'svelte-spa-router'
    import Banner from "../../common/ui/Banner.svelte";

    new WOW().init();

    // Header Scroll 반응
    let lastScrollTop = 0, delta = 15;
    jQuery(window).scroll(function(){
        const scrollTop = jQuery(this).scrollTop();
        if(Math.abs(lastScrollTop - scrollTop) <= delta)
            return;
        if ((scrollTop > lastScrollTop) && (lastScrollTop>10)) {
            jQuery("#header").addClass('down_header');
            jQuery("#header").removeClass('up_header');
        } else {
            jQuery("#header").removeClass('down_header');
            jQuery("#header").addClass('up_header');

        }
        lastScrollTop = scrollTop;

        const scroll = jQuery(window).scrollTop();
        if (scroll >= 50) {
            jQuery("header").addClass("change");
        } else {
            jQuery("header").removeClass("change");
        }
    });

    function navShow(e) {
        e.preventDefault();
        jQuery('.side_cont_wrap').toggleClass('is_active');
        jQuery('.side_menu_BG').toggleClass('showBg');
    }

    function clostShow(e) {
        e.preventDefault();
        jQuery('.side_cont_wrap').removeClass('is_active');
        jQuery('.side_menu_BG').removeClass('showBg');
    }

    jQuery(".side_menu_BG").click(function(){
        if(jQuery(".side_cont_wrap").hasClass("is_active")){
            (jQuery(".side_cont_wrap").removeClass("is_active"))
            (jQuery('.side_menu_BG').removeClass('showBg'))
        }
    });

    const handleInformPIS = () => {
        alert('준비중 입니다.');
    }

    const handleLogin = () => {
        if (window.innerWidth <= 1000) {
            alert('PC 혹은 더 넓은 해상도의 화면에서 이용하실 수 있습니다.');
        } else {
            push('/login');
        }
    }
</script>

<header id="header" class="hupd">
    <div class="header_inner">
        <div class="logo">
            <a href="">
                <img src="/assets/images/main/b_koko_logo.png" alt="logo">
            </a>
        </div>
        <div class="gnb">
            <ul>
                <li class="price h_contact"><a use:link href="/price">요금안내</a></li>
                <li class="privacy" style="cursor: pointer"><a on:click={handleInformPIS}>개인정보보호 더 알기</a></li>
                <li class="teamInfo"><a target="_blank" href="https://kokonut.oopy.io/team">팀 소개</a></li>
            </ul>
        </div>
        <div class="loginGroup">
            <div class="loginArea">
                <ul>
                    <li>
                        <a class="homepage_login"
                           style="cursor:pointer;display: block; width: 100%; height: 100%; color: #FFF; padding: 1rem 2.8rem; background: #00C389; border-radius: 0.6rem;"
                           on:click={handleLogin}>
                            로그인
                        </a>
                    </li>
                </ul>
            </div>
            <div class="side_menu_Btn" on:click={navShow}>
                <div class="side_menu_Wrap">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="side_cont_wrap">
    <div class="side">
        <div class="side_menu_Btn fix" on:click={clostShow}>
            <div class="side_menu_Wrap">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="side_cont_inner">
            <div class="container">
                <ul id="ac">
                    <li class="menu01"><a use:link href="/price"><p class="menu01_h">요금안내</p></a></li>
                    <li class="menu01"><a on:click={handleInformPIS}><p class="menu01_h">개인정보보호 더 알기</p></a></li>
                    <li class="menu01"><a target="_blank" href="https://kokonut.oopy.io/team"><p class="menu01_h">팀소개</p></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="side_menu_BG"></div>

<Banner />