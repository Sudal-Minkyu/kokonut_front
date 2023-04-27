
<script>

    import { fade } from 'svelte/transition'
    import { piId, policyInfoData } from '../../../lib/store.js'

    import jQuery from "jquery";
    import {onMount} from "svelte";

    onMount(async () => {
        console.log("두번째 뎁스 $piId : "+$piId);
        console.log($policyInfoData.purposeDataList);
        policyWriting();
    })

    export let policyWriting;
    export let stateChange;

    jQuery(document).ready(function() {
        const max_fields2 = 5;
        const wrapper2 = jQuery(".prcontainer1");
        const add_button2 = jQuery(".add_pr_field1");
        let x = 1;

        jQuery(add_button2).click(function(e){
            e.preventDefault();
            if(x < max_fields2){
                x++;
                jQuery(wrapper2).append(
                    '<div class="addelement">' +
                    '<div class="prboxtext">' +
                    '<div class="prbte1 w1528per">' +
                    '<input type="text" name="" placeholder="내용입력" />' +
                    '</div>' +
                    '<div class="prbte2 w8472per">' +
                    '<input type="text" name="" placeholder="내용입력" />' +
                    '</div>' +
                    '</div>' +
                    '<a href="#" class="pr_delete"></a></div>'
                );
            } else {
                alert('해당 정보는 4개 입력이 최대입니다.')
            }
        });

        jQuery(wrapper2).on("click",".pr_delete", function(e){
            e.preventDefault(); jQuery(this).parent('div').remove(); x--;
        })
    });

</script>

<div in:fade>

    <div class="priContentBox" style="border-top:0;padding: 0">
        <div class="priC_title marB24">1. 개인정보의 처리 목적</div>
        <div class="pr_wrap">
            <div class="prbox">
                <div class="prti w1528per">서비스 제공 및 운영</div>
                <div class="prst w8472per">사용자 인증, 회원 관리, 서비스 제공, 서비스의 보안, 이용약관 위반 고객 제재 등 서비스의 제공과 운영을 위해 이용합니다.</div>
            </div>
            <div class="prbox">
                <div class="prti w1528per">서비스 개선</div>
                <div class="prst w8472per">사용자 인증, 회원 관리, 서비스 제공, 서비스의 보안, 이용약관 위반 고객 제재 등 서비스의 제공과 운영을 위해 이용합니다.</div>
            </div>
            <div class="prcontainer1"></div>
            <div class="pr_fieldBtnInner">
                <button class="add_pr_field1 pr_fieldBtn"></button>
            </div>
        </div>
    </div>

</div>

<div class="fixstepInnerWrap">
    <div class="fixstepInnerWrapInner">
        <div class="fixstepInner">
            <div class="bottomProgBox">
                <div class="bottomProgLine">
                    <div class="Prog_1 prog20" style="width: 30%"></div>
                </div>
            </div>

            <div class="pri_bottomBtnBox marT32">
                <button on:click="{() => stateChange(1)}" class="pri_prevBtn">이전</button>

                <div class="pris_num">
                    <dl><span>2</span> / 7</dl>
                </div>

                <button on:click="{() => stateChange(3)}" class="pri_nextBtn">다음</button>
            </div>
        </div>
    </div>
</div>
