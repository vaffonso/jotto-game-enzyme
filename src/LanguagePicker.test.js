import React from 'react';

import LanguagePicker from './LanguagePicker';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from './testUtils';

describe('Language Picker test', () => {
  const mockSetLanguage = jest.fn();
  let wrapper;
  const setup = () => {
    return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
  };

  beforeEach(() => {
    wrapper = setup();
  });

  it('should render without errors', () => {
    const langPicker = findByTestAttr(wrapper, 'component-lang-picker');
    expect(langPicker.length).toBe(1);
  });

  it('should not throw warning with expected props', () => {
    checkProps(LanguagePicker, { setLanguage: mockSetLanguage });
  });

  it('should render non-zero language icon', () => {
    const langIcons = findByTestAttr(wrapper, 'language-icon');
    expect(langIcons.length).toBeGreaterThan(0);
  });

  it('should call setLanguage prop upon click', () => {
    const langIcons = findByTestAttr(wrapper, 'language-icon');
    const first = langIcons.first();

    first.simulate('click');

    expect(mockSetLanguage).toHaveBeenCalled();
  });
});
