const chroma = require('../chroma');
const Color = require('../Color');;
const {round} = Math;

module.exports = function(colors, mode, n) {
    let callback = '';
    switch (mode.toLowerCase()) {
        case 'c':
		case 'contrast':
            callback = chroma.contrast;
            break;
        case 'd':
		case 'distance':
            callback = chrom.distance;
            break;
        case 'deltae':
        case 'de':
        default:
            callback = chroma.deltaE;
    }
    return _colorVariance(colors, callback)
        .map((val, i) => { return { var: val, color: colors[i] }; })
        .sort((a, b) => b.var - a.var)
        .slice(0, n)
        .map((r) => r.color);
};

function _colorVariance(colors, callback) {
    const palette = [...colors].map((color) => new Color(color).rgba());
    const colorNum = colors.length;
    const results = Array.from(Array(colorNum), () => new Array(colorNum));
    for (let i = 0; i < colorNum; i++) {
        results[i][i] = 0;
        for (let j = i + 1; j < colorNum; j++) {
            results[j][i] = results[i][j] = round(callback(palette[i], palette[j]));
        }
    }
    results.forEach((variances, i) => results[i] = variances.reduce((acc, curr) => acc + curr, 0));
    return results;
}
