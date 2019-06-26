const { toKebabCase } = require('../utils');

// const NOT_BREAKPOINT_NAME = /^\((\w+)\).*$/g;
const NOT_BREAKPOINT_NAMES = /^\((\w+(,?\w+)?)\).*$/g;
const ALL_CHARACTERS_BEFORE_COLON = /^\(.+\):?/;
const SPACES = /\s/g;

// getOrientation :: String -> String
const getOrientation = (x) => x.replace(ALL_CHARACTERS_BEFORE_COLON, '');

// getBreakpointValues :: String -> String
const getBreakpointValues = (params) =>
  params
    .replace(SPACES, '')
    .replace(NOT_BREAKPOINT_NAMES, '$1')
    .split(',');

// makeBreakpointList :: Object -> [String]
const makeBreakpointList = (x) =>
  Object.keys(x)
    .map(toKebabCase)
    .join(', ');

// withMinWidth :: String -> String
const withMinWidth = (x) => `(min-width: ${x})`;

// withMaxMedia :: String -> String
const withMaxWidth = (x) => `(max-width: ${x})`;

// withMinAndMaxWidth :: (String, String) -> String
const withMinAndMaxWidth = (min, max) =>
  `(min-width: ${min}) and (max-width: ${max})`;

// withOrientationOrNot :: String -> String -> String
const withOrientationOrNot = (orientation) => (params) =>
  orientation ? `${params} and (orientation: ${orientation})` : params;

// antecedentBreakName :: Object -> String
const antecedentBreakName = (x) => Object.keys(x)[Object.keys(x).length - 2];

// getlastBreakIndex :: Object -> Number
const getlastBreakIndex = (x) => Object.keys(x).length - 1;

// getCurrentIndex :: (String, Object) -> Number
const getCurrentIndex = (name, breakpoints) =>
  Object.keys(breakpoints).indexOf(name);

// getNextBreakpointValue :: String  -> Object -> String
const getNextBreakpointValue = (name) => (breakpoints) => {
  const currentIndex = getCurrentIndex(name, breakpoints);
  const nextBreakpointName = Object.keys(breakpoints)[currentIndex + 1];

  return breakpoints[nextBreakpointName].value;
};

module.exports = {
  getOrientation,
  getBreakpointValues,
  makeBreakpointList,
  withMinWidth,
  withMaxWidth,
  withMinAndMaxWidth,
  withOrientationOrNot,
  antecedentBreakName,
  getlastBreakIndex,
  getCurrentIndex,
  getNextBreakpointValue,
};
