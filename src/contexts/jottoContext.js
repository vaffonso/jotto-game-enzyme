import React, { useReducer, useContext } from 'react';

import { getLetterMatchCount } from '../helpers/index';

// module reference by https://kentcdodds.com/blog/how-to-use-react-context-effectively

const actions = {
    NEW_WORD: 'NEW_WORD',
    NEW_GUESS: 'NEW_GUESS',
    RESET_GAME: 'RESET_GAME'
};

const initialState = {
    secretWord: null,
    success: false,
    guessedWords: []
};

const JottoStateContext = React.createContext();
const JottoDispatchContext = React.createContext();

/**
 * Reducer to update state, called automatically by dispatch
 * @function
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update
 * @returns {object} - new state
 */
function jottoReducer(state, { type, payload }) {
    switch (type) {
        case actions.NEW_WORD:
            console.log(`executing NEW_WORD`);
            return {
                ...state,
                secretWord: payload,
            }
        case actions.RESET_GAME:
            console.log(`executing RESET`);
            return { ...initialState };
        case actions.NEW_GUESS:
            if (!payload) {
                return state;
            }

            console.log(`executing NEW_GUESS with ${payload}`);

            const newSuccess = payload.toLowerCase() === state.secretWord.toLowerCase();
            const letterMatchCount = getLetterMatchCount(payload, state.secretWord);
            const newGuessedWords = [...state.guessedWords];

            if (!newSuccess) {
                newGuessedWords.push({ guessedWord: payload, letterMatchCount: letterMatchCount });
            }
            const newState = {
                ...state,
                success: newSuccess,
                guessedWords: newGuessedWords
            }
            // console.log(newState);
            return newState;
        default:
            throw new Error(`Invalid action type ${type}`);
    }
}

function JottoProvider({ children, ...props }) {

    const mergedInitialState = { ...initialState, ...props };

    const [state, dispatch] = useReducer(jottoReducer, mergedInitialState);
    return (
        <JottoStateContext.Provider value={state}>
            <JottoDispatchContext.Provider value={dispatch}>
                {children}
            </JottoDispatchContext.Provider>
        </JottoStateContext.Provider>
    )
}

function useJottoState() {
    const context = useContext(JottoStateContext);
    if (!context) {
        throw new Error('useJottoState must be used within JottoProvider');
    }
    return context;
}

function useJottoDispatch() {
    const context = useContext(JottoDispatchContext);
    if (!context) {
        throw new Error('useJottoDispatch must be used within JottoProvider');
    }
    return context;
}

export { JottoProvider, useJottoDispatch, useJottoState, actions }