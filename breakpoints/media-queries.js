/* eslint-disable consistent-return */
const { pipe, head, tail } = require('@typographist/core');
const {
  getOrientation,
  getBreakpointValues,
  withMinWidth,
  withMaxWidth,
  withMinAndMaxWidth,
  withOrientationOrNot,
} = require('./helpers');
const { calcMinWidth, calcMaxWidth } = require('./calculators');
const {
  validateOrientation,
  validateBreakpointValue,
  lastBreakpointOrNot,
} = require('./validators');

// up :: (Object, Object) -> String | Void
exports.up = (atrule, breakpoints) => {
  const { params } = atrule;
  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);

  return pipe(
    getBreakpointValues,
    calcMinWidth(breakpoints),
    withMinWidth,
    withOrientationOrNot(getOrientation(params)),
  )(params);
};

// down :: (Object, Object) -> String | Void
exports.down = (atrule, breakpoints) => {
  const { params } = atrule;
  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);
  lastBreakpointOrNot(breakpoints, atrule);

  return pipe(
    getBreakpointValues,
    calcMaxWidth(breakpoints),
    withMaxWidth,
    withOrientationOrNot(getOrientation(params)),
  )(params);
};

// only :: (Object, Object) -> String | Void
exports.only = (atrule, breakpoints) => {
  const { params } = atrule;

  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);
  lastBreakpointOrNot(breakpoints, atrule);

  const min = pipe(
    getBreakpointValues,
    calcMinWidth(breakpoints),
  );

  const max = pipe(
    getBreakpointValues,
    calcMaxWidth(breakpoints),
  );

  const mediaQueries = withMinAndMaxWidth(min(params), max(params));
  const withOrientation = withOrientationOrNot(getOrientation(params));

  return withOrientation(mediaQueries);
};

// only :: (Object, Object) -> String | Void
exports.between = (atrule, breakpoints) => {
  const { params } = atrule;

  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);
  lastBreakpointOrNot(breakpoints, atrule);

  const min = pipe(
    getBreakpointValues,
    head,
    calcMinWidth(breakpoints),
  );

  const max = pipe(
    getBreakpointValues,
    tail,
    calcMaxWidth(breakpoints),
  );

  const mediaQueries = withMinAndMaxWidth(min(params), max(params));
  const withOrientation = withOrientationOrNot(getOrientation(params));

  return withOrientation(mediaQueries);
};
