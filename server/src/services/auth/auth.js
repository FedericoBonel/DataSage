import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import { ForbiddenError, NotFoundError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Authorizes a user to do some action in a chat
 *
 * NOTE: If the user is the owner of the chat then no actions are checked. They are allowed full access.
 * @param {string} chatId Id of the chat where the request is being made
 * @param {string} userId Id of the user where that is making the request
 * @param {Array.<string>} allowedActions Array of the actions that are needed to commit the action
 */
const authorizeCollaboratorToChat = async (chatId, userId, allowedActions) => {
    const colaboratorInstance = await colaboratorsRepository.getByChatAndUser(chatId, userId);

    // Check if the user is the owner
    if (colaboratorInstance?.chat.owner._id.toString() === userId) {
        return;
    }

    // Check if the chat exists
    if (!colaboratorInstance) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Verify required actions
    const colabAllowedActions = {};
    colaboratorInstance?.permissions.forEach((permission) => {
        colabAllowedActions[permission.allowedAction] = true;
    });

    if (!allowedActions.every((requiredAction) => colabAllowedActions[requiredAction])) {
        throw new ForbiddenError(messages.errors.auth.FORBIDDEN);
    }
};

export default { authorizeCollaboratorToChat };
