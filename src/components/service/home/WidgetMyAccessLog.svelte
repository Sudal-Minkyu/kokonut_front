<script>
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";

    onMount(() => {
        // getMyAccessLogInfo();
    });

    const getMyAccessLogInfo = () => {
        ajaxGet('/v2/api/Index/myLoginInfo', false, (res) => {
            console.log('나의 접속 현황 정보 받아오기', res);
        });
    };
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <dt>나의 접속 현황</dt>
        </div>
        <div class="wjcurrentBox marT24">
            <div class="wjcurBox">
                <div class="wjcurTime">
                    <p>23. 12. 22</p>
                    <dl>3:36 <span>PM</span></dl>
                </div>
                <div class="wjcur_loBox login">
                    <span>로그인</span>
                    <dl>192.168.0.1</dl>
                </div>
            </div>
            <div class="wjcurBox">
                <div class="wjcurTime">
                    <p>23. 01. 16</p>
                    <dl>2:36 <span>PM</span></dl>
                </div>
                <div class="wjcur_loBox login">
                    <span>로그인</span>
                    <dl>192.168.0.1</dl>
                </div>
            </div>
            <div class="wjcurBox">
                <div class="wjcurTime">
                    <dl>9:10 <span>AM</span></dl>
                </div>
                <div class="wjcur_loBox loginFail">
                    <span>로그인 실패</span>
                    <dl>192.168.0.1</dl>
                </div>
            </div>
            <div class="wjcurBox">
                <div class="wjcurTime">
                    <p>23. 01. 15</p>
                    <dl>5:13 <span>PM</span></dl>
                </div>
                <div class="wjcur_loBox login">
                    <span>로그인</span>
                    <dl>192.168.0.1</dl>
                </div>
            </div>
            <div class="wjcurBox">
                <div class="wjcurTime">
                    <dl>12:20 <span>PM</span></dl>
                </div>
                <div class="wjcur_loBox login">
                    <span>로그인</span>
                    <dl>192.168.0.1</dl>
                </div>
            </div>
        </div>
    </div>
</div>