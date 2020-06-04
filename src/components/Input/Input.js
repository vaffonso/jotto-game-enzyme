import React, { useState, useContext } from 'react';
import languageContext from '../../contexts/languageContext';
import successContext from '../../contexts/successContext';
import guessedWordsContext from '../../contexts/guessedWordsContext';

import stringModule from '../../helpers/strings';
import { getLetterMatchCount } from '../../helpers/index';
import { Container, Form, Button } from 'react-bootstrap';

const initialValue = '';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState(initialValue);
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [success, setSuccess] = successContext.useSuccess();
  const language = useContext(languageContext);

  const submitHandler = (ev) => {
    ev.preventDefault();

    const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);

    const newGuessedWords = [
      ...guessedWords,
      { guessedWord: currentGuess, letterMatchCount: letterMatchCount },
    ];

    setGuessedWords(newGuessedWords);
    if (secretWord && secretWord.toLowerCase() === currentGuess.toLowerCase()) {
      setSuccess(true);
    }
    setCurrentGuess(initialValue);
  };

  if (success) {
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
      </Form>
    </Container>
  );
};

export default Input;
