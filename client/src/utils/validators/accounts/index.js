import { isLength } from "validator";
import api from "../../constants/api";

export default Object.freeze({
    /**
     * Validates contents of a general user information update.
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
});
