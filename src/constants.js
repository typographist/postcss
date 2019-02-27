// @flow

import type { UserConfig } from '@typographist/core';

export const COMMA_AND_NEW_LINE = ',\n';
export const ALL_CHARACTERS_AFTER_COLON = /:.+\b/;
export const ALL_CHARACTERS_BEFORE_COLON = /^\(.+\):?/;
export const ALL_PARENTHESES = /[()]/g;
export const AMPERSAND = /&/;
export const LAST_COMMA = /,\s*$/;
export const LINE_BREAKS_AND_SPACES = /[\n\s]/g;
export const REM_FONT_SIZE = /\d+(\.\d+)?rem/;
export const BACKWARD_PARENTHESES = /\)/;
export const STEP_UNIT = /step/;
export const STEP_FUNCTION_WITH_VALUE = /^step\(.+?\)$/;
export const STEP_UNIT_AT_THE_END_OF_STRING = /^-?\d+(\.\d+)?step$/;
export const FONT_SIZE_PROP = /^font-size$/;
export const STEP_WITH_BRACKET = /step\(/;
export const EM_FONT_SIZE_AT_BEGINNING_OF_STRING = /^\d+(\.\d+)?em\b/g;

export const DEFAULT_CONFIG: UserConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};
