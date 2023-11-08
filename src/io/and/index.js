const chroma = require('../../chroma');
const Color = require('../../Color');
const input = require('../input');
const {unpack, type} = require('../../utils');
const {round} = Math;

const rgb2and = require('./rgb2and');

Color.prototype.android = function(mode) {
    return rgb2and(this._rgb, mode);
};

chroma.android = (...args) => new Color(...args, 'android');

input.format.android = require('./and2rgb');

input.autodetect.push({
    p: 5,
    test: (...args) => {
        if (args.length === 1 && type(args[0]) === 'number') {
            const alpha = (args[0] >> 24 & 0xFF) / 255;
            if (alpha >= 0 && alpha <= 1) {
                const a = args[0] - 0xFF000000;
                const r = a >> 16 & 0xFF;
                const g = (a >> 8) & 0xFF;
                const b = a & 0xFF;
                if ([r,g,b].every((val) => val >= 0 && val <= 255)) {
                    return 'android';
                }
            }
        }
    }
});