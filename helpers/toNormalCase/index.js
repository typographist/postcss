/**
 *
 * @param {string} string
 */
module.exports = string =>
  string.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
