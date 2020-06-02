import React, { useReducer, useEffect } from 'react';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';

import hookActions from './actions/hookActions';
import Input from './Input';
import Spinner from './Spinner';
import LanguagePicker from './LanguagePicker';

/**
 * Reducer to update state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update
 * @returns {object} - new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      throw Error(`Invalid action type ${action.type}`);
  }
};

const initialState = {
  secretWord: null,
  success: false,
  guessedWords: [],
  language: 'en',
};

export default function App() {
  const [
    { success, secretWord, guessedWords, language },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  const setLanguage = (lang) =>
    dispatch({ type: 'setLanguage', payload: lang });

  useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  const form = (
    <div className="container" data-test="component-app">
      <LanguagePicker setLanguage={setLanguage} />
      <successContext.SuccessProvider>
        <guessedWordsContext.GuessedWordsProvider>
          <h1>Jotto</h1>
          <span>The secret word is {secretWord}</span>

          <Congrats success={success}></Congrats>

          <Input secretWord={secretWord} />

          <GuessedWords guessedWords={guessedWords}></GuessedWords>
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </div>
  );

  return (
    <languageContext.Provider value={language}>
      <span>Current lang {language}</span>
      {secretWord ? form : <Spinner />}
    </languageContext.Provider>
  );
}
