import paginationValidation from "../../validation/pagination.js";

/** Contains all pagination error messages to be used in the application. */
export default Object.freeze({
    page: {
        /** Message to be shown when the page number provided in a query is an invalid value */
        INVALID_VALUE: `The page value must be a positive integer between ${paginationValidation.page.MIN} and ${paginationValidation.page.MAX}`,
    },
    limit: {
        /** Message to be shown when the limit number provided in a query is an invalid value */
        INVALID_VALUE: `The limit of elements by page value must be a positive integer between ${paginationValidation.limit.MIN} and ${paginationValidation.limit.MAX}`,
    },
});
