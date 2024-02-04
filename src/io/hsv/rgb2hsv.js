const {unpack} = require('../../utils');
const {min,max} = Math;
const chroma = require('../../chroma');

/*
 * supported arguments:
 * - rgb2hsv(r,g,b)
 * - rgb2hsv([r,g,b])
 * - rgb2hsv({r,g,b})
 */
const rgb2hsl = (...args) => {
    args = unpack(args, 'rgb');
    let [r,g,b] = args;
    const min_ = min(r, g, b);
    const max_ = max(r, g, b);
    const delta = max_ - min_;
    let h,s,v;
    v = max_ / 255.0;
    if (max_ === 0) {
        h = chroma.hueNaN ? Number.NaN : 0;
        s = 0;
    } else {
        s = delta / max_;
        if (r === max_) h = (g - b) / delta;
        if (g === max_) h = 2+(b - r) / delta;
        if (b === max_) h = 4+(r - g) / delta;
        h *= 60;
        if (h < 0) h += 360;
        else if (!chroma.hueNaN && isNaN(h)) {h = 0;}
    }
    return [h, s, v]
}

module.exports = rgb2hsl;
