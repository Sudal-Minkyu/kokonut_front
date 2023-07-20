import {ajaxBody, ajaxGet} from "../ajax.js";
import {privacySearchData} from "../../../lib/store.js";
import {openConfirm} from "../ui/DialogManager.js";
import {push} from "svelte-spa-router";

export const getColumnList = () => {
    ajaxGet('/v2/api/DynamicUser/searchColumnCall', false, (res2) => {
        if (res2.data.sendData.fieldList.length) {
            privacySearchData.update(obj => {
                obj.columnList = res2.data.sendData.fieldList;
                console.log('컬럼리스트', obj.columnList);
                obj.searchConditionList[0].searchCode = obj.columnList[0].fieldCode;
                obj.searchConditionList[0].currentColumnName = obj.columnList[0].fieldComment;
                obj.searchConditionList[0].currentTableColumnList = obj.columnList;
                return obj;
            });
        } else {
            openConfirm({
                icon: 'fail', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                title: "항목이 존재하지 않음", // 제목
                contents1: '항목이 존재하지 않아 사용할 수 없습니다.',
                contents2: '관리자에게 해당 사실을 문의해 주세요.',
                btnCheck: '확인', // 확인 버튼의 텍스트
                callback: () => {
                    push('/service');
                },
            });
        }
    });
};

export const SEARCH_CONDITION_LIMIT = 5;
export const EMAIL_SEARCH_CONDITION_LIMIT = SEARCH_CONDITION_LIMIT - 1;

export const addSearchCondition = () => {
    privacySearchData.update(obj => {
        if (obj.searchConditionList.length < SEARCH_CONDITION_LIMIT) {
            obj.searchConditionList.push({
                searchCode: obj.columnList[0].fieldCode,
                currentColumnName: obj.columnList[0].fieldComment,
                currentColumnSecrity: obj.columnList[0].fieldComment,
                searchText: '',
                key: Date.now().toString(),
            });
        }
        return obj;
    });
};

export const removeSearchCondition = (i) => {
    privacySearchData.update(obj => {
        if (obj.searchConditionList.length > 1) {
            obj.searchConditionList = [...obj.searchConditionList.filter((_, index) => index !== i)];
        }
        return obj;
    });
}

export const handleChangeColumnBox = (el, i) => {
    privacySearchData.update(obj => {
        obj.searchConditionList[i].searchCode = el.dataset.value;
        obj.searchConditionList[i].currentColumnName = el.innerHTML;
        obj.searchConditionList[i].currentColumnSecrity = Number(el.dataset.secrity);
        obj.searchConditionList[i].searchText = '';
        return obj;
    });
}

