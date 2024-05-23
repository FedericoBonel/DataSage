import { isEmail, isLength } from "validator";
import accountValidator from "../accounts";
import api from "../../constants/api";

export default Object.freeze({
    /**
     * Validates contents of a login form.
     * @param {{email: string,
     *          password: string}} credentials The login form credentials
     * @returns True if valid, false otherwise
     */
    login: ({ email, password }) =>
        isEmail(email) &&
        isLength(password, {
            min: api.validation.auth.PASS_MIN_LENGTH,
            max: api.validation.auth.PASS_MAX_LENGTH,
        }),
    /**
     * Validates contents of a signup request.
     * @param {{email: string,
     *          names: string,
     *          lastnames: string,
     *          newPassword: string,
     *          confirmPassword: string}} newUser The signup form contents
     * @returns True if valid, false otherwise
     */
    signup: ({ names, lastnames, email, newPassword, confirmPassword }) =>
        isLength(names, {
            min: api.validation.accounts.NAMES_MIN_LENGTH,
            max: api.validation.accounts.NAMES_MAX_LENGTH,
        }) &&
        isLength(lastnames, {
            min: api.validation.accounts.LASTNAMES_MIN_LENGTH,
            max: api.validation.accounts.LASTNAMES_MAX_LENGTH,
        }) &&
        isEmail(email) &&
        accountValidator.isStrongPass(newPassword) &&
        newPassword === confirmPassword,
    /**
     * Validates contents of an account recovery request.
     * @param {string} email The email to be verified.
     * @returns True if valid, false otherwise
     */
    recovery: (email) => isEmail(email),
    /**
     * Validates contents of a reset password request.
     * @param {{newPassword: string,
     *          confirmPassword: string}} newPassword The reset password form contents
     * @returns True if valid, false otherwise
     */
    resetPassword: ({ newPassword, confirmPassword }) =>
        accountValidator.isStrongPass(newPassword) &&
        newPassword === confirmPassword,
});
