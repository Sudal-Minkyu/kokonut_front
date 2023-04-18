
<script>
    import { push } from 'svelte-spa-router'

    function click() {
        push('/login')
    }

</script>

<div class="join_membership" id="join_finWrap">
    <div class="joinCont">
        <div class="joinBg"></div>
        <div class="joinContArea">
            <div class="joinContBox">
                <p class="joinmTitle">회원가입</p>
                <span class="precessbar3"></span>
                <figure class="f_emailImg">
                    <img src="/assets/images/join/join_f.png"></figure>
                <div class="findContArea">
                    <p class="findEx">회원가입이 완료되었습니다.<br>코코넛과 함께 만들어가요!</p>
                </div>
                <div class="find_bottom login" style="cursor: pointer" on:click={click}>
                    <a><p>로그인창 이동</p></a>
                </div>
            </div>
        </div>
    </div>
</div>
