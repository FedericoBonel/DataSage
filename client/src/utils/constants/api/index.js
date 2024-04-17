import config from "@/config";
import chatsConsts from "./chats";
import searchingConsts from "./searching";

export default Object.freeze({
    /** Api searching and filtering related constants */
    searching: searchingConsts,
    /** Api URLs and resources */
    urls: {
        BASE: config.api.BASE_URL,
        chats: chatsConsts,
    },
});
