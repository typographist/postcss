const { toRem, modularScale } = require('@typographist/core');

const ALL_CHARACTERS_AFTER_COLON = /:.+\b/;
const ALL_PARENTHESES = /[()]/g;
const HAS_PX_OR_EM = /\d+(\.\d+)?(px|em)/;
const HAS_PX = /\d+(\.\d+)?px/;
const HAS_EM = /\d+(\.\d+)?em/;
const BROWSER_CONTEXT = 16;
const DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS = /[-_\s]+(.)?/g;
const SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER = /(?=[A-Z])/;

// getFirstLetter :: String -> String
const getFirstLetter = (word) => word[0].toLowerCase();

// getWordTail :: String -> String
const getWordTail = (word) =>
  word
    .slice(1)
    .replace(DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS, (_, chr) =>
      chr.toUpperCase(),
    );

// camelize :: String -> String
const camelize = (str) => `${getFirstLetter(str)}${getWordTail(str)}`;

// normalizeString :: String -> String
const normalizeString = (x) =>
  x.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

// separateWords :: (Maybe String) -> String -> String
const separateWords = (separator = ' ') => (str) =>
  str
    .split(SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER)
    .join(separator)
    .toLowerCase();

// toKebabCase :: String -> String
const toKebabCase = separateWords('-');

// toSnakeCase :: String -> String
const toSnakeCase = separateWords('_');

// hasPx :: String -> Boolean
const hasPx = (x) => HAS_PX.test(x);

// hasEm :: String -> Boolean
const hasEm = (x) => HAS_EM.test(x);

// hasPxOrEm :: String -> Boolean
const hasPxOrEm = (x) => HAS_PX_OR_EM.test(x);

// toPx :: String -> String
const toPx = (x) => `${parseFloat(x) * BROWSER_CONTEXT}px`;

// toEm :: String -> String
const toEm = (x) => `${parseFloat(x) / BROWSER_CONTEXT}em`;

// toEmOrNot :: String -> String
const toEmOrNot = (x) => (hasPx(x) ? toEm(x) : x);

// toPxOrNot :: String -> String
const toPxOrNot = (x) => (hasEm(x) ? toPx(x) : x);

// calcFontSize :: Object -> (Number | String, String) -> String
// eslint-disable-next-line consistent-return
const calcFontSize = (breakpoints) => (target, breakName = 'initial') => {
  if (breakpoints[breakName]) {
    const { root, base, ratio } = breakpoints[breakName];

    return toRem(root, modularScale(Number(target), base, ratio));
  }
};

// makeBreakpointName :: String -> String
const makeBreakpointName = (x) =>
  camelize(
    x.replace(ALL_CHARACTERS_AFTER_COLON, '').replace(ALL_PARENTHESES, ''),
  );

module.exports = {
  getFirstLetter,
  getWordTail,
  camelize,
  normalizeString,
  separateWords,
  toKebabCase,
  toSnakeCase,
  hasPx,
  hasEm,
  toPx,
  hasPxOrEm,
  toEm,
  toEmOrNot,
  toPxOrNot,
  calcFontSize,
  makeBreakpointName,
};
