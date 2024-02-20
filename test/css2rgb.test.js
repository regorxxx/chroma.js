const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const css2rgb = require('../src/io/css/css2rgb');

// const round = (digits) => {
//     const d = Math.pow(10,digits);
//     return (v) => Math.round(v*d) / d;
// }

vows
    .describe('Testing CSS2RGB color conversions')
    .addBatch({
        'parse CSS colors': {
            topic: {
                'rgb(0,0,0)': [0,0,0,1],
                'rgb(100%,100%,100%)': [255,255,255,1],
                'foobarrgb(100%,100%,100%)': undefined,
                'rgba(255,0,0,0.5)': [255,0,0,0.5],
                'RGBA(255, 0, 0  , 0.5)': [255,0,0,0.5],
                'RGBA (255, 0, 0  , 0.5)': undefined,
                'rgba(0%,100%,0%,.5)': [0,255,0,0.5],
                ' hsl(240,100%,50%) ': [0,0,255,1],
                'hsl(60,100%,50%)': [255,255,0,1],
                'hsla(180,100%,50%,1)': [0,255,255,1],
                'lab(48.25% -28.85% -8.48% / 1)': [0,128,128,1],
                'lch(48.25% 30.07% 196.38 / 1)': [0,128,128,1],
                'oklab(54.31% -8.96% -2.36%)': [0,128,128,1],
                'oklch(54.31% 23.18% 194.77)': [0,128,128,1],
                blanchedalmond: [255,235,205,1],
                blue: [0,0,255,1],
                BlueViolet: [138,43,226,1],
                BROWN: [165,42,42,1],
                unknownColor: undefined
            },
            parse(t) {
                Object.keys(t).forEach(name => assert.deepStrictEqual(css2rgb(name), t[name]));
            }
        }
    })
    .export(module);
