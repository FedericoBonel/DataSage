import expressValidator from "express-validator";
import checkValidator from "../utils/checkValidation.js";
import paginatedSearchValidators from "../utils/lists/paginatedSearchValidators.js";
import { messages } from "../../../utils/constants/index.js";

/**
 * @openapi
 * components:
 *   parameters:
 *     NotificationIsRead:
 *       in: query
 *       name: isRead
 *       description: Filter option. It can be used to filter the list to receive the notifications that the logged in user has read (true) or hasn't read yet (false).
 *       schema:
 *         type: boolean
 */

/** Validates query params for chat listing endpoints */
const notificationFilterValidator = [
    ...expressValidator.checkSchema(
        {
            isRead: {
                optional: true,
                isBoolean: {
                    errorMessage: messages.errors.validation.notification.filtering.isRead.INVALID,
                },
                toBoolean: true
            },
        },
        ["query"]
    ),
    ...paginatedSearchValidators,
    checkValidator,
];

export default notificationFilterValidator;
