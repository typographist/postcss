import postcss from 'postcss';
import calculate from './_api/calculator';

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

module.exports = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  const fontSizeDecl = size => (
    postcss.decl({
      prop: 'font-size',
      value: size,
    })
  );

  const rootRule = (fontSize) => {
    const root = postcss.rule({
      selector: ':root',
    });
    root.append(fontSizeDecl(fontSize));

    return root;
  };

  const bodyRule = (fontSize) => {
    const body = postcss.rule({
      selector: 'body',
    });
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
      const breakpoint = breakpoints.find(b => /^0/.test(b.value));
      breakpoints.reverse()
        .filter(b => b.value !== 0)
        .map(b => node.parent.after(mediaDecl({
          minWidth: b.value,
          fontSize: b.root,
          nestedRule: rootRule(b.root),
        })));

      breakpoints.reverse()
        .filter(b => b.value !== 0)
        .map(b => node.before(variableDecl({
          name: b.name,
          value: b.value,
        })));

      node.replaceWith(fontSizeDecl(breakpoint.root));
    }
  };

  const baseSize = (node) => {
    const parent = node.parent;
    if (parent && parent.selector !== 'body') {
      node.remove();
    } else {
      const breakpoint = breakpoints.find(b => /^0/.test(b.value));
      breakpoints.reverse()
        .filter(b => b.value !== 0)
        .map(b => node.parent.after(mediaDecl({
          minWidth: b.value,
          fontSize: b.root,
          nestedRule: bodyRule(b.base),
        })));

      breakpoints.reverse()
        .filter(b => b.value !== 0)
        .map(b => node.before(variableDecl({
          name: b.name,
          value: b.value,
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

