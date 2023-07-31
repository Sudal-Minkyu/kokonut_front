/********************************
 * 공통으로 사용하는 코드 값을 관리하는 스크립트
 * 작성자 : joy
 * 작성일 : 2023.02.27.
 ********************************/
export const commonCode = [

	// 공통
	{label : "common_all", text : "전체", value: ""},

	// 관리자 목록관리 페이지
	{label : "kn_state", text : "정지", value: "0"},
	{label : "kn_state", text : "정상", value: "1"},
	{label : "kn_state", text : "로그인제한", value: "2"},
	{label : "kn_state", text : "탈퇴", value: "3"},
	{label : "kn_state", text : "휴면", value: "4"},

	// 관리자 목록관리 페이지
	// {label : "kn_role_code", text : "코코넛직원", value: "ROLE_SYSTEM"}, // 제외
	// {label : "kn_role_code", text : "대표관리자", value: "ROLE_MASTER"},
	{label : "kn_role_code", text : "최고관리자", value: "ROLE_ADMIN"},
	{label : "kn_role_code", text : "일반관리자", value: "ROLE_USER"},
	{label : "kn_role_code", text : "임시관리자", value: "ROLE_GUEST"},

	// 관리자 등록
	{label : "admin_create_role_code", text : "최고관리자", value: "ROLE_ADMIN"},
	{label : "admin_create_role_code", text : "일반관리자", value: "ROLE_USER"},
	{label : "admin_create_role_code", text : "임시관리자", value: "ROLE_GUEST"},

	// 1:1 문의 등록
	{label : "qna_type", text : "기타", value: "0"},
	{label : "qna_type", text : "회원정보", value: "1"},
	{label : "qna_type", text : "사업자정보", value: "2"},
	{label : "qna_type", text : "Kokonut서비스", value: "3"},
	{label : "qna_type", text : "결제", value: "4"},

	// 이메일발송
	{label : "email_type", text : "주요공지", value: "1"},
	{label : "email_type", text : "광고/홍보", value: "2"},
	{label : "email_type", text : "기타", value: "3"},

	// 개인정보처리방침 검색필터
	{label : "policy_search", text : "개정일", value: "1"},
	{label : "policy_search", text : "시행일", value: "2"},

]