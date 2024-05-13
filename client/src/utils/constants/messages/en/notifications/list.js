export default Object.freeze({
    /** Message to be shown as the title of the notifications list */
    TITLE: "Notifications",
    /** Contains the messages to be shown in the list items */
    item: {
        /** Contains the messages to be shown in notifications that are chat invitations */
        chatInvitation: {
            /** Message to be shown between the user names and last names and the notifications entitiy */
            PRIMARY_CONNECTOR: "invited you to a",
            /** Message to be shown to reference the chat entity */
            PRIMARY_SUBJECT: "chat",
            /** Message to be shown at the beggining of the notifications secondary content. */
            SECONDARY_PREFIX: "Chats -",
        },
    },
    /** Contains the messages to be shown in the list filtering options */
    filtering: {
        /** Message to be shown in the not read tab filtering option */
        NOT_READ: "Not Read",
        /** Message to be shown in the read tab filtering option */
        READ: "Read",
    },
});
