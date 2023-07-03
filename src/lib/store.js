import { writable } from 'svelte/store'

const persist_storage = (key, initValue) => {
    const storedValueStr = localStorage.getItem(key)
    const store = writable(storedValueStr != null ? JSON.parse(storedValueStr) : initValue)
    store.subscribe((val) => {
        localStorage.setItem(key, JSON.stringify(val))
    })
    return store
}

// UI 적인 변수만 설정할 것
// export const 변수명 = persist_storage("변수명","값");

// 리플레쉬 토큰 유효기간 : 7일, 엑세스토큰 유효기간 : 30분
export const accessToken = persist_storage("accessToken","");
// 로그인 여부
export const is_login = persist_storage("is_login",false);
// 페이징 번호
export const page = persist_storage("page", 0);

// 사용자 로그인 정보 초기화값 /v2/api/Admin/authorityCheck 를 통해 헤더가 호출될 때 갱신된다.
export const initialUserInfo = JSON.stringify({
    cpName: '', // 사이드바에 나올 소속명
    csAutoLogoutSetting: {minute: '60'}, // 자동로그아웃까지 걸리는 분 (새로고침 위해 객체형태 사용)
    csPasswordChangeState: '', // 비밀번호 변경 기간 도래 여부
    electronic: '', // 전자상거래법 대상 여부 : 0 -> 전자상거래법여부를 모르거나 최초일경우, 1->전자상거래법대상 일경우, 2->전자상거래법대상이 아닐경우
    knEmail: '', // 기본적으로 가져오는 나의 이메일스토어값
    knName: '', // 헤더바에 나올 사용자명
    knPhoneNumber: '', // 사용자 전화번호
    paymentBillingCheck: '', // 0 -> 새로가입했지만 아직 구독하지 않은 고객사, 1 -> 구독중인 고객사, 2 -> 구독해지한 고객사
    role: '', // 로그인한 사용자 권한
});

// 사용자 로그인 정보
export const userInfoData = writable(JSON.parse(initialUserInfo));

export const doChangePwdLater = writable(true); // 로그인시 false -> 암호 변경 나중에 하기 -> true

export const backBtn = writable("<-"); // 뒤로가기버튼 텍스트
export const popupPage = writable(0); // 팝업용 페이지번호

export const keyBufferSto = writable(""); // 테스트 key
export const ivSto = writable(""); // 테스트 iv

// 컴포넌트용 지속성스토어
export const emailSave = persist_storage("emailSave",""); // 이메일기억하기 체크시 저장

export const stateVal = writable(0); // 상태값 컴포넌트 번호
export const findEmail = writable("이메일 찾는중..."); // 이메일 찾기의 이메일변수
export const findPwd = writable(""); // 비밀번호 찾기의 이메일변수
export const tempPwd = writable(""); // 임시비밀번호 변수
export const openDiv = writable(0); // 이메일/비번찾기 페이지용 open 컴포넌트 번호

export const piId = writable(0); // 개인정보처리방침 saveId
export const piStage = writable(0); // 개인정보처리방침 작성중인 글이 존재할 경우 보내는 단계


export const initialPolicyInfo = JSON.stringify({
    policyData1: {
        piVersion : '',
        piDate : '',
        piHeader : '',
    },
    purposeDataList: [],

    beforeDataList: [],
    afterDataList: [],
    serviceAutoDataList: [],
    policyData2: {
        piInternetChose : false,
        piContractChose : false,
        piPayChose : false,
        piConsumerChose : false,
        piAdvertisementChose : false,
    },

    outDataList: [],
    outDetailDataList: [],

    thirdDataList: [],
    thirdOverseasDataList: [],

    reponsibleDataList: [],
    policyData3: {
        piYear : '',
        piMonth : '',
        piDay : '',
    }
});

// 개인정보처리방침 정보데이터
export const policyInfoData = writable(JSON.parse(initialPolicyInfo));

// 개인정보 항목관리 항목분류
export const personalInfoCategoryData = writable({
    basicCategoryList: [],
    addItemList: [],
    checkedItemNameList: [],
    checkedItemObjList: [],
    createItemPop: {
        visible: false,
        inputData: {
            ciName: '',
            ciSecurity: '0',
        },
        ciNameErrorMsg: '',
    },
    editItemPop: {
        visible: false,
        currentMode: 'modify',
        checkPreCautionAgree: false,
        ciNameErrorMsg: '',
        cautionAgreeErrorMsg: '',
        inputData: {
            ciId: 0,
            ciName: '',
        },
    },
    insertItemPop: {
        visible: false,
        checkedItemNameString: '',
    },
    autoCompleteBox: {
        visible: false,
        searchInputText: '',
        searchResultItemList: [],
        usedSearchText: '',
    },
});

