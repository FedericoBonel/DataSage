import chatValues from "../../validation/chat.js";

/** Contains all chat validation error messages to be used in the application. */
export default Object.freeze({
    name: {
        /** Message to be shown when the name is invalid */
        INVALID_LENGTH: `The name of a chat must be a UNIQUE string between ${chatValues.name.MIN_LENGTH} and ${chatValues.name.MAX_LENGTH}`,
    },
    owner: {
        /** Message to be shown when the chat owners id is invalid */
        INVALID_ID: "You need to provide the chats owner id as a string.",
        /** Message to be shown when the chat owner is not provided while saving a chat. */
        MISSING: "You need to provide a valid chat owner when registering a chat.",
    },
    documents: {
        /** Message to be shown when the amount of documents per chat is invalid */
        INVALID_AMOUNT: `The number of documents must be between ${1} and ${chatValues.documents.MAX_AMOUNT}`,
        /** Message to be shown when the amount of documents per chat is invalid */
        REPEATED_NAMES: "The documents uploaded for a chat at once must have unique names.",
    },
    filtering: {
        /** Message to be shown when an ownership field is incorrect while querying */
        INVALID_OWNERSHIP: `The allowed ownership filters are the following: ${chatValues.filtering.OWNERSHIP_ALLOWED}`,
    }
});
