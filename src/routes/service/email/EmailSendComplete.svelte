<script>
    import {link} from "svelte-spa-router";
    import Header from "../../../components/service/layout/Header.svelte";

</script>

<Header />

<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn">
            <h1>이메일 발송</h1>
        </div>
        <div class="mailcomplateBox">
            <div class="mailcomplate">
                <div class="mailcomplateicon">
                    <img src="/kokonut/member/public/img/common/mail_send_icon.png" alt="">
                </div>
                <h2>메일 발송이 완료되었습니다.</h2>
                <div class="mailcomplateBtnBox">
                    <div class="mailcBtn listBtn"><a use:link href="/service/emailList">발송목록</a></div>
                </div>
            </div>
        </div>
    </div>
</section>