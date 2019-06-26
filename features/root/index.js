const { isDefaultRoot, defaultRoot } = require('./default-root');
const { isFluidRoot, fluidRoot } = require('./fluid-root');

exports.isRoot = ({ parent }) => parent && parent.selector === ':root';

exports.renderRoot = (atrule, breakpointsMap) => {
  if (atrule.parent && isRootSelector(atrule.parent)) {
    if (isDefaultRoot(atrule)) {
      defaultRoot(atrule, breakpointsMap);
    }

    if (isFluidRoot(atrule)) {
      fluidRoot(atrule, breakpointsMap);
    }
  } else {
    throw atrule.error(
      `[typographist]: use the ${atrule} with the ':root' or 'html' selectors.`,
    );
  }
};

function isRootSelector({ selector }) {
  return /:root|html/.test(selector);
}
