/**
 * Capitalizes every word that is separated by a space in the string
 * @param {String} string Contains the words to be capitalized
 * @returns A string with every word capitalized
 */
export const capitalizeEveryWord = (string) => {
    if (typeof string !== "string") throw new Error("Invalid params");
    
    const words = string.split(" ");

    for (let i = 0; i < words.length; i += 1) {
        if (words[i]) words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    return words.join(" ");
};
