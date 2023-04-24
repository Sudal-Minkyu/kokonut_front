import { wrap } from 'svelte-spa-router/wrap'

// 로그인 전 이용하는 페이지
import Index from "./routes/home/Index.svelte"
import Login from "./routes/home/Login.svelte"
import Find from "./routes/home/Find.svelte"
import Join from "./routes/home/Register.svelte"
import Price from "./components/home/Price.svelte"

// 로그인 후 이용하는 페이지
import ServiceHome from "./routes/service/ServiceHome.svelte"
import AdminActivity from "./routes/service/admin/AdminActivity.svelte"
import AdminManagement from "./routes/service/admin/AdminManagement.svelte"

import Email from "./routes/service/email/Email.svelte"

import Environment from "./routes/service/Environment.svelte"

import ApiKey from "./routes/service/ApiKey.svelte"
import MyPage from "./routes/service/MyPage.svelte"
import ServiceSetting from "./routes/service/ServiceSetting.svelte"

import QnaList from "./routes/service/qna/QnaList.svelte"
import QnaWrite from "./routes/service/qna/QnaWrite.svelte"
import QnaDetail from "./routes/service/qna/QnaDetail.svelte"

import PersonalInfoItem from "./routes/service/personalInfo/PersonalInfoItem.svelte"

import PolicyList from "./routes/service/policy/PolicyList.svelte"
import PolicyWrite from "./routes/service/policy/PolicyWrite.svelte"

export default {
    // API 테스트하는 화면
    "/Apitest": wrap({
        asyncComponent: () => import("./routes/Apitest.svelte"),
    }),

    // @@@@@@@@@@@@@@@@ 기본 서비스 부분 @@@@@@@@@@@@@@@@ //
    "/": Index,
    "/login": Login,
    "/join": Join,
    "/find": Find,
    "/price": Price,

    // 회원가입완료 페이지
    "/joinsu": wrap({
        asyncComponent: () => import("./components/home/join/JoinSuccess.svelte"),
    }),

    // 휴대폰 본인인증
    "/niceId/redirect": wrap({
        asyncComponent: () => import("./components/common/certification/Nice.svelte"),
    }),

    // @@@@@@@@@@@@@@@@ 고객 서비스 부분 @@@@@@@@@@@@@@@@ //
    // 고객 서비스 인덱스
    "/service": ServiceHome,
    // 관리자 활동 이력 페이지
    "/service/adminActivity": AdminActivity,
    // 관리자 활동 이력 페이지
    "/service/adminManagement": AdminManagement,

    // 이메일 발송내역 페이지
    "/service/emailList": Email,
    // 이메일 발송 페이지
    "/service/emailSend": wrap({
        asyncComponent: () => import("./routes/service/email/EmailSend.svelte"),
    }),

    // 메일인증 후 이동하는 -> 관리자 등록  페이지
    "/create": wrap({
        asyncComponent: () => import("./routes/home/Create.svelte"),
    }),

    // 구독관리 페이지
    "/service/management": wrap({
        asyncComponent: () => import("./routes/service/Management.svelte"),
    }),

    // 환경설정 페이지
    "/service/environment": Environment,

    // API Key 관리 페이지
    "/service/environment/apikey": ApiKey,

    // 내정보 페이지
    "/service/environment/mypage": MyPage,

    // 서비스설정 페이지
    "/service/environment/setting": ServiceSetting,

    // 1:1문의 페이지
    "/service/environment/qnaList": QnaList,
    // 1:1문의 작성페이지
    "/service/environment/qnaWrite": QnaWrite,
    // 1:1문의 상세보기페이지
    "/service/environment/qnaDetail/:qnaid": QnaDetail,

    // 개인정보항목관리 페이지
    "/service/environment/personalInfoItem": PersonalInfoItem,

    // 개인정보처리방침 리스트 페이지
    "/service/policyList": PolicyList,
    // 개인정보처리방침 작성페이지
    "/service/policyWrite": PolicyWrite,
    // 개인정보처리방침 모든작성페이지
    "/service/policyWriteAll": wrap({
        asyncComponent: () => import("./routes/service/policy/policyWriteAll.svelte"),
    }),

    "*": wrap({
        asyncComponent: () => import("./routes/NotFound.svelte"),
    }),
};