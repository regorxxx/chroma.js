
const chroma = (...args) => {
	return new chroma.Color(...args);
};

chroma.Color = require('./Color');
chroma.version = '@@version';
chroma.hueNaN = true; // Whether treat black/white as having NaN hue or zero on specific color spaces (LCH, ...)

module.exports = chroma;
