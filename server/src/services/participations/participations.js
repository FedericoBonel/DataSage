import collaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import collaboratorsDTO from "../../dtos/colaborator/index.js";
import { NotFoundError } from "../../utils/errors/index.js";
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

export default { joinChatById };
