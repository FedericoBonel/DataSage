import chatMessageValidation from "../../validation/messages.js";

/** Contains all chat messages error messages to be used in the application. */
export default Object.freeze({
    /** Message to be shown when from or to value is invalid */
    INVALID_ACTOR: `The parameter receiver of a message or the emiter must be either of the following values: ${Object.values(chatMessageValidation.actors)}`,
    /** Message to be shown when the length of a message is invalid */
    INVALID_LENGTH: `The length of the message is invalid. It must be a string between ${chatMessageValidation.MIN_LENGTH} and ${chatMessageValidation.MAX_LENGTH} characters`,
    /** Message to be shown when there are too many sources being provided for a message */
    TOO_MANY_SOURCES: `You can only provide up to ${chatMessageValidation.sources} sources for a message.`,
});
