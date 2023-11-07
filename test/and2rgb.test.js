const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const and2rgb = require('../src/io/and/and2rgb');

vows
    .describe('Testing and2rgb color conversions')
    .addBatch({
        'parse simple numeric Android colors': {
            topic: {
                black:      {in: -16777216,    out: [0,0,0,1]},
                white:      {in: -1,           out: [255,255,255,1]},
                red:        {in: -65536,       out: [255,0,0,1]},
            },
            num(topic) {
                Object.keys(topic).forEach(key => {
                    assert.deepEqual(and2rgb(topic[key].in), topic[key].out);
                });
            }
        }
    })
    .export(module);
