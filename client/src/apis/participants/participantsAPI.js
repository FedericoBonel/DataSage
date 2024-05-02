import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Invites a participant to a chat by id
 * @param {string} chatId Id of the chat to add the participant to
 * @param {object} newParticipant The new participant to be invited
 * @param {string} newParticipant.email The email of the participant to be invited
 * @param {Array.<string>} newParticipant.permissions The allowed actions to be assigned to the new participant
 * @returns The server response payload with the invited participant
 */
const inviteParticipantToChat = async (newParticipant, chatId) => {
    return makeRequest({
        url: api.urls.chats.createCreateParticipants(chatId),
        method: "post",
        data: newParticipant,
    });
};

/**
 * Gets a list of chat participants from the back end for the logged in user by chat id
 * @param {string} chatId The Id of the chat from which to get the participants
 * @param {object} filtering Filtering parameters
 * @param {string} filtering.textSearch String to search the list of chat participants by
 * @param {object} pagination Pagination parameters
 * @param {number} pagination.page Page number to get results from
 * @param {number} pagination.limit Number of results per page
 * @returns The server response payload with the list of participants
 */
const getParticipantsByChat = async (chatId, filtering, pagination) => {
    const params = {
        textSearch:
            filtering.textSearch === "" ? undefined : filtering.textSearch,
        page: pagination.page,
        limit: pagination.limit,
    };

    return await makeRequest({
        url: api.urls.chats.createGetAllParticipants(chatId),
        method: "get",
        params,
    });
};

/**
 * Gets a chat participant by id
 * @param {string} participantId The id of the participant
 * @param {string} chatId The id of the chat that contains this participant
 * @returns The server response payload with the chat participant with that id
 */
const getParticipantById = async (participantId, chatId) => {
    return await makeRequest({
        url: api.urls.chats.createGetParticipantById(chatId, participantId),
        method: "get",
    });
};

/**
 * Updates a chat by id.
 * @param {object} updatedParticipant The updated participant to be saved
 * @param {string} updatedParticipant.permissions New permissions of the participant
 * @param {string} chatId Id of the chat that contains this participant
 * @returns The promise that resolves to the updated participant
 */
const updateParticipantById = async (
    updatedParticipant,
    participantId,
    chatId
) => {
    return makeRequest({
        url: api.urls.chats.createPutParticipant(chatId, participantId),
        method: "put",
        data: updatedParticipant,
    });
};

/**
 * Deletes a participant from a chat by id
 * @param {string} participantId Id of the participant to remove from the chat
 * @param {string} chatId Id of the chat to remove the participant from
 * @returns The server response payload with the deleted participant
 */
const deleteParticipantFromChat = async (participantId, chatId) => {
    return makeRequest({
        url: api.urls.chats.createDeleteParticipant(chatId, participantId),
        method: "delete",
    });
};

export default {
    inviteParticipantToChat,
    getParticipantsByChat,
    getParticipantById,
    updateParticipantById,
    deleteParticipantFromChat,
};
