const validators = require('./');

describe('isBaseContainPxOrEm', () => {
  it('shoud has px', () => {
    expect(validators.isBaseContainPxOrEm('24px')).toBe(true);
  });

  it('should has ems', () => {
    expect(validators.isBaseContainPxOrEm('7em')).toBe(true);
  });

  it('should not has px or ems', () => {
    expect(validators.isBaseContainPxOrEm('8000rem')).toBe(false);
  });

  it('should string not has numbers', () => {
    expect(validators.isBaseContainPxOrEm('blablabla')).toBe(false);
  });
});

describe('isBaseString', () => {
  it('should be a string', () => {
    expect(validators.isBaseString('Yep!')).toBe(true);
  });

  it('should not be a string ', () => {
    expect(validators.isBaseString(NaN)).toBe(false);
  });
});

describe('isValidBases', () => {
  it('should if every string in the array is string', () => {
    expect(
      validators.isValidBases(['this', 'is', 'test'], validators.isBaseString),
    ).toBe(true);
  });

  it('should if every string in the array has px or ems', () => {
    expect(
      validators.isValidBases(['1em', '2em', '3em'], validators.isBaseString),
    ).toBe(true);
  });
});
