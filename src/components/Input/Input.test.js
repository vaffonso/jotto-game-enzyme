import * as React from 'react';
import { findByTestAttr } from '../../helpers/testUtils';
import Input from './Input';
import { mount } from 'enzyme';

import { LanguageProvider, useLanguage } from '../../contexts/languageContext';
import { JottoProvider } from '../../contexts/jottoContext';


/**
 * Create React wrapper for Input component testing
 *
 * @param {object} testValues = Context and props values for this specific test.
 * @returns {ReactWrapper} - Wrapper for Input component and providers
 */
const setup = ({ secretWord, language, success }) => {
  language = language || 'en';
  success = success || false;
  secretWord = secretWord || 'party';

  const providerProps = { success, secretWord };
  return mount(
    <LanguageProvider language={language}>
      <JottoProvider {...providerProps}>
        <Input secretWord={secretWord} />
      </JottoProvider>
    </LanguageProvider>
  );
};

describe('Input test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({});
  });

  it('should render without error', () => {
    const input = findByTestAttr(wrapper, 'component-input', 'div');
    expect(input.length).toBe(1);
  });

  it('should render input component without error', () => {
    const input = findByTestAttr(wrapper, 'input-box', 'input');
    expect(input.length).toBe(1);
  });
});

describe('state controller input field', () => {
  let wrapper;
  let setState;

  beforeEach(() => {
    setState = jest.fn();
    const useStateMock = (initState) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    wrapper = setup({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box', 'input');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    // trigger setState somehow
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith('train');
  });

  it('should not be able to submit empty guess', () => {
    const submit = findByTestAttr(wrapper, 'submit-button', 'button');
    submit.simulate('click', { preventDefault: () => { } });

    expect(setState).toHaveBeenCalledTimes(0);
    expect(submit.prop('disabled')).toBe(true);
  })

});

describe('Language test', () => {
  it('should correctly render submit string in english', () => {
    const wrapper = setup({ language: 'en' });
    const submitButton = findByTestAttr(wrapper, 'submit-button', 'button');
    expect(submitButton.text()).toBe('Submit!');
  });

  it('should correctly render submit string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const submitButton = findByTestAttr(wrapper, 'submit-button', 'button');
    expect(submitButton.text()).toBe('🚀');
  });
});

describe('input with success context', () => {
  it('should not show when success is true', () => {
    const wrapper = setup({ secretWord: 'party', success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
