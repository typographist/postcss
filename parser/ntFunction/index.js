const CONTAINS_NT_FUNCTION = require('../../regex/').CONTAINS_NT_FUNCTION;
const NT_FUNCTION_AND_WORDS_AND_SPACES = require('../../regex/').NT_FUNCTION_AND_WORDS_AND_SPACES;
const FLOATING_POINT_NUMBER = require('../../regex').FLOATING_POINT_NUMBER;

const ntFunction = (node, breakpoints, root) => {
  root.replaceValues(CONTAINS_NT_FUNCTION, (string) => {
    const val = string.replace(NT_FUNCTION_AND_WORDS_AND_SPACES, '');
    const res = FLOATING_POINT_NUMBER.test(val);

    return res ? val : '';
  });
};


module.exports = ntFunction;
