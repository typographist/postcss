const removeKey = require('./');

describe('removeKey', () => {
  it('should remove keys from objects', () => {
    expect(
      removeKey('age', [
        {
          name: 'Anna',
          age: 18,
        },
        {
          name: 'Christina',
          age: 19,
        },
      ]),
    ).toEqual([
      {
        name: 'Anna',
      },
      {
        name: 'Christina',
      },
    ]);
  });
});
