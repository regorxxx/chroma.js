const {unpack, last} = require('../../utils');
const {round} = Math;

const rgb2and = (...args) => {
    const rgba = unpack(args, 'rgba');
    let mode = last(args) || 'rgb';
    rgba[0] = round(rgba[0]);
    rgba[1] = round(rgba[1]);
    rgba[2] = round(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return 	mode === 'rgba' 
		? ((rgba[3] << 24) | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2])) 
		: (0xff000000 | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2]));
}

module.exports = rgb2and;