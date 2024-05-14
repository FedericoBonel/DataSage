import config from "@/config";
import chatsApiConsts from "./chats";
import participantsApiConsts from "./participants";

const PARTICIPATIONS_RESOURCE = "participation";

export default {
    /** Participation resource name */
    RESOURCE: PARTICIPATIONS_RESOURCE,
    /** Creates the endpoint to join a chat by id */
    createJoin: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${participantsApiConsts.RESOURCE}/${PARTICIPATIONS_RESOURCE}/`,
    /** Creates the endpoint to exit a chat by id */
    createExit: (chatId) =>
        `${config.api.BASE_URL}/${chatsApiConsts.RESOURCE}/${chatId}/${participantsApiConsts.RESOURCE}/${PARTICIPATIONS_RESOURCE}/`,
};
