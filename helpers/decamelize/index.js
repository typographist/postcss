const separateWords = require('../separateWords');

/**
 * @example decamelize('helloWorld', {separator: '-'}) => 'hello_world'
 * @param {string} string
 * @param {Object} [options] User options.
 * @param {string} [options.separator] separating line.
 * @param {regex|string} [options.split] line break.
 * @return {string} Decamelize string.
 */
module.exports = (string, options) =>
  separateWords(string, options).toLowerCase();
