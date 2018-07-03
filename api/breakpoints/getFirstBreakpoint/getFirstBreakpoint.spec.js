const getFirstBreakpoint = require('./');
const { makeBreakpointsModel } = require('../../../api/makeBreakpointsModel/');
const { userConfig } = require('../../../helpersForTests/mocks');

const breakpoints = makeBreakpointsModel(userConfig);

describe('Utils of breakpoints', () => {
  describe('getFirstBreakpoint', () => {
    it('should return first breakpoint from breakpoints', () => {
      expect(getFirstBreakpoint(breakpoints)).toEqual({
        base: 16,
        lineHeight: 1.25,
        name: 'default',
        ratio: 1.067,
        root: 10,
        value: '0px',
      });
    });
  });
});
