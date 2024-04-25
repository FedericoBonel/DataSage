/** Imports and exports all constants in an encapsulated manner */
import errors from "./messages/en/errors";
import warnings from "./messages/en/warnings";
import info from "./messages/en/info";
import actions from "./messages/en/actions";
import navbar from "./messages/en/navbar";
import chats from "./messages/en/chats";
import chatsRoutes from "./routes/chats";
import apiConsts from "./api";

/** Object with all messages to be shown to the user */
export const messages = Object.freeze({
    /** Contains all GENERAL errors to be shown to the user (Normally the ones on error page). */
    errors,
    /** Contains all GENERAL warnings to be shown to the user (Normally in console or multiple pages/components). */
    warnings,
    /** Contains all GENERAL information messages to be shown to the user. */
    info,
    /** Contains all messages related to GENERAL actions (decisions the user can make) to be shown to the user. */
    actions,
    /** Contains all messages to be shown in the navbar of the application. */
    navbar,
    /** Contains all messages to be shown in the chats section of the application. */
    chats,
});

/** Object with all the routes used in the application */
export const routes = Object.freeze({
    /** Route to home */
    HOME: `${chatsRoutes.CHATS}`,
    /** Route to error pages */
    ERROR: "error",
    /** Route to settings */
    SETTINGS: "settings",
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

export const api = apiConsts;
