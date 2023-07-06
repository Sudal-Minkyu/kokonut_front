<script>
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";
    import {link} from "svelte-spa-router";

    let adminConnectInfo = {
        adminConnectList: [],
        todayConnectCount: '',
    };

    onMount(() => {
        getManagerAccessLog();
    });

    const getManagerAccessLog = () => {
        ajaxGet('/v2/api/Index/adminConnectInfo', false, (res) => {
            adminConnectInfo = res.data.sendData;
            console.log('관리자 활동 이력', adminConnectInfo);
        });
    };
</script>
<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a use:link href="/service/adminActivity">관리자 활동 이력<span></span></a>
            <div class="wj_adminCurBox"><img src="/assets/images/main/wj_admin_icon.png" alt=""><span>{adminConnectInfo.todayConnectCount}</span></div>
        </div>
        <div class="wj_adminContentBox marT24">
            {#each adminConnectInfo.adminConnectList as {connectState, connectTime, knName, roleName}}
                <div class="wj_admin">
                    <div class="wjCircleBox">
                        <div class="wjCircle ROLE_MASTER">{knName.substring(0,1)}</div>
                        <div class="{connectState === '1' ? 'wjdot_on' : 'wjdot_off'}"></div>
                    </div>
                    <div class="wjaText">
                        <span>{roleName}</span>
                        <dl>{knName}</dl>
                    </div>
                    <div class="wjaTime">{connectTime}</div>
                </div>
            {/each}

            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle ROLE_ADMIN">최</div>
                    <div class="wjdot_on"></div>
                </div>
                <div class="wjaText">
                    <span>최고관리자</span>
                    <dl>최코코</dl>
                </div>
                <div class="wjaTime">2시간 17분</div>
            </div>
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle ROLE_GUEST">박</div>
                    <div class="wjdot_off"></div>
                </div>
                <div class="wjaText">
                    <span>게스트</span>
                    <dl>박코코</dl>
                </div>
                <div class="wjaTime">3분</div>
            </div>
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle ROLE_USER">이</div>
                    <div class="wjdot_off"></div>
                </div>
                <div class="wjaText">
                    <span>관리자</span>
                    <dl>이코코</dl>
                </div>
                <div class="wjaTime">1시간 3분</div>
            </div>
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle ROLE_ADMIN">최</div>
                    <div class="wjdot_on"></div>
                </div>
                <div class="wjaText">
                    <span>최고관리자</span>
                    <dl>최코코</dl>
                </div>
                <div class="wjaTime">2시간 17분</div>
            </div>
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle ROLE_GUEST">박</div>
                    <div class="wjdot_off"></div>
                </div>
                <div class="wjaText">
                    <span>게스트</span>
                    <dl>박코코</dl>
                </div>
                <div class="wjaTime">3분</div>
            </div>
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle ROLE_USER">이</div>
                    <div class="wjdot_off"></div>
                </div>
                <div class="wjaText">
                    <span>관리자</span>
                    <dl>이코코</dl>
                </div>
                <div class="wjaTime">1시간 3분</div>
            </div>
        </div>
    </div>
</div>