import * as validators from './breakpointsValidator';

describe('breakpointIsString', () => {
  it('should be if string', () => {
    expect(validators.breakpointIsString('bam baaaam!')).toBe(true);
  });

  it('should be if not a string', () => {
    expect(validators.breakpointIsString(NaN)).toBe(false);
  });
});


describe('isBreakpointContainsPxOrEm', () => {
  it('should be constains px', () => {
    expect(validators.isBreakpointContainsPxOrEm('777px')).toBe(true);
  });

  it('should be contains contains em', () => {
    expect(validators.isBreakpointContainsPxOrEm('77.7em')).toBe(true);
  });

  it('should be if not contains px or ems', () => {
    expect(validators.isBreakpointContainsPxOrEm('77.055llem')).toBe(false);
  });
});


describe('isValidBreakpoints', () => {
  it('should be if all breakpoints is a strings', () => {
    expect(validators.isValidBreakpoints(
      ['string', 'number', 'otherValue'],
      validators.breakpointIsString)).toBe(true);
  });

  it('should be if all brekapoints contains px or ems', () => {
    expect(validators.isValidBreakpoints(
      ['12px', '34px', '56em'],
      validators.isBreakpointContainsPxOrEm,
    )).toBe(true);
  });
});
