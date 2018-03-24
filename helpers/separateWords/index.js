const {
  SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER,
} = require('../../constants/regexes');

/**
 * @example HelloWorld => Hello_world
 * @param {string} string String.
 * @param {Object} [options] User options.
 * @param {string} [options.separator] separating line.
 * @param {regex|string} [options.split] line break.
 * @return {string}
 *
 */
module.exports = (string, options = {}) => {
  const separator = options.separator || '_';
  const split = options.split || SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER;

  return string.split(split).join(separator);
};
