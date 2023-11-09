const chroma = require('./src/chroma');

// feel free to comment out anything to rollup
// a smaller chroma.js built

// io --> convert colors
require('./src/io/css');
require('./src/io/hex');
require('./src/io/rgb');
require('./src/io/and');

// operators --> modify existing Colors
require('./src/ops/get');

// other utility methods
chroma.valid = require('./src/utils/valid');

module.exports = chroma;