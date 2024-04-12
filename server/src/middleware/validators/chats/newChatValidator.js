import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * Creates a set of middlewares to validate chat creation and update payloads.
 * @param optionalFields Fields that could be optional, by default none are.
 * @returns The middleware that verifies the payload against the accepted schema.
 */
const createBodyValidator = (
    optionalFields = {
        name: false,
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
            name: {
                optional: optionalFields.name,
                isString: {
                    errorMessage: messages.errors.validation.chat.name.INVALID_LENGTH,
                    bail: true,
                },
                isLength: {
                    options: {
                        min: validation.chat.name.MIN_LENGTH,
                        max: validation.chat.name.MAX_LENGTH,
                    },
                    errorMessage: messages.errors.validation.chat.name.INVALID_LENGTH,
                },
            },
        },
        ["body"]
    ),
    checkValidator,
];

/**
 * Middleware that validates request payload fields for new chats
 */
const newChatValidator = [...createBodyValidator()];

export default newChatValidator;
