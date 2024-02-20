const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const palette = require('../src/utils/palette');
const Color = require('../src/Color');;

const tests = {
    hex: {in: ['#D2691E', '#8B4513', '#A0522D','#0000FF', '#668B8B', '#FFC0CB'], 
        method: 'deltaE', n: 2, out: ['#0000FF', '#FFC0CB']},
    rgba: {in: [[210,105,30,1],[139,69,19,1],[160,82,45,1],[0,0,255,1],[102,139,139,1],[255,192,203,1]],
        method: 'deltaE', n: 2, out: [[0,0,255,1],[255,192,203,1]]},
    chromacolor: {in:  ['#D2691E', '#8B4513', '#A0522D', '#0000FF', '#668B8B', '#FFC0CB'].map((color) => new Color(color)), 
        method: 'deltaE', n: 2, out:  ['#0000FF', '#FFC0CB'].map((color) => new Color(color))},
};

const batch = {};

Object.keys(tests).forEach(key => {
    batch[`palette ${key}`] = {
        topic: tests[key],
        array(topic) {
            assert.deepStrictEqual(palette(topic.in, topic.method, topic.n), topic.out);
        },
    }
})

vows
    .describe('Testing palette generation')
    .addBatch(batch)
    .export(module);
