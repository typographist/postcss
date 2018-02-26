const { ALL_ROUND_BRACKETS } = require('../../constants');

module.exports = atRuleParams => atRuleParams.replace(ALL_ROUND_BRACKETS, '');
