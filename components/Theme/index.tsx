import {
    GetBaseCss,
    GetDarkCss,
    GetLightCss
} from './Theme'

const css = GetBaseCss();
const darkCss = GetDarkCss();
const lightCss = GetLightCss();

export const Theme = () => {
    const mode = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) 
        ? 'dark'
        : 'light';
        
    return <style id="stitches" dangerouslySetInnerHTML={{ __html: css + '\n' + mode === "light" ? lightCss : darkCss }} />
}