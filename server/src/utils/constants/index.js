/** Imports and exports all constants in an encapsulated manner */
import infoMessages from "./messages/info.js"
import errorMessages from "./messages/errors.js";

export const messages = Object.freeze({
    // Informational messages
    info: infoMessages,
    // General errors
    errors: errorMessages,
});
