const {unpack, last} = require('../../utils');
const hsl2css = require('./hsl2css');
const rgb2hsl = require('../hsl/rgb2hsl');
const lch2css = require('./lch2css');
const rgb2lch = require('../lch/rgb2lch');
const lab2css = require('./lab2css');
const rgb2lab = require('../lab/rgb2lab');
const oklab2css = require('./oklab2css');
const rgb2oklab = require('../oklab/rgb2oklab');
const oklch2css = require('./oklch2css');
const rgb2oklch = require('../oklch/rgb2oklch');
const {round} = Math;

/*
 * supported arguments:
 * - rgb2css(r,g,b)
 * - rgb2css(r,g,b,a)
 * - rgb2css([r,g,b], mode)
 * - rgb2css([r,g,b,a], mode)
 * - rgb2css({r,g,b,a}, mode)
 */
const rgb2css = (...args) => {
    const rgba = unpack(args, 'rgba');
    let mode = last(args) || 'rgb';
    if (mode.substring(0,3) == 'hsl') {
        return hsl2css(rgb2hsl(rgba), mode);
    } else if (mode.substring(0,3) == 'lch') {
        return lch2css(rgb2lch(rgba), mode);
    } else if (mode.substring(0,3) == 'lab') {
        return lab2css([...rgb2lab(rgba), rgba.length > 3 ? rgba[3] : 1], mode);
    }else if (mode.substring(0,5) == 'oklab') {
        return oklab2css([...rgb2oklab(rgba), rgba.length > 3 ? rgba[3] : 1], 'lab');
    } else if (mode.substring(0,5) == 'oklch') {
        return oklch2css([...rgb2oklch(rgba), rgba.length > 3 ? rgba[3] : 1], 'lch');
    }
    rgba[0] = round(rgba[0]);
    rgba[1] = round(rgba[1]);
    rgba[2] = round(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return `${mode}(${rgba.slice(0,mode==='rgb'?3:4).join(',')})`;
}

module.exports = rgb2css;
