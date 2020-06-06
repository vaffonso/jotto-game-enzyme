import React, { useContext, useState, useMemo } from 'react';

const defaultLanguage = 'en';

const languageContext = React.createContext();

/**
 * @function useLanguage
 * @returns {array} languageContext value, which is a state of [value, setter]
 */
function useLanguage() {
    const context = useContext(languageContext);

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
}

/**
 * @function LanguageProvider
 * @param {object} props - propsto pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function LanguageProvider(props) {

    const initialLanguage = props.language || defaultLanguage;
    const [language, setLanguage] = useState(initialLanguage);

    const value = useMemo(() => [language, setLanguage], [language]);

    return <languageContext.Provider value={value} {...props} />
}

export { LanguageProvider, useLanguage };