const toCebabCase = require('./');

describe('toCebabCase', () => {
  it('should convert to cebab case', () => {
    expect(toCebabCase('camelCaseNotation')).toBe('camel-case-notation');
  });
});
