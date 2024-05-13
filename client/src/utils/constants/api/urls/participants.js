import config from "@/config";
import chatsApiConsts from "./chats";

const PARTICIPANTS_RESOURCE = "participants";

export default {
    /** Participants resource name */
    RESOURCE: PARTICIPANTS_RESOURCE,
    /** Creates the chat participants upload endpoint */
    createCreate: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}`,
    /** Creates the chat participants get all endpoint */
    createGetAll: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}`,
    /** Creates the chat participants get by id endpoint */
    createGetById: (chatId, participantId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}/${participantId}`,
    /** Creates the endpoint to update a participant by id */
    createPut: (chatId, participantId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}/${participantId}`,
    /** Creates the chat participants delete by id endpoint */
    createDelete: (chatId, participantId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${PARTICIPANTS_RESOURCE}/${participantId}`,
};
