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

export const knEmailHeader = writable(""); // 헤더바에 나올 사용자명
export const cpNameSider = writable(""); // 사이드바에 나올 소속명
export const backBtn = writable("<-"); // 뒤로가기버튼 텍스트
export const role = writable(""); // 현재 권한


// 컴포넌트용 지속성스토어
export const emailSave = persist_storage("emailSave",""); // 이메일기억하기 체크시 저장

export const stateVal = writable(0); // 상태값 컴포넌트 번호
export const findEmail = writable("이메일 찾는중..."); // 이메일 찾기의 이메일변수
export const findPwd = writable(""); // 비밀번호 찾기의 이메일변수
export const tempPwd = writable(""); // 임시비밀번호 변수
export const openDiv = writable(0); // 이메일/비번찾기 페이지용 open 컴포넌트 번호

export const piId = writable(0); // 개인정보처리방침 saveId
export const piStage = writable(0); // 개인정보처리방침 작성중인 글이 존재할 경우 보내는 단계


export const initialPolicyInfo = {
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
};

// 개인정보처리방침 정보데이터
export const policyInfoData = writable({...initialPolicyInfo});

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
