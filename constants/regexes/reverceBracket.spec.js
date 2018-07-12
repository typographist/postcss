const { REVERCE_BRACKET } = require('./');

describe('helpers', () => {
  describe('REVERCE_BRACKET', () => {
    it('should remove reverce bracket', () => {
      expect('(12)'.replace(REVERCE_BRACKET, '')).toBe('(12');
    });
  });
});
