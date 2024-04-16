/**
 * Transforms a string date to the navigators locale date string.
 * @param {string} date A valid date string
 * @returns The new string in the navigators locale
 */
const toLocaleString = (date) => {
    const dateObject = new Date(date);

    return `${dateObject.toLocaleDateString(
        navigator.language
    )} ${dateObject.toLocaleTimeString(navigator.language)}`;
};

export default toLocaleString;
