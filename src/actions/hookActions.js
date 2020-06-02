import wordArchive from "../assets/wordArchive";

/**
 * Get random number based on keys
 * @function getRandomIndex
 * @returns {integer}
 */
const getRandomIndex = () => {
    return Math.floor(Math.random() * (wordArchive.length - 1));
};


export const getSecretWord = (callback) => {

    const randomIndex = getRandomIndex();
    const randomWord = wordArchive[randomIndex];

    setTimeout(callback(randomWord), 2000);
}

export default {
    getSecretWord: getSecretWord
}