import config from "@/config";

const CHATS_RESOURCE = "chats";
const DOCS_RESOURCE = "documents";

export default Object.freeze({
    /** Chats resource name */
    RESOURCE: CHATS_RESOURCE,
    /** Endpoint to get all chats */
    GET_ALL: `${config.api.BASE_URL}/${CHATS_RESOURCE}`,
    /** Endpoint to create a chat */
    CREATE: `${config.api.BASE_URL}/${CHATS_RESOURCE}`,
    /** Documents resource name */
    DOCS_RESOURCE,
});
