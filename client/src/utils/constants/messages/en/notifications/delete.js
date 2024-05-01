export default Object.freeze({
    /** Contains all messages to be shown in delete dialogs for chat invitations notifications */
    chatInvitation: {
        /** Message to be shown in the dialogs title */
        TITLE: "Deleting Chat Invitation",
        /** Message to be shown as the confirmation dialogs question */
        QUESTION:
            "You are about to delete the invitation.\nThis will delete all of its information and you won't be able to access it again. The user that invited you won't be notified of this action.\nDo you wish to delete this chat invitation?",
    },
    /** Message to be shown when a notification was deleted */
    SUCCESS: "The notification was deleted successfully",
});
