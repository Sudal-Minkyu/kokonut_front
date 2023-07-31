<script>
    import {ajaxGet} from "../../common/ajax.js";
    import {onMount} from "svelte";
    import {SelectBoxManager} from "../../common/action/SelectBoxManager.js";
    import {link} from "svelte-spa-router";

    let provisionIndexDto = {
        offerInsideCount: '',
        offerOutsideCount: '',
    };

    onMount(() => {
        getProvidedOfferCount('1');
    });

    const getProvidedOfferCount = (dateType) => {
        provisionIndexDto = {
            offerInsideCount:'',
            offerOutsideCount: '',
        };
        const filterCondition = {
            dateType,
        };

        ajaxGet('/v2/api/Index/provisionIndexCount', filterCondition, (res) => {
            provisionIndexDto = res.data.sendData.provisionIndexDto;
            console.log('개인정보 제공 건', provisionIndexDto);
        });
    };

    const handleSelectPeriod = (el) => {
        getProvidedOfferCount(el.dataset.datetype);
    }
</script>

<div class="wjItem">
    <div class="wj_contentBox">
        <div class="wjtitle wjsel">
            <a use:link href="/service/privacy/privacyList">개인정보 제공 건<span></span></a>
<!--            <span class="tiptool" id="tool_btn01">-->
<!--                <div class="layerToolType wjtool_01" id="tool_box01">-->
<!--                    <div class="tipContents">-->
<!--                        <p>-->
<!--                            제공기간 내에 있는 건수-->
<!--                        </p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </span>-->
            <div class="">
                <div class="sc_SelBox">
                    <div class="selectBox" use:SelectBoxManager={{callback: handleSelectPeriod}}>
                        <div class="label">오늘</div>
                        <ul class="optionList">
                            <li class="optionItem" data-datetype="1">오늘</li>
                            <li class="optionItem" data-datetype="2">이번주</li>
                            <li class="optionItem" data-datetype="3">이번달</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="wjcountBox marT20">
            <div class="wjcount">
                <span>내부 제공</span>
                <dl>{provisionIndexDto.offerInsideCount}</dl>
            </div>
            <div class="wjcount">
                <span>외부 제공</span>
                <dl>{provisionIndexDto.offerOutsideCount}</dl>
            </div>
        </div>
    </div>
</div>