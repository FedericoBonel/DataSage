export default {
    /** Contains all messages to be shown when filtering a list of chats. */
    filtering: {
        /** Contains all messages related to filtering on ownership of chats. */
        ownership: {
            /** The message to be shown as the label to be shown to filter list of chats by only those that are owned by the user */
            OWNED: "owned",
            /** The message to be shown as the label to be shown to filter list of chats by only those that are shared by the user */
            SHARED: "shared",
        },
        /** Contains all messages related to searching through the list of chats by text */
        textSearch: {
            /** The message to be shown as the label of the field to text search through the list of chats */
            label: "Search by chat name",
        },
    },
    /** Contains all messages to be shown in each item of the chat list. */
    item: {
        /** Contains all messages to be shown in the settings section of the chat list item. */
        settings: {
            /** The message to be presented as the label of the chat settings menu option on each chat item. */
            LABEL: "Chat settings",
            /** Contains all messages related to chat settings. */
            chat: {
                /** The message to be shown as the label for navigating to the chat settings. */
                LABEL: "Settings",
                /** The message to be shown under the label for navigating to the chat settings explaining what you can do in the chat settings. */
                DESC: "Change chat name, files or delete the chat",
            },
            /** Contains all messages related to participants settings. */
            participants: {
                /** The message to be shown as the label for navigating to the participants management screen. */
                LABEL: "Manage Participants",
                /** The message to be shown under the label for navigating to the participants management screen explaining what you can do in the participants management screen. */
                DESC: "Update who can access your chat",
            },
        },
    },
};