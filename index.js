const postcss = require('postcss');
const calculate = require('./api/store');
const rootSize = require('./parser/root/rootSize');
const baseSize = require('./parser/base/baseSize');
const above = require('./parser/breakpoints/above');
const nt = require('./parser/ntFunction');
const calcFontSize = require('./api/calcFontSize');
const {
  CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT,
} = require('./regex/');

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

// const getFontSize = root =>
//   root.walkDecls(decl => {
//     let { value } = decl;
//     const { prop } = decl;
//     const isFontSize = prop === 'font-size';
//     const CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_T_UNIT = /^-?\d+(\.\d+)?t$/.test(
//       value,
//     );
//     const isNumberWithTUnit = CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_T_UNIT;
//     const isFontSizeWithTUnit = isFontSize && isNumberWithTUnit;
//     if (isFontSizeWithTUnit) {
//       value = value
//         .split('')
//         .reverse()
//         .join('');
//     }
//   });

const plugin = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  return root => {
    root.walkDecls(decl => {
      const { prop, value } = decl;
      const isFontSizeDecl = prop === 'font-size';
      const CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_T_UNIT = /^-?\d+(\.\d+)?t$/.test(
        value,
      );
      const isTUnit = CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_T_UNIT;
      const isFontSizeWithTUnit = isFontSizeDecl && isTUnit;

      if (isFontSizeWithTUnit) {
        const target = value.replace(/\D/, '');
        decl.value = calcFontSize(target, breakpoints);
      }
    });

    root.walk(node => {
      if (node.name === 'nt-root') {
        rootSize(node, breakpoints);
      } else if (node.name === 'nt-base') {
        baseSize(node, breakpoints);
      } else if (node.name === 'nt-above') {
        above(node, breakpoints);
      } else if (node.name === 'nt-below') {
      } else if (node.name === 'nt-between') {
      } else if (
        CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT.test(
          node.value,
        )
      ) {
        nt(node, breakpoints, root);
      }
    });
  };
});

module.exports = plugin;
