import config from "@/config";
import chatsUrls from "./urls/chats";
import notificationsUrls from "./urls/notifications";
import searchingConsts from "./searching";

export default Object.freeze({
    /** Api searching and filtering related constants */
    searching: searchingConsts,
    /** Api URLs and resources */
    urls: {
        BASE: config.api.BASE_URL,
        /** Contains all chats resources urls */
        chats: chatsUrls,
        /** Contains all notifications resources urls */
        notifications: notificationsUrls,
    },
    /** API validation related constants */
    validation: {
        /** Api chats management endpoints related constants */
        chats: {
            /** Minimum amount of files to be uploaded for a chat */
            MIN_FILES_UPLOAD: 1,
            /** Maximum number of files to be uploaded at once */
            MAX_FILES_UPLOAD: 10,
            /** Maximum number of files a chat can have */
            MAX_FILE: 10,
            /** Maximum file size in bytes */
            MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
            /** Accepted formats for the files to be uploaded */
            ACCEPTED_FORMATS: {
                /** Contains the mimetype on key and the extensions on value */
                "application/pdf": [".pdf"],
            },
            /** Minimum length for chat names  */
            MIN_NAME_LENGTH: 1,
            /** Maximum length for chat names. */
            MAX_NAME_LENGTH: 32,
        },
        /** Api messages management endpoints related constants */
        messages: {
            /** Values of posible senders or receivers of messages ["AI", "Human"] */
            actor: ["AI", "Human"],
            /** Maximum length of a user message */
            MESSAGE_MAX_LENGTH: 4096,
        },
        /** Api participants management endpoints related constants */
        participants: {
            /** The allowed actions that can be selected as permissions for participants of a chat (NOTE: This should be in sync with the servers permissions)*/
            allowedActions: {
                /** The permission that allows for reading documents */
                READ_DOCS: "read_docs",
                /** THe permission that allows for uploading documents */
                UPLOAD_DOCS: "upload_docs",
            },
        },
        /** Api notifications management endpoints related constants */
        notifications: {
            /** Types of notifications */
            types: {
                /** Notification type for a new chat invitation */
                CHAT_INVITATION: "chat_invitation",
            },
            /** Types of related entities */
            relatedTypes: {
                /** Related type for a chat */
                chat: "chat",
            },
        },
    },
});
