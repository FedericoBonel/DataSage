/** Imports and exports all constants in an encapsulated manner */
import errors from "./messages/en/errors";
import warnings from "./messages/en/warnings";
import chatsRoutes from "./routes/chats";
import apiConsts from "./api";

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
            NO_ITEMS: "There are no items to show",
        },
    },
    actions: {
        pagination: {
            LOAD_MORE: "Load more items",
        },
        form: {
            SUBMIT: "Submit",
            CANCEL: "Cancel",
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
        create: {
            LABEL: "New chat",
            form: {
                /** The title of the form */
                TITLE: "Start a new chat",
                /** The subtitle of the chat creation form */
                SUB_TITLE:
                    "Upload the PDF files you want to make questions about.",
                /** The label to be shown in the file selection field */
                FILE_FIELD:
                    "Select or drag and drop your files\n(only up to 10 PDF files are allowed for now)",
                /** The label to be shown in the name field */
                NAME_FIELD: "Chat Name",
                /** Creates the message to show to the user when more than one file is selected */
                createFilesSelectedFeedback: (numberFiles) =>
                    `${numberFiles} files selected`,
            },
        },
        update: {
            form: {
                /** The title of the form */
                TITLE: "Chat Information",
                /** The subtitle of the chat creation form */
                SUB_TITLE: "Manage how your chat is seen.",
                /** The label to be shown in the name field */
                NAME_FIELD: "Chat Name",
                /** The helper text of the name field */
                NAME_HELPER_TEXT:
                    "This is how your chat is shown to you and other participants.",
                /** Form buttons labels */
                buttons: {
                    ACCEPT: "Save changes",
                    CANCEL: "Reset changes"
                },
            },
        },
        settings: {
            /** Title to be shown in the chat settings page */
            PAGE_TITLE: "Chat Settings",
        },
        list: {
            SETTINGS_LABEL: "Chat settings",
        },
    },
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
