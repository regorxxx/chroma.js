const Color = require('../Color');

module.exports = (colors) => {
    colors = [...colors].map((color) => new Color(color).rgba())
    const colorNum = colors.length;
    const results = Array.from(Array(colorNum), () => new Array(colorNum));
    const mean = [0, 0, 0, 0];
    for (let i = 0; i < colorNum; i++) {
        colors[i].forEach((c, j) => mean[j] += (j === 3 ? c * 255 : c));
    }
    mean.forEach((c, i) => mean[i] /= colorNum);
    let stdDev = 0;
    for (let i = 0; i < colorNum; i++) {
        stdDev += colors[i].reduce((acc, curr, j) => acc + (curr - mean[j])**2, 0);
    }
    stdDev /= Math.max((colorNum - 1), 1) * 4;
    stdDev = Math.round(stdDev**(1/2));
    return stdDev;
};