import {debouncedTopScrollData} from "../../../lib/store.js";

/**
 * 디바운싱 적용된 웹 수직 스크롤 기능
 * 특정 위치로 일정시간동안 입력받는 웹의 수직 스크롤 요청을 일정시간 모았다가,
 * 마지막 요청 후 일정시간 뒤 까지 추가적인 요청이 없으면, 요청받은 스크롤 위치 중에서 가장 상단으로 스크롤 한다.
 * @param scrollTo : int - 스크롤할 목표위치 (-300 보정 들어감)
 */
export const debouncedTopScroll = (scrollTo) => {
    scrollTo = (scrollTo - 300) < 0 ? 0 : scrollTo - 300;
    debouncedTopScrollData.update(obj => {
        if (obj.timeout) {
            clearTimeout(obj.timeout);
        }
        if (obj.scrollTo > scrollTo || obj.scrollTo === null) {
            obj.scrollTo = scrollTo;
        }
        obj.timeout = setTimeout(() => {
            window.scroll({
                top: obj.scrollTo,
                behavior: 'smooth'
            });
            debouncedTopScrollData.set({
                timeout: null,
                scrollTo: null,
            });
        }, 100);
        return obj;
    });
};