const getFirstBreakpoint = require('./');
const { makeBreakpointsModel } = require('../../../api/makeBreakpointsModel/');
const userConfig = require('../../mocks/userConfig');

const breakpoints = makeBreakpointsModel(userConfig);

describe('Utils of breakpoints', () => {
  describe('getFirstBreakpoint', () => {
    it('should return first breakpoint from breakpoints', () => {
      expect(getFirstBreakpoint(breakpoints)).toEqual({
        base: 16,
        lineHeight: 1.5,
        name: 'default',
        ratio: 1.066666667,
        root: 12,
        value: '0px',
      });
    });
  });
});
