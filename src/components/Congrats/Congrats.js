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
  const { success } = useJottoState();
  const dispatch = useJottoDispatch();

  const restart = ev => dispatch({ type: actions.RESET_GAME });

  const successContent = (
    <Alert data-test="component-congrats" variant={"success"}>
      <p data-test="component-text">
        {stringsModule.getStringByLanguage(language, 'congrats')}
      </p>
      <Button data-test="restart-button" onClick={restart}>{stringsModule.getStringByLanguage(language, 'newWord')}</Button>
    </Alert>
  );

  return success ? successContent : null;
};

export default Congrats;
