import postcss from 'postcss';
import { toEmIfHasPx } from '@typographist/core';

export const minWidthMediaQuery = ({ minWidth, nestedRule }) =>
  postcss
    .atRule({
      name: 'media ',
      params: `(min-width: ${toEmIfHasPx(minWidth)})`,
    })
    .append(nestedRule);
