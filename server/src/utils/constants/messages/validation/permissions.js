import permissionsValidation from "../../validation/permissions.js";

/** Contains all pages validation error messages to be used in the application. */
export default Object.freeze({
    allowedAction: {
        /** Message to be shown when the allowed action for a permission has an invalid length */
        INVALID_LENGTH: `The allowed action for a permission should be a string with a length between ${permissionsValidation.allowedActions.MIN_LENGTH} and ${permissionsValidation.allowedActions.MAX_LENGTH}`,
    },
});
