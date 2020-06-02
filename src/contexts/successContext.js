import React, { useContext, useState, useMemo } from 'react';

const successContext = React.createContext();

/**
 * @function useSuccess
 * @returns {array} successContext value, which is a state of [value, setter]
 */
function useSuccess() {
    const context = useContext(successContext);

    if (!context) {
        throw new Error('useSuccess must be used within a SuccessProvider');
    }

    return context;
}

/**
 * @function SuccessProvider
 * @param {object} props - propsto pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function SuccessProvider(props) {

    const [success, setSuccess] = useState(false);

    const value = useMemo(() => [success, setSuccess], [success]);

    return <successContext.Provider value={value} {...props} />
}

export default { SuccessProvider, useSuccess };