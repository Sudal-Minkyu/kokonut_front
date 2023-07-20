<script>
    import {onMount} from "svelte";
    import jQuery from "jquery";

    import '/src/components/common/extension/resetForSummernote.css';
    import 'summernote/dist/summernote-lite.js';
    import 'summernote/dist/summernote-lite.css';
    import '/src/components/common/extension/summernote-localizing.js'

    onMount(() => {
        jQuery('#summernote').summernote({
            height: 300,
            placeholder: '내용을 입력해 주세요.',
            tabsize: 2,
            toolbar: [
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['codeview']]
            ],
            lang: 'ko-KR',
        });
    });

    export const getText = () => {
        return jQuery('#summernote').summernote('code');
    }

</script>

<div id="summernote"></div>