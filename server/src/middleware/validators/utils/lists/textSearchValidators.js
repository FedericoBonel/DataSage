import expressValidator from "express-validator";
import { validation, messages } from "../../../../utils/constants/index.js";

/**
 * @openapi
 * components:
 *   parameters:
 *     textSearch:
 *       in: query
 *       name: textSearch
 *       required: false
 *       description: String to perform a text search in the set of items to be returned.
 *       schema:
 *         type: string
 */

/**
 * Validator of queries that search for a specific text in a set of values
 */
const textSearchValidators = expressValidator.checkSchema(
    {
        textSearch: {
            optional: true,
            isString: true,
            isLength: {
                options: {
                    min: validation.textSearch.MIN_LENGTH,
                    max: validation.textSearch.MAX_LENGTH,
                },
                errorMessage: messages.errors.validation.textSearch.INVALID,
            },
        },
    },
    ["query"]
);

export default textSearchValidators;
