const decamelize = require('./');

describe('helpers', () => {
  describe('decamelize', () => {
    it('should decamelize string with hyphen separator', () => {
      expect(decamelize('helloWorld', { separator: '-' })).toBe('hello-world');
    });

    it('should decamelize string with underscore separator', () => {
      expect(decamelize('helloWorld', { separator: '_' })).toBe('hello_world');
    });
  });
});
