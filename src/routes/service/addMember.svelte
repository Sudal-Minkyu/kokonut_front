
<script>
    import Header from "../../components/service/layout/Header.svelte";
    import {ajaxGet, ajaxRegister, reportCatch} from "../../components/common/ajax.js";
    import {onMount} from "svelte";
    import {backBtn} from "../../lib/store.js";
    import {link} from "svelte-spa-router";

    onMount(() => {
        getColumnLIst();
        apiKeyInfo();
    });

    let columnList = [];
    const getColumnLIst = () => {
        ajaxGet('/v2/api/DynamicUser/searchColumnCall', false, (res2) => {
            try {
                if (res2.data.sendData.fieldList.length) {
                    columnList = [{
                        fieldCode: '1_pw',
                        fieldComment: '비밀번호',
                    }, ...res2.data.sendData.fieldList];
                }

                for (const {fieldCode} of columnList) {
                    memberData[fieldCode] = '';
                }
            } catch (e) {
                reportCatch('temp059', e);
            }
        });
    }

    let apiKey;
    function apiKeyInfo() {
        let url = "/v2/api/ApiKey/apiKeyCheck";

        ajaxGet(url, false, (res) => {
            try {
                if (res.data.sendData.result === 2) {
                    apiKey = res.data.sendData.apiKey;
                }
            } catch (e) {
                reportCatch('temp060', e);
            }
        }, (errCode, errMsg) => {
            try {
                return {action: 'NONE'};
            } catch (e) {
                reportCatch('temp061', e);
            }
        });
    }

    let memberData = {};
    const handleAddMember = () => {
        if (!memberData['1_pw']) {
            alert('패스워드는 필수값 입니다.');
            return;
        }
        if (!memberData['1_id']) {
            alert('아이디는 필수값 입니다.');
            return;
        }
        ajaxRegister('/v3/api/Auth/register', memberData, apiKey, (res) => {
            try {
                alert('맴버 추가 완료');
                resetMemberData();
            } catch (e) {
                reportCatch('temp062', e);
            }
        });
    }

    const resetMemberData = () => {
        for (let key in memberData) {
            memberData[key] = '';
        }
    }
</script>

<Header />
<section class="bodyWrap">
    <div class="contentInnerWrap">
        <div class="pageTitleBtn marB50">
            <a use:link href="/service/environment">{$backBtn}</a>
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
                <tr>
                    <td colspan="2">
                        <button type="button" on:click={handleAddMember} >추가하기</button>
                    </td>
                </tr>
                {#each columnList as {fieldCode, fieldComment}}
                    <tr>
                        <td>
                            {fieldComment} ({fieldCode})
                        </td>
                        <td>
                            <input type="text" class="wid100per" style="border: solid;" bind:value={memberData[fieldCode]}>
                        </td>
                    </tr>
                {/each}
                <tr>
                    <td colspan="2">
                        <button type="button" on:click={handleAddMember} >추가하기</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>