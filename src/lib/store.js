import {readable, writable, get} from 'svelte/store'

const persist_storage = (key, initValue) => {
    const storedValueStr = localStorage.getItem(key)
    const store = writable(storedValueStr != null ? JSON.parse(storedValueStr) : initValue)
    store.subscribe((val) => {
        // 로컬 저장소에 있는 현재 값과 새로운 값이 같지 않을 경우에만 호출하여 로컬저장소에 걸린 이벤트리스너와 연계된 비정상 작동 방지
        if (localStorage.getItem(key) !== JSON.stringify(val)) {
            localStorage.setItem(key, JSON.stringify(val))
        }
    })
    return store;
}

// UI 적인 변수만 설정할 것
// export const 변수명 = persist_storage('변수명','값');

// 리플레쉬 토큰 유효기간 : 7일, 엑세스토큰 유효기간 : 30분
export const accessToken = persist_storage('accessToken','');
// 로그인 여부
export const is_login = persist_storage('is_login',false);
export const expireDate = persist_storage('expireDate', null);

export const doChangePwdLater = persist_storage('doChangePwdLater', false); // 로그인시 false -> 암호 변경 나중에 하기 -> true

// 사용자 로그인 정보 초기화값 /v2/api/Admin/authorityCheck 를 통해 헤더가 호출될 때 갱신된다.
export const initialUserInfo = JSON.stringify({
    cpName: '', // 사이드바에 나올 소속명
    csAutoLogoutSetting: '60', // 자동로그아웃까지 걸리는 분 (새로고침 위해 객체형태 사용)
    csPasswordChangeState: '', // 비밀번호 변경 기간 도래 여부
    electronic: '', // 전자상거래법 대상 여부 : 0 -> 전자상거래법여부를 모르거나 최초일경우, 1->전자상거래법대상 일경우, 2->전자상거래법대상이 아닐경우
    knEmail: '', // 기본적으로 가져오는 나의 이메일스토어값
    knName: '', // 헤더바에 나올 사용자명
    knPhoneNumber: '', // 사용자 전화번호
    paymentBillingCheck: '', // 0 -> 새로가입했지만 아직 구독하지 않은 고객사, 1 -> 구독중인 고객사, 2 -> 구독해지한 고객사
    emailSendSettingState: '', // 0 -> 이메일 발송 세팅하지 않음, 1 -> 이메일 발송 세팅함
    role: '', // 로그인한 사용자 권한
});

// 사용자 로그인 정보
export const userInfoData = writable(JSON.parse(initialUserInfo));

export const backBtn = writable('<-'); // 뒤로가기버튼 텍스트
export const popupPage = writable(0); // 팝업용 페이지번호

export const keyBufferSto = writable(''); // 테스트 key
export const ivSto = writable(''); // 테스트 iv

// 컴포넌트용 지속성스토어
export const emailSave = persist_storage('emailSave',''); // 이메일기억하기 체크시 저장

export const stateVal = writable(0); // 상태값 컴포넌트 번호
export const findEmail = writable('ID 찾는중...'); // 이메일 ID 찾기의 이메일변수
export const findPwd = writable(''); // 비밀번호 찾기의 이메일변수
export const tempPwd = writable(''); // 임시비밀번호 변수
export const openDiv = writable(0); // 이메일/비번찾기 페이지용 open 컴포넌트 번호

export const piId = writable(0); // 개인정보처리방침 saveId
export const piStage = writable(0); // 개인정보처리방침 작성중인 글이 존재할 경우 보내는 단계

export const mainScreenBlockerVisibility = writable(false); // 메인 스크린

export const timeLeftClock = writable('00:00');

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
        piChoseListString: [false, false, null, null, false, null, false, false, false, false, false, false, false, false, false, false, false, false, false],
        piChoseCustomList: [],
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

