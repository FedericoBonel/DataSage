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
    info: {
        pagination: {
            NO_MORE: "No more items",
        },
    },
    actions: {
        pagination: {
            LOAD_MORE: "Load more items",
        },
    },
    chats: {
        filtering: {
            ownership: {
                OWNED: "owned",
                SHARED: "shared",
            },
            textSearch: {
                label: "Search by chat name",
            },
        },
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

export const api = Object.freeze({
    /** Holds all values that can be used for searching in back end */
    searching: {
        /** Search parameters values for chats */
        chats: {
            /** Allowed values for ownership filtering. ["self", "shared"] */
            owner: ["self", "shared"],
        },
        textSearch: {
            MAX_LENGTH: 255,
        },
    },
});
