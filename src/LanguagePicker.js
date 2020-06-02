import React from 'react';
import PropTypes from 'prop-types';

const languages = [
  { code: 'en', symbol: '🇺🇸' },
  { code: 'emoji', symbol: '🙂' },
];

const LanguagePicker = ({ setLanguage }) => {
  const langs = languages.map((lang) => (
    <button
      key={lang.code}
      type="button"
      data-test="language-icon"
      className="btn btn-secondary"
      onClick={(ev) => setLanguage(lang.code)}
    >
      {lang.symbol}
    </button>
  ));

  return (
    <div
      data-test="component-lang-picker"
      className="btn-group"
      role="group"
      aria-label="Language picker"
    >
      {langs}
    </div>
  );
};

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
