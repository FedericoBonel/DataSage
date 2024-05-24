/** Imports and exports all constants in an encapsulated manner */
import errors from "./messages/en/errors";
import warnings from "./messages/en/warnings";
import info from "./messages/en/info";
import actions from "./messages/en/actions";
import navbar from "./messages/en/navbar";
import account from "./messages/en/account";
import auth from "./messages/en/auth";
import chats from "./messages/en/chats";
import notifications from "./messages/en/notifications";
import chatsRoutes from "./routes/chats";
import notificationsRoutes from "./routes/notifications";
import accountsRoutes from "./routes/accounts";
import authRoutes from "./routes/auth";
import errorRoutes from "./routes/error";
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
    /** Contains all messages to be shown in the account management section of the application. */
    account,
    /** Contains all messages to be shown in the auth section of the application. */
    auth,
    /** Contains all messages to be shown in the chats section of the application. */
    chats,
    /** Contains all messages to be shown in the notifications section of the application */
    notifications,
});

/** Object with all the routes used in the application */
export const routes = Object.freeze({
    /** Route to home */
    HOME: `${chatsRoutes.CHATS}`,
    /** Route to error pages */
    ERROR: "error",
    /** Route to settings */
    SETTINGS: "settings",
    /** Contains all accounts related routes */
    accounts: accountsRoutes,
    /** Contains all authentication or authorization related routes */
    auth: authRoutes,
    /** Contains all error related routes */
    error: errorRoutes,
    /** Contains all chat related routes */
    chats: chatsRoutes,
    /** Contains all notification related routes */
    notifications: notificationsRoutes,
});

export const api = apiConsts;
