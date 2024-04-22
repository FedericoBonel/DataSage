import expressValidator from "express-validator";
import { validation, messages } from "../../../../utils/constants/index.js";

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
 * Validator of query fields that search for page and limit
 */
const paginatedListValidators = expressValidator.checkSchema(
    {
        page: {
            optional: false,
            isInt: {
                options: {
                    min: validation.pagination.page.MIN,
                    max: validation.pagination.page.MAX,
                },
                errorMessage: messages.errors.validation.pagination.page.INVALID_VALUE,
            },
        },
        limit: {
            optional: false,
            isInt: {
                options: {
                    min: validation.pagination.limit.MIN,
                    max: validation.pagination.limit.MAX,
                },
                errorMessage: messages.errors.validation.pagination.limit.INVALID_VALUE,
            }
        },
    },
    ["query"]
);

export default paginatedListValidators;
