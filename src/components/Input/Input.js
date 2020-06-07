import React, { useState } from 'react';
import { useLanguage } from '../../contexts/languageContext';
import { useJottoState, useJottoDispatch, actions } from '../../contexts/jottoContext';


import stringModule from '../../helpers/strings';
import { Container, Form, Button } from 'react-bootstrap';

const initialValue = '';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState(initialValue);
  const { success, failure } = useJottoState();
  const [language] = useLanguage();
  const dispatch = useJottoDispatch();

  const submitHandler = (ev) => {
    ev.preventDefault();
    dispatch({ type: actions.NEW_GUESS, payload: currentGuess });
    setCurrentGuess(initialValue);
  };

  const giveUpHandler = (ev) => {
    dispatch({ type: actions.GIVEUP_GAME });
    setCurrentGuess(initialValue);
  };

  if (success || failure) {
    return null;
  }

  return (
    <Container data-test="component-input">
      <Form inline className="mb-2">
        <Form.Control
          data-test="input-box"
          className="mr-2"
          placeholder={stringModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
          type="text"
          onChange={(ev) => setCurrentGuess(ev.target.value)}
          value={currentGuess}
        />
        <Button variant="primary" type="submit"
          data-test="submit-button"
          onClick={submitHandler}
          disabled={!currentGuess}
        >
          {stringModule.getStringByLanguage(language, 'submit')}
        </Button>
        <Button variant="secondary" data-test="giveup-button" className="ml-2" onClick={giveUpHandler}>
          {stringModule.getStringByLanguage(language, 'giveUp')}
        </Button>
      </Form>
    </Container>
  );
};

export default Input;
