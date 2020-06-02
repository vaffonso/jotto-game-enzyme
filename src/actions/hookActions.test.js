import { getSecretWord } from './hookActions';

let mockSetSecretWord;

beforeEach(() => {
    mockSetSecretWord = jest.fn();
});

afterEach(() => {
    mockSetSecretWord.mockClear();
})


it('calls getSecretWord callback on axios response', async () => {

    const secretWord = 'party';

    await getSecretWord(mockSetSecretWord);

    expect(mockSetSecretWord).toHaveBeenCalledTimes(1);
    // expect(mockSetSecretWord).toHaveBeenCalledWith('');

});