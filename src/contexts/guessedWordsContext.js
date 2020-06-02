import React, { useContext, useState, useMemo } from 'react';

const guessedWordsContext = React.createContext();

/**
 * Guarantees context is being used inside proper provider
 * @returns {array} guessedWords and setter
 */
function useGuessedWords() {
    const context = useContext(guessedWordsContext);

    if (!context) {
        throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
    }

    return context;
}

/**
 * Returns a setup context provider
 * @function GuessedWordsProvider
 * @param {*} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function GuessedWordsProvider(props) {

    const [guessedWords, setGuessedWords] = useState([]);

    const value = useMemo(() => [guessedWords, setGuessedWords], [guessedWords])

    return <guessedWordsContext.Provider value={value} {...props} />
}

export default { useGuessedWords, GuessedWordsProvider }