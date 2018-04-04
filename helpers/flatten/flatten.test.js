const flatten = require('./');

describe('helpers', () => {
  describe('flatten', () => {
    it('should make an array flat', () => {
      expect(flatten([[1, 2, 3], null, {}, true, [4, [5, 6]]])).toEqual([
        1,
        2,
        3,
        null,
        {},
        true,
        4,
        5,
        6,
      ]);
    });
  });
});
