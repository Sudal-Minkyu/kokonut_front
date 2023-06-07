/**
 * 넥스티에서 퍼블리싱되어 온 셀렉트 박스 기능의 모듈화
 * selectBox 클래스가 존재하는 요소에 use:SelectBoxManager={선택시동작함수} 형식으로 호출하여 사용하면 된다.
 * @param targetEl: element - 액션함수가 작동할 때 액션함수가 걸린 대상요소
 * @param onSelect: function - 셀렉트 박스가 선택되었을 때 선택된 셀렉트 옵션 요소를 던져줄 콜백
 * @returns {{destroy(): void}|{}}
 * @constructor
 */
export const SelectBoxManager = (targetEl, onSelect = () => {}) => {
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
        onSelect(item);
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