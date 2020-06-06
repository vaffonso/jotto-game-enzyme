import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../helpers/testUtils';
import Input from '../components/Input/Input';
import GuessedWords from '../components/GuessedWords/GuessedWords';
import { JottoProvider, useJottoState } from '../contexts/jottoContext';
import { LanguageProvider } from '../contexts/languageContext';


const setup = (guessedWords = [], secretWord = 'party') => {

  const Content = () => {
    const { secretWord } = useJottoState();
    return (
      <>
        <Input secretWord={secretWord} /><GuessedWords />
      </>
    );
  }

  const providerProps = { secretWord };

  const wrapper = mount(
    <JottoProvider  {...providerProps}>
      <LanguageProvider>
        <Content />
      </LanguageProvider>
    </JottoProvider>
  );

  const inputBox = findByTestAttr(wrapper, 'input-box', 'input');
  const submitButton = findByTestAttr(wrapper, 'submit-button', 'button');

  guessedWords.map((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
  });

  return [wrapper, inputBox, submitButton];
};

describe('Test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe('empty guessed words', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], 'party');
    });

    it('guessed words shows correct guesses after incorrect guess', () => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });

  describe('non-empty guessed words', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['agile'], 'party');
    });

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });

      it('input should contains no children', () => {
        expect(inputBox.exists()).toBe(true);
        expect(inputBox.children().length).toBe(0);
      });
      it('guessed words table count should reflect guesses', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(1);
      });
    });

    describe('wrong guess', () => {

      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });

      it('input should rendered', () => {
        expect(wrapper.isEmptyRender()).toBe(false);
      });

      it('input box should exist', () => {
        expect(inputBox.exists()).toBe(true);
      });

      it('guessed words table count should reflect guesses', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });
});
