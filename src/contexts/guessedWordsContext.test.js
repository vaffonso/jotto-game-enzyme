import React from 'react';

import { shallow, mount } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

const FunctionalComponent = () => {
    guessedWordsContext.useGuessedWords();
    return <div />
}

describe('guessed words context', () => {

    it('should throw error when not wrapped in GuessedWordsProvider', () => {
        expect(() => {
            shallow(<FunctionalComponent />);
        }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
    });

    it('should does not throw error when wrapped in GuessedWordsProvider', () => {
        expect(() => {
            mount(
                <guessedWordsContext.GuessedWordsProvider>
                    <FunctionalComponent />
                </guessedWordsContext.GuessedWordsProvider>
            )
        }).not.toThrow();
    })
});