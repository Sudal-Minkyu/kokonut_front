<style>

    input[type="button"] {
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 20px;
    }

    .basic {
        margin-bottom: 20px;
        font-size: 20px;
        color: red;
    }

    .colorChange {
        margin-bottom: 20px;
        font-size: 20px;
        color: blue;
    }

    .testDiv {
        padding: 30px;
    }

    .gallery {
        display: flex;
        flex-flow: row wrap;
    }

    img {
        width: 100%;
        height: auto !important;
        cursor: pointer;
    }
    img:hover {
        opacity: 0.5;
        filter: grayscale(0.5) blur(1px);
    }

</style>

<script>
    import CustumAlert from "../common/CustumAlert.svelte"
    import restapi from "../../lib/api.js"
    import jQuery from 'jquery';
    import { ipCheck, popOpenBtn, encryptData, decryptData} from "../../lib/common.js"

    export let state;

    jQuery(function() {
        jQuery('#niceForm').submit(function() {
            window.open('', 'niceviewer', 'width=200,height=200,resizeable,scrollbars');
            this.method = 'POST';
            this.target = 'niceviewer';
        });
    })

    let authCheck = "버튼을 눌러주세요.";
    let colorCheck = false;
    function jwtRoleTest(role) {
        let url = "/v2/api/Admin/"+role
        let sendData = {};

        restapi('v2', 'get', url, "", sendData, 'application/json',
        (json_success) => {
            // alert("접근 권한이 있습니다.");
            popOpenBtn();
            imgState = 1;
            popTitle = "접근 권한이 있습니다.";
            authCheck = "접근 권한이 있습니다.";
            colorCheck = true;
        },
        (json_error) => {
            popOpenBtn();
            imgState = 3;
            popTitle = "접근 권한이 없습니다.";
            authCheck = "접근 권한이 없습니다.";
            colorCheck = false;
        })
    }

    function cookieTest() {
        let url = "/v1/api/Auth/cookieTest"

        let sendData = {}

        restapi('v1', 'get', url, "", sendData, 'application/json',
            (json_success) => {
            },
            (json_error) => {
            }
        )
    }

    let akAgreeIp1 = "192.168.0.1";
    let akAgreeIp2 = "";
    let akAgreeIp3 = "";
    let akAgreeIp4 = "";
    let akAgreeIp5 = "";
    function apiKetTest() {
        let url = "/v2/api/ApiKey/apiKeyIssue";
        let sendData = {
            akAgreeIp1 : akAgreeIp1,
            akAgreeIp2 : akAgreeIp2,
            akAgreeIp3 : akAgreeIp3,
            akAgreeIp4 : akAgreeIp4,
            akAgreeIp5 : akAgreeIp5
        };

        restapi('v2', 'post', url, "body", sendData, 'application/json',
            (json_success) => {
        },
            (json_error) => {
        })
    }

    // v3 API 테스트
    function v3ApiTest() {
        let url = "/v3/api/PersonalInfoProvision/save";
        let sendData = {
            piAgreeType: 0,
            piAgreeYn: "string",
            piColumns: "string",
            piExpDate: "2023-02-10T01:39:02.276Z",
            piPurpose: "string",
            piReason: 0,
            piRecipientEmail: "string",
            piRecipientType: 0,
            piRetentionPeriod: "string",
            piStartDate: "2023-02-10T01:39:02.276Z",
            piTag: "string",
            piTargetStatus: "string",
            piTargets: "string",
            piType: 0
        }

        restapi('v3', 'post', url, "body", sendData, 'application/json',
            (json_success) => {
        },
            (json_error) => {
        })
    }

    let token_version_id = "";
    let integrity_value = "";
    let enc_data = "";
    // 휴대폰인증창 열기 api 호출
    function phoneCheckOpen(state) {
        let url = "/v1/api/NiceId/open"
        let sendData = {
            state : state // 잘못된 요청 -> "0", 회원가입 -> "1", 이메일찾기 -> "2", 비밀번호찾기 -> "3", OTP변경 -> "4"
        }

        restapi('v1', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
                token_version_id = json_success.data.sendData.token_version_id;
                integrity_value = json_success.data.sendData.integrity_value;
                enc_data= json_success.data.sendData.enc_data;

                document.getElementById('token_version_id').value = token_version_id;
                document.getElementById('integrity_value').value = integrity_value;
                document.getElementById('enc_data').value = enc_data;

                jQuery("#niceForm").submit();
            },
            (json_error) => {
            }
        )
    }

    // 이메일 전송테스트
    function emailRestApiTest() {
        let url = "/v1/api/Auth/numberSendKnEmail" // ex) "/v2/api/Admin/"
        let sendData = {
            knEmail : "woody@kokonut.me"
        }; // 보낼 데이터

        // api.js 주석설명 볼 것.
        restapi('v1', 'get', url, "param", sendData, 'application/json',
            (json_success) => {
            },
            (json_error) => {
            }
        )
    }

    // 팝업재료
    let imgState;
    let popTitle = "하위 팝업테스트임";
    let popContents1 = "12345";
    let popContents2 = "";
    let popCheck = "확인"
    let popStart = "예"
    let popCancel = "아니오";

    // jQuery(".tippop").each(function(i){

    // var thisId = jQuery(this).attr("id");
    // var idNum = thisId.substring(thisId.length-2);
    //
    // jQuery('#tip_btn' + idNum).on('click', function(){
    //     var display = jQuery('#tip_box' + idNum).css('display');
    //     if(display === 'none'){
    //         jQuery('#tip_box' + idNum).addClass('dp_b');
    //     }
    //     jQuery('.dim').css('display','block');
    //     jQuery('.koko_popup').fadeOut(0);
    // });
    //
    // jQuery('#tip_close' + idNum).on('click', function(){
    //     jQuery('#tip_box' + idNum).removeClass('dp_b');
    //     jQuery('.dim').css('display','none');
    //     jQuery('body').css('overflow','unset');
    // });
    // });

    function popupTest() {
        popOpenBtn();
    }

    function startFun() {
    }

    // 그래프테스트
    import { chart } from "svelte-apexcharts";
    import axios from "axios";
    import {get} from "svelte/store";
    import {accessToken, keyBufferSto, ivSto} from "../../lib/store.js";
    let options = {
        chart: {
            type: "bar",
            width: 500,
        },
        series: [
            {
                name: "sales",
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
    };
    let options2 = {
        series: [44, 55, 41, 17, 15],
        chart: {
            width: 500,
            type: 'donut',
            dropShadow: {
                enabled: true,
                color: '#111',
                top: -1,
                left: 3,
                blur: 3,
                opacity: 0.2
            }
        }
    };

    let files = [];

    function handleFiles(event) {
        files = [...event.target.files];
    }

    async function uploadFiles() {
        let formData = new FormData();
        formData.append('files', files[0]);
        // 여러 파일을 업로드할 경우 files 배열을 순회하여 formData에 추가해줍니다.

        axios.post('/v2/api/Qna/qnaSave', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": get(accessToken),
            }
        }).then((response) => {
            // 파일 업로드 성공 시 로직
        }).catch((error) => {
            // 파일 업로드 실패 시 로직
        });
    }

    import { Images } from "svelte-images";
    const images = [
        {
            src: "/assets/images/common/404erroe_illustration.png"
        }, {
            src: "/assets/images/common/callendericon.png"
        },{
            src: "/assets/images/common/dormancy.png"
        },{
            src: "/assets/images/common/mastericon.png"
        },
    ];

    import { Bootpay } from '@bootpay/client-js'

    // 부트페이 결제창
    function bootpayPayment() {
        Bootpay.requestPayment({
            "application_id": "6369c021cf9f6d001b23e2ef",
            "price": 5000,
            "order_name": "테스트결제",
            "order_id": "주문번호얌",
            "pg": "나이스페이",
            "method": "카드",
            "tax_free": 0,
            "user": {
                "id": "회원아이디",
                "username": "콩길동",
                "phone": "01022223344",
                "email": ""
            },
            "items": [
                {
                    "id": "item_id1",
                    "name": "테스트아이템1",
                    "qty": 1,
                    "price": 1000
                },
                {
                    "id": "item_id2",
                    "name": "테스트아이템2",
                    "qty": 1,
                    "price": 3000
                },
                {
                    "id": "item_id3",
                    "name": "테스트아이템3",
                    "qty": 2,
                    "price": 500
                }
            ],
            "extra": {
                "open_type": "iframe",
                "card_quota": "0,2,3",
                "escrow": false
            }
        })
    }

    // 부트페이 정기결제 카드등록
    function bootpayBilling() {
        Bootpay.requestSubscription({
            application_id: import.meta.env.VITE_BOOT_PAY_SECRET,
            pg: '나이스페이',
            // price: 1000,
            // tax_free: 0,
            order_name: '코코넛 정기결제 등록',
            subscription_id: (new Date()).getTime(),
            user: {
                username: '홍길동',
                phone: '01000000000',
                email: 'email@gmail.com'
            },
            extra: {
                subscription_comment: '매월 사용료에 따라 결제됩니다.\n 사용료는 환경설정 - 구독관리 페이지를 통해 확인할 수 있습니다.',
                subscribe_test_payment: true
            }
        }).then(
            function (response) {
                if (response.event === 'done') {
                    alert('빌링키 발급이 완료되었습니다.');
                }
            },
            function (error) {
            }
        );
    }

    // 사용 예시
    const dataToEncrypt = 'Hello, World!';
    // const encryptionKey = "kokonuttest123123456431234512323"
    let testpw;
    function aesfun() {
        testpw = encryptData(dataToEncrypt)
            .then((encryptedData) => {
                // 암호화된 데이터를 서버로 전송하거나 다른 처리를 수행합니다.
                decryptData(encryptedData, $keyBufferSto, $ivSto)
                    .then((decryptData) => {
                    })
            })

    }

