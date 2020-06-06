import React from 'react';
import { LanguageProvider, useLanguage } from './languageContext';
import { shallow, mount } from 'enzyme';

const FunctionalComponent = () => {
    useLanguage();
    return <div />
}

describe('useLanguage', () => {
    it('should throw error when not wrapped in LanguageProvider', () => {
        expect(() => {
            shallow(<FunctionalComponent />);
        }).toThrow('useLanguage must be used within a LanguageProvider');
    });

    it('should does not throw error when wrapped in LanguageProvider', () => {
        expect(() => {
            mount(
                <LanguageProvider>
                    <FunctionalComponent />
                </LanguageProvider>
            )
        }).not.toThrow();
    })
});