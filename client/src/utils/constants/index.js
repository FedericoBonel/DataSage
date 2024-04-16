/** Imports and exports all constants in an encapsulated manner */
import errors from "./messages/en/errors";
import warnings from "./messages/en/warnings";
import chatsRoutes from "./routes/chats";

/** Object with all messages to be shown to the user */
export const messages = Object.freeze({
    errors,
    warnings,
    navbar: {
        CHATS_OPTION: "Chats",
        SETTINGS_OPTION: "Settings",
    },
});

/** Object with all the routes used in the application */
export const routes = Object.freeze({
    /** Route to home */
    HOME: `${chatsRoutes.CHATS}`,
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
    chats: chatsRoutes,
});
