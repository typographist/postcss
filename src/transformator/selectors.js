import postcss from 'postcss';

export const makeSelector = ({ selector }) =>
  postcss.rule({
    selector,
  });
