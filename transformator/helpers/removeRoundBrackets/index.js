const { ALL_ROUND_BRACKETS } = require('../../../constants/regexes');

module.exports = atRuleParams => atRuleParams.replace(ALL_ROUND_BRACKETS, '');
