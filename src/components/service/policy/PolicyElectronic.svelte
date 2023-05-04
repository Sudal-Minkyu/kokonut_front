
<script>

    import { fade } from 'svelte/transition'

    export let electronicCheckChange
    export let startFun;

    function yesClick() {
        startFun();
        electronicCheckChange();
    }

    function noClick() {
        electronicCheckChange();
    }

</script>
