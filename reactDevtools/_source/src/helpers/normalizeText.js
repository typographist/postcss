/**
 * @param {string} string
 * @return {string} Normalize string.
 */

const normalizeText = string =>
  string
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();

export default normalizeText;
