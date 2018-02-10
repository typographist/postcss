const postcss = require('postcss');
const calculate = require('./api/store');
const rootSize = require('./parser/root/rootSize');
const baseSize = require('./parser/base/baseSize');
const above = require('./parser/breakpoints/above');
const nt = require('./parser/ntFunction');
const { calcFontSize } = require('./api/calcFontSize');
const {
  CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT,
} = require('./regex');

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  return root => {
    root.walkDecls(decl => {
      const { prop } = decl;
      const { value } = decl;
      const isFontSizeDecl = prop === 'font-size';
      const CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_T_UNIT = /^-?\d+(\.\d+)?t$/.test(
        value,
      );
      const isTUnit = CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_T_UNIT;
      const isFontSizeDeclContainsTUnit = isFontSizeDecl && isTUnit;

      const wrapper = decl.parent;
      const { type } = wrapper;
      const isRule = type === 'rule';
      const isAtrule = type === 'atrule';
      const isAbove =
        wrapper.parent.name === 'nt-above' || wrapper.name === 'nt-above';
      const isBelow =
        wrapper.parent.name === 'nt-below' || wrapper.name === 'nt-below';

      // Если font-size содержит единицу t
      if (isFontSizeDeclContainsTUnit) {
        // Если не содержит обёртки
        if (isRule && wrapper.parent.type === 'root') {
          const target = decl.value.replace(/\D/, '');
          decl.value = calcFontSize(target, breakpoints);
        }

        if (
          (isRule && isAbove) ||
          (isAtrule && isAbove) ||
          (isAtrule && isBelow)
        ) {
          const breaks = breakpoints
            .map(b => b.name)
            .filter(b => b !== 'default');
          const replaceBrackets = string => string.replace(/[()]/g, '');
          const isBreakpoint = breakpoint =>
            breaks.some(item => item === replaceBrackets(breakpoint));
          const isCustomBreakpoint = string =>
            parseInt(replaceBrackets(string), 10);
          const CONTAINS_PX = /\d+px/;
          const CONTAINS_EM = /\d+em/;
          const target = decl.value.replace(/\D/, '');

          if (wrapper.params && isBreakpoint(wrapper.params)) {
            const breakpointName = replaceBrackets(wrapper.params);
            decl.value = calcFontSize(target, breakpoints, breakpointName);
          }

          if (wrapper.parent.params && isBreakpoint(wrapper.parent.params)) {
            const breakpointName = replaceBrackets(wrapper.parent.params);
            decl.value = calcFontSize(target, breakpoints, breakpointName);
          }

          if (wrapper.params && isCustomBreakpoint(wrapper.params)) {
            if (CONTAINS_PX.test(wrapper.params)) {
              console.log('contains px');
            }

            if (CONTAINS_EM.test(wrapper.params)) {
              console.log('contains em');
            }
          }

          if (
            wrapper.parent.params &&
            isCustomBreakpoint(wrapper.parent.params)
          ) {
            if (CONTAINS_PX.test(wrapper.parent.params)) {
              console.log('contains px');
            }

            if (CONTAINS_EM.test(wrapper.parent.params)) {
              console.log('contains em');
            }
          }
        }
      }
    });

    root.walk(node => {
      switch (node.name) {
        case 'nt-root':
          rootSize(node, breakpoints);
          break;
        case 'nt-base':
          baseSize(node, breakpoints);
          break;
        case 'nt-above':
        case 'nt-below':
        case 'nt-between':
          break;

        default:
          break;
      }
    });
  };
});

module.exports = plugin;
