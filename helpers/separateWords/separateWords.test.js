const separateWords = require('./');

describe('helpers', () =>
  describe('separateWords', () => {
    it('should separate word', () => {
      expect(separateWords('HelloWorld')).toEqual('Hello_World');
    });
  }));
