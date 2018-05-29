const ALL_ROUND_BRACKETS = /[()]/g;
const ALL_AMPERSANDS = /&/g;
const DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS = /[-_\s]+(.)?/g;
const HAS_AMPERSAND = /&/;
const HAS_AT = /-?\b\d+(\.\d+)?(px|em) at -?\d+(\.\d+)??\b/;
const HAS_EM = /-?\b\d+(\.\d+)?em/;
const HAS_FONT_SIZE = /^font-size$/;
const HAS_FONT_SIZE_VAL = /\b-?\d+(\.\d+)?(px|em)\b/gi;
const HAS_PX = /-?\b\d+(\.\d+)?px/;
const HAS_PX_OR_EM = /-?\b\d+(\.\d+)?(px|em)/;
const HAS_REM = /-?\b\d+(\.\d+)?rem/;
const HAS_TARGET = /-?\b\d+(\.\d+)?\b\s*$/g;
const HAS_TSTEP_FUNCTION_WITH_VALUE = /^t-step\(.+?\)$/;
const STEP_UNIT = /step/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER = /^-?\d+(\.\d+)?$/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_STEP_UNIT_MEASURE = /^-?\d+(\.\d+)?step$/;
const ROUND_BRACKETS_AND_TSTEP_FUNCTION = /[()tstep-]/g;
const SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER = /(?=[A-Z])/;

module.exports = {
  ALL_ROUND_BRACKETS,
  ALL_AMPERSANDS,
  DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS,
  HAS_AMPERSAND,
  HAS_AT,
  HAS_EM,
  HAS_FONT_SIZE,
  HAS_FONT_SIZE_VAL,
  HAS_PX,
  HAS_PX_OR_EM,
  HAS_REM,
  HAS_TARGET,
  HAS_TSTEP_FUNCTION_WITH_VALUE,
  STEP_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_STEP_UNIT_MEASURE,
  ROUND_BRACKETS_AND_TSTEP_FUNCTION,
  SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER,
};
