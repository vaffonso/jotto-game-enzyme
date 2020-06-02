import { getLetterMatchCount } from './index';

describe('getLetterMatchCount test suit', () => {
  const secretWord = 'party';
  it('should return 0 when there`s no matching letters', () => {
    const count = getLetterMatchCount(`bonus`, secretWord);
    expect(count).toBe(0);
  });
  it('should return correct count where there are 3 matching letters', () => {
    const count = getLetterMatchCount('train', secretWord);
    expect(count).toBe(3);
  });
  it('should return count matching letters disregarding duplicated letters', () => {
    const count = getLetterMatchCount('parka', secretWord);
    expect(count).toBe(3);
  });
});
