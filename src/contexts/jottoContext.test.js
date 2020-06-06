import React from 'react';

import { shallow, mount } from 'enzyme';

import { JottoProvider, useJottoDispatch, useJottoState } from './jottoContext';

const FunctionalComponent = () => {
    useJottoState()
    return <div />
}

describe('jotto context', () => {

    it('should throw error when not wrapped in JottoProvider', () => {
        expect(() => {
            shallow(<FunctionalComponent />);
        }).toThrow();
    });

    it('should does not throw error when wrapped in GuessedWordsProvider', () => {
        expect(() => {
            mount(
                <JottoProvider>
                    <FunctionalComponent />
                </JottoProvider>
            )
        }).not.toThrow();
    })
});