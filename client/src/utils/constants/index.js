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
        decision: {
            REMOVE: "Remove",
            DELETE: "Delete",
            CANCEL: "Cancel",
            ACCEPT: "Accept",
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
        formSections: {
            metadata: {
                /** Label of the name field */
                NAME_FIELD_LABEL: "Chat Name",
                /** The helper text of the name field */
                NAME_FIELD_HELPER:
                    "This is how your chat is shown to you and other participants.",
            },
            documents: {
                /** The label to be shown in the file selection field */
                FILE_FIELD:
                    "Select or drag and drop your files\n(only up to 10 PDF files that weight less than 10MB are allowed for now)",
                /** The message to be shown when an invalid file has been selected. */
                FILE_FIELD_INVALID_ALERT:
                    "Invalid files selected. Only valid ones will be uploaded.",
                /** Creates the message to show to the user when more than one file is selected */
                createFilesSelectedFeedback: (numberFiles) =>
                    `${numberFiles} files selected`,
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
            },
        },
        update: {
            form: {
                /** The title of the form */
                TITLE: "Chat Information",
                /** The subtitle of the chat creation form */
                SUB_TITLE: "Manage how your chat is seen.",
                /** Form buttons labels */
                buttons: {
                    ACCEPT: "Save changes",
                    CANCEL: "Reset changes",
                },
            },
        },
        settings: {
            /** Title to be shown in the chat settings page */
            PAGE_TITLE: "Chat Settings",
            files: {
                /** File management section title */
                TITLE: "Chat Files",
                /** File management section subtitle */
                SUBTITLE:
                    "Manage the PDF files you can make questions about. Any files listed here can be accessed by the chat to generate responses. If you remove files, the content of those will stop being known by the chat, and if you add files, new content will be known by the chat.",
            },
        },
        list: {
            SETTINGS_LABEL: "Chat settings",
            CHAT_SETTINGS_LABEL: "Settings",
            CHAT_SETTINGS_DESC: "Change chat name, files or delete the chat",
            PARTICIPANTS_SETTINGS_LABEL: "Manage Participants",
            PARTICIPANTS_SETTINGS_DESC: "Update who can access your chat",
        },
    },
    documents: {
        list: {
            /** Creates a message to be shown when listing documents for a chat. It tells the user how many files have been uploaded */
            createFilesUploadedMessage: (numberDocuments) =>
                `${numberDocuments} uploaded document${
                    numberDocuments > 1 ? "s" : ""
                }`,
        },
        upload: {
            MAX_REACHED:
                "No more documents can be uploaded to this chat. The limit has been reached.",
            form: {
                buttons: {
                    ACCEPT: "Upload documents",
                    CANCEL: "Remove documents",
                },
            },
        },
        delete: {
            form: {
                TITLE: "Deleting File",
                QUESTION:
                    "You are deleting a file. The content of the file will stop being known by the chat and you wont be able to ask questions about it any longer. All its data will be removed from the system.\nDo you wish to delete this file?",
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
