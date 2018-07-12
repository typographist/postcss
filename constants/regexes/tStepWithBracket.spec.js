const { T_STEP_WITH_BRACKET } = require('./');

describe('helpers', () => {
  describe('T_STEP_WITH_BRACKET', () => {
    it('should remove `t-step(`', () => {
      expect('t-step(12)'.replace(T_STEP_WITH_BRACKET, '')).toBe('12)');
    });
  });
});
