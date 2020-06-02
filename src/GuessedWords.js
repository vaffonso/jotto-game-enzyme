import React, { useContext } from 'react';

import languageContext from './contexts/languageContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import stringModule from './helpers/strings';

const GuessedWords = () => {
  const language = useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();

  const content = (
    <div data-test="guessed-words">
      <h3>{stringModule.getStringByLanguage(language, 'guessedWords')}</h3>
      <table className="table table-sm">
        <thead className="thead-ligth">
          <tr>
            <th>
              {stringModule.getStringByLanguage(language, 'guessColumnHeader')}
            </th>
            <th>
              {stringModule.getStringByLanguage(
                language,
                'matchingLettersColumnHeader'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {guessedWords.map((t, i) => (
            <tr data-test="guessed-word" key={i}>
              <td>t.guessedWord</td>
              <td>t.letterMatchCount</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const instruction = (
    <span data-test="guess-intruction">
      {stringModule.getStringByLanguage(language, 'guessPrompt')}
    </span>
  );
  return (
    <div data-test="component-guessed-words">
      {guessedWords.length ? content : instruction}
    </div>
  );
};

export default GuessedWords;
