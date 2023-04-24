<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import { page } from '../../../lib/store.js'

    import PolicyWriteStep1 from '../../../components/service/policy/PolicyWriteStep1.svelte'

</script>

<Header />
<section class="stepbodyWrap">
    <div class="stepcontentInnerWrap">

        <div class="pageTitleBtn marB50">
            <h1>개인정보처리방침 제작</h1>
            <dl>해당 페이지는 최고관리자만 수정할 수 있습니다.</dl>
        </div>

        <PolicyWriteStep1 />


    </div>
</section>