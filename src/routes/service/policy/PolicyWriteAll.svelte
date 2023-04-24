<script>
    import Header from "../../../components/service/layout/Header.svelte"

    import { page } from '../../../lib/store.js'

    import PolicyWriteStep1 from '../../../components/service/policy/PolicyWriteStep1.svelte'

</script>

<Header />
<section class="stepbodyWrap">
    <div class="stepcontentInnerWrap">

        <PolicyWriteStep1 />


    </div>
</section>