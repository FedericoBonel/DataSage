import config from "@/config";

const CHATS_RESOURCE = "chats";

export default Object.freeze({
    /** Chats resource name */
    RESOURCE: CHATS_RESOURCE,
    /** Endpoint to get all chats */
    GET_ALL: `${config.api.BASE_URL}/${CHATS_RESOURCE}`,
});
