import postcss from 'postcss';
import { toStakeCase } from '@typographist/core';

export const makeVariable = ({ name, value }) =>
  postcss.decl({
    prop: `--${toStakeCase(name)}`,
    value,
  });

export const makeLineHeight = () =>
  postcss.decl({
    prop: 'line-height',
    value: '2rem',
  });

export const makeFontSize = (size) =>
  postcss.decl({
    prop: 'font-size',
    value: size,
  });
