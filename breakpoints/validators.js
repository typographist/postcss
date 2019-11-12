const { camelize } = require('../utils');

const {
  getOrientation,
  getBreakpointValues,
  makeBreakpointList,
  getCurrentIndex,
  getlastBreakIndex,
} = require('./helpers');

const HAS_PX_OR_EM = /\d+(\.\d+)?(px|em)/;
const PREFIX = '[typographist]:';

// hasPxOrEm :: String -> Boolean
const hasPxOrEm = (x) => HAS_PX_OR_EM.test(x);

// validateOrientation :: Object -> Void
const validateOrientation = (atrule) => {
  const orientation = getOrientation(atrule.params);
  const isValid = /portrait|landscape/.test(orientation) || orientation === '';

  if (!isValid) {
    throw atrule.error(
      `${PREFIX} '${orientation}' is invalid orientation. Use 'portrait' or 'landscape'. Example: @up(tablet):portrait.`,
    );
  }
};

// validateBreakpointValue ::  (Object, Object) -> Void
const validateBreakpointValue = (breakpoints, atrule) => {
  getBreakpointValues(atrule.params).forEach((param) => {
    if (/[A-Z]/.test(param)) {
      throw atrule.error(
        `${PREFIX} '${param}' is invalid breakpoint name. Set the name to lowercase, use kebab case notation. Example: 'desktop' or 'lg-desktop'.`,
      );
    }

    const isValidValue = !!breakpoints[camelize(param)] || hasPxOrEm(param);

    if (!isValidValue) {
      throw atrule.error(
        `${PREFIX} '${param}' is invalid breakpoint name. Use '${makeBreakpointList(
          breakpoints,
        )}' or values with pixels or ems. Example: @up(tablet) or @up(1200px) or @up(60em).`,
      );
    }
  });
};

// lastBreakpointOrNot :: (Object, Object) -> Void
const lastBreakpointOrNot = (breakpoints, atrule) => {
  const breakpointName = getBreakpointValues(atrule.params);
  const currentIndex = getCurrentIndex(breakpointName, breakpoints);
  const lastBreakIndex = getlastBreakIndex(breakpoints);

  if (currentIndex === lastBreakIndex) {
    throw atrule.error(
      `${PREFIX} Don't use '${breakpointName}' because it doesn't have a maximum width.`,
    );
  }
};

const hasTwoArguments = ({ params }) => {
  const args = getBreakpointValues(params).length;

  if (args < 2) {
    throw new Error(
      `${PREFIX} '@between' must have two arguments. The first is the minimum breakpoint, the second is the maximum break point.'`,
    );
  }
};

module.exports = {
  validateOrientation,
  validateBreakpointValue,
  lastBreakpointOrNot,
  hasPxOrEm,
  hasTwoArguments,
};
