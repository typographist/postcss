module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'jest'],
  env: {
    node: true,
    mocha: true,
    jasmine: true,
  },
  rules: {
    'no-console': 2,
    'arrow-body-style': 2,
    'newline-before-return': 2,
    'no-unused-vars': 2,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 0,
  },
};
