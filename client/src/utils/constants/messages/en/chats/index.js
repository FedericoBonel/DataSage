import chatLists from "./list";
import chatDocuments from "./documents";
import chatCreation from "./create";
import chatUpdate from "./update";
import chatDelete from "./delete";
import chatSettings from "./settings";
import chatParticipants from "./participants";
import chatMessages from "./messages";

export default Object.freeze({
    /** Contains general messages to be shown to the user in chat form sections. */
    formSections: {
        /** Contains all messages to be shown to the user in the metadata section of the chat forms. */
        metadata: {
            /** Label of the name field */
            NAME_FIELD_LABEL: "Chat Name",
            /** The helper text of the name field */
            NAME_FIELD_HELPER:
                "This is how your chat is shown to you and other participants.",
        },
    },
    /** Contains all messages related to chat documents. */
    documents: chatDocuments,
    /** Contains all messages related to chat creation */
    create: chatCreation,
    /** Contains all messages related to chat updating */
    update: chatUpdate,
    /** Contains all messages related to chat deleting */
    delete: chatDelete,
    /** Contains all messages to be shown in the chat settings page */
    settings: chatSettings,
    /** Contains all messages to be shown in the chat participants management page */
    participants: chatParticipants,
    /** Contains all messages to be shown in the chat messages section (Chatting). */
    messages: chatMessages,
    /** Contains all messages to be shown in chat listings. */
    list: chatLists,
});