</script>

<!--{#if $is_login}-->
<div class="testDiv">
    <h1>JWT Token, API Key 테스트</h1><br/>

    <span class="basic" class:colorChange={colorCheck}>권한정보 여부 : {authCheck}</span><br/><br/>

    <input type="button" on:click="{() => jwtRoleTest('systemTest')}" value="시스템관리자일 경우 JWT 테스트"><br/>

    <input type="button" on:click="{() => jwtRoleTest('masterTest')}" value="대표관리자일 경우 JWT 테스트"><br/>

    <input type="button" on:click="{() => jwtRoleTest('adminTest')}" value="최고관리자일 경우 JWT 테스트"><br/>

    <input type="button" on:click="{() => jwtRoleTest('userTest')}" value="관리자일 경우 JWT 테스트"><br/>

    <input type="button" on:click="{() => jwtRoleTest('guestTest')}" value="게스트일 경우 JWT 테스트"><br/>
</div>

<div class="testDiv">
    <h1>쿠키테스트</h1><br/>

    <input type="button" on:click={cookieTest} value="쿠키테스트하기"><br/>
</div>

<div class="testDiv">
    <h1>IP 정규식 체크 테스트</h1><br/>
    <input style="font-size: 20px" type="text" bind:value="{akAgreeIp1}" on:focusout={ipCheck} placeholder="아이피 체크 1번" /><br/>
    <!--            <input style="font-size: 20px" type="text" bind:value="{akAgreeIp2}" on:focusout={ipCheck} placeholder="아이피 체크 2번" /><br/>-->
    <!--            <input style="font-size: 20px" type="text" bind:value="{akAgreeIp3}" on:focusout={ipCheck} placeholder="아이피 체크 3번" /><br/>-->
    <!--            <input style="font-size: 20px" type="text" bind:value="{akAgreeIp4}" on:focusout={ipCheck} placeholder="아이피 체크 4번" /><br/>-->
    <!--            <input style="font-size: 20px" type="text" bind:value="{akAgreeIp5}" on:focusout={ipCheck} placeholder="아이피 체크 5번" /><br/>-->
    <input type="button" on:click="{apiKetTest}" value="API Key 발급 테스트"><input type="button" on:click="{v3ApiTest}" value="v3 API 테스트"><br/>
</div>

<div class="testDiv">
    <h1>휴대폰(본인인증) 테스트</h1><br/>
    <input type="button" on:click="{() => phoneCheckOpen(state)}" value="휴대폰인증창 열기"><br/>
    <input type="text" id="phoneNumber" name="phoneNumber"><br/>
    <form name="niceForm" id="niceForm" action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb">
        <input type="text"  id="m" name="m" value="service" /> <br/>
        <input type="text" id="token_version_id" name="token_version_id" /> <br/>
        <input type="text" id="enc_data" name="enc_data" /> <br/>
        <input type="text" id="integrity_value" name="integrity_value" /> <br/>
    </form>
</div>

<div class="testDiv">
    <h1>이메일 인증번호 전송 테스트</h1>
    <input type="button" on:click="{emailRestApiTest}" value="인증번호 보내기">
</div>

<!--{:else}-->
<!--    <h1>로그인 해주세요.</h1>-->
<!--{/if}-->

<div class="testDiv">
    <h1>알림팝업창 열기 테스트</h1><br/>
    <input type="button" on:click="{popupTest}" value="알림팝업창 열기"><br/>
<!--    <input type="button" on:click="{popOpenBtn}" value="예/아니오 열기"><br/>-->
<!--    <CustionAlert popType = {2} {imgState} {popTitle} {popContents1} {popContents2} {popCheck} />-->
    <CustumAlert popType = {1} {startFun} imgState = {imgState} {popTitle} {popCheck} />
<!--    <CustionAlert popType = {2} imgState = {1} {startFun} {popTitle} {popContents1} {popContents2} {popCheck} {popStart} {popCancel} />-->
</div>

<div class="testDiv">
    <h1>그래프 테스트 Apexcharts</h1><br/>
    <div use:chart={options}></div>
    <div use:chart={options2}></div>
</div>

<div class="testDiv">
    <h1>파일업로드 테스트</h1><br/>
    <input type="file" multiple on:change={handleFiles}>
    <button on:click={uploadFiles}>Upload</button>
</div>

<!--<div class="testDiv">-->
<!--    <h1>이미지 라이브러리 테스트</h1><br/>-->
<!--    <Images {images} gutter={2}  />-->

<!--    <div class="gallery">-->
<!--        {#each images as image, i}-->
<!--            <img-->
<!--                {...image}-->
<!--                src={image.src}-->
<!--                alt={image.alt || ''}-->
<!--                on:click={() => popModal(image.src)} />-->
<!--        {/each}-->
<!--    </div>-->
<!--</div>-->

<div class="testDiv">
    <h1>부트페이 테스트</h1><br/>

    <input type="button" on:click|preventDefault="{bootpayPayment}" value="부트페이 결제창 열기"><br/>

    <input type="button" on:click|preventDefault="{bootpayBilling}" value="부트페이 카드빌링창 열기"><br/>
</div>

<div class="testDiv">
    <h1>AES 암호화 테스트</h1><br/>

    <input type="button" on:click|preventDefault="{aesfun}" value="AES 암호화"><br/>

</div>