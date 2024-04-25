import chatsRepository from "../../repositories/chats/chats.js";
import usersRepository from "../../repositories/users/users.js";
import permissionsRepository from "../../repositories/permissions/permissions.js";
import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import notificationTypesRepository from "../../repositories/notificationTypes/notificationTypes.js";
import relatedEntityTypesRepository from "../../repositories/relatedEntityTypes/relatedEntityTypes.js";
import notificationsRepository from "../../repositories/notifications/notifications.js";
import collaboratorsDTO from "../../dtos/colaborator/index.js";
import { BadRequestError, NotFoundError } from "../../utils/errors/index.js";
import { messages, notifications } from "../../utils/constants/index.js";

/**
 * Helper function that generates and saves a notification for a chat invitation
 * @param {*} from Owner of the chat that is inviting the other user
 * @param {*} to User that is being invited to the chat
 * @param {string} chatId Id of the chat that is being invited to
 */
const generateChatInviteNotification = async (from, to, chatId) => {
    const type = await notificationTypesRepository.getByName(notifications.types.names.chatInvitation);

    const relatedEntityType = await relatedEntityTypesRepository.getByName(notifications.relatedEntities.chat);

    return notificationsRepository.save({ from, to, type, relatedEntityType, relatedEntityId: chatId });
};

/**
 * Invites a new participant to a chat
 * @param {{email: string, permissions: Array.<string>}} newParticipant The participant to be invited and their permissions in the chat
 * @param {string} chatId The id of the chat where the participant should be added
 * @param {*} user The user that is inviting the participant to their chat
 * @returns The saved participant as it should be exposed in the web.
 */
const createByChatId = async (newParticipant, chatId, user) => {
    // Get and verify that the chat exists for this owner
    const savedChat = await chatsRepository.getByIdAndOwner(chatId, user._id);
    if (!savedChat) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Get and verify that the invited user exists
    const savedUser = await usersRepository.getByEmail(newParticipant.email);
    if (!savedUser) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Verify that the user isn't already invited (or is the owner of the chat)
    const foundCollaborator = await colaboratorsRepository.getByChatAndUser(chatId, savedUser._id);
    if (foundCollaborator) {
        throw new BadRequestError(messages.errors.validation.participant.ALREADY_INVITED);
    }

    // Verify that the permissions exists
    const savedPermissions = await permissionsRepository.getByAllowedActions(newParticipant.permissions);
    if (savedPermissions?.length !== newParticipant.permissions.length) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Save the collaborator instance
    const savedCollaborator = await colaboratorsRepository.save(
        collaboratorsDTO.newParticipantToColaboratorModel(savedUser, savedChat, savedPermissions)
    );

    // Generate the notification for the invited user
    await generateChatInviteNotification(user, savedUser, savedChat._id);

    return collaboratorsDTO.colaboratorToParticipantOutputDTO(savedCollaborator);
};

export default { createByChatId };
