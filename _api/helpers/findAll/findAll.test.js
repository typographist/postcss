import findAll from './';

const obj = {
  aa: 1,
  bb: 2,
  cc: {
    d: {
      x: 9,
    },
  },
  dd: {
    d: {
      y: 9,
    },
  },
};

describe('FindAll', () => {
  it('should', () => {
    expect(findAll(obj, 'd')).toEqual([{ x: 9 }, { y: 9 }]);
  });
});
