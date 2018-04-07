/**
 * @param {string} string
 * @return {string} First word.
 */
const getFirstWord = string => string.split(/(?=[A-Z])/)[0];

export default getFirstWord;
