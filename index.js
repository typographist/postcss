const { plugin } = require('postcss');
const { ratios, makeBreakpointsMap } = require('@typographist/core');
const { isStep, step } = require('./features/step');
const { isStepFunction, stepFunction } = require('./features/step-function');
const { isBubblingRule, bubblingRule } = require('./features/bubbling-rule');
const { isNestedRule, nestedRule } = require('./features/nested-rule');

const {
  isBubblingAtrule,
  bubblingAtrule,
} = require('./features/bubbling-atrule');

const { renderUp } = require('./features/up');
const { renderBase } = require('./features/base');
const { renderDown } = require('./features/down');
const { renderBetween } = require('./features/between');
const { renderOnly } = require('./features/only');
const { renderRoot } = require('./features/root');

const defaultConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

exports.ratios = ratios;

module.exports = plugin('typographist', (config = defaultConfig) => (root) => {
  const breakpointsMap = makeBreakpointsMap(config);

  root.walkDecls((decl) => {
    if (isStep(decl)) {
      step(decl, breakpointsMap);
    }

    if (isStepFunction(decl, breakpointsMap)) {
      stepFunction(decl, breakpointsMap);
    }
  });

  root.walkAtRules((atrule) => {
    if (isBubblingAtrule(atrule)) {
      bubblingAtrule(atrule);
    }
  });

  root.walkAtRules((atrule) => {
    const atrules = {
      root: renderRoot,
      base: renderBase,
      up: renderUp,
      down: renderDown,
      only: renderOnly,
      between: renderBetween,
    };

    if (atrules[atrule.name]) {
      atrules[atrule.name](atrule, breakpointsMap);
    }
  });

  root.walkRules((rule) => {
    if (isBubblingRule(rule)) {
      bubblingRule(rule);
    }

    if (isNestedRule(rule)) {
      nestedRule(rule);
    }
  });

  // Remove empty rules.
  root.walkRules((rule) => {
    if (!rule.nodes.length) rule.remove();
  });
});
