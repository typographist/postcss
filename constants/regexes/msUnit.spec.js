const { STEP_UNIT } = require('./');

describe('regexes', () => {
  describe('STEP_UNIT', () => {
    it('should find step unit', () => {
      expect(STEP_UNIT.test('step')).toBe(true);
    });

    it('should not find step unit', () => {
      expect(STEP_UNIT.test('fake!')).toBe(false);
    });
  });
});
