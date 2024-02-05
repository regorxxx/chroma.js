const {unpack, last} = require('../../utils');
const rnd = (a) => Math.round(a*100)/100;

/*
 * supported arguments:
 * - lab2css(l,c,h)
 * - lab2css(l,c,h,a)
 * - lab2css([l,c,h], mode)
 * - lab2css([l,c,h,a], mode)
 * - lab2css({l,c,h,a}, mode)
 */
const lab2css = (...args) => {
    const laba = unpack(args, 'lab');
    let mode = last(args) || 'lab';
    laba[0] = rnd(laba[0]) + '%';
    laba[1] = rnd(laba[1]) + '%';
    laba[2] = rnd(laba[2]) + '%';
    if (mode === 'laba' || (laba.length > 3 && laba[3]<1)) {
        laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
    } else {
        laba.length = 3;
    }
    return `lab(${laba.join(' ')})`;
}

module.exports = lab2css;

