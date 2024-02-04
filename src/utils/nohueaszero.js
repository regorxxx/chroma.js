const chroma = require('../chroma');

module.exports = (bNoHueAsZero=false) => {
    chroma.hueNaN = !bNoHueAsZero; // Whether treat black/white/gray as having NaN hue or Zero on specific color spaces (LCH, ...)
    return !chroma.hueNaN;
};
