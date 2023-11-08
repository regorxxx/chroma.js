const vows = require('vows')
const assert = require('assert');
require('es6-shim');

const rgb2and = require('../src/io/and/rgb2and');

vows
    .describe('Testing rgb2and color conversions')
    .addBatch({
        'convert to numeric Android colors': {
            topic: {
                black:      {in: [[0,0,0,1]],              out: -16777216},
                white:      {in: [[255,255,255,1]],        out: -1 },
                red:        {in: [[255,0,0,1]],            out: -65536},
                redAlpha:   {in: [[255,0,0,0.37]],         out: 16711680},
                redNoAlpha: {in: [[255,0,0,0.37],'rgb'],   out: -65536},
            },
            num(topic) {
                Object.keys(topic).forEach(key => {
                    assert.deepEqual(rgb2and(...topic[key].in), topic[key].out);
                });
            }
        }
    })
    .export(module);
