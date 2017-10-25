const getFontSizeFromRatio = require('./').getFontSizeFromRatio;
const getTargetFromRatio = require('./').getTargetFromRatio;
const calcRatio = require('./').calcRatio;
const getRatio = require('./').getRatio;


describe('getFontSizeFromRatio', () => {
  it('should get font size from ratio', () => {
    expect(getFontSizeFromRatio('45.5px at 7')).toBe('45.5px');
  });
});


describe('getTargetFromRatio', () => {
  it('should get target from ratio', () => {
    expect(getTargetFromRatio('45.5px at 7')).toBe(7);
  });
});

describe('calcRatio', () => {
  it('should calc ratio', () => {
    expect(calcRatio(45, 16, 6)).toBe(1.1880883987824906);
  });
});

describe('getRatio', () => {
  it('should if ratio is string', () => {
    expect(getRatio('45px at 6', 16)).toBe(1.1880883987824906);
  });

  it('should if ratio is number', () => {
    expect(getRatio(1.5)).toBe(1.5);
  });
});
