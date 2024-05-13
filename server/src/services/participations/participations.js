import collaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import collaboratorsDTO from "../../dtos/colaborator/index.js";
import { BadRequestError, NotFoundError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Accepts a chat invitation by chat id allowing the logged in user to join and use it
 * @param {string} chatId The id of the chat from which the user is accepting the invite
 * @param {string} userId The id of the logged in user that is accepting the invitation
 * @returns The joined chat as it should be exposed in the web.
 */
const joinChatById = async (chatId, userId) => {
    const updatedCollab = await collaboratorsRepository.updateByChatUserAndHasJoined(
        { hasJoined: true },
        chatId,
        userId,
        false
    );
    if (!updatedCollab) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return collaboratorsDTO.colaboratorToChatDetailsOutputDTO(updatedCollab);
};

/**
 * Leaves a chat by id allowing the logged in user to delete all of their messages with it and stop accessing it.
 * @param {string} chatId The id of the chat the user is leaving
 * @param {string} userId The id of the logged in user that is leaving the chat
 * @returns The left chat information for the user as it was before leaving and should be exposed in the web.
 */
const leaveChatById = async (chatId, userId) => {
    // Verify the collab exists and that the user isn't the owner
    const savedCollab = await collaboratorsRepository.getByChatAndUser(chatId, userId);
    if (!savedCollab) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }
    if (savedCollab.chat.owner._id.toString() === userId) {
        throw new BadRequestError(messages.errors.validation.participation.OWNER_CANT_LEAVE);
    }

    const deletedCollab = await collaboratorsRepository.deleteByChatOwnerAndUser(chatId, savedCollab.chat.owner._id, userId);

    return collaboratorsDTO.colaboratorToChatDetailsOutputDTO(deletedCollab);
};

export default { joinChatById, leaveChatById };
