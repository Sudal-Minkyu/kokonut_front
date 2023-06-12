
<script>
import {serviceSettingData} from "../../../../lib/store.js";
import {ajaxBody} from "../../../common/ajax.js";
import {openBanner, openConfirm} from "../../../common/ui/DialogManager.js";

const closeRemoveAccessIpPop = () => {
    serviceSettingData.update(obj => {
        obj.removeAccessIpPop.visibility = false;
        return obj;
    });
};

const commitRemoveAccessIp = () => {
    const removeTargetInfo = {
        otpValue: $serviceSettingData.removeAccessIpPop.otpValue,
        deleteIpList: $serviceSettingData.removeAccessIpPop.deleteIpList,
    }

    if (!removeTargetInfo.deleteIpList.length) {
        openConfirm({
            icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
            title: '삭제 대상 선택 필요', // 제목
            contents1: '삭제하실 IP를 선택해 주세요.', // 내용
            contents2: '',
            btnCheck: '확인', // 확인 버튼의 텍스트
        });
        return;
    }

    ajaxBody('/v2/api/Company/accessIpDelete', removeTargetInfo, (res) => {
        openBanner('선택하신 IP를 삭제하였습니다.');
        // 삭제된 IP 화면에 반영
    });
}
</script>

<div class="koko_popup ipdel_pop" data-popup="ipdel_pop">
    <div class="koko_popup_inner">
        <div class="koko_popup_container">
            <div class="koko_popup_titleh4">
                <h4 class="">선택하신 IP를 정말 삭제하실 건가요?</h4>
            </div>
            <form>
                <div class="kopopinput marB24">
                    <label>OTP</label>
                    <input type="text" placeholder="OTP를 적어주세요." bind:value={$serviceSettingData.removeAccessIpPop.otpValue} />
                </div>
                <div class="popcaseInfoBox pi_noneicon">
                    <p>주의사항</p>
                    <dl>해당 IP 에서는 더 이상 로그인 하실 수 없습니다.</dl>
                </div>
                <div class="koko_check">
                    <input type="checkbox" value="1" name="checkcation" id="checkcation">
                    <label for="checkcation">
                        <em></em>
                        <p class="check">주의사항에 대해 확인했습니다.</p>
                    </label>
                </div>
                <div class="kokopopBtnBox">
                    <div class="koko_cancel ipdel_pop_close" on:click={closeRemoveAccessIpPop}>취소</div>
                    <div class="koko_go"><button type="button" on:click={commitRemoveAccessIp}>확인</button></div>
                </div>
            </form>
        </div>
        <div class="koko-popup-close ipdel_pop_close" data-popup-close="ipdel_pop_close" on:click={closeRemoveAccessIpPop}></div>
    </div>
</div>