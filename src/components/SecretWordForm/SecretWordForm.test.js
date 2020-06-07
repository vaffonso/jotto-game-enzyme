import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr } from '../../helpers/testUtils';
import SecretWordForm from './SecretWordForm';
import { LanguageProvider } from '../../contexts/languageContext';
import * as jottoContext from '../../contexts/jottoContext';

const setup = () => {
    return mount(
        <jottoContext.JottoProvider>
            <LanguageProvider>
                <SecretWordForm />
            </LanguageProvider>
        </jottoContext.JottoProvider>
    );
}

describe('Own secret word form', () => {

    let wrapper;
    let dispatch;
    beforeEach(() => {
        dispatch = jest.fn();
        const useDispatchMock = () => dispatch;
        jest.spyOn(jottoContext, 'useJottoDispatch').mockImplementation(useDispatchMock);

        wrapper = setup();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should render without error', () => {
        const form = findByTestAttr(wrapper, 'secret-word-component', 'Container');
        expect(form.length).toBe(1);
    });

    it('should render secret word input', () => {
        const input = findByTestAttr(wrapper, 'secretword-inputbox', 'input');
        expect(input.length).toBe(1);
    });

    it('should render submit button', () => {
        const button = findByTestAttr(wrapper, 'secretword-button', 'button');
        expect(button.length).toBe(1);
    });

    it('should disable submit button when no secret word entered', () => {
        let button = findByTestAttr(wrapper, 'secretword-button', 'button');
        expect(button.prop('disabled')).toBe(true);

        const input = findByTestAttr(wrapper, 'secretword-inputbox', 'input');
        const mockEvent = { target: { value: 'something' } };
        input.simulate('change', mockEvent);

        button = findByTestAttr(wrapper, 'secretword-button', 'button');
        expect(button.prop('disabled')).toBe(false);
    });

    it('should dispatch event when submit button clicked', () => {
        const input = findByTestAttr(wrapper, 'secretword-inputbox', 'input');
        const mockEvent = { target: { value: 'craft' } };
        input.simulate('change', mockEvent);

        const button = findByTestAttr(wrapper, 'secretword-button', 'button');
        button.simulate('click');
        expect(dispatch).toHaveBeenCalledTimes(1);
    });
})