const postcss = require('postcss');
const mediaDecl = require('../../decls/mediaDecl');

const parentRule = (parent, nodes) => {
  const selectorName = postcss.rule({
    selector: parent.selector,
  });

  selectorName.append(nodes);

  return selectorName;
};

const above = (node, breakpoints) => {
  // const parent = node.parent;
  // node.remove();

  // parent.after(mediaDecl({
  //   minWidth: 200,
  //   nestedRule: parentRule(parent, node.nodes),
  // }));
};

module.exports = above;
