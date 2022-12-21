export const scrollTo = (height: number): void => {
    if (typeof document === 'undefined') return;
    const c = document.querySelector("#content");
    if (c) {
        c.scrollTop = height
    }
};