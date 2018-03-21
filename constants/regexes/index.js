const ALL_ROUND_BRACKETS = /[()]/g;
const AMPERSAND = /&/;
const HAS_AMPERSAND = /^&/;
const HAS_AT = /-?\b\d+(\.\d+)?(px|em) at -?\d+(\.\d+)??\b/;
const HAS_EM = /-?\b\d+(\.\d+)?em/;
const HAS_FONT_SIZE = /^font-size$/;
const HAS_FONT_SIZE_VAL = /\b-?\d+(\.\d+)?(px|em)\b/gi;
const HAS_PX = /-?\b\d+(\.\d+)?px/;
const HAS_PX_OR_EM = /-?\b\d+(\.\d+)?(px|em)/;
const HAS_REM = /-?\b\d+(\.\d+)?rem/;
const HAS_TARGET = /-?\b\d+(\.\d+)?\b\s*$/g;
const HAS_TMS_FUNCTION_WITH_VALUE = /^t-ms\(.+?\)$/;
const MS_UNIT = /ms/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER = /^-?\d+(\.\d+)?$/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE = /^-?\d+(\.\d+)?ms$/;
const ROUND_BRACKETS_AND_TMS_FUNCTION = /[()tms-]/g;

module.exports = {
  ALL_ROUND_BRACKETS,
  AMPERSAND,
  HAS_AMPERSAND,
  HAS_AT,
  HAS_EM,
  HAS_FONT_SIZE,
  HAS_FONT_SIZE_VAL,
  HAS_PX,
  HAS_PX_OR_EM,
  HAS_REM,
  HAS_TARGET,
  HAS_TMS_FUNCTION_WITH_VALUE,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
  ROUND_BRACKETS_AND_TMS_FUNCTION,
};
