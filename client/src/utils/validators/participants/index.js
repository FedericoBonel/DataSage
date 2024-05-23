import { isEmail, isInt } from "validator";
import api from "../../constants/api";

export default Object.freeze({
    /**
     * Validates contents of a new chat participant.
     * @param {{email: string, 
     *          permissions: Array.<string>}} newParticipant The new participant form contents
     * @returns True if valid, false otherwise
     */
    newParticipant: ({ email, permissions }) =>
        isEmail(email) &&
        isInt(
            String(Object.values(permissions).filter((value) => value)?.length),
            {
                min: 0,
                max: Object.keys(api.validation.participants.allowedActions)
                    .length,
            }
        ),
});
