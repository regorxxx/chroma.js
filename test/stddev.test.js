const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const stdDeviation = require('../src/utils/deviation');
const Color = require('../src/Color');;

const tests = {
    hex: {in: ['#D2691E', '#8B4513', '#A0522D','#0000FF', '#668B8B', '#FFC0CB'],   out: 158},
    rgba: {in: [[210,105,30,1],[139,69,19,1],[160,82,45,1],[0,0,255,1],[102,139,139,1],[255,192,203,1]],   out: 158},
    chromacolor: {in:  ['#D2691E', '#8B4513', '#A0522D', '#0000FF', '#668B8B', '#FFC0CB'].map((color) => new Color(color)),   out: 158},
};

const batch = {};

Object.keys(tests).forEach(key => {
    batch[`stdDeviation ${key}`] = {
        topic: tests[key],
        num(topic) {
            assert.deepStrictEqual(stdDeviation(topic.in), topic.out);
        },
    }
})

vows
    .describe('Testing standard deviation')
    .addBatch(batch)
    .export(module);
