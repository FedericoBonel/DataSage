import expressValidator from "express-validator";
import { validation, messages } from "../../../utils/constants/index.js";

/**
 * @openapi
 * components:
 *   parameters:
 *     page:
 *       in: query
 *       name: page
 *       required: true
 *       description: Number of the page to be returned. Its required, you need to provide a page.
 *       schema:
 *         type: integer
 *     limit:
 *       in: query
 *       name: limit
 *       required: true
 *       description: The number of elements to be returned per page. Its required, you need to provide a limit.
 *       schema:
 *         type: integer
 *
 */

/**
 * Creates a validator of an id param field
 * @param {string} idField Field to check for the id
 * @returns The middleware that checks for a valid id in that field
 */
const entityIdValidator = (idField) =>
    expressValidator.checkSchema(
        {
            [idField]: {
                optional: false,
                isMongoId: {
                    errorMessage: messages.errors.validation.INVALID_ID,
                },
            },
        },
        ["params"]
    );

export default entityIdValidator;
