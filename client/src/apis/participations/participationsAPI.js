import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Joins a chat by id
 * @param {string} chatId Id of the chat to be joined
 * @returns The server response payload with the detailed chat information
 */
const joinChatById = async (chatId) => {
    return await makeRequest({
        url: api.urls.participations.createJoin(chatId),
        method: "post",
    });
};

/**
 * Exits a chat by id
 * @param {string} chatId Id of the chat to be exited
 * @returns The server response payload with the detailed chat information
 */
const exitChatById = async (chatId) => {
    return await makeRequest({
        url: api.urls.participations.createExit(chatId),
        method: "delete",
    });
};

export default {
    joinChatById,
    exitChatById,
};
