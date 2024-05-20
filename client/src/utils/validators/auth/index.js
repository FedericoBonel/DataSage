import { isEmail, isLength } from "validator";
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
});
