<script>
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";

    onMount(() => {
        getMyAccessLogInfo();
    });

    let myConnectList = [];
    let lastYyymmdd = '';
    const getMyAccessLogInfo = () => {
        ajaxGet('/v2/api/Index/myLoginInfo', false, (res) => {
            // 온 데이터에서 같은 날짜가 되는 부분의 숨김처리
            myConnectList = res.data.sendData.myConnectList.map(obj => {
                if (lastYyymmdd === obj.yyymmdd) {
                    obj.yyymmdd = '';
                } else {
                    lastYyymmdd = obj.yyymmdd;
                }
                return obj;
            });
            console.log('나의 접속 현황 정보 받아오기', myConnectList);
        });
    };
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <dt>나의 접속 현황</dt>
        </div>
        <div class="wjcurrentBox marT24">
            {#each myConnectList as {ahPublicIpAddr, ahReason, ahState, csiRemarks, time, yyymmdd}}
                <div class="wjcurBox">
                    <div class="wjcurTime">
                        <p>{yyymmdd.replaceAll(' ', '')}</p>
                        <dl>{time}</dl>
                    </div>
                    <div class="wjcur_loBox {ahState === 1 ? 'login' : 'loginFail'}">
                        <span>{ahReason}</span>
                        <dl>{ahPublicIpAddr}</dl>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>