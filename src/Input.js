import React, { useState, useContext } from 'react';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import stringModule from './helpers/strings';
import { getLetterMatchCount } from './helpers/index';

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
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          placeholder={stringModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
          type="text"
          onChange={(ev) => setCurrentGuess(ev.target.value)}
          value={currentGuess}
        ></input>
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={submitHandler}
        >
          {stringModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

export default Input;
