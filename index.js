import postcss from 'postcss';
import calculate from './_api/calculator';

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

module.exports = postcss.plugin('new-typography', (config = defualtConfig) => {
  const options = calculate(config);

  const fontSizeDecl = size => (
    postcss.decl({
      prop: 'font-size',
      value: size,
    })
  );

  const rootRule = (fontSize) => {
    const root = postcss.rule({ selector: ':root' });
    root.append(fontSizeDecl(fontSize));

    return root;
  };

  const bodyRule = (fontSize) => {
    const body = postcss.rule({ selector: 'body' });
    body.append(fontSizeDecl(fontSize));

    return body;
  };

  const mediaDecl = ({ minWidth, fontSize, nestedRule }) => {
    const rule = postcss.atRule({
      name: 'media',
      params: `(min-width: ${minWidth})`,
    });
    rule.append(nestedRule);

    return rule;
  };

  const variableDecl = ({ name, value }) => (
    postcss.decl({
      prop: `--${name}`,
      value,
    })
  );

  const rootSize = (node) => {
    const parent = node.parent;
    if (parent && parent.selector !== ':root') {
      node.remove();
    } else {
      const breakpoint = options.find(b => /^0/.test(b.breakpoint));
      options.reverse()
        .filter(b => b.breakpoint !== 0)
        .map(b => node.parent.after(mediaDecl({
          minWidth: b.breakpoint,
          fontSize: b.root,
          nestedRule: rootRule(b.root),
        })));

      options.reverse()
        .filter(b => b.breakpoint !== 0)
        .map(b => node.before(variableDecl({
          name: b.name,
          value: b.breakpoint,
        })));

      node.replaceWith(fontSizeDecl(breakpoint.root));
    }
  };

  const baseSize = (node) => {
    const parent = node.parent;
    if (parent && parent.selector !== 'body') {
      node.remove();
    } else {
      const breakpoint = options.find(b => /^0/.test(b.breakpoint));
      options.reverse()
        .filter(b => b.breakpoint !== 0)
        .map(b => node.parent.after(mediaDecl({
          minWidth: b.breakpoint,
          fontSize: b.root,
          nestedRule: bodyRule(b.base),
        })));

      options.reverse()
        .filter(b => b.breakpoint !== 0)
        .map(b => node.before(variableDecl({
          name: b.name,
          value: b.breakpoint,
        })));
      node.replaceWith(fontSizeDecl(breakpoint.root));
    }
  };

  return (root) => {
    root.walkAtRules((node) => {
      switch (node.name) {
        case 'nt-root-size':
          rootSize(node);
          break;

        case 'nt-base-size':
          baseSize(node);
          break;

        default:
          break;
      }
    });
  };
});

