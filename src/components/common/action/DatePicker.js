/********************************
 * 날짜 선택기용 공용 액션 함수 및 일반 함수
 * 작성자 : joy, joffrey
 * 작성일 : 2023.02.20, 2023.07.03
 ********************************/

import jQuery from 'jquery';
import moment from 'moment';
import 'daterangepicker';

export let stimeVal = "";

// 공통 코드 정의 파일, 사용 검토
import {commonCode} from "../../../lib/commonCode.js";

let localeKr = {
    format: 'YYYY-MM-DD',
    applyLabel: '확인',
    cancelLabel: '취소',
    daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
};

/**
 * daterangepicker 기반의 기간 선택기 적용
 * 기간 선택기가 필요한 인풋 요소에 use:DateRangePicker={옵션객체} 형식으로 호출하여 사용하면 된다.
 * @param targetEl : element
 * @param props : object
 * @constructor
 */
export const DateRangePicker = (targetEl, props = {}) => {

    const defaultProps = {
        jQueryEl: jQuery(targetEl),
        callback: () => {}, // 확인 버튼을 누를 때 동작할 콜백
        handleRendered: () => {},
        eraseOnCancel: true,
        periodName: '',
        periodTags: '',
        periodDays: '0', // 't' -> 전체, 0미만 -> 오늘부터 지정일, 0이상 -> 오늘까지 지정일, '-0' -> 오늘선택 오늘부터, '0' -> 오늘선택 오늘까지
    }

    const finalProps = {...defaultProps, ...props};
    if (finalProps.periodName) {
        // 기본으로 선택된 기간 찾기 - checked true 찾기
        // 기간 선택버튼 찾기
        finalProps.periodTags = jQuery('input[name=' + finalProps.periodName + ']');
        for (let i = 0; i < finalProps.periodTags.length; i++) {
            if (finalProps.periodTags.eq(i).prop('checked')) {
                finalProps.periodDays = finalProps.periodTags.eq(i).attr('value');
            }
        }
        finalProps.periodTags.on('click', handlePeriodTagsClick);
    }

    setOptDateRangePicker(finalProps);

    return {
        destroy: () => {
            if (finalProps.periodName) {
                finalProps.periodTags.off('click', handlePeriodTagsClick);
            }
        },
    };

    function handlePeriodTagsClick() {
        finalProps.periodDays = this.value;
        setOptDateRangePicker(finalProps);
    }
}

/**
 * dateRangePicker 세팅값 설정 함수
 * @param id daterangepicker가 적용될 input 태그 Id
 * @param periodDays 기간선택일자 [ negative | 0 | positive]
 * @param periodTags 선택 라디오 박스 객체
 * @param callback
 */
const setOptDateRangePicker = ({jQueryEl, periodDays, periodTags, callback, eraseOnCancel, handleRendered}) => {
    if(periodDays === "t"){
        // negative -  all_days
        // daterangepicker 비활성화
        if(jQueryEl.data('daterangepicker')){
            jQueryEl.data('daterangepicker').container.remove();
        }
        jQueryEl.val('');
    }else if(Number(periodDays) < 0){
        jQueryEl.daterangepicker({
            startDate : moment(),
            endDate : moment().subtract(Number(periodDays)+1, 'days'),
            minDate: moment(),
            dateLimit: {
                'days': 180
            },
            locale : localeKr
        });
    }else if(Number(periodDays) > 0){
        // positive
        jQueryEl.daterangepicker({
            startDate : moment().subtract(Number(periodDays)-1, 'days'),
            endDate : moment(),
            maxDate : moment(),
            dateLimit: {
                'days': 180
            },
            locale : localeKr
        });
    }else if(periodDays === "-0"){
        // zero - custom
        jQueryEl.daterangepicker({
            startDate : moment(),
            endDate : moment(),
            minDate : moment(),
            dateLimit: {
                'days': 180
            },
            locale : localeKr
        });
    }else if(periodDays === "0"){
        // zero - custom
        jQueryEl.daterangepicker({
            startDate : moment(),
            endDate : moment(),
            maxDate : moment(),
            dateLimit: {
                'days': 180
            },
            locale : localeKr
        });
    }else{
        jQueryEl.daterangepicker({
            startDate : moment(),
            endDate : moment(),
            maxDate : moment(),
            dateLimit: {
                'days': 180
            },
            locale : localeKr
        });
    }

    // 캘린더 영역 펼쳐질 때 css
    jQueryEl.on("show.daterangepicker", function() {
        jQuery('.yearselect').css("float", "left");
        jQuery('.monthselect').css("float", "right");
    });

    // 캘린더 '확인' 선택 시
    jQueryEl.on("apply.daterangepicker", function(ev, picker) {
        stimeVal = jQueryEl.val();

        if (periodTags) {
            // 사용자가 달력에서 날짜 [확인] 버튼 클릭 시 라디오 버튼 [사용자 지정] 세팅.
            for (let i = 0; i < periodTags.length; i++) {
                if (periodTags.eq(i).attr('value') == 0) {
                    periodTags.eq(i).prop('checked', true);
                } else {
                    periodTags.eq(i).prop('checked', false);
                }
            }
        }

        callback({
            start: stimeVal.substring(0, 10),
            end: stimeVal.substring(13, 23),
            period: stimeVal,
        });
    });

    if (eraseOnCancel) {
        // 캘린더 '취소' 선택 시 클리어
        jQueryEl.on("cancel.daterangepicker", function (ev, picker) {
            jQueryEl.val('');
            stimeVal = jQueryEl.val();
        });
    }
    stimeVal = jQueryEl.val();
    handleRendered({
        start: stimeVal.substring(0, 10),
        end: stimeVal.substring(13, 23),
        period: stimeVal,
    });
}

