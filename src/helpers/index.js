/**
 * Finds how many letters in guessed word matches secret word.
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and secret word.
 */
export function getLetterMatchCount(guessedWord = '', secretWord = '') {
  // Set guarantes no repeated letter
  const secretWordSet = new Set(secretWord.split(''));
  const guessedWordSet = new Set(guessedWord.split(''));

  const filtered = [...secretWordSet].filter((letter) =>
    guessedWordSet.has(letter)
  );
  return filtered.length;
}
