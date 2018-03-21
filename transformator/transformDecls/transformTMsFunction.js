const postcss = require('postcss');
const { mediaAtrule } = require('../atrules');
const { makeBreakpointsModel } = require('../../api/makeBreakpointsModel');
const { HAS_FONT_SIZE } = require('../../constants/regexes');
const { fontSizeDecl } = require('../decls');
const { isNumeric } = require('../../helpers');
const msToRem = require('../../api/modularScale/msToRem');

const replaceTMsAndRoundBrackets = valueWithTMs =>
  valueWithTMs.replace(/[()tms-]/g, '');

const setParentSelector = parent => {
  const rule = postcss.rule({
    selector: parent.selector,
  });

  return rule;
};

module.exports = (decl, config) => {
  const { value, parent } = decl;
  const breakpoints = makeBreakpointsModel(config);

  const target = replaceTMsAndRoundBrackets(value);

  breakpoints
    .filter(b => b.value !== '0px')
    .reverse()
    .map(b =>
      parent.after(
        mediaAtrule({
          minWidth: b.value,
          nestedRule: setParentSelector(parent).append(
            fontSizeDecl(msToRem(target, breakpoints, b.name)),
          ),
        }),
      ),
    );

  const fontSize = msToRem(target, breakpoints);
  decl.replaceWith(fontSizeDecl(fontSize));
};

module.exports.test = decl => {
  const { prop, value } = decl;
  const hasFontSize = HAS_FONT_SIZE.test(prop);
  const hasTMsFunction = /^t-ms\(.+?\)$/.test(value);
  let result = null;

  if ((hasFontSize, hasTMsFunction)) {
    const msValue = replaceTMsAndRoundBrackets(value);

    try {
      if (isNumeric(msValue)) {
        result = true;
      } else {
        result = false;
        throw new Error(
          `"${msValue}" is incorrect value of t-ms function. Use numbers. For example t-ms(3).`,
        );
      }
    } catch (err) {
      console.warn(err.message);
    }
  }

  return result;
};
