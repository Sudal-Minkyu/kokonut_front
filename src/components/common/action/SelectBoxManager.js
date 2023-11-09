const defaultProps = {
    callback: () => {}, // 박스의 선택 대상이 바뀔 때 실행될 함수
    readOnly: false, // true 일 경우 박스는 동작하지 않는다.
}

/**
 * 넥스티에서 퍼블리싱되어 온 셀렉트 박스 기능의 모듈화
 * selectBox 클래스가 존재하는 요소에 use:SelectBoxManager={옵션객체} 형식으로 호출하여 사용하면 된다.
 * @param targetEl : element - 액션함수가 작동할 때 액션함수가 걸린 대상요소
 * @param props : object - callback, readOnly 등이 정의된 옵션객체
 * @returns {{destroy(): void}|{}}
 * @constructor
 */
export const SelectBoxManager = (targetEl, props = {}) => {
    const box = {
        label: null,
        optionList: null,
        optionItems: null,
        isCurrentlyActivated: false,
        props: {...defaultProps, ...props},
    }
    for (const el of targetEl.childNodes) {
        if (el.nodeType === 1 && el.classList.contains('label')) {
            box.label = el;
            break;
        }
    }

    if (!box.label) {
        alert('적용하는 대상의 구조가 바르지 않습니다.');
        return {};
    }

    box.optionList = box.label.nextElementSibling;
    box.optionItems = box.optionList.querySelectorAll('.optionItem');
    box.props = {...defaultProps, ...props};

    // 첫 구동시 readOnly가 false 상태인 경우 박스의 활성화
    if (!box.props.readOnly) {
        activateBox(box);
    }

    return {
        // 컴포넌트가 dismount 될 때의 활성화된 컴포넌트를 해제한다.
        destroy() {
            if (box.isCurrentlyActivated) {
                destroyBox(box);
            }
        },
        // 컴포넌트에 전달된 props 의 속성이 변경될 때 박스의 활성화나 비활성화가 되도록 조치
        update(newProps) {
            console.log("여기동", box.label);
            box.props = {...defaultProps, ...newProps};
            if (box.isCurrentlyActivated && box.props.readOnly) {
                destroyBox(box);
            } else if(!box.isCurrentlyActivated && !box.props.readOnly) {
                activateBox(box);
            }
        },
    };
};

// 셀렉트 박스 활성화 하기
const activateBox = (box) => {
    box.isCurrentlyActivated = true;
    box.label.addEventListener('click', () => {handleSelectBoxClick(box)});
    box.optionList.addEventListener('click', (event) => {
        if (event.target.classList.contains('optionItem')) {
            handleSelect(event.target, box);
        }
    });
    document.addEventListener('click', (e) => {handleBackgroundClick(e, box)});
}

// 셀렉트 박스 비활성화 하기
const destroyBox = (box) => {
    box.isCurrentlyActivated = false;
    box.label.removeEventListener('click', () => {handleSelectBoxClick(box)});
    box.optionList.removeEventListener('click', (event) => {
        if (event.target.classList.contains('optionItem')) {
            handleSelect(event.target, box);
        }
    });
    document.removeEventListener('click', (e) => {handleBackgroundClick(e, box)});
}

// clickLabel 함수에 인자를 동반한 이벤트 설정을 위함
const handleSelectBoxClick = (box) => {
    clickLabel(box);
}

// 박스 외부를 클릭했을 때 박스가 닫히도록
const handleBackgroundClick = (event, box) => {
    if (!box.label.contains(event.target) && !box.optionList.contains(event.target)) {
        box.label.parentNode.classList.remove('active');
    }
}

// 셀렉트 박스 요소에 대한 클릭에 따라 옵션 요소들을 보일지 말지에 대해 결정
const clickLabel = (box) => {
    if (box.label.parentNode.classList.contains('active')) {
        box.label.parentNode.classList.remove('active');
    } else {
        box.label.parentNode.classList.add('active');
    }
}

// 옵션 선택에 따라, 셀렉트 박스의 내용을 변경하고, 보여주던 옵션 리스트들을 닫히게 하고, 옵션에 따른 콜백이 실행되도록
const handleSelect = (item, box) => {
    box.label.innerHTML = item.textContent;
    box.label.parentNode.classList.remove('active');
    box.props.callback(item);
}
