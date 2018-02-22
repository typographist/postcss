module.exports = (node, config, postcss) => {};

module.exports.test = node => {
  const closestRule = node.parent;
};

// const { lineHeightDecl, fontSizeDecl, mediaDecl } = require('../../decls');
// const { toRem } = require('../../../helpers');
// const bodyRule = require('../bodyRule');

// const postcss = require('postcss');
// const { fontSizeDecl } = require('../../decls');
// const { toRem } = require('../../../helpers');

// const bodyRule = (baseSize, rootSize) => {
//   const body = postcss.rule({
//     selector: 'body',
//   });
//   const base = `${toRem(baseSize, rootSize)}rem`;
//   body.append(fontSizeDecl(base));

//   return body;
// };

// module.exports = bodyRule;

// const baseSize = (node, breakpoints) => {
//   const { parent } = node;
//   if (parent && parent.selector !== 'body') {
//     node.remove();
//   } else {
//     const breakpoint = breakpoints.find(b => /^0/.test(b.value));

//     breakpoints
//       .filter(b => b.value !== '0px')
//       .reverse()
//       .map(b =>
//         node.parent.after(
//           mediaDecl({
//             minWidth: b.value,
//             nestedRule: bodyRule(b.base, b.root),
//           }),
//         ),
//       );

//     const fontSize = `${toRem(breakpoint.base, breakpoint.root)}rem`;
//     node.replaceWith(fontSizeDecl(fontSize), lineHeightDecl());
//   }
// };

// module.exports = baseSize;
