const {unpack} = require('../../utils');
const chroma = require('../../chroma');

const rgb2hcg = (...args) => {
    const [r,g,b] = unpack(args, 'rgb');
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    const c = delta * 100 / 255;
    const _g = min / (255 - delta) * 100;
    let h;
    if (delta === 0) {
        h = chroma.hueNaN ? Number.NaN : 0;
    } else {
        if (r === max) h = (g - b) / delta;
        if (g === max) h = 2+(b - r) / delta;
        if (b === max) h = 4+(r - g) / delta;
        h *= 60;
        if (h < 0) h += 360
        else if (!chroma.hueNaN && isNaN(h)) {h = 0;}
    }
    return [h, c, _g];
}

module.exports = rgb2hcg;
