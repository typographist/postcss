const camelize = require('./');

describe('helpers', () => {
  describe('camelize', () => {
    it('should camelize string', () => {
      expect(camelize('hello-world', { separator: '-' })).toBe('helloWorld');
    });
  });
});
