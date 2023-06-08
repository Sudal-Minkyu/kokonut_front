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
export const knNameHeader = writable(""); // 헤더바에 나올 사용자명
export const knEmailHeader = writable(""); // 기본적으로 가져오는 나의 이메일스토어값
export const cpNameSider = writable(""); // 사이드바에 나올 소속명
export const backBtn = writable("<-"); // 뒤로가기버튼 텍스트
export const popupPage = writable(0); // 팝업용 페이지번호

export const keyBufferSto = writable(""); // 테스트 key
export const ivSto = writable(""); // 테스트 iv

export const role = writable(""); // 현재 권한
export const electronic = writable(""); // 전자상거래법 대상 여부 : 0 -> 전자상거래법여부를 모르거나 최초일경우, 1->전자상거래법대상 일경우, 2->전자상거래법대상이 아닐경우

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
    accessIpList: [],
    settingInfo: {
        csId: 0,
        csOverseasBlockSetting: "0",
        csAccessSetting: "0",
        csPasswordChangeSetting: "12",
        csPasswordErrorCountSetting: "5",
        csAutoLogoutSetting: "30",
        csLongDisconnectionSetting: "0"
    }
});

export const serviceSettingData = writable(JSON.parse(initialServiceSetting));