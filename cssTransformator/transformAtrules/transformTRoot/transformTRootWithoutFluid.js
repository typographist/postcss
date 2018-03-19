const { mediaAtrule } = require('../../atrules');
const {
  getFirstBreakpoint,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');

const { variableDecl, fontSizeDecl } = require('../../decls');
const getRootRule = require('./getRootRule');
const { percentage } = require('../../../helpers');

module.exports = (atrule, breakpoints) => {
  const { parent } = atrule;
  const firstBreakpoint = getFirstBreakpoint(breakpoints);

  breakpoints
    .filter(b => b.value !== '0px')
    .reverse()
    .map(b =>
      parent.after(
        mediaAtrule({
          minWidth: b.value,
          nestedRule: getRootRule().append(
            fontSizeDecl(`${percentage(b.root)}%`),
          ),
        }),
      ),
    );
  breakpoints.filter(b => b.value !== '0px').map(b =>
    atrule.before(
      variableDecl({
        name: b.name,
        value: b.value,
      }),
    ),
  );
  const fontSize = `${percentage(firstBreakpoint.root)}%`;
  atrule.replaceWith(fontSizeDecl(fontSize));
};

module.exports.test = atrule => {
  const { parent, params } = atrule;
  const isRootRule = parent.selector === ':root';
  const isEmptyParams = removeRoundBrackets(params) === '';

  return [parent, isRootRule, isEmptyParams].every(Boolean);
};
