const toNormalCase = require('./');

describe('toNormalCase', () => {
  it('should convert to normal case', () => {
    expect(toNormalCase('camelCaseNotation')).toBe('camel case notation');
  });
});
