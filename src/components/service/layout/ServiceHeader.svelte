<script>
    import { push, link } from 'svelte-spa-router'
    import { is_login, accessToken, page, knEmailHeader } from "../../../lib/store.js"
    import restapi from "../../../lib/api.js"

    function logout() {
        let url = "/v1/api/Auth/logout"

        let sendData = {
            accessToken : $accessToken
        }

        restapi('v1', 'logout', url, "param", sendData, 'application/json',
            (json_success) => {
                console.log(json_success)
                $is_login = false
                $accessToken = ""
                $page  = 0
                push("/login");
            },
            (json_error) => {
                alert(json_error.data.err_msg);
            }
        )
    }

</script>

<header id="serviceHeader">
    <div class="topHead">
        <div class="topHeadInner">
            <div class="toplogo">
                <a use:link href="/service" on:click="{() => {$page = 0}}">
                    <img src="/assets/images/common/kokonutLogo.png" alt="kokonutLogo"></a>
            </div>
            <div class="topmyinfoBox">
                <div class="myinfoBox">
                    <div class="myinfoIcon"></div>
                    <span>{$knEmailHeader}님</span>
                </div>
                <div class="myinfoBox">
                    <span href={"#"} style="cursor: pointer;" on:click|once={logout}>로그아웃</span>
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