const postcss = require('postcss');
const store = require('../api/store');
const { mediaAtrule } = require('./atrules');
const { variableDecl, fontSizeDecl } = require('./decls');
const { percentage } = require('../helpers');

const rootRule = fontSize => {
  const root = postcss.rule({
    selector: ':root',
  });

  const rootSize = `${percentage(fontSize)}%`;
  root.append(fontSizeDecl(rootSize));

  return root;
};

module.exports = (node, config) => {
  const { parent } = node;
  const breakpoints = store(config);

  if (parent && parent.selector !== ':root') {
    node.remove();
  } else {
    const breakpoint = breakpoints.find(b => /^0/.test(b.value));

    breakpoints
      .filter(b => b.value !== '0px')
      .reverse()
      .map(b =>
        parent.after(
          mediaAtrule({
            minWidth: b.value,
            nestedRule: rootRule(b.root),
          }),
        ),
      );

    breakpoints.filter(b => b.value !== '0px').map(b =>
      node.before(
        variableDecl({
          name: b.name,
          value: b.value,
        }),
      ),
    );

    const fontSize = `${percentage(breakpoint.root)}%`;
    node.replaceWith(fontSizeDecl(fontSize));
  }
};

/* eslint-disable consistent-return */
module.exports.test = node => {
  const isAtrule = node.type === 'atrule';
  const isTRoot = node.name === 't-root';

  return [isAtrule, isTRoot].every(Boolean);
};

/* eslint-enable */
