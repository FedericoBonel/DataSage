import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate message creation (Sending a message to the chat).
 * @param optionalFields Fields that could be optional, by default none are.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createInputBodyValidator = (
    optionalFields = {
        content: false,
    }
) => [
    expressValidator.checkSchema(
        {
            _id: {
                exists: {
                    negated: true,
                    errorMessage: messages.errors.validation.ID_PROVIDED,
                },
            },
            content: {
                optional: optionalFields.content,
                isString: {
                    errorMessage: messages.errors.validation.message.INVALID_LENGTH,
                    bail: true,
                },
                isLength: {
                    options: {
                        min: validation.messages.MIN_LENGTH,
                        max: validation.messages.MAX_LENGTH,
                    },
                    errorMessage: messages.errors.validation.message.INVALID_LENGTH,
                },
            },
        },
        ["body"]
    ),
    checkValidator,
];

export default createInputBodyValidator;