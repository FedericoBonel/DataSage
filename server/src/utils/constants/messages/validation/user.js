import userValues from "../../validation/user.js";

/** Contains all user validation error messages to be used in the application. */
export default Object.freeze({
    names: {
        /** Message to be shown when the user first and middle names are invalid */
        INVALID_LENGTH: `The user first and middle names must be a string between ${userValues.names.MIN_LENGTH} and ${userValues.names.MAX_LENGTH}`,
    },
    lastnames: {
        /** Message to be shown when the user last names are invalid */
        INVALID_LENGTH: `The user last names must be a string between ${userValues.lastnames.MIN_LENGTH} and ${userValues.lastnames.MAX_LENGTH}`,
    },
    email: {
        INVALID: `The email must be a valid email as a string with a maximum length of ${userValues.email.MAX_LENGTH}`,
    },
    password: {
        /** Message to be shown when the user password content is invalid */
        INVALID: `The user password content must be a strong password with a string with a length between ${userValues.password.MIN_LENGTH} and ${userValues.password.MAX_LENGTH} characters.`,
        /** Message to be shown when the user password object is not provided */
        INVALID_OBJECT: "You must provide a password for the user",
    },
});
