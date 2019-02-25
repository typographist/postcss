module.exports = {
  'lint-staged': {
    '*.{js,json}': ['eslint --fix', 'prettier --write', 'git add'],
  },
};
