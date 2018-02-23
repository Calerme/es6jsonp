const encodeQueryStr = require('../src/encodeQueryStr');

const result = encodeQueryStr({
  a: 1,
  b: 2,
  c: 3,
});

console.log(result); // eslint-disable-line
