import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate notification update (i.g. Setting it as read).
 * @param optionalFields Fields that could be optional, by default none are.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createInputBodyValidator = (
    optionalFields = {
        isRead: false,
    }
) => [
    expressValidator.checkExact(
        expressValidator.checkSchema({
            _id: {
                exists: {
                    negated: true,
                    errorMessage: messages.errors.validation.ID_PROVIDED,
                },
            },
            isRead: {
                optional: optionalFields.isRead,
                isBoolean: {
                    options: { strict: true },
                    errorMessage: messages.errors.validation.notification.isRead.INVALID,
                    bail: true,
                },
                toBoolean: true,
            },
        }),
        ["body"]
    ),
    checkValidator,
];

export default createInputBodyValidator;
