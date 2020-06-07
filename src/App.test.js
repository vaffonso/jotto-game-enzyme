import * as React from 'react';
import { findByTestAttr } from './helpers/testUtils';
import { mount } from 'enzyme';

import App from './App';

import hookActions from './actions/hookActions';
import { JottoProvider } from './contexts/jottoContext';
import { LanguageProvider } from './contexts/languageContext';

describe('App test', () => {
  const mockGetSecretWord = jest.fn();
  const useReducerMock = (state) =>
    jest.fn().mockReturnValue([state, jest.fn()]);

  const defaultState = {
    secretWord: 'party',
    success: false,
    guessedWords: [],
    language: 'en',
  };

  beforeEach(() => {
    hookActions.getSecretWord = mockGetSecretWord;
  });

  afterEach(() => {
    mockGetSecretWord.mockClear();
    jest.clearAllMocks();
  });

  /**
   * Setup function for app component.
   * @returns {ReactWrapper}
   */
  const setup = (state) => {
    const mergedProps = { ...defaultState, ...state }
    return mount(
      <JottoProvider {...mergedProps}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </JottoProvider>
    );
  };

  describe('getSecretWord calls', () => {
    it('should render App without errors', () => {
      const wrapper = setup();
      const component = findByTestAttr(wrapper, 'component-app', 'div');
      expect(component.length).toBe(1);
    });

    it('getSecretWord gets called on App mount', () => {
      setup({ secretWord: null });

      // Checks if secret word was updated
      expect(mockGetSecretWord).toHaveBeenCalled();
    });

    it('should not update secret word on update', () => {
      const wrapper = setup();
    });
  });

  describe('secret word is not null', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ secretWord: 'party' });
    });

    it('should render app when secret word is not null', () => {
      const appComponent = findByTestAttr(wrapper, 'component-app', 'div');
      expect(appComponent.exists()).toBe(true);
    });

    it('should not render spinner when secret word is not null', () => {
      const spinnerComponent = findByTestAttr(wrapper, 'component-spinner');
      expect(spinnerComponent.exists()).toBe(false);
    });
  });

  describe('secret word is null', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ secretWord: null });
    });

    it('should render app when secret word is not null', () => {
      const appComponent = findByTestAttr(wrapper, 'component-app');
      expect(appComponent.exists()).toBe(false);
    });

    it('should not render spinner when secret word is not null', () => {
      const spinnerComponent = findByTestAttr(wrapper, 'component-spinner');
      expect(spinnerComponent.exists()).toBe(true);
    });
  });

  describe('my secret word', () => {

    it('should render enter your own secret word', () => {
      const wrapper = setup({});
      const enterYourSecretButton = findByTestAttr(wrapper, 'ownsecret-button', 'button');
      expect(enterYourSecretButton.length).toBe(1);
    });

    it('should not render whenever any guess is already entered', () => {
      const wrapper = setup({ secretWord: 'stead', guessedWords: ['bread'] });
      const enterYourSecretButton = findByTestAttr(wrapper, 'ownsecret-button', 'button');
      expect(enterYourSecretButton.length).toBe(0);
    });

  });

});
