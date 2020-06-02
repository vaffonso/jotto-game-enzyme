import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

const fakeStrings = {
    en: {
        submit: 'submit'
    },
    emoji: {
        submit: '🚀'
    },
    mermish: {

    }
}

describe('Strings tests', () => {

    const mockWarn = jest.fn();
    const originalWarn = console.warn;

    beforeEach(() => {
        console.warn = mockWarn;
    });

    afterEach(() => {
        console.warn = originalWarn;
    });

    it('should return correct submit string for english', () => {
        const string = getStringByLanguage('en', 'submit', fakeStrings);
        expect(string).toBe('submit');
        expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should return correct submit string for emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', fakeStrings);
        expect(string).toBe('🚀');
        expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should return english submit string when language does not exist', () => {
        const string = getStringByLanguage('noLanguage', 'submit', fakeStrings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith('Could not get submit for noLanguage language.');
    });

    it('should return english submit string when submit key does not exist for language', () => {
        const string = getStringByLanguage('mermish', 'submit', fakeStrings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith('Could not get submit for mermish language.');
    });

});