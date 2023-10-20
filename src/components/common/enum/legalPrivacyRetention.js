function deepFreeze(obj) {
    // 객체의 각 속성을 순회하며 재귀적으로 freeze
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            deepFreeze(obj[key]);
        }
    });

    return Object.freeze(obj);
}

// 개인정보처리방침 관리의 법령에 따른 개인정보의 보유기간에 표시될 정보들 (입력과 디테일에 사용)
export const legalPrivacyRetention = deepFreeze([
    {
        title: '표시·광고에 관한 기록',
        content: '전자상거래 등에서의 소비자 보호에 관한 법률 제6조, 시행령 제6조',
        period: '6개월',
    }, {
        title: '계약 또는 청약철회 등에 관한 기록',
        content: '전자상거래 등에서의 소비자 보호에 관한 법률 제6조, 시행령 제6조',
        period: '5년',
    }, {
        title: '대금결제 및 재화등의 공급에 관한 기록',
        content: '전자상거래 등에서의 소비자 보호에 관한 법률 제6조, 시행령 제6조',
        period: '5년',
    }, {
        title: '소비자의 불만 또는 분쟁처리에 관한 기록',
        content: '전자상거래 등에서의 소비자 보호에 관한 법률 제6조, 시행령 제6조',
        period: '3년',
    }, {
        title: '인터넷 로그기록, 인터넷 접속지 추적기록',
        content: '통신비밀보호법 제15조의2, 시행령 제41조',
        period: '3개월',
    }, {
        title: '통신사실 확인자료(가입자의 전기통신일시, 상대방 가입자번호 등 통신비밀보호법 제2조 제11호 가목~라목, 바목 자료)',
        content: '통신비밀보호법 제15조의2, 시행령 제41조',
        period: '12개월',
    }, {
        title: '위 자료 중 시외·시내전화역무 관련 자료',
        content: '통신비밀보호법 제15조의2, 시행령 제41조',
        period: '6개월',
    }, {
        title: '환자 명부',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '5년',
    }, {
        title: '진료기록부',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '10년',
    }, {
        title: '처방전',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '2년',
    }, {
        title: '수술기록',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '10년',
    }, {
        title: '검사내용 및 검사소견기록',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '5년',
    }, {
        title: '방사선사진 및 그 소견서',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '5년',
    }, {
        title: '간호기록부',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '5년',
    }, {
        title: '조산기록부',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '5년',
    }, {
        title: '진단서 등의 부본',
        content: '의료법 제22조, 시행규칙 제15조',
        period: '3년',
    }, {
        title: '조제기록부',
        content: '약사법 제30조',
        period: '5년',
    }, {
        title: '처방전(요양급여 비용 청구 시)',
        content: '국민건강보험법 제96조의4, 시행규칙 제58조',
        period: '3년',
    }, {
        title: '요양급여비용의 청구에 관한 서류',
        content: '국민건강보험법 제96조의4, 시행규칙 제58조',
        period: '5년',
    }
]);