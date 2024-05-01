import config from "@/config";
import chatsApiConsts from "./chats";

const PARTICIPATIONS_RESOURCE = "participation";

export default {
    /** Participation resource name */
    RESOURCE: PARTICIPATIONS_RESOURCE,
    /** Creates the endpoint to join a chat by id */
    createJoin: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${chatsApiConsts.PARTICIPANTS_RESOURCE}/${PARTICIPATIONS_RESOURCE}/`,
};
