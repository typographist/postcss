const { HALF } = require('../../constants');

const calcRoot = val => Math.round(val * HALF);

module.exports = calcRoot;
