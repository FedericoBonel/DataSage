import { isEmail, isLength } from "validator";
import accountValidator from "../accounts";
import api from "../../constants/api";

export default Object.freeze({
    /**
     * Validates contents of a login request.
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
     * @returns True if valid, false otherwise
     */
    recovery: (email) => isEmail(email),
    /**
     * Validates contents of a reset password request.
     * @returns True if valid, false otherwise
     */
    resetPassword: ({ newPassword, confirmPassword }) =>
        accountValidator.isStrongPass(newPassword) &&
        newPassword === confirmPassword,
});
