import { isLength, isStrongPassword, isEmail } from "validator";
import api from "../../constants/api";

/**
 * Validates contents for a password. It checks that is strong and follows overall restrictions for it.
 * @param {string} password The password to be verified.
 * @returns True if valid, false otherwise
 */
const isStrongPass = (password) =>
    isLength(password, {
        min: api.validation.auth.PASS_MIN_LENGTH,
        max: api.validation.auth.PASS_MAX_LENGTH,
    }) && isStrongPassword(password);

export default Object.freeze({
    /**
     * Validates contents of a general user information update.
     * @param {{names: string,
     *          lastnames: string}} update The update form contents
     * @returns True if valid, false otherwise
     */
    updateUserInfo: ({ names, lastnames }) =>
        isLength(names, {
            min: api.validation.accounts.NAMES_MIN_LENGTH,
            max: api.validation.accounts.NAMES_MAX_LENGTH,
        }) &&
        isLength(lastnames, {
            min: api.validation.accounts.LASTNAMES_MIN_LENGTH,
            max: api.validation.accounts.LASTNAMES_MAX_LENGTH,
        }),
    /**
     * Validates contents of an update for a user access credentials update.
     * @param {{email: string,
     *          password: string,
     *          newPassword: string,
     *          confirmPassword: string}} update The update form contents
     * @returns True if valid, false otherwise
     */
    updateAccess: ({ email, password, newPassword, confirmPassword }) => {
        const validPassword = isStrongPass(password);

        let allIsValid = validPassword;
        // If the password is changing make sure to check all of the password fields
        if (newPassword || confirmPassword) {
            const validNew = isStrongPass(newPassword);
            const validConfirmation = confirmPassword === newPassword;

            allIsValid = allIsValid && validNew && validConfirmation;
        }
        if (email) {
            allIsValid = allIsValid && isEmail(email);
        }

        return allIsValid;
    },
    /**
     * Validates contents for a password. It checks that is strong and follows overall restrictions for it.
     * @param {string} password The password to be verified.
     * @returns True if valid, false otherwise
     */
    isStrongPass,
    /**
     * Validates contents for an email. It checks that is a valid email and follows overall restrictions for it.
     * @param {string} email The email to be verified.
     * @returns True if valid, false otherwise
     */
    isEmail,
});
