import textSearchValidation from "../../validation/textSearch.js";

/** Contains all pagination error messages to be used in the application. */
export default Object.freeze({
    /** Message to be shown when the text search value is invalid */
    INVALID: `The text search query must be a string of ${textSearchValidation.MIN_LENGTH} to ${textSearchValidation.MAX_LENGTH} characters`,
});
