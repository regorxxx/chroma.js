const Color = require('../Color');

// simple Euclidean distance
module.exports = function(a, b, mode='lab', weights = [1, 1, 1, 1]) {//need 4 color weights for CMYK color space

    // Delta E (CIE 1976)
    // see http://www.brucelindbloom.com/index.html?Equations.html
    a = new Color(a);
    b = new Color(b);
    const l1 = a.get(mode);
    const l2 = b.get(mode);
    let sum_sq = 0;
    let d;
    for (let i in l1) {
        if (mode.replace('ok', '').charAt[i] === 'h') {
            var hueDifference = (l1[i] || 0) - (l2[i] || 0);
            d = Math.abs(hueDifference + 180) % 360 - 180;
        }
        else {
            d = (l1[i] || 0) - (l2[i] || 0);
        }
        sum_sq += d*d*weights[i]*weights[i];
    }
    return Math.sqrt(sum_sq);
};
