import * as React from 'react';
import { findByTestAttr } from '../../helpers/testUtils';
import Input from './Input';
import { mount } from 'enzyme';

import { LanguageProvider, useLanguage } from '../../contexts/languageContext';
import * as jottoContext from '../../contexts/jottoContext';


/**
 * Create React wrapper for Input component testing
 *
 * @param {object} testValues = Context and props values for this specific test.
 * @returns {ReactWrapper} - Wrapper for Input component and providers
 */
const setup = ({ secretWord, language, success, failure }) => {
  language = language || 'en';
  success = success || false;
  secretWord = secretWord || 'party';

  const providerProps = { success, secretWord, failure };
  return mount(
    <LanguageProvider language={language}>
      <jottoContext.JottoProvider {...providerProps}>
        <Input secretWord={secretWord} />
      </jottoContext.JottoProvider>
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

  it('should render submit button component without error', () => {
    const input = findByTestAttr(wrapper, 'submit-button', 'button');
    expect(input.length).toBe(1);
  });

  it('should render giveup button component without error', () => {
    const input = findByTestAttr(wrapper, 'giveup-button', 'button');
    expect(input.length).toBe(1);
  });
});

describe('state controller input field', () => {
  let wrapper;
  let setState;
  let dispatch;

  beforeEach(() => {
    setState = jest.fn();
    dispatch = jest.fn();

    const useStateMock = (initState) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const useDispatchMock = () => dispatch;
    jest.spyOn(jottoContext, 'useJottoDispatch').mockImplementation(useDispatchMock);
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
  });

  it('should dispatch give up action when give up button clicked', () => {
    const giveupBtn = findByTestAttr(wrapper, 'giveup-button', 'button');
    giveupBtn.simulate('click');
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

});

describe('Give up state', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = setup({ failure: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render input after give up', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box', 'input');
    expect(inputBox.length).toBe(0);
  });

  it('should not render submit button after give up', () => {
    const submitBtn = findByTestAttr(wrapper, 'submit-button', 'button');
    expect(submitBtn.length).toBe(0);
  });

  it('should not render give up button after give up', () => {
    const giveupBtn = findByTestAttr(wrapper, 'giveup-button', 'button');
    expect(giveupBtn.length).toBe(0);
  });

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
