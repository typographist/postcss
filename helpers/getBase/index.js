/**
 * @param {Array<number>|number} base
 * @return {number}
 */

const getBase = base => (Array.isArray(base) ? base[0] : base);

module.exports = getBase;
