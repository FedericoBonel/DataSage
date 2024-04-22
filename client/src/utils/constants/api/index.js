import config from "@/config";
import chatsConsts from "./chats";
import searchingConsts from "./searching";

export default Object.freeze({
    /** Api searching and filtering related constants */
    searching: searchingConsts,
    /** Api URLs and resources */
    urls: {
        BASE: config.api.BASE_URL,
        chats: chatsConsts,
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
    },
});
