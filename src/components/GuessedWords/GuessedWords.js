import React, { useContext } from 'react';

import languageContext from '../../contexts/languageContext';
import guessedWordsContext from '../../contexts/guessedWordsContext';
import stringModule from '../../helpers/strings';
import { Container, Table } from 'react-bootstrap';

const GuessedWords = () => {
  const language = useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();

  const content = (
    <Container data-test="guessed-words">
      <h3>{stringModule.getStringByLanguage(language, 'guessedWords')}</h3>
      <Table striped bordered hover>
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
              <td>{t.guessedWord}</td>
              <td>{t.letterMatchCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
  const instruction = (
    <span data-test="guess-intruction">
      {stringModule.getStringByLanguage(language, 'guessPrompt')}
    </span>
  );
  return (
    <Container data-test="component-guessed-words">
      {guessedWords.length ? content : instruction}
    </Container>
  );
};

export default GuessedWords;
