import React, { useEffect, useCallback } from 'react';

import { useLanguage } from './contexts/languageContext';
import { useJottoDispatch, actions, useJottoState } from './contexts/jottoContext';

import GuessedWords from './components/GuessedWords/GuessedWords';
import Congrats from './components/Congrats/Congrats';

import hookActions from './actions/hookActions';
import Input from './components/Input/Input';
import Spinner from './components/Spinner';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';

import './App.scss';
import Header from './components/Header';
import { Jumbotron, Container } from 'react-bootstrap';


export default function App() {
  const [language, setLanguage] = useLanguage();
  const dispatch = useJottoDispatch();
  const { secretWord } = useJottoState()

  const setSecretWord = useCallback((word) => {
    console.info(`The secret word is ${word}`);
    dispatch({ type: actions.NEW_WORD, payload: word });
  }, [dispatch])

  useEffect(() => {
    console.log(`executing effect`);

    if (!secretWord) {
      hookActions.getSecretWord(setSecretWord);
    }
  }, [setSecretWord, secretWord]);

  const form = (
    <Jumbotron data-test="component-app">
      <Container>
        <LanguagePicker language={language} setLanguage={setLanguage} />
        <h1>Jotto</h1>
        <Congrats></Congrats>
        <Input secretWord={secretWord} />
        <GuessedWords></GuessedWords>
      </Container>
    </Jumbotron>
  );

  return (
    <React.Fragment>
      <Header />
      {secretWord ? form : <Spinner />}
    </React.Fragment>
  );
}
