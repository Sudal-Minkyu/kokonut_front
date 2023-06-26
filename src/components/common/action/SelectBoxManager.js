/**
 * 넥스티에서 퍼블리싱되어 온 셀렉트 박스 기능의 모듈화
 * selectBox 클래스가 존재하는 요소에 use:SelectBoxManager={옵션객체} 형식으로 호출하여 사용하면 된다.
 * @param targetEl: element - 액션함수가 작동할 때 액션함수가 걸린 대상요소
 * @param props : object - callback, readOnly 등이 정의된 옵션객체
 * @returns {{destroy(): void}|{}}
 * @constructor
 */
export const SelectBoxManager = (targetEl, props) => {
    const defaultProps = {
        callback: () => {}, // 박스의 선택 대상이 바뀔 때 실행될 함수
        readOnly: false, // true 일 경우 박스는 동작하지 않는다.
    }
    const {callback, readOnly} = {...defaultProps, ...props};

    if (readOnly) {
        return;
    }

    let label;
    for (const el of targetEl.childNodes) {
        if (el.nodeType === 1 && el.classList.contains('label')) {
            label = el;
            break;
        }
    }
    if (!label) {
        alert('적용하는 대상의 구조가 잘못되었습니다.');
        return {};
    }

    let optionList = label.nextElementSibling;
    let optionItems = optionList.querySelectorAll('.optionItem');
    const handleSelectBoxClick = () => {
        clickLabel(label, optionItems);
    }

    label.addEventListener('click', handleSelectBoxClick);
    optionList.addEventListener('click', (event) => {
        if (event.target.classList.contains('optionItem')) {
            handleSelect(event.target);
        }
    });

    const handleBackgroundClick = (event) => {
        if (!label.contains(event.target) && !optionList.contains(event.target)) {
            label.parentNode.classList.remove('active');
        }
    }
    document.addEventListener('click', handleBackgroundClick);

    const clickLabel = () => {
        if(label.parentNode.classList.contains('active')) {
            label.parentNode.classList.remove('active');
        } else {
            label.parentNode.classList.add('active');
        }
    }

    const handleSelect = (item) => {
        label.innerHTML = item.textContent;
        label.parentNode.classList.remove('active');
        callback(item);
    }

    return {
        destroy() {
            label.removeEventListener('click', handleSelectBoxClick);
            optionList.removeEventListener('click', (event) => {
                if (event.target.classList.contains('optionItem')) {
                    handleSelect(event.target);
                }
            });
            document.removeEventListener('click', handleBackgroundClick);
        }
    };
};