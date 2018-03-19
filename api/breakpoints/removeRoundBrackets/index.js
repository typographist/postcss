const { ALL_ROUND_BRACKETS } = require('../../../constants/regexes');

/**
 *
 * @param {string} atRuleParams Atrule params contains round brackets.
 * @return {string} Atrule params without round brackets.
 */
module.exports = atRuleParams => atRuleParams.replace(ALL_ROUND_BRACKETS, '');
