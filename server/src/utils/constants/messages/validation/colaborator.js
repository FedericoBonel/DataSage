import colaboratorValidation from "../../validation/colaborator.js";

/** Contains all colaborator validation error messages to be used in the application. */
export default Object.freeze({
    user: {
        /** Message to be shown when the colaborator user is not provided while saving a colaborator instance. */
        MISSING: "You need to provide a valid colaborator user when registering a colaborator instance in a chat.",
        /** Message to be shown when the user colaborator id is invalid */
        INVALID_ID: "You need to provide the user colaborator id as a string.",
    },
    chat: {
        /** Message to be shown when the colaborator chat is not provided while saving a colaborator instance. */
        MISSING: "You need to provide the chat you are registering the colaborator instance for.",
        /** Message to be shown when the chat for which the colaboration was created is invalid */
        INVALID_ID: "You need to provide the chat colaborator id as a string.",
    },
    permissions: {
        /** Message to be shown when the permissions for a colaborator id is invalid */
        INVALID_ID: "You need to provide the colaborator permission id as a string.",
        /** Message to be shown when the amount of permissions for a colaborator is invalid */
        INVALID_AMOUNT: `You need to provide from ${0} permissions up to ${colaboratorValidation.permissions.MAX_AMOUNT}`,
    },
});
