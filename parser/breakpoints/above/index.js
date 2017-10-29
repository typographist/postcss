const mediaDecl = require('../../decls/mediaDecl');
// const rootRule = require('../../decls/');


function findBreakPoint(params, breakpoints) {
  const name = params.match(/\w+/)[0];
  return Object.values(breakpoints).find(b => b.name === name);
}

const above = (node, breakpoints) => {
  // const newParent = node.parent.clone();
  // node.params = `(min-width: ${findBreakPoint(node.params, breakpoints).value})`;
  // node.name = 'media screen and';
  // newParent.nodes = node.nodes;
  // node.nodes = [];
  // node.nodes.push(newParent);

  node.parent.after(mediaDecl({
    minWidth: findBreakPoint(node.params, breakpoints).value,
    nestedRule: '',
  }));

      // breakpoints
      // .filter(b => b.value !== '0px')
      // .reverse()
      // .map(b => node.parent.after(mediaDecl({
      //   minWidth: findBreakPoint(node.params, breakpoints).value,
      //   nestedRule: '',
      // })));

    // breakpoints
    //   .filter(b => b.value !== '0px')
    //   .map(b => node.before(variableDecl({
    //     name: b.name,
    //     value: b.value,
    //   })));

    node.replaceWith('');
};

module.exports = above;