export const initialPersonalInfoCategory = JSON.stringify({
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

// 개인정보 항목관리 항목분류
export const personalInfoCategoryData = writable(JSON.parse(initialPersonalInfoCategory));

export const initialPersonalInfoTable = JSON.stringify({
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

// 개인정보 항목관리의 탭과 탭에 속한 항목
export const personalInfoTableData = writable(JSON.parse(initialPersonalInfoTable));

export const initialProvidePrivacyWrite = JSON.stringify({
    currentStage: '',
    step1: {
        proProvide: '', // 0 내부제공, 1 외부제공
    },
    step2: {
        provideTargetType: 'teammate',
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
        proDownloadYn: 1, // 다운로드 유무 - 0: NO, 1:YES
        selectedRadio: '-1', // 선택된 다운로드 기간 라디오 버튼(프론트에서만 활용)
    },
    step4: {
        proTargetType: 1, // 제공 개인정보 여부 - 0: 전체 개인정보, 1: 일부 개인정보
        columnList: [],
        targetColumnList: [],
        sendDataList: {
            pipeTableTargets: [],
        },
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
    searchResultState: -1, // -1 -> 검색안한 상태 혹은 검색결과 없음, 0 검색중, 1 검색완료
    columnList: [],
    searchConditionList: [{
        searchCode: '',
        currentColumnName: '',
        currentColumnSecrity: '0',
        searchText: '',
        key: Date.now().toString(),
    }],
    rawResultList: [],
    resultColumnList: [],
    visibleColumnList: [],
    invisibleColumnList: [],
    resultValueList: [],
    visibleValueList: [],
    invisibleValueList: [],
    currentPage: 1,
    totalPosts: 0,
});

export const privacySearchData = writable(JSON.parse(initialPrivacySearch));

export const initialPrivacyDetail = JSON.stringify({
    proCode: '',
});

export const privacyDetailData = writable(JSON.parse(initialPrivacyDetail));

export const initialServiceSetting = JSON.stringify({
    accessIpList: [],  // 접속 허용 IP
    accessIpSearchResultList: [],
    accessIpSearchText: '',
    settingInfo: {
        csId: 0,
        csOverseasBlockSetting: '0', // 해외 로그인 설정  '0' 로그인 허용, '1' 로그인 차단
        csAccessSetting: '0', // 접속허용 IP 설정  '0' 비활성화, '1' 활성화
        csPasswordChangeSetting: '12', // 비밀번호 변경주기
        csPasswordErrorCountSetting: '5', // 비밀번호 오류 접속제한
        csAutoLogoutSetting: '30', // 자동 로그아웃 시간
        csLongDisconnectionSetting: '0' // 장기 미접속 접근제한  '0' 제한없음
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
    columnList: [],
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

export const initialEmailSend = JSON.stringify({
    emType: '1', // 발송타입(1 : 일반발송, 2 : 예약발송)
    emReservationDate: 0, // 예약발송일 경우 발송시간
    emPurpose: '1', // 발송목적(1:주요공지, 2:광고/홍보, 3:기타)
    emEtc: '', // 기타일 경우 해당 내용
    emReceiverType: '0', // 발송대상(1 : 전체회원, 2 : 선택회원)
    emailSendChoseList: [], // 선택회원 리스트
    emailSendChoseListFinal: [], // 선택회원 리스트
    emEmailSend: '', // 발신자 이메일
    emTitle: '', // 제목
    emContents: '', // 내용
    multipartFiles: [], // 첨부파일 목록 -> 20MB미만일 경우만
});

export const emailSendData = writable(JSON.parse(initialEmailSend));

export const debouncedTopScrollData = writable({
    timeout: null,
    scrollTo: null,
});


// 로컬 스토리지에 저장되어 있으며, 다른 탭에서 최신화가 되어야할 필요가 있는 대상들의 나열 (refreshStore 함수를 통해 key에 따라 대상을 동적 set 하기 위함)
export const tracked = {
    accessToken, is_login, expireDate, doChangePwdLater, emailSave
};

// 해당 키에 해당하는 스토어의 업데이트를 호출
export const refreshStore = (key, newValue) => {
    tracked[key]?.set(newValue);
}