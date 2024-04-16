/** Imports and exports all constants in an encapsulated manner */
import errors from "./messages/en/errors";
import warnings from "./messages/en/warnings";

/** Object with all messages to be shown to the user */
export const messages = Object.freeze({
    errors,
    warnings,
});

/** Object with all the routes used in the application */
export const routes = Object.freeze({
    /** Route to home */
    HOME: "",
    /** Route to error pages */
    ERROR: "error",
    LOGIN: "login",
    auth: {
        /** Route to login page */
        LOGIN: "login",
    },
    error: {
        /** Route to error pages */
        ERROR: "error",
    },
});
