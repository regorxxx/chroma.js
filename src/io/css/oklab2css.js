const {unpack, last} = require('../../utils');
const rnd = (a) => Math.round(a*100)/100;

/*
 * supported arguments:
 * - oklab2css(l,c,h)
 * - oklab2css(l,c,h,a)
 * - oklab2css([l,c,h], mode)
 * - oklab2css([l,c,h,a], mode)
 * - oklab2css({l,c,h,a}, mode)
 */
const oklab2css = (...args) => {
    const laba = unpack(args, 'lab');
    let mode = last(args) || 'lab';
    laba[0] = rnd(laba[0]*100) + '%';
    laba[1] = rnd(laba[1]*100) + '%';
    laba[2] = rnd(laba[2]*100) + '%';
    if (mode === 'laba' || (laba.length > 3 && laba[3]<1)) {
        laba[3] = '/' + (laba.length > 3 ? laba[3] : 1);
    } else {
        laba.length = 3;
    }
    return `oklab(${laba.join(' ')})`;
}

module.exports = oklab2css;

