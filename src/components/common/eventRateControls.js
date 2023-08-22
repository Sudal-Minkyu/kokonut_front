export const debounce200 = (func) => {
    return debounce(func, 200);
}

// 200ms 동안 이벤트를 기다렸다가, 여러번 요청이 있을 경우 한번만 이행
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
