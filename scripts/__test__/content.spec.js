const uut = require('../content');
const {resolve} = require('path');
const payload = resolve('./README.md');
const actual = uut(payload);
const expected = '<section>\n<h1>Test</h1>\n<p>para</p>\n</section>\n';

console.assert(actual === expected, 'Unexpected content preparation result');
