module.exports = node => {};

module.exports.test = node => {};

// const postcss = require('postcss');
// const { percentage } = require('../../../helpers');
// const { fontSizeDecl } = require('../../decls');

// const rootRule = fontSize => {
//   const root = postcss.rule({
//     selector: ':root',
//   });

//   const rootSize = `${percentage(fontSize)}%`;
//   root.append(fontSizeDecl(rootSize));

//   return root;
// };

// module.exports = rootRule;

// const { percentage } = require('../../../helpers');
// const { variableDecl, fontSizeDecl, mediaDecl } = require('../../decls/');
// const rootRule = require('../rootRule');

// const rootSize = (node, breakpoints) => {
//   const { parent } = node;
//   if (parent && parent.selector !== ':root') {
//     node.remove();
//   } else {
//     const breakpoint = breakpoints.find(b => /^0/.test(b.value));

//     breakpoints
//       .filter(b => b.value !== '0px')
//       .reverse()
//       .map(b =>
//         parent.after(
//           mediaDecl({
//             minWidth: b.value,
//             nestedRule: rootRule(b.root),
//           }),
//         ),
//       );

//     breakpoints.filter(b => b.value !== '0px').map(b =>
//       node.before(
//         variableDecl({
//           name: b.name,
//           value: b.value,
//         }),
//       ),
//     );

//     const fontSize = `${percentage(breakpoint.root)}%`;
//     node.replaceWith(fontSizeDecl(fontSize));
//   }
// };

// module.exports = rootSize;
