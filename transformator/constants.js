const ALL_ROUND_BRACKETS = /[()]/g;
const HAS_EM = /-?\b\d+(\.\d+)?em/;
const HAS_FONT_SIZE = /^font-size$/;
const HAS_PX = /\d+px/;
const MS_UNIT = /ms/;
const POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE = /^-?\d+(\.\d+)?ms$/;

module.exports = {
  ALL_ROUND_BRACKETS,
  HAS_EM,
  HAS_FONT_SIZE,
  HAS_PX,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
};
