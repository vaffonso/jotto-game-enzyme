import React from 'react';

import Alert from 'react-bootstrap/Alert';

import stringsModule from '../../helpers/strings';
import { useJottoState, useJottoDispatch, actions } from '../../contexts/jottoContext';
import { Button } from 'react-bootstrap';
import { useLanguage } from '../../contexts/languageContext';

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component(or null if `success` props is false)
 */
const Congrats = () => {
  const [language] = useLanguage();
  const { success, failure, secretWord } = useJottoState();
  const dispatch = useJottoDispatch();

  const restart = ev => dispatch({ type: actions.RESET_GAME });

  const showAlert = success || failure;

  const giveUpAlert = (
    <Alert data-test="component-alert" variant={'danger'}>
      <div data-test="component-text">
        <p>
          {stringsModule.getStringByLanguage(language, 'reveal')} "{secretWord}"
        </p>
        <p>
          {stringsModule.getStringByLanguage(language, 'goodLuck')}
        </p>
      </div>
    </Alert>
  )

  const successAlert = (
    <Alert data-test="component-congrats" variant={'success'}>
      <p data-test="component-text">
        {stringsModule.getStringByLanguage(language, 'congrats')}
      </p>
    </Alert>
  )

  const messageContent = (
    <React.Fragment>
      {failure ? giveUpAlert : successAlert}
      <Button data-test="restart-button" onClick={restart}>{stringsModule.getStringByLanguage(language, 'newWord')}</Button>
    </React.Fragment>
  );


  return showAlert ? messageContent : null;
};

export default Congrats;
