import docValues from "../../validation/document.js";

/** Contains all document validation error messages to be used in the application. */
export default Object.freeze({
    name: {
        /** Message to be shown when the document name is invalid */
        INVALID_LENGTH: `The document name must be a unique string (containing document format) between ${docValues.name.MIN_LENGTH} and ${docValues.name.MAX_LENGTH}`,
    },
    storeId: {
        /** Message to be shown when the document store id is invalid */
        INVALID: `The document store id must be a unique string between ${docValues.storeId.MIN_LENGTH} and ${docValues.storeId.MAX_LENGTH}`,
    },
    size: {
        /** Message to be shown when the document size is invalid */
        INVALID_SIZE: `The document must have a maximum size of ${docValues.size.MAX_BYTES} bytes.`,
    },
    pages: {
        /** Message to be shown when the number of pages per document is invalid */
        INVALID: `Each document must have a maximum of ${docValues.pages.MAX_PAGES} pages.`,
    },
    extension: {
        INVALID: `Invalid file format provided in one of the documents, only the following are accepted: ${Object.keys(docValues.extensions)}`,
    },
});
