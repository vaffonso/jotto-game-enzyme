import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../../helpers/testUtils';
import Congrats from './Congrats';
import { LanguageProvider } from '../../contexts/languageContext';
import successContext from '../../contexts/successContext';
import { JottoProvider } from '../../contexts/jottoContext';

/**
 * Factory of shallow wrapper for current test
 * @function
 * @param {Object} testValues - Context values specific for this setup
 * @returns {ReactWrapper}
 */
const setup = ({ success, language, failure, secretWord }) => {
  language = language || 'en';
  success = success || false;
  failure = failure || false;
  secretWord = secretWord || 'party';

  const providerProps = { success, failure, secretWord };

  return mount(
    <JottoProvider {...providerProps}>
      <LanguageProvider language={language} >
        <Congrats />
      </LanguageProvider>
    </JottoProvider>
  );
};

describe('Language Picker', () => {
  it('should correctly render congrats string in english', () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, 'component-text');
    expect(message.text()).toBe('Congratulations! You guessed the word!');
  });

  it('should render congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    const message = findByTestAttr(wrapper, 'component-text');
    expect(message.text()).toEqual('🎯🎉');
  });

  it('should reveal secret word when given up', () => {
    const secretWord = 'dream';
    const wrapper = setup({ failure: true, secretWord: secretWord });
    const message = findByTestAttr(wrapper, 'component-text');
    expect(message.length).toBeGreaterThan(0);
    const messageText = message.text();
    expect(messageText.includes(secretWord)).toBe(true);
  });

});

describe('Congrats tests', () => {

  it('renders without errror', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-congrats', 'Alert');
    expect(component.length).toBe(0);
  });
  it('should render non-empty congratulatory message when `success` is true', () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, 'component-text');
    expect(component.length).toBe(1);
  });
  it('should render no text congrats message when `success` is false', () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, 'component-text');
    expect(component.length).toBe(0);
  });
  it('does not throw warning with expected props', () => {
    const expectedProps = { success: true };
    const propError = checkProps(Congrats, expectedProps);
    expect(propError).toBe(undefined);
  });

  it('should render button to restart game after success', () => {
    const wrapper = setup({ success: true });
    const button = findByTestAttr(wrapper, 'restart-button', 'Button');
    expect(button.length).toBe(1);
  });

  it('should hide congratulatory message after restart click', () => {
    const wrapper = setup({ success: true });
    const btn = findByTestAttr(wrapper, 'restart-button', 'button');
    btn.simulate('click');
    const component = findByTestAttr(wrapper, 'component-congrats', 'Alert');
    expect(component.length).toBe(0);
  });

  it('should render restart button when given up', () => {
    const wrapper = setup({ failure: true });
    const btn = findByTestAttr(wrapper, 'restart-button', 'button');
    expect(btn.length).toBe(1);
  })
});
