import React from 'react';
import ReactDOM from 'react-dom';

import { JottoProvider } from './contexts/jottoContext';
import { LanguageProvider } from './contexts/languageContext';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <JottoProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </JottoProvider>
  </React.StrictMode>,
  rootElement
);
