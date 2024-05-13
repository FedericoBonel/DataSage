import config from "@/config";
import chatsApiConsts from "./chats";

const DOCS_RESOURCE = "documents";

export default {
    /** Notifications resource name */
    RESOURCE: DOCS_RESOURCE,
    /** Creates the documents get all endpoint */
    createGetAll: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${DOCS_RESOURCE}`,
    /** Creates the documents upload endpoint */
    createCreate: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${DOCS_RESOURCE}`,
    /** Creates the document delete endpoint */
    createDelete: (chatId, docId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${DOCS_RESOURCE}/${docId}`,
};
