<script>
    import {onMount} from "svelte";
    import {ajaxGet} from "../../common/ajax.js";

    onMount(() => {
        // getManagerAccessLog();
    });

    const getManagerAccessLog = () => {
        ajaxGet('/v2/api/Index/adminConnectInfo,', false, (res) => {
            console.log('관리자 접속 현황', res);
        });
    };
</script>
<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <a href="">관리자 접속 현황<span></span></a>
            <div class="wj_adminCurBox">
                오늘<img src="/assets/images/main/wj_admin_icon.png" alt=""><span>14</span>
            </div>
        </div>
        <div class="wj_adminContentBox marT24">
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle toppest_admin">김</div>
                    <div class="wjdot_on"></div>
                </div>
                <div class="wjaText">
                    <span>최고관리자</span>
                    <dl>김코코</dl>
                </div>
                <div class="wjaTime">46분</div>
            </div>
            <div class="wj_admin">
                <div class="wjCircleBox">
                    <div class="wjCircle top_admin">최</div>
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
                    <div class="wjCircle guest">박</div>
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
                    <div class="wjCircle admin">이</div>
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
                    <div class="wjCircle top_admin">최</div>
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
                    <div class="wjCircle guest">박</div>
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
                    <div class="wjCircle admin">이</div>
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