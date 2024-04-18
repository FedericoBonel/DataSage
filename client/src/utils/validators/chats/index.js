import { isLength, isInt } from "validator";
import api from "../../constants/api";

export default Object.freeze({
    /**
     * Validates contents of a new chat.
     * @returns True if valid, false otherwise
     */
    newChat: ({ name, documents }) =>
        isLength(name, {
            min: api.validation.chats.MIN_NAME_LENGTH,
            max: api.validation.chats.MAX_NAME_LENGTH,
        }) &&
        isInt(String(documents.length), {
            min: api.validation.chats.MIN_FILES_UPLOAD,
            max: api.validation.chats.MAX_FILES_UPLOAD,
        }),
    /**
     * Validates contents of an update to a chat.
     * @returns True if valid, false otherwise
     */
    updateChat: ({ name }) =>
        isLength(name, {
            min: api.validation.chats.MIN_NAME_LENGTH,
            max: api.validation.chats.MAX_NAME_LENGTH,
        }),
    /**
     * Validates if the user has reached the maximum amount of uploaded documents allowed in a chat.
     * @param {Array.<*>} documents Array of saved documents
     * @returns True if it has reached the doc limit, false otherwise.
     */
    isUnderDocsLimit: (documents) =>
        documents.length < api.validation.chats.MAX_FILE,
});
