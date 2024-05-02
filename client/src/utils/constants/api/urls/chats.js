import config from "@/config";

const CHATS_RESOURCE = "chats";
const MSG_RESOURCE = "messages";

export default {
    /** Chats resource name */
    RESOURCE: CHATS_RESOURCE,
    /** Endpoint to get all chats */
    GET_ALL: `${config.api.BASE_URL}/${CHATS_RESOURCE}`,
    /** Endpoint to create a chat */
    CREATE: `${config.api.BASE_URL}/${CHATS_RESOURCE}`,
    /** Creates the endpoint to get a chat by id */
    createGetById: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}`,
    /** Creates the endpoint to update a chat by id */
    createPut: (chatId) => `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}`,
    /** Creates the endpoint to delete a chat by id */
    createDelete: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}`,
    /** Messages resource name */
    MSG_RESOURCE,
    /** Creates the chat messages get all endpoint */
    createGetAllMsgs: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${MSG_RESOURCE}`,
    /** Creates the echat messages upload endpoint */
    createCreateMsgs: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${MSG_RESOURCE}`,
};
