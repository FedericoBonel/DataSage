import pageValidation from "../../validation/page.js";

/** Contains all pages validation error messages to be used in the application. */
export default Object.freeze({
    content: {
        /** Message to be shown when the page content is invalid */
        INVALID: "The page content is not valid. It must be a string.",
    },
    vector: {
        /** Message to be shown when the vector representing the page content has an invalid length */
        INVALID_LENGTH: `The vector for each page of a document must be an array of float number and have a length of ${pageValidation.vector.LENGTH}`,
    },
    locationPage: {
        /** Message to be shown when the page number where the content of this page should be in the original document is invalid */
        INVALID: "The page number in the original document for this page must be provided as a positive integer"
    },
});
