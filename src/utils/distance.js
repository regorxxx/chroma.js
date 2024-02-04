const Color = require('../Color');

// simple Euclidean distance
module.exports = function(a, b, mode='lab', weights=null) {
    if (weights) { //needs 4 color weights for CMYK color space
        const inputWeights = weights;
        weights = new Array(4).fill(1);
        inputWeights.slice(0,4).forEach((w, i) => {
            if (!isNaN(w)) {weights[i] = w;}
        });
    } else {weights = Array(4).fill(1);}
    // Delta E (CIE 1976)
    // see http://www.brucelindbloom.com/index.html?Equations.html
    a = new Color(a);
    b = new Color(b);
    const l1 = a.get(mode);
    const l2 = b.get(mode);
    const intMode = mode.replace(/(^ok)/gi, ''); // OKLCH behaves like LCH
    let sum_sq = 0;
    let d;
    for (let i in l1) {
        if (intMode.charAt[i] === 'h') {
            const hueDifference = (l1[i] || 0) - (l2[i] || 0);
            d = Math.abs(hueDifference + 180) % 360 - 180;
        }
        else {
            d = (l1[i] || 0) - (l2[i] || 0);
        }
        sum_sq += d*d*weights[i]*weights[i];
    }
    return Math.sqrt(sum_sq);
};
