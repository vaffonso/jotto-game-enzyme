import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Container } from 'react-bootstrap';

const languages = [
  { code: 'en', symbol: '🇺🇸' },
  { code: 'emoji', symbol: '🙂' },
];

const LanguagePicker = ({ language, setLanguage }) => {

  const langs = languages.map((lang) => {
    const variant = language === lang.code ? 'primary' : 'outline-primary';
    return (
      <Button
        key={lang.code}
        variant={variant}
        data-test="language-icon"
        onClick={(ev) => setLanguage(lang.code)}
      >
        {lang.symbol}
      </Button>
    )
  });

  return (
    <Container className="d-flex justify-content-end">
      <ButtonGroup
        data-test="component-lang-picker"
        size="lg"
        aria-label="Language picker">
        {langs}
      </ButtonGroup>
    </Container>
  );
};

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
