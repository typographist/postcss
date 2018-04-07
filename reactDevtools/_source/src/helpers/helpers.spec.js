import { getFirstWord, normalizeText } from './';

describe('reactDevtools helpers', () => {
  describe('getFirstWord function', () => {
    it('should return first word from string', () => {
      expect(getFirstWord('helloWorld')).toBe('hello');
    });
  });

  describe('normalizeText function', () => {
    it('should convert from camel case to normal case', () => {
      expect(normalizeText('helloWorld')).toBe('hello world');
    });
  });
});
