import { isLength, isInt } from "validator";
import api from "../../constants/api";

export default Object.freeze({
    /** 
     * Validates contents of a new chat. 
     * @returns True if valid, false otherwise
     */
    newChat: ({ name, files }) =>
        isLength(name, {
            min: api.validation.chats.MIN_NAME_LENGTH,
            max: api.validation.chats.MAX_NAME_LENGTH,
        }) &&
        isInt(String(files.length), {
            min: api.validation.chats.MIN_FILES_UPLOAD,
            max: api.validation.chats.MAX_FILES_UPLOAD,
        }),
});
