import React, { useState, useContext } from 'react';
import languageContext from './contexts/languageContext';

import stringModule from './helpers/strings';

const initialValue = '';

const Input = () => {
  const [guessedWord, setGuessedWord] = useState(initialValue);
  const language = useContext(languageContext);

  const submitHandler = (ev) => {
    ev.preventDefault();
    setGuessedWord(initialValue);
  };

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
          onChange={(ev) => setGuessedWord(ev.target.value)}
          value={guessedWord}
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
