const {type} = require('../../utils');

const and2rgb = (and) => {
    if (type(and) == "number") {
        const alpha = (and >> 24 & 0xFF) / 255;
        if (alpha >= 0 && alpha <= 1) {
			const a = and - 0xFF000000;
            const r = a >> 16 & 0xFF;
            const g = (a >> 8) & 0xFF;
            const b = a & 0xFF;
            return [r,g,b,alpha];
        }
    }
    throw new Error("unknown android color: "+and);
}

module.exports = and2rgb;