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
        /** Contains all messages to be shown to the user on delete forever form fields. */
        deleteForever: {
            /** Contains all messages to be shown to the user on confirmation of delete forever actions. */
            confirmation: {
                /** Label of the field where that the user needs to fill to confirm deletion */
                FIELD_LABEL: "Confirm deletion",
                /** Value that has to be filled up by the user to confirm deletion */
                VALUE: "delete forever",
                /** Label of the button that confirms the delete action. */
                BUTTON_LABEL: "delete forever",
                /** 
                 * Generates the helper text for the field that has to be filled up by the user to confirm deletion.
                 * @param {string} confirmationValue Value the user has to fill up in the field to confirm deletion.
                 * @returns The message to be shown in the helper text of the field the user has to fill up to confirm deletion.
                 */
                generateHelperText: (confirmationValue) =>
                    `Insert "${confirmationValue}" to confirm deletion.`,
            },
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
        delete: {
            form: {
                TITLE: "Danger Zone - Delete Chat",
                SUB_TITLE:
                    "Deleting your chat will delete permanently all its uploaded files and data and will make it unaccessible by all participants. This action is not reversible.",
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
        messages: {
            /** The "usernames" of each chat actor (sender or receiver) to show in chats */
            actors: {
                /** The user username */
                USER: "You",
                /** The AI username */
                AI: "DataSage",
            },
            /** The message to be shown when the AI is generating a response */
            WRITING_RESPONSE: "DataSage is writing...",
            /** The chat message conversation input related variables */
            input: {
                /** Label of the input field */
                LABEL: "Chat Message Input",
                /** Placeholder of the input field */
                PLACEHOLDER: "Message to be sent to chat...",
            },
            sources: {
                /** Message that introduces the sources section (context used) of an AI generated message. */
                INTRODUCTION: "Sources:",
                /** Function that builds a single source text from a location page. (Should be used inside a link to the source). */
                buildSourceMessage: (locationPage) => `Page ${locationPage}`,
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
