import React, { useReducer, useEffect } from 'react';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import GuessedWords from './components/GuessedWords/GuessedWords';
import Congrats from './components/Congrats/Congrats';

import hookActions from './actions/hookActions';
import Input from './components/Input/Input';
import Spinner from './components/Spinner';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';

import './App.scss';
import Header from './components/Header';
import { Jumbotron, Container } from 'react-bootstrap';

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

    <Jumbotron>
      <Container data-test="component-app">
        <LanguagePicker language={language} setLanguage={setLanguage} />
        <successContext.SuccessProvider>
          <guessedWordsContext.GuessedWordsProvider>
            <h1>Jotto</h1>
            <Congrats success={success}></Congrats>

            <Input secretWord={secretWord} />

            <GuessedWords guessedWords={guessedWords}></GuessedWords>
          </guessedWordsContext.GuessedWordsProvider>
        </successContext.SuccessProvider>
      </Container>
    </Jumbotron>
  );

  console.info(`The secret word is ${secretWord}`);

  return (
    <languageContext.Provider value={language}>
      <Header />
      {secretWord ? form : <Spinner />}
    </languageContext.Provider>
  );
}
