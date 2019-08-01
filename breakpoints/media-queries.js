/* eslint-disable consistent-return */
const { pipe } = require('@typographist/core');
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
  hasTwoArguments,
} = require('./validators');

// up :: (Object, Object) -> String | Void
exports.up = (atrule, breakpoints) => {
  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);

  // String -> String
  return pipe(
    getBreakpointValues,
    calcMinWidth(breakpoints),
    withMinWidth,
    withOrientationOrNot(getOrientation(atrule.params)),
  )(atrule.params);
};

// down :: (Object, Object) -> String | Void
exports.down = (atrule, breakpoints) => {
  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);
  lastBreakpointOrNot(breakpoints, atrule);

  // String -> String
  return pipe(
    getBreakpointValues,
    calcMaxWidth(breakpoints),
    withMaxWidth,
    withOrientationOrNot(getOrientation(atrule.params)),
  )(atrule.params);
};

// only :: (Object, Object) -> String | Void
exports.only = (atrule, breakpoints) => {
  const { params } = atrule;

  validateOrientation(atrule);
  validateBreakpointValue(breakpoints, atrule);
  lastBreakpointOrNot(breakpoints, atrule);

  // min :: String -> String
  const min = pipe(
    getBreakpointValues,
    calcMinWidth(breakpoints),
  );

  // max :: String -> String
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
  hasTwoArguments(atrule);
  validateBreakpointValue(breakpoints, atrule);
  validateOrientation(atrule);
  lastBreakpointOrNot(breakpoints, atrule);

  // min :: [String] -> String
  const min = (x) => {
    const [head] = getBreakpointValues(x);

    return calcMinWidth(breakpoints)(head);
  };

  // max :: [String] -> String
  const max = (x) => {
    const [, ...tail] = getBreakpointValues(x);

    return calcMaxWidth(breakpoints)(tail);
  };

  const mediaQueries = withMinAndMaxWidth(min(params), max(params));
  const withOrientation = withOrientationOrNot(getOrientation(params));

  return withOrientation(mediaQueries);
};
