import React, { } from 'react';

import { useLanguage } from '../../contexts/languageContext';
import { useJottoState } from '../../contexts/jottoContext';
import stringModule from '../../helpers/strings';
import { Container, Table } from 'react-bootstrap';

const GuessedWords = () => {
  const [language] = useLanguage();
  const { guessedWords } = useJottoState();

  const content = (
    <Container data-test="guessed-words">
      <h3>{stringModule.getStringByLanguage(language, 'guessedWords')}</h3>
      <Table striped bordered hover>
        <thead className="thead-ligth">
          <tr>
            <th>#</th>
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
              <td data-test="guess-id">{i + 1}</td>
              <td>{t.guessedWord}</td>
              <td>{t.letterMatchCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p data-test="total-guesses">{stringModule.getStringByLanguage(language, 'totalGuesses')}: <strong>{guessedWords.length}</strong></p>
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
