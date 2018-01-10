const {
  CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT,
  CONTAINS_NT,
} = require('../../regex');
const { calcFontSize } = require('../../api/calcFontSize');

const ntFunction = (node, breakpoints, root) => {
  root.replaceValues(
    CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT,
    string => {
      const target = string.replace(CONTAINS_NT, '');

      return calcFontSize(target, breakpoints);
    },
  );
};

module.exports = ntFunction;