/**
 * 검색 조건 내 selectBox 설정 함수
 * commonCode에서 가져온 공통코드 값으로 동적으로 selectBox optionItem 목록을 생성, 클릭이벤트 추가
 * @param option 			[{ id, use_all, codeName }, ... ]
 * @param option.id			div 태그 id
 * @param option.use_all	'전체' 선택지 사용 여부
 * @param option.codeName	코드명
 */
export const setOptionItem = (option) => {
    const opt = option;
    let tagArea;
    let newTag;
    // TODO 코드명을 통해 코드 배열을 가져온다. api호출 형태로 변경해아함.
    opt.forEach((opt) =>{
        // 필터 적용해서 필요한 code만 가져오기.
        let itemList;
        if(opt.use_all){
            // '전체' 선택지 사용
            itemList = commonCode.filter(code => {
                if(code.label === 'common_all' || code.label === opt.codeName){
                    return code.label;
                }
            });
        }else{
            // '전체' 선택지 사용 안함
            itemList = commonCode.filter(code => {
                if(code.label === opt.codeName){
                    return code.label;
                }
            });
        }

        // id 다음 요소 찾기  	<ul class="optionList">
        tagArea = document.getElementById(opt.id)
        if(tagArea !== null) {
            tagArea = tagArea.nextElementSibling;
            // li 태그 만들기 	<li class="optionItem curv" data-value="코드값"	>코드명</li>
            itemList.forEach((item)=>{
                newTag = document.createElement('li');
                newTag.setAttribute('class', 'optionItem curv');
                newTag.setAttribute('data-value', item.value); 	// 코드값
                newTag.innerHTML = item.text; 					// 코드명
                tagArea.appendChild(newTag);
            })

            // id 요소에 첫번째 li태그의 값으로 최초 세팅 하기. div의 data-value로 코드값 저장된다. jQuery(opt.id).data('value')
            document.getElementById(opt.id).setAttribute('data-value', itemList[0].value);
            // document.getElementById(opt.id).parentNode.firstChild.value = itemList[0].value;
            document.getElementById(opt.id).innerHTML = itemList[0].text;
        }
    });
}

/**
 * 검색 조건 내 selectBox 설정 함수
 * div 박스 클릭시 아래로 div 선택목록이 나타난다. 목록의 값을 선택하면 선택한 값이 선택되고 목록이 사라진다.
 */
export const setCustomSelectBox = () => {
    /* 커스텀 seclect 박스 스크립트 */
    const label = document.querySelectorAll('.label');
    label.forEach(function(lb){
        lb.addEventListener('click', e => {
            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.optionItem');
            clickLabel(lb, optionItems); // add active, remove active
        })
    });
}

const clickLabel = (lb, optionItems) => {
    if(lb.parentNode.classList.contains('active')) {
        lb.parentNode.classList.remove('active');
    } else {
        lb.parentNode.classList.add('active');
        optionItems.forEach((opt) => {
            opt.addEventListener('click', () => {
                handleSelect(lb, opt);
            });
        })
    }
}

const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    label.setAttribute('data-value', jQuery(item).data('value'));
    //label.parentNode.firstChild.value = jQuery(item).data('value');
    label.parentNode.classList.remove('active');
    removeHandleSelectEvent();
}

const removeHandleSelectEvent = () => {
    document.querySelectorAll('.label').forEach((lb) => {
        let removeTarget = lb.nextElementSibling.querySelectorAll('.optionItem');
        removeTarget.forEach((opt)=>{
            opt.removeEventListener('click', ()=>{
                handleSelect(lb, opt);
            })
        })
    });
}

export const singleDatePicker = (elementId, callback, additionalProp = {}) => {
    jQuery('#' + elementId).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minYear: 1990,
        locale : localeKr,
        ...additionalProp,
    }, callback);
}