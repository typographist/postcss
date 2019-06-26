const { rule, decl } = require('postcss');
const { toRem } = require('@typographist/core');
const { fontSizeProp, mediaQuery } = require('../elements');

// base :: (Object, Object) -> Void
exports.renderBase = (atrule, breakpointsMap) => {
  const {
    initial: { root, base },
    ...breaks
  } = breakpointsMap;

  if (atrule.parent && isBody(atrule.parent)) {
    Object.values(breaks)
      .reverse()
      .map((b) => {
        const body = bodyProp().append(fontSizeProp(toRem(b.root, b.base)));

        return atrule.parent.after(mediaQuery(b.value).append(body));
      });

    atrule.replaceWith(fontSizeProp(toRem(root, base)), lineHeightProp());
  } else {
    throw atrule.error(
      `[typographist]: use the ${atrule} only with the 'body' selector.`,
    );
  }
};

// isBody :: Object -> Boolean
function isBody({ selector }) {
  return selector === 'body';
}

// bodyProp :: () -> Void
function bodyProp() {
  return rule({
    selector: 'body',
  });
}

// lineHeightProp :: () -> Void
function lineHeightProp() {
  return decl({
    prop: 'line-height',
    value: '2rem',
  });
}
