const FLOATING_POINT_NUMBER = /^-?\d+(\.\d+)?$/;
const CONTAINS_PX = /-?\b\d+(\.\d+)?px/;
const CONTAINS_REM = /-?\b\d+(\.\d+)?rem/;
const CONTAINS_EM = /-?\b\d+(\.\d+)?em/;
const CONTAINS_PX_OR_EM = /-?\b\d+(\.\d+)?(px|em)/;
const CONTAINS_AT = /-?\b\d+(\.\d+)?(px|em) at -?\d+(\.\d+)??\b/;
const CONTAINS_FONT_SIZE = /\b-?\d+(\.\d+)?(px|em)\b/gi;
const CONTAINS_TARGET = /-?\b\d+(\.\d+)?\b\s*$/g;
const CONTAINS_NT_FUNCTION = /nt\(.+?\)/;
const NT_FUNCTION_AND_WORDS_AND_SPACES = /[nt()a-z\s]/gi;
const NT_FUNCTION_CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER = /nt\(-?\d+(\.\d+)?\)/;
const NT_FUNCTION = NT_FUNCTION_CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER;

module.exports = {
  FLOATING_POINT_NUMBER,
  CONTAINS_PX,
  CONTAINS_REM,
  CONTAINS_EM,
  CONTAINS_PX_OR_EM,
  CONTAINS_AT,
  CONTAINS_FONT_SIZE,
  CONTAINS_TARGET,
  CONTAINS_NT_FUNCTION,
  NT_FUNCTION_AND_WORDS_AND_SPACES,
  NT_FUNCTION,
};

