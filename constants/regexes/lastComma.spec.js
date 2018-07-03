const { LAST_COMMA } = require('./');

describe('regexes', () => {
  describe('LAST_COMMA', () => {
    it('should remove last comma', () => {
      expect('this, is, awesome, project,'.replace(LAST_COMMA, '')).toBe(
        'this, is, awesome, project',
      );
    });
  });
});
