const { HAS_TARGET } = require('./');

describe('regexes', () => {
  describe('HAS_TARGET', () => {
    it('should number after the word at', () => {
      expect('666px at 8'.match(HAS_TARGET)).toEqual(['8']);
    });

    it('should negative number after the word at', () => {
      expect('666px at -8'.match(HAS_TARGET)).toEqual(['-8']);
    });

    it('should floating-point number after the word at', () => {
      expect('666px at 8.777'.match(HAS_TARGET)).toEqual(['8.777']);
    });

    it('should negative floating-point number after the word at', () => {
      expect('666px at -8.777'.match(HAS_TARGET)).toEqual(['-8.777']);
    });

    it('should not support the units for the last found number', () => {
      expect('666px at -8.777px'.match(HAS_TARGET)).toBe(null);
    });
  });
});
