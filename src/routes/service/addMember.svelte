
<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {ajaxGet} from "../../components/common/ajax.js";
    import {onMount} from "svelte";

    onMount(() => {
        getColumnLIst();
        apiKeyInfo();
    });

    let columnList = [];
    const getColumnLIst = () => {
        ajaxGet('/v2/api/DynamicUser/searchColumnCall', false, (res2) => {
            if (res2.data.sendData.fieldList.length) {
                columnList = [{
                    fieldCode: '1_pw',
                    fieldComment: '비밀번호',
                }, ...res2.data.sendData.fieldList];
                console.log('컬럼리스트', columnList);
            }
        });
    }

    let apiKey;
    function apiKeyInfo() {
        let url = "/v2/api/ApiKey/apiKeyCheck";

        ajaxGet(url, false, (res) => {
            if(res.data.sendData.result === 2) {
                apiKey = res.data.sendData.apiKey;
            }
        }, (errCode, errMsg) => {
            return {action: 'NONE'};
        });
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <h1>테스터용 개인정보 추가</h1>
        </div>
    </div>
    <div class="kotable policyList">
        <table>
            <thead>
                <tr>
                    <th>항목명</th>
                    <th>추가할 데이터</th>
                </tr>
            </thead>
            <tbody>
                {#each columnList as {fieldCode, fieldComment}}
                    <tr>
                        <td>
                            {fieldComment} ({fieldCode})
                        </td>
                        <td>
                            <input type="text" class="wid100per" style="border-color: lightgrey; border: solid;">
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>