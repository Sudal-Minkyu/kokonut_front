/********************************
 * 검색조건 내 공통으로 사용되는 스크립트
 * 작성자 : joy
 * 작성일 : 2023.02.20.
 ********************************/
import jQuery from 'jquery';
import moment from 'moment';  
import daterangepicker from 'daterangepicker';

export let stimeVal = ""

// 공통 코드 정의 파일, 사용 검토
import { commonCode } from './commonCode.js';

/**
 * 검색 조건 내 dateRangePicker 설정 함수
 * 기간 선택 버튼이 있는 경우, 기간 선택 버튼이 없는 경우. 기간 선택 버튼이 있는 경우 디폴트 선택자가 있는지 여부 확인.
 * @param id daterangepicker가 적용될 input 태그 id 입력
 * @param use_range 조회 기간 선택 버튼 사용 여부, [ true | false ]
 * @param periodName 조회 기간 선택 버튼(rangeRadio) name, 또는 '' 입력
 */
export const setDateRangePicker = (id, use_range, periodName) => {
	// 인풋태그 아이디
	const dtIptId = '#'+id;

	// 기간 선택 버튼 사용 여부
	if(!use_range){
		// 기간 선택 버튼 사용 안함. daterangepicker default 선택 범위인 1일로 선택됨.
		setOptDateRangePicker(dtIptId, 1, '');
	}else{
		// 기간 선택 버튼 사용. 기본으로 선택된 기간만큼 최초 선택됨.
		let periodTags;
		let periodDays; 

		// 기본으로 선택된 기간 찾기 - checked true 찾기
		// 기간 선택버튼 찾기
		periodTags = jQuery('input[name='+periodName+']');
		for(let i=0; i<periodTags.length; i++){
			if(periodTags.eq(i).prop('checked')){
				periodDays = periodTags.eq(i).attr('value');
			}
		}
		
		if(periodDays == null || periodDays == undefined || periodDays == ''){
			console.log("기본으로 선택된 조회 기간이 없습니다. /n 첫번째 조회기간만큼 조회합니다. (" + periodTags.eq(0).attr('value')+") 일");
			// 첫번째 조회 기간 버튼의 기간만큼 조회한다.
			setOptDateRangePicker(dtIptId, periodTags.eq(0).attr('value'), periodTags);
			
		}else{
			console.log("기본으로 선택된 조회 기간은 " + periodDays + "일 입니다.");
			setOptDateRangePicker(dtIptId, periodDays, periodTags);
		}
		
		periodTags.on("click", function(){
			setOptDateRangePicker(dtIptId, this.value, periodTags);
		});
	}
	// return jQuery(dtIptId).val();
}

/**
 * dateRangePicker 세팅값 설정 함수
 * @param id daterangepicker가 적용될 input 태그 Id
 * @param periodDays 기간선택일자 [ negative | 0 | positive]
 * @param periodTags 선택 라디오 박스 객체
 */
const setOptDateRangePicker = (id, periodDays, periodTags) => {
	let localeOpt = {};
    localeOpt['format'] = 'YYYY-MM-DD';
    localeOpt['applyLabel'] = '확인';
    localeOpt['cancelLabel'] = '취소';
    localeOpt['daysOfWeek'] = ["일", "월", "화", "수", "목", "금", "토"];
    localeOpt['monthNames'] = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

	if(periodDays < 0){
		// negative -  all_days
		console.log("선택된 조회 기간은 '전체' 입니다.");
		// daterangepicker 비활성화
		if(jQuery(id).data('daterangepicker')){
			jQuery(id).data('daterangepicker').container.remove();
		}
		jQuery(id).val('');
	}else if(periodDays > 0){
		// positive
		console.log("선택된 조회 기간은 " + periodDays +" 일 입니다.");
		jQuery(id).daterangepicker({
			startDate : moment().subtract(periodDays-1, 'days'),
			endDate : moment(),
			maxDate : moment(),
			dateLimit: {
				'days': 180
			},
			locale : localeOpt
		});
	}else if(periodDays === 0){
		// zero - custom
		console.log("선택된 조회 기간은 '사용자 지정' 입니다.");
		jQuery(id).daterangepicker({
			maxDate : moment(),
			dateLimit: {
				'days': 180
			},
			locale : localeOpt
		});
		jQuery(id).val('');
	}else{
		console.log("periodDays가 범위 밖 입니다.\n"
		+"periodDays를 확인하세요. >> "+ periodDays +"\n"
		+"기본 조회기간으로 조회합니다. (1일)");
		jQuery(id).daterangepicker({
			startDate : moment(),
			endDate : moment(),
			maxDate : moment(),
			dateLimit: {
				'days': 180
			},
			locale : localeOpt
		});
	}
	
	// 캘린더 영역 펼쳐질 때 css
	jQuery(id).on("show.daterangepicker", function() {
		// console.log("show.daterangepicker");
		jQuery('.yearselect').css("float", "left");
		jQuery('.monthselect').css("float", "right");
	});
		
	// 캘린더 '확인' 선택 시 
	jQuery(id).on("apply.daterangepicker", function(ev, picker) {
		// console.log("apply.daterangepicker : " + stimeVal);
		picker.autoApply;
		stimeVal = jQuery(id).val();	
		
		// 사용자가 달력에서 날짜 [확인] 버튼 클릭 시 라디오 버튼 [사용자 지정] 세팅.
		for(let i=0; i<periodTags.length; i++){
			if(periodTags.eq(i).attr('value') == 0){
				periodTags.eq(i).prop('checked', true);
			}else{
				periodTags.eq(i).prop('checked', false);
			}
		}		
	});  

	// 캘린더 '취소' 선택 시 클리어
	jQuery(id).on("cancel.daterangepicker", function(ev, picker) {
		// console.log("cancel.daterangepicker : " + stimeVal);
		picker.autoApply;
		jQuery(id).val('');
		stimeVal = jQuery(id).val();
	});  
	stimeVal = jQuery(id).val();
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

			// console.log(tagArea)
			// li 태그 만들기 	<li class="optionItem curv" data-value="코드값"	>코드명</li>
			itemList.forEach((item)=>{
				// console.log("item.value : " + item.value);
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


