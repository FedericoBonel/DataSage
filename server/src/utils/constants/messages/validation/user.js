import userValues from "../../validation/user.js";
import authValues from "../../validation/auth.js";

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
        INVALID: `The email must be a valid unique email with a maximum length of ${userValues.email.MAX_LENGTH}`,
    },
    password: {
        /** Message to be shown when the user password content is invalid */
        INVALID: `The user password content must be a strong password with a string with a length between ${userValues.password.MIN_LENGTH} and ${userValues.password.MAX_LENGTH} characters that includes a minimum of: 1 lowercase character, 1 uppercase character, 1 number, and 1 symbol.`,
        /** Message to be shown when the user password object is not provided */
        INVALID_OBJECT: "You must provide a password for the user",
    },
    verificationCode: {
        /** Message to be shown when a user verification code is invalid */
        INVALID: `The user verification code must be a string with a length between ${authValues.verificationCode.MIN_LENGTH} and ${authValues.verificationCode.MAX_LENGTH} characters`,
    },
    credentialsUpdate: {
        /** Message to be shown when the user sends a request to update credentials but they dont send the old password. */
        INVALID_PASSWORD: "You need to provide a valid current password to change credentials",
    },
});
