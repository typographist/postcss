import postcss from 'postcss';
import calculate from './_api/calculator';

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

module.exports = postcss.plugin('new-typography', (config = defualtConfig) => {
  const options = calculate(config);

  console.log(options);
});
