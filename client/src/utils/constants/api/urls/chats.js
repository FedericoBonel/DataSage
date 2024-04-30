import config from "@/config";

const CHATS_RESOURCE = "chats";
const DOCS_RESOURCE = "documents";
const MSG_RESOURCE = "messages";
const PARTICIPANTS_RESOURCE = "participants";

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
    /** Documents resource name */
    DOCS_RESOURCE,
    /** Creates the documents get all endpoint */
    createGetAllDocs: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${DOCS_RESOURCE}`,
    /** Creates the documents upload endpoint */
    createCreateDocs: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${DOCS_RESOURCE}`,
    /** Creates the document delete endpoint */
    createDeleteDoc: (chatId, docId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${DOCS_RESOURCE}/${docId}`,
    /** Messages resource name */
    MSG_RESOURCE,
    /** Creates the chat messages get all endpoint */
    createGetAllMsgs: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${MSG_RESOURCE}`,
    /** Creates the echat messages upload endpoint */
    createCreateMsgs: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${MSG_RESOURCE}`,
    /** Creates the chat participants upload endpoint */
    createCreateParticipants: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}`,
    /** Creates the chat participants get all endpoint */
    createGetAllParticipants: (chatId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}`,
    /** Creates the chat participants get by id endpoint */
    createGetParticipantById: (chatId, participantId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}/${participantId}`,
    /** Creates the endpoint to update a participant by id */
    createPutParticipant: (chatId, participantId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}/${participantId}`,
    /** Creates the chat participants delete by id endpoint */
    createDeleteParticipant: (chatId, participantId) =>
        `${config.api.BASE_URL}/${CHATS_RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}/${participantId}`,
};
