const hsl2rgb = require('../hsl/hsl2rgb');
const lab2rgb = require('../lab/lab2rgb');
const lch2rgb = require('../lch/lch2rgb');
const oklab2rgb = require('../oklab/oklab2rgb');
const oklch2rgb = require('../oklch/oklch2rgb');
const input = require('../input');

const RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
const RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_LABA = /^lab\(\s*(\d+(?:\.\d+)?)%?\s* (-?\d+(?:\.\d+)?)%?\s* \s*(-?\d+(?:\.\d+)?)%?\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;
const RE_LCHA = /^lch\(\s*(\d+(?:\.\d+)?)%?\s* (\d+(?:\.\d+)?)%?\s* \s*(-?\d+(?:\.\d+)?)\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;
const RE_OKLABA = /^oklab\(\s*(\d+(?:\.\d+)?%?)\s* (-?\d+(?:\.\d+)?%?)\s* \s*(-?\d+(?:\.\d+)?%?)\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;
const RE_OKLCHA = /^oklch\(\s*(\d+(?:\.\d+)?%?)\s* (\d+(?:\.\d+)?%?)\s* \s*(-?\d+(?:\.\d+)?)\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;

const {round, abs} = Math;

const css2rgb = (css) => {
    css = css.toLowerCase().trim();
    let m;

    if (input.format.named) {
        try {
            return input.format.named(css);
        } catch (e) {
            // eslint-disable-next-line
        }
    }

    // rgb(250,20,0)
    if ((m = css.match(RE_RGB))) {
        const rgb = m.slice(1,4);
        for (let i=0; i<3; i++) {
            rgb[i] = Number(rgb[i]);
        }
        rgb[3] = 1;  // default alpha
        return rgb;
    }

    // rgba(250,20,0,0.4)
    if ((m = css.match(RE_RGBA))) {
        const rgb = m.slice(1,5);
        for (let i=0; i<4; i++) {
            rgb[i] = Number(rgb[i]);
        }
        return rgb;
    }

    // rgb(100%,0%,0%)
    if ((m = css.match(RE_RGB_PCT))) {
        const rgb = m.slice(1,4);
        for (let i=0; i<3; i++) {
            rgb[i] = round(Number(rgb[i]) * 2.55);
        }
        rgb[3] = 1;  // default alpha
        return rgb;
    }

    // rgba(100%,0%,0%,0.4)
    if ((m = css.match(RE_RGBA_PCT))) {
        const rgb = m.slice(1,5);
        for (let i=0; i<3; i++) {
            rgb[i] = round(Number(rgb[i]) * 2.55);
        }
        rgb[3] = Number(rgb[3]);
        return rgb;
    }

    // hsl(0,100%,50%)
    if ((m = css.match(RE_HSL))) {
        const hsl = m.slice(1,4);
        for (let i = 0; i <= 2; i++) {hsl[i] = Number(hsl[i]);}
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        rgb[3] = 1;
        return rgb;
    }

    // hsla(0,100%,50%,0.5)
    if ((m = css.match(RE_HSLA))) {
        const hsl = m.slice(1,4);
        for (let i = 0; i <= 2; i++) {hsl[i] = Number(hsl[i]);}
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        rgb[3] = Number(m[4]);  // default alpha = 1
        return rgb;
    }
    
    // lab(48.25% -28.85% -8.48% / 1)
    if ((m = css.match(RE_LABA))) {
        const lab = m.slice(1,4);
        for (let i = 0; i <= 2; i++) {lab[i] = Number(lab[i]);}
        const rgb = lab2rgb(lab).map((i) => abs(round(i)));
        rgb[3] = Number(m[4]); // default alpha = 1
        if (!rgb[3] && rgb[3] !== 0) {rgb[3] = 1;}
        return rgb;
    }
    
    // lch(54.31% 9.27% 194.77 / 1)
    if ((m = css.match(RE_LCHA))) {
        const lch = m.slice(1,4);
        for (let i = 0; i <= 2; i++) {lch[i] = Number(lch[i]);}
        const rgb = lch2rgb(lch).map((i) => abs(round(i)));
        rgb[3] = Number(m[4]); // default alpha = 1
        if (!rgb[3] && rgb[3] !== 0) {rgb[3] = 1;}
        return rgb;
    }
    
    // oklab(54.31% -8.96% -2.36% / 1)
    if ((m = css.match(RE_OKLABA))) {
        const lab = m.slice(1,4);
        for (let i = 0; i <= 2; i++) {
            if (lab[i].endsWith('%')) {lab[i] = Number(lab[i].replace('%', '')) * 0.01;}
            else {lab[i] = Number(lab[i]);}
        }
        const rgb = oklab2rgb(lab).map((i) => abs(round(i)));
        rgb[3] = Number(m[4]); // default alpha = 1
        if (!rgb[3] && rgb[3] !== 0) {rgb[3] = 1;}
        return rgb;
    }
    
    // oklch(54.31% 9.27% 194.77 / 1)
    if ((m = css.match(RE_OKLCHA))) {
        const lch = m.slice(1,4);
        for (let i = 0; i <= 1; i++) {
            if (lch[i].endsWith('%')) {
                lch[i] = Number(lch[i].replace('%', '')) * 0.01;
                if (i === 1) {lch[i] *= 0.4;}
            } else {lch[i] = Number(lch[i]);}
        }
        const rgb = oklch2rgb(lch).map((i) => abs(round(i)));
        rgb[3] = Number(m[4]); // default alpha = 1
        if (!rgb[3] && rgb[3] !== 0) {rgb[3] = 1;}
        return rgb;
    }
}

css2rgb.test = (s) => {
    return RE_RGB.test(s) ||
        RE_RGBA.test(s) ||
        RE_RGB_PCT.test(s) ||
        RE_RGBA_PCT.test(s) ||
        RE_HSL.test(s) ||
        RE_HSLA.test(s) ||
        RE_LABA.test(s) ||
        RE_LCHA.test(s) ||
        RE_OKLABA.test(s) ||
        RE_OKLCHA.test(s);
}

module.exports = css2rgb;