export const getUserListByCondition = (page = 1, baseColumnList) => {
    const baseSearchCodes = [];
    const baseSearchTexts = [];
    if (baseColumnList && baseColumnList.length) {
        for (const code of baseColumnList) {
            if (code) {
                baseSearchCodes.push(code);
                baseSearchTexts.push('');
            }
        }
    }
    const searchCondition = {
        pageNum: page,
        limitNum: '10',
    };
    privacySearchData.update(obj => {
        obj.searchResultState = 0;
        searchCondition.searchCodes = [...baseSearchCodes, ...obj.searchConditionList.map(obj => obj.searchCode)];
        searchCondition.searchTexts = [...baseSearchTexts, ...obj.searchConditionList.map(obj => obj.searchText)];
        return obj;
    });
    console.log('검색조건', searchCondition);
    // if (verifySearchCondition(searchCondition).isVerifyFail) {
    //     openConfirm({
    //         icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
    //         title: '검색 대상 중복', // 제목
    //         contents1: '중복되는 검색 대상이 존재합니다.', // 내용
    //         contents2: '한 대상당 하나의 조건으로 검색 가능합니다.',
    //         btnCheck: '확인', // 확인 버튼의 텍스트
    //     });
    //     privacySearchData.update(obj => {
    //         obj.searchResultState = -1;
    //         return obj;
    //     });
    //     return false;
    // }

    ajaxBody('/v2/api/DynamicUser/privacyUserSearch', searchCondition, (res) => {
        console.log('검색결과', res);
        const searchResultList = res.data.sendData.privacyList;
        privacySearchData.update(obj => {
            obj.currentPage = page;
            obj.totalPosts = res.data.sendData.totalCount;
            console.log(obj.currentPage);
            obj.rawResultList = searchResultList || [];
            if (searchResultList.length) {
                // 결과 페이지의 행에 사용될 값과 값으로 사용될 값을 정제
                const keyList = Object.keys(obj.rawResultList[0]);
                const dynamicColumnKeyList = keyList.filter(key => !['kokonut_IDX', 'NO', '회원가입일시', '마지막로그인일시'].includes(key));
                obj.resultColumnList = [ 'kokonut_IDX',
                    'NO',
                    ...dynamicColumnKeyList,
                    '회원가입일시',
                    '마지막로그인일시',
                ];
                let i = 1;
                obj.resultValueList = obj.rawResultList.map(rawObj => {
                    return [
                        rawObj['kokonut_IDX'],
                        i++,
                        ...dynamicColumnKeyList.map(key => rawObj[key]),
                        rawObj['회원가입일시'],
                        rawObj['마지막로그인일시'],
                    ];
                });
                privacySearchData.update(obj => {
                    obj.searchResultState = 1;
                    return obj;
                });
            } else {
                openConfirm({
                    icon: 'warning', // 'pass' 성공, 'warning' 경고, 'fail' 실패, 'question' 물음표
                    title: '검색결과없음', // 제목
                    contents1: '찾으시는 개인정보 검색 결과가 없습니다.', // 내용
                    contents2: '',
                    btnCheck: '확인', // 확인 버튼의 텍스트
                });
                privacySearchData.update(obj => {
                    obj.searchResultState = -1;
                    return obj;
                });
                document.activeElement.blur();
            }
            return obj;
        });
    }, (errCode, errMsg) => {
        privacySearchData.update(obj => {
            obj.searchResultState = -1;
            return obj;
        });
    });
}

const verifySearchCondition = (searchCondition) => {
    // 이렇게 하면, 중복되는 값이 있다면 Set의 크기는 원래 배열의 크기보다 작게 됩니다.
    const set = new Set(searchCondition.searchCodes);

    // Set의 크기와 원래 배열의 크기를 비교하여 중복 여부를 반환합니다.
    return {isVerifyFail: set.size < searchCondition.searchCodes.length};
}

export const handleEnterSearchText = (e, baseColumnList) => {
    if (e.key === 'Enter') {
        getUserListByCondition(1, baseColumnList);
    }
}

export const handleOpenDetail = (kokonut_IDX) => {
    console.log({kokonut_IDX});
    ajaxGet('/v2/api/DynamicUser/privacyUserOpen', {kokonut_IDX}, (res) => {
        const rawDetail = res.data.sendData.privacyInfo;
        console.log('상세보기결과', rawDetail);

        const refinedDetail = [];
        if (rawDetail.length) {
            const detailKeyList = Object.keys(rawDetail[0]).sort();
            for (const columnKey of detailKeyList) {
                refinedDetail.push({
                    columnName: columnKey,
                    columnValue: rawDetail[0][columnKey],
                });
            }
        }

        privacySearchData.update(obj => {
            obj.currentDetail = refinedDetail;
            obj.currentState = 'detail';
            console.log('정제된상세보기', refinedDetail);
            return obj;
        });
    });
}

export const handleChangePage = ({page}) => {
    getUserListByCondition(page);
}

export const distinguishSearchTextPlaceholder = (targetSearchCondition) => {
    let resultText = '';
    if (targetSearchCondition.currentColumnName === '휴대전화번호') {
        resultText = '휴대전화번호 뒷자리 4자리를 입력해 주세요.';
    } else if (targetSearchCondition.currentColumnSecrity === 1) {
        resultText = '완전히 일치하는 검색어를 입력해 주세요.';
    } else {
        resultText = '검색어를 입력해 주세요.';
    }
    return resultText;
}