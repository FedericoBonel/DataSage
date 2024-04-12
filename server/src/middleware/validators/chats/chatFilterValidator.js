import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import paginatedSearchValidators from "../utils/lists/paginatedSearchValidators.js";
import textSearchValidators from "../utils/lists/textSearchValidators.js";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * @openapi
 * components:
 *   parameters:
 *     ownership:
 *       in: query
 *       name: ownership
 *       description: Filter option. It can be used to filter the list to receive the chats owned by the user logged in or the chats shared to the user by others.
 *       schema:
 *         type: string
 *         enum: [shared, self]
 */

/** Validates query params for chat listing endpoints */
const chatFilterValidator = [
    ...expressValidator.checkSchema(
        {
            ownership: {
                optional: true,
                isString: true,
                isIn: {
                    options: [validation.chat.filtering.OWNERSHIP_ALLOWED],
                    errorMessage: messages.errors.validation.chat.filtering.INVALID_OWNERSHIP,
                },
            },
        },
        ["query"]
    ),
    ...textSearchValidators,
    ...paginatedSearchValidators,
    checkValidator,
];

export default chatFilterValidator;
