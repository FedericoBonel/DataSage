/**
 * Transforms the days into miliseconds
 * @param {Number} days The number of days to be transformed to miliseconds
 * @returns The number of miliseconds in the days
 */
export const daysToMiliseconds = (days) => {
    if (!days || typeof days !== "number") return null;
    return days * 24 * 60 * 60 * 1000;
};

/**
 * Transforms the days into seconds
 * @param {Number} days The number of days to be transformed to seconds
 * @returns The number of seconds in the days
 */
export const daysToSeconds = (days) => {
    if (!days || typeof days !== "number") return null;
    return days * 24 * 60 * 60;
};

/**
 * Transforms the minutes into seconds
 * @param {Number} minutes  The number of minutes to be transformed into seconds
 * @returns The number of seconds in the minutes
 */
export const minutesToSeconds = (minutes) => {
    if (!minutes || typeof minutes !== "number") return null;
    return minutes * 60;
};
