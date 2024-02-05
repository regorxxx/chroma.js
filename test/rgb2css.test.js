const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const rgb2css = require('../src/io/css/rgb2css');

const tests = {
    black: { rgb: [0,0,0], css: 'rgb(0,0,0)' },
    red: { rgb: [255,0,0], css: 'rgb(255,0,0)' },
    auto_rgba: { rgb: [255,0,0,0.25], css: 'rgba(255,0,0,0.25)' },
    force_rgba: { rgb: [255,0,0], mode:'rgba', css: 'rgba(255,0,0,1)' },
    hsl: { rgb: [255,0,0], mode:'hsl', css: 'hsl(0,100%,50%)' },
    auto_hsla: { rgb: [255,0,0,0.5], mode:'hsl', css: 'hsla(0,100%,50%,0.5)' },
    force_hsla: { rgb: [255,255,0,0.75], mode:'hsl', css: 'hsla(60,100%,50%,0.75)' },
    lab: { rgb: [255,255,0], mode:'lab', css: 'lab(97.14% -21.55% 94.48%)' },
    lch: { rgb: [255,255,0], mode:'lch', css: 'lch(97.14% 96.91% 102.85)' },
    oklab: { rgb: [255,255,0], mode:'oklab', css: 'oklab(96.8% -7.14% 19.86%)' },
    oklch: { rgb: [255,255,0], mode:'oklch', css: 'oklch(96.8% 21.1% 109.77)' },
    laba: { rgb: [255,255,0,0.75], mode:'lab', css: 'lab(97.14% -21.55% 94.48% / 0.75)' },
    lcha: { rgb: [255,255,0,0.75], mode:'lch', css: 'lch(97.14% 96.91% 102.85)' },
    oklaba: { rgb: [255,255,0,0.75], mode:'oklab', css: 'oklab(96.8% -7.14% 19.86% / 0.75)' },
    oklcha: { rgb: [255,255,0,0.75], mode:'oklch', css: 'oklch(96.8% 21.1% 109.77 / 0.75)' },
};

const batch = {};

Object.keys(tests).forEach(key => {
    batch[key] = {
        topic: tests[key],
        array(topic) {
            assert.equal(rgb2css(topic.rgb, topic.mode || 'rgb'), topic.css);
        },
        obj(topic) {
            let [r,g,b] = topic.rgb;
            let obj = {r,g,b,...(topic.rgb.length>3 ? {a:topic.rgb[3]}:{})};
            assert.equal(rgb2css(obj, topic.mode), topic.css);
        },
        args(topic) {
            if (topic.mode != 'rgb') return;
            assert.deepStrictEqual(rgb2css.apply(null, topic.rgb), topic.hex);
        }
    }
});

vows
    .describe('Testing rgb2css color conversions')
    .addBatch(batch)
    .export(module);
