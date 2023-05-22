<script>
    import { link } from 'svelte-spa-router'
    import { is_login, page, knNameHeader, knEmailHeader, cpNameSider } from "../../../lib/store.js"
    import { ajaxParam } from "../../common/ajax.js";

    function logout() {
        ajaxParam('/v1/api/Auth/logout', "",
            (json_success) => {
                // 기본값 초기화처리
                knNameHeader.set('');
                knEmailHeader.set('');
                cpNameSider.set('');

                page.set(0);
                if (json_success.data.status === 500) {
                    alert(json_success.data.err_msg);
                }
                location.href='/login';
            },
            (json_error) => {
                alert(json_error.data.err_msg);
            }
        );
    }

</script>

<header id="serviceHeader">
    <div class="topHead">
        <div class="topHeadInner">
            <div class="toplogo">
                <a use:link href="/service" on:click="{() => {$page = 0}}">
                    <img src="/assets/images/common/kokonutLogo.png" alt="kokonutLogo">
                </a>
            </div>
            <div class="topmyinfoBox">
                <div class="myinfoBox">
                    <div class="myinfoIcon"></div>
                    <span>{$knNameHeader}</span>
                </div>
                <div class="myinfoBox">
                    <span style="cursor: pointer;" on:click|once={logout}>로그아웃</span>
                </div>
                <div class="myinfoMenu">
                    <div class="notiText">알림</div>
                    <div class="notiBoxInner">
                        <div class="notiBox">
                            <ul>
                                <li>
                                    <div class="no_new">NEW</div>
                                    <dl>알림내용을 알려드립니다.</dl>
                                    <span>2023. 4. 14</span>
                                </li>
                                <li>
                                    <div class="no_new">NEW</div>
                                    <dl>알림내용을 알려드립니다. 알림내용을</dl>
                                    <span>2023. 4. 14</span>
                                </li>
                                <li>
                                    <dl>알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. 알림내용을 알려드립니다. </dl>
                                    <span>2023. 4. 14</span>
                                </li>
                            </ul>
                            <div class="notiallBtn">
                                <a href="">전체보기</a>
                            </div>
                        </div>
                    </div>
                </div>
<!--                <div class="myinfoMenu">알림</div>-->
            </div>
        </div>
    </div>
</header>