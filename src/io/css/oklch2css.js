const {unpack, last} = require('../../utils');
const rnd = (a) => Math.round(a*100)/100;
const {min} = Math;

/*
 * supported arguments:
 * - oklch2css(l,c,h)
 * - oklch2css(l,c,h,a)
 * - oklch2css([l,c,h], mode)
 * - oklch2css([l,c,h,a], mode)
 * - oklch2css({l,c,h,a}, mode)
 */
const oklch2css = (...args) => {
    const lcha = unpack(args, 'lch');
    let mode = last(args) || 'lch';
    lcha[0] = rnd(lcha[0]*100) + '%';
    lcha[1] = min(rnd(lcha[1] / 0.4 *100), 100) + '%';
    lcha[2] = rnd(lcha[2] || 0);
    if (mode === 'lcha' || (lcha.length > 3 && lcha[3]<1)) {
        lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
    } else {
        lcha.length = 3;
    }
    return `oklch(${lcha.join(' ')})`;
}

module.exports = oklch2css;

