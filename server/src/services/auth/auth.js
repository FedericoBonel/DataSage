import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import { ForbiddenError, NotFoundError } from "../../utils/errors/index.js";
import { messages } from "../../utils/constants/index.js";
import verifyPermissions from "../../utils/permissions/verifyChatPermissions.js";

/**
 * Authorizes a user to do some action in a chat
 *
 * NOTE: If the user is the owner of the chat then no actions are checked. They are allowed full access.
 * @param {string} chatId Id of the chat where the request is being made
 * @param {string} userId Id of the user where that is making the request
 * @param {Array.<string>} requiredActions Array of the actions that are needed to commit the action
 * @returns The found collaborator instance
 */
const authorizeCollaboratorToChat = async (chatId, userId, requiredActions) => {
    const colaboratorInstance = await colaboratorsRepository.getByChatAndUser(chatId, userId);

    // Check if the chat exists for the user
    if (!colaboratorInstance) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Verify permissions and ownership
    const hasAccess = verifyPermissions(
        requiredActions,
        colaboratorInstance.permissions,
        colaboratorInstance.chat.owner._id.toString() === colaboratorInstance.user._id.toString()
    );

    if (!hasAccess) {
        throw new ForbiddenError(messages.errors.auth.FORBIDDEN);
    }

    return colaboratorInstance;
};

export default { authorizeCollaboratorToChat };
