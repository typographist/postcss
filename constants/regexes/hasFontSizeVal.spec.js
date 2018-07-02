const { HAS_FONT_SIZE_VAL } = require('./');

describe('regexes', () => {
  describe('HAS_FONT_SIZE_VAL', () => {
    it('should find the first value in the line containing the pixels', () => {
      expect('666px at 8'.match(HAS_FONT_SIZE_VAL)).toEqual(['666px']);
    });

    it('should find the first value in the line containing the ems', () => {
      expect('666em at 8'.match(HAS_FONT_SIZE_VAL)).toEqual(['666em']);
    });

    it('should first value is a floating-point number', () => {
      expect('6.66px at 8'.match(HAS_FONT_SIZE_VAL)).toEqual(['6.66px']);
    });

    it('should first value is a negative floating-point number', () => {
      expect('-6.66px at 8'.match(HAS_FONT_SIZE_VAL)).toEqual(['6.66px']);
    });

    it('should first value in the string does not contain pixels or ems', () => {
      expect('666rem at 8'.match(HAS_FONT_SIZE_VAL)).toBe(null);
    });
  });
});
