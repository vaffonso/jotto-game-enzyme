import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, checkProps } from './testUtils';
import GuessedWords from './GuessedWords';
import guessedWordsContext from './contexts/guessedWordsContext';

const setup = (guessedWords = []) => {
  const useGuessedWordsMock = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = useGuessedWordsMock;
  const wrapper = shallow(<GuessedWords />);
  return wrapper;
};

describe('If there are no words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup([]);
  });

  it('should render without errors', () => {
    const container = findByTestAttr(wrapper, 'component-guessed-words');
    expect(container.length).toBe(1);
  });

  it('should render instruction to guess a word', () => {
    const instruction = findByTestAttr(wrapper, 'guess-intruction');
    expect(instruction.text().length).not.toBe(0);
  });
});

describe('If there words guessed', () => {
  let wrapper;
  let guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  it('should render guessed words section', () => {
    const guessedDiv = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedDiv.length).toBe(1);
  });

  it('should count same number of guessed words', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});

describe('Language picker', () => {
  it('should render correctly guess instruction string in English by default', () => {
    const wrapper = setup([]);
    const instructions = findByTestAttr(wrapper, 'guess-intruction');
    expect(instructions.text()).toBe('Try to guess the secret word!');
  });

  it('should render guess instructions string in emoji', () => {
    const useContextMock = jest.fn().mockReturnValue('emoji');
    jest.spyOn(React, 'useContext').mockImplementation(useContextMock);

    const wrapper = setup([]);
    const instructions = findByTestAttr(wrapper, 'guess-intruction');
    expect(instructions.text()).toBe('🤔🔤');

    jest.clearAllMocks();
  });
});
