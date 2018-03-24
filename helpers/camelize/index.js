const {
  DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS,
} = require('../../constants/regexes');
const isNumeric = require('../isNumeric/');

/**
 * @example camelize('Hello_World') => 'HelloWorld'
 * @param {string} value Decamelize string.
 * @return {string} Camelize string.
 */
module.exports = value => {
  let string = value;
  if (isNumeric(string)) {
    return string;
  }
  string = string.replace(
    DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS,
    (match, chr) => (chr ? chr.toUpperCase() : ''),
  );
  // Ensure 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};
