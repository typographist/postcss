const postcss = require('postcss');
const fontSizeDecl = require('../fontSizeDecl');

const bodyRule = (fontSize) => {
  const body = postcss.rule({
    selector: 'body',
  });
  body.append(fontSizeDecl(fontSize));

  return body;
};

module.exports = bodyRule;