// 개인정보 항목관리의 탭과 탭에 속한 항목
export const personalInfoTableData = writable({
    userTableData: [],
    columnList: [],
    checkedColumnNameList: [],
    checkedColumnCodeList: [],
    checkedColumnObjList: [],
    checkedColumnTitleString: '',
    addTabPop: {
        visible: false,
        inputData: {
            ctDesignation: '',
        },
    },
    removeColumnPop: {
        visible: false,
        otpValue: '',
        checkPreCautionAgree: false,
        otpErrorMsg: '',
        cautionAgreeErrorMsg: '',
    }
});



export const initialProvidePrivacyWrite = JSON.stringify({
    currentStage: '',
    step1: {
        proProvide: '', // 0 내부제공, 1 외부제공
    },
    step2: {
        provideTargetType: '',
        searchCondition: {
            email: '',
            managerRating: '',
        },
        orderBy: '',
        managerData: [],
        offerList: [],
        filteredOfferList: [],
        selectedAdminIdList: [],
        selectedAdminObjList: [],
    },
    step3: {
        proStartDate: '',
        proExpDate: '',
        proDownloadYn: '', // 다운로드 유무 - 0: NO, 1:YES
    },
    step4: {
        proTargetType: '', // 제공 개인정보 여부 - 0: 전체 개인정보, 1: 일부 개인정보
        tableList: [],
        columnList: [],
        targetColumnList: [],
        sendDataList: [],
        displayColumnList: [],
    },
    step5: {
        provideTargetMemberScope: '',
        searchCondition: {
            popVisible: false,
            text: '',
            registerDate: {
                fromDate: '',
                toDate: '',
            },
            lastLoginDate: {
                fromDate: '',
                toDate: '',
            },
            orderBy: '',
        },
        memberList: [],
        filteredMemberList: [],
        piplTargetIdxs: [],
        displayColumnList: [],
    },
});

// 개인정보 제공 각 페이지의 기억
export const providePrivacyWriteData = writable(JSON.parse(initialProvidePrivacyWrite));

// 페이지간 이동시 일회성으로 건너갈 데이터를 담는다. (예. 페이지 이동 후 기본값이 세팅되어야할 경우 등)
export const pageTransitionData = writable({});

export const customConfirmData = writable({
    visible: false, // 팝업 보임의 여부 통제
    type: 'confirm', // 'confirm' 버튼하나, 'ask' 여부 묻기
    callback: () => {}, // 확인버튼시 동작
    icon: 'pass', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
    title: '제목 미설정', // 제목
    contents1: '내용 미설정', // 내용
    contents2: '',
    btnCheck: '확인', // 확인 버튼의 텍스트
    btnStart: '실행', // 실행 버튼의 텍스트
    btnCancel: '취소', // 취소 버튼의 텍스트
});

export const bannerMessage = writable('');

export const initialPrivacySearch = JSON.stringify({
    currentState: 'search',
    tableList: [],
    searchConditionList: [{
        searchTable: '',
        currentTableName: '',
        currentTableIndex: 0,
        currentTableColumnList: [],
        searchCode: '',
        currentColumnName: '',
        currentColumnSecrity: '0',
        searchText: '',
        key: Date.now().toString(),
    }],
    rawResultList: [],
    resultColumnList: [],
    resultValueList: [],
    currentPage: 1,
    totalPosts: 0,
});

export const privacySearchData = writable(JSON.parse(initialPrivacySearch));

export const initialServiceSetting = JSON.stringify({
    accessIpList: [],  // 접속 허용 IP
    accessIpSearchResultList: [],
    accessIpSearchText: '',
    settingInfo: {
        csId: 0,
        csOverseasBlockSetting: "0", // 해외 로그인 설정  "0" 로그인 허용, "1" 로그인 차단
        csAccessSetting: "0", // 접속허용 IP 설정  "0" 비활성화, "1" 활성화
        csPasswordChangeSetting: "12", // 비밀번호 변경주기
        csPasswordErrorCountSetting: "5", // 비밀번호 오류 접속제한
        csAutoLogoutSetting: "30", // 자동 로그아웃 시간
        csLongDisconnectionSetting: "0" // 장기 미접속 접근제한  "0" 제한없음
    },
    addAccessIpPop: {
        ip1: '',
        ip2: '',
        ip3: '',
        ip4: '',
        isIpInputReadonly: false,
        ipInputErrorMsg: '',
        csipRemarks: '',
        visibility: false,
    },
    removeAccessIpPop: {
        visibility: false,
        otpValue: '',
        deleteIpList: [],
        cautionChecked: false,
    },
});

export const serviceSettingData = writable(JSON.parse(initialServiceSetting));

export const initialSubscriptionManagement = JSON.stringify({
    companyPaymentInfo: {
        cpiInfoCardName: '',
        cpiPayType: '',
    },
    paymentList: {
        current: 1,
        total_rows: 0,
        dataList: [],
    },
});

export const subscriptionManagementData = writable(JSON.parse(initialSubscriptionManagement));