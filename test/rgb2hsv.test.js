const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const rgb2hsv = require('../src/io/hsv/rgb2hsv');
const chroma = require('../src/chroma');

const tests = {
    black:        { hsv: [NaN,0,0],   rgb: [0,0,0,1]},
    white:        { hsv: [NaN,0,1],   rgb: [255,255,255,1]},
    gray:         { hsv: [NaN,0,0.5], rgb: [127.5,127.5,127.5,1]},
    blackZeroHue: { hsv: [0,0,0],     rgb: [0,0,0,1],             noHueAsZero: true},
    whiteZeroHue: { hsv: [0,0,1],     rgb: [255,255,255,1],       noHueAsZero: true},
    grayZeroHue:  { hsv: [0,0,0.5],   rgb: [127.5,127.5,127.5,1], noHueAsZero: true},
    red:          { hsv: [0,1,1],     rgb: [255,0,0,1]},
    yellow:       { hsv: [60,1,1],    rgb: [255,255,0,1]},
    green:        { hsv: [120,1,1],   rgb: [0,255,0,1]},
    cyan:         { hsv: [180,1,1],   rgb: [0,255,255,1]},
    blue:         { hsv: [240,1,1],   rgb: [0,0,255,1]},
    magenta:      { hsv: [300,1,1],   rgb: [255,0,255,1]},
};

const batch = {};

Object.keys(tests).forEach(key => {
    batch[`rgb2hsv ${key}`] = {
        topic: tests[key],
        array(topic) {
            chroma.noHueAsZero(topic.noHueAsZero || false);
            assert.deepStrictEqual(rgb2hsv(topic.rgb), topic.hsv);
        },
        obj(topic) {
            let [r,g,b] = topic.rgb;
            chroma.noHueAsZero(topic.noHueAsZero || false);
            assert.deepStrictEqual(rgb2hsv({r,g,b}), topic.hsv);
        },
        args(topic) {
            chroma.noHueAsZero(topic.noHueAsZero || false);
            assert.deepStrictEqual(rgb2hsv.apply(null, topic.rgb), topic.hsv);
        }
    }
});

vows
    .describe('Test rgb2hsv color conversions')
    .addBatch(batch)
    .export(module);
