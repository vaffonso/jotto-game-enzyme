import * as React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../helpers/testUtils';
import GuessedWords from './GuessedWords';
import { JottoProvider } from '../../contexts/jottoContext';
import { LanguageProvider } from '../../contexts/languageContext';

const setup = (guessedWords = [], language = 'en') => {

  const wrapper = mount(
    <JottoProvider guessedWords={guessedWords}>
      <LanguageProvider language={language}>
        <GuessedWords />
      </LanguageProvider>
    </JottoProvider>);
  return wrapper;
};

describe('If there are no words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup([]);
  });

  it('should render without errors', () => {
    const container = findByTestAttr(wrapper, 'component-guessed-words', 'Container');
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
    const guessedDiv = findByTestAttr(wrapper, 'guessed-words', 'Container');
    expect(guessedDiv.length).toBe(1);
  });

  it('should count same number of guessed words', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });

  it('should present guess identifier of each word', () => {
    const guessIdentifier = findByTestAttr(wrapper, 'guess-id');
    expect(guessIdentifier.length).toBe(3);
    const firstGuessId = Number(guessIdentifier.first().text());
    expect(isNaN(firstGuessId)).toBe(false);
  });

  it('should present the amount of words guessed', () => {
    const guessedWordsTotalNode = findByTestAttr(wrapper, 'total-guesses');
    expect(guessedWordsTotalNode.length).toBe(1);
  });

});

describe('Language picker', () => {
  it('should render correctly guess instruction string in English by default', () => {
    const wrapper = setup([]);
    const instructions = findByTestAttr(wrapper, 'guess-intruction');
    expect(instructions.text()).toBe('Try to guess the secret word!');
  });

  it('should render guess instructions string in emoji', () => {
    const wrapper = setup([], 'emoji');
    const instructions = findByTestAttr(wrapper, 'guess-intruction');
    expect(instructions.text()).toBe('🤔🔤');
  });

});
