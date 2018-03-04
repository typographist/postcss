const ALL_ROUND_BRACKETS = /[()]/g;
const HAS_PX = /-?\b\d+(\.\d+)?px/;
const HAS_REM = /-?\b\d+(\.\d+)?rem/;
const HAS_EM = /-?\b\d+(\.\d+)?em/;
const HAS_PX_OR_EM = /-?\b\d+(\.\d+)?(px|em)/;
const HAS_AT = /-?\b\d+(\.\d+)?(px|em) at -?\d+(\.\d+)??\b/;
const HAS_FONT_SIZE = /^font-size$/;
const HAS_FONT_SIZE_VAL = /\b-?\d+(\.\d+)?(px|em)\b/gi;
const HAS_TARGET = /-?\b\d+(\.\d+)?\b\s*$/g;
const MS_UNIT = /ms/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER = /^-?\d+(\.\d+)?$/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE = /^-?\d+(\.\d+)?ms$/;

module.exports = {
  ALL_ROUND_BRACKETS,
  HAS_PX,
  HAS_REM,
  HAS_EM,
  HAS_PX_OR_EM,
  HAS_AT,
  HAS_FONT_SIZE,
  HAS_FONT_SIZE_VAL,
  HAS_TARGET,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
};
