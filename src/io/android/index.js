const chroma = require('../../chroma');
const Color = require('../../Color');
const input = require('../input');
const {unpack, type} = require('../../utils');
const {round} = Math;

Color.prototype.android = function(alpha=false, rnd=true) {
    const [r, g, b, a] = this._rgb.slice(0,alpha ? 4: 3).map((v,i) => {
        return i<3 ? (rnd === false ? v : round(v)) : v;
    });
    return alpha ? ((a << 24) | (r << 16) | (g << 8) | (b)) : (0xff000000 | (r << 16) | (g << 8) | (b));
};

chroma.android = (...args) => new Color(...args, 'android');

input.format.android = (and) => {
    if (type(and) == "number") {
        const a = and - 0xFF000000;
        if (a >= 0 && a <= 0xFFFFFF) {
            const r = a >> 16 & 0xFF;
            const g = (a >> 8) & 0xFF;
            const b = a & 0xFF;
            return [r,g,b, (and >> 24) & 0xFF];
        }
    }
    throw new Error("unknown android color: "+and);
};

input.autodetect.push({
    p: 5,
    test: (...args) => {
        if (args.length === 1 && type(args[0]) === 'number') {
            const a = args[0] - 0xFF000000;
            if (a >= 0 && a <= 0xFFFFFF) {
                const r = a >> 16 & 0xFF;
                const g = (a >> 8) & 0xFF;
                const b = a & 0xFF;
                if ([r,g,b].every((val) => val >= 0 && val <= 0xFFFFFF)) {
                    return 'num';
                }
            }
        }
    }
});