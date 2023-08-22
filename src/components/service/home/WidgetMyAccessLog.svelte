<script>
    import {ajaxGet, reportCatch} from "../../common/ajax.js";
    import {onDestroy, onMount} from "svelte";

    onMount(() => {
        getMyAccessLogInfo();
        document.addEventListener('click', tooltipEvent);
    });

    onDestroy(() => {
        document.removeEventListener('click', tooltipEvent);
    });

    let myConnectList = [];
    let lastYyymmdd = '';
    const getMyAccessLogInfo = () => {
        ajaxGet('/v2/api/Index/myLoginInfo', false, (res) => {
            try { // 온 데이터에서 같은 날짜가 되는 부분의 숨김처리
                myConnectList = res.data.sendData.myConnectList.map(obj => {
                    if (lastYyymmdd === obj.yyymmdd) {
                        obj.yyymmdd = '';
                    } else {
                        lastYyymmdd = obj.yyymmdd;
                    }
                    return obj;
                });
                console.log('나의 접속 현황', myConnectList);
            } catch (e) {
                reportCatch('temp035', e);
            }
        });
    };

    // 툴팁기능 (클릭시 펼쳐지는 물음표) 동작을 위함
    const tooltipEvent = (e) => {
        const toolTipElements = document.getElementsByClassName('layerToolType');
        for (const el of toolTipElements) {
            el.style.display = 'none';
        }
        if (e.target.classList.contains('tiptool')) {
            var children = e.target.children;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.classList.contains('layerToolType')) {
                    child.style.display = 'block';
                    break;
                }
            }
        }
    }
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle">
            <dt>나의 접속 현황</dt>
        </div>
        <div class="wjcurrentBox marT24" style="overflow: visible;">
            {#each myConnectList as {ahPublicIpAddr, ahReason, ahState, csipRemarks, time, yyymmdd}, i}
                <div class="wjcurBox">
                    <div class="wjcurTime">
                        <p>{yyymmdd.replaceAll(' ', '')}</p>
                        <dl>{time}</dl>
                    </div>
                    <div class="wjcur_loBox {ahState === 1 ? 'login' : 'loginFail'}">
                        <span>
                            {ahState === 1 ? '로그인 성공' : '로그인 실패'}
                            {#if ahState !== 1}
                                <span class="tiptool" id="tool_btn{i}">
                                    <div class="layerToolType pmtool_01" id="tool_box{i}" >
                                        <div class="tipContents">
                                            <p>
                                                {ahReason}
                                            </p>
                                        </div>
                                    </div>
                                </span>
                            {/if}
                        </span>
                        <dl><span>
                        {#if csipRemarks !== ""}
                            {csipRemarks} - {ahPublicIpAddr}
                        {:else}
                            {ahPublicIpAddr}
                        {/if}
                        </span></dl>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>