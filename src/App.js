import React, { useEffect, useCallback } from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';

import { useLanguage } from './contexts/languageContext';
import { useJottoDispatch, actions, useJottoState } from './contexts/jottoContext';

import GuessedWords from './components/GuessedWords/GuessedWords';
import Congrats from './components/Congrats/Congrats';
import Input from './components/Input/Input';
import Spinner from './components/Spinner';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';
import Header from './components/Header';

import hookActions from './actions/hookActions';
import stringModule from './helpers/strings';

import './App.scss';




export default function App() {
  const [language, setLanguage] = useLanguage();
  const dispatch = useJottoDispatch();
  const { secretWord, guessedWords } = useJottoState()

  const setSecretWord = useCallback((word) => {
    // console.info(`The secret word is ${word}`);
    dispatch({ type: actions.NEW_WORD, payload: word });
  }, [dispatch])

  useEffect(() => {
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
      </Container>
      <Container>
        <GuessedWords></GuessedWords>
        {guessedWords.length ? null :
          <Button data-test="ownsecret-button" variant={'primary'}>
            {stringModule.getStringByLanguage(language, 'enterYourSecret')}
          </Button>
        }
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
