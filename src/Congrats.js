import React, { useContext } from 'react';

import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component(or null if `success` props is false)
 */
const Congrats = () => {
  const language = useContext(languageContext);
  const [success] = successContext.useSuccess();
  const classes = success ? 'alert alert-success' : '';

  const content = success ? (
    <span data-test="component-text">
      {stringsModule.getStringByLanguage(language, 'congrats')}
    </span>
  ) : null;

  return (
    <div data-test="component-congrats" className={classes}>
      {content}
    </div>
  );
};

export default Congrats;
