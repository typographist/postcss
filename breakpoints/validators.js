const { camelize } = require('../utils');

const {
  getOrientation,
  getBreakpointValues,
  makeBreakpointList,
  getCurrentIndex,
  getlastBreakIndex,
} = require('./helpers');

const HAS_PX_OR_EM = /\d+(\.\d+)?(px|em)/;

// hasPxOrEm :: String -> Boolean
const hasPxOrEm = (x) => HAS_PX_OR_EM.test(x);

// validateOrientation :: Object -> Void
const validateOrientation = (atrule) => {
  const orientation = getOrientation(atrule.params);
  const isValid = /portrait|landscape/.test(orientation) || orientation === '';

  if (!isValid) {
    throw atrule.error(
      `[typographist]: '${orientation}' is invalid orientation. Use 'portrait' or 'landscape'. Example: @up(tablet):portrait.`,
    );
  }
};

// validateBreakpointValue ::  (Object, Object) -> Void
const validateBreakpointValue = (breakpoints, atrule) =>
  getBreakpointValues(atrule.params).forEach((p) => {
    const isValidValue = !!breakpoints[camelize(p)] || hasPxOrEm(p);

    if (isValidValue) {
      throw atrule.error(
        `[typographist]: '${p}' is invalid breakpoint name. Use '${makeBreakpointList(
          breakpoints,
        )}' or values with pixels or ems. Example: @up(tablet) or @up(1200px) or @up(60em).`,
      );
    }
  });

// lastBreakpointOrNot :: (Object, Object) -> Void
const lastBreakpointOrNot = (breakpoints, atrule) => {
  const breakpointName = getBreakpointValues(atrule.params);
  const currentIndex = getCurrentIndex(breakpointName, breakpoints);
  const lastBreakIndex = getlastBreakIndex(breakpoints);

  if (currentIndex === lastBreakIndex) {
    throw atrule.error(
      `[typographist]: Don't use '${breakpointName}' because it doesn't have a maximum width.`,
    );
  }
};

module.exports = {
  validateOrientation,
  validateBreakpointValue,
  lastBreakpointOrNot,
  hasPxOrEm,
};
