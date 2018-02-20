import * as postcss from 'postcss';

const cleanNode = node => {
  node.raws = {
    ...(node.raws.between ? { between: node.raws.between } : {}),
    ...{ semicolon: true },
    ...(node.raws.important ? { important: node.raws.important } : {}),
  };

  return node;
};

const parentRule = (parent, nodes) => {
  const rule = postcss.rule({
    selector: parent.selector,
  });

  rule.append(nodes);

  return rule;
};

const removeBrackets = string => string.replace(/[()]/g, '');

const aboveMedia = ({ width, nestedRule }) => {
  const atRule = postcss.atRule({
    name: 'media',
    params: `screen and (min-width: ${removeBrackets(width)})`,
  });

  atRule.append(nestedRule);

  return atRule;
};

const belowMedia = ({ width, nestedRule }) => {
  const atRule = postcss.atRule({
    name: 'media',
    params: `screen and (max-width: ${removeBrackets(width)})`,
  });

  atRule.append(nestedRule);

  return atRule;
};

const betweenMedia = ({ width, nestedRule }) => {
  const widths = removeBrackets(width).split(', ');
  const minWidth = widths[0];
  const maxWidth = widths[widths.length - 1];
  const atRule = postcss.atRule({
    name: 'media',
    params: `screen and (min-width: ${minWidth}), and (max-width: ${maxWidth})`,
  });

  atRule.append(nestedRule);

  return atRule;
};

export default postcss.plugin('postcss-reverse-props', (options = {}) => {
  return root => {
    root.walk(node => {
      const isAtrule = node.type === 'atrule';
      const isAbove = node.name === 'above';
      const isBelow = node.name === 'below';
      const isBetween = node.name === 'between';
      const parent = node.parent;

      if (isAtrule && isAbove) {
        node.remove();

        parent.after(
          aboveMedia({
            width: node.params,
            nestedRule: cleanNode(parentRule(parent, node.nodes)),
          }),
        );
      }

      if (isAtrule && isBelow) {
        node.remove();

        parent.after(
          belowMedia({
            width: node.params,
            nestedRule: cleanNode(parentRule(parent, node.nodes)),
          }),
        );
      }

      if (isAtrule && isBetween) {
        node.remove();

        parent.after(
          betweenMedia({
            width: node.params,
            nestedRule: cleanNode(parentRule(parent, node.nodes)),
          }),
        );
      }
    });
  };
});
