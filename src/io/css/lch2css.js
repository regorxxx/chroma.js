const {unpack, last} = require('../../utils');
const rnd = (a) => Math.round(a*100)/100;

/*
 * supported arguments:
 * - lch2css(l,c,h)
 * - lch2css(l,c,h,a)
 * - lch2css([l,c,h], mode)
 * - lch2css([l,c,h,a], mode)
 * - lch2css({l,c,h,a}, mode)
 */
const lch2css = (...args) => {
    const lcha = unpack(args, 'lch');
    let mode = last(args) || 'lch';
    lcha[0] = rnd(lcha[0]) + '%';
    lcha[1] = rnd(lcha[1]) + '%';
    lcha[2] = rnd(lcha[2] || 0);
    if (mode === 'lcha' || (lcha.length > 3 && lcha[3]<1)) {
        lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
    } else {
        lcha.length = 3;
    }
    return `lch(${lcha.join(' ')})`;
}

module.exports = lch2css;

