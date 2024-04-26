import chatsRepository from "../../repositories/chats/chats.js";
import usersRepository from "../../repositories/users/users.js";
import permissionsRepository from "../../repositories/permissions/permissions.js";
import collaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import notificationTypesRepository from "../../repositories/notificationTypes/notificationTypes.js";
import relatedEntityTypesRepository from "../../repositories/relatedEntityTypes/relatedEntityTypes.js";
import notificationsRepository from "../../repositories/notifications/notifications.js";
import collaboratorsDTO from "../../dtos/colaborator/index.js";
import { BadRequestError, NotFoundError } from "../../utils/errors/index.js";
import { messages, notifications } from "../../utils/constants/index.js";
import calculateSkip from "../../utils/db/calculateSkip.js";

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
    const foundCollaborator = await collaboratorsRepository.getByChatAndUser(chatId, savedUser._id, null);
    if (foundCollaborator) {
        throw new BadRequestError(messages.errors.validation.participant.ALREADY_INVITED);
    }

    // Verify that the permissions exists
    const savedPermissions = await permissionsRepository.getByAllowedActions(newParticipant.permissions);
    if (savedPermissions?.length !== newParticipant.permissions.length) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Save the collaborator instance
    const savedCollaborator = await collaboratorsRepository.save(
        collaboratorsDTO.newParticipantToColaboratorModel(savedUser, savedChat, savedPermissions)
    );

    // Generate the notification for the invited user
    await generateChatInviteNotification(user, savedUser, savedChat._id);

    return collaboratorsDTO.colaboratorToParticipantOutputDTO(savedCollaborator);
};

/**
 * Retrieves a list of participants from a chat by id based on provided parameters.
 * @param {string} userId The Id of the user that is logged in.
 * @param {Object} [filtering={}] Filtering options. This will filter out values in the result.
 * @param {string} [filtering.textSearch=undefined] Text search query. Filters values to only those that match this text search in the participant's names, lastnames or email.
 * @param {Object} [pagination={}] Pagination options.
 * @param {number} [pagination.page=undefined] Page number.
 * @param {number} [pagination.limit=undefined] Limit per page.
 * @returns The list of chat participants that matches the parameters.
 */
const getByChatId = async (
    chatId,
    userId,
    filtering = { textSearch: undefined },
    pagination = { page: 1, limit: 10 }
) => {
    // Verify the chat exists for this owner
    const foundChat = await chatsRepository.getByIdAndOwner(chatId, userId);
    if (!foundChat) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    const skip = calculateSkip(pagination.page, pagination.limit);
    const foundCollabs = await collaboratorsRepository.getAllByChatAndUserTextMatch(
        chatId,
        { textSearch: filtering.textSearch, chatOwnerId: userId },
        { skip, limit: pagination.limit, sort: "-createdAt" }
    );

    const result = [];
    foundCollabs.forEach((collab) => {
        // Filter out the logged in user that is requesting for this list
        if (collab.user._id.toString() !== userId)
            result.push(collaboratorsDTO.colaboratorToParticipantExcerptOutputDTO(collab));
    });

    return result;
};

/**
 * Retrieves a participant from a chat by chat id and participant id.
 * @param {string} participantId Id of the participant to get from the chat.
 * @param {string} chatId Id of the chat from which to get the participant from.
 * @param {string} userId The Id of the user that is logged in.
 * @returns The participant that matches the parameters.
 */
const getById = async (participantId, chatId, userId) => {
    const foundCollab = await collaboratorsRepository.getByChatOwnerAndUser(chatId, userId, participantId);
    if (!foundCollab) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return collaboratorsDTO.colaboratorToParticipantOutputDTO(foundCollab);
};

/**
 * Updates a participant by chat and participant id
 * @param {{permissions: Array.<string>}} updatedParticipant The participant updates to be applied.
 * @param {string} participantId Id of the participant to updated in the chat.
 * @param {string} chatId Id of the chat from which to update the participant from.
 * @param {string} userId The id of the logged in user
 * @returns The participant after being updated and as it should be exposed to the web.
 */
const updateById = async (updatedParticipant, participantId, chatId, userId) => {
    const savedPermissions = await permissionsRepository.getByAllowedActions(updatedParticipant.permissions);
    if (savedPermissions.length !== updatedParticipant.permissions.length) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    const savedCollab = await collaboratorsRepository.updateByChatOwnerAndUser(
        collaboratorsDTO.updateParticipantToColaboratorModel(savedPermissions),
        chatId,
        userId,
        participantId
    );
    if (!savedCollab) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return collaboratorsDTO.colaboratorToParticipantOutputDTO(savedCollab);
};

/**
 * Deletes a participant from a chat by id and all its related messages and notifications.
 * @param {*} participantId Id of the participant (user) to delete from the chat.
 * @param {*} chatId Id of the chat where the participant needs to be removed from.
 * @param {*} userId Id of the owner (logged in user) of the chat who is making the request to remove this participant.
 * @returns The deleted participant as it should be exposed to the web and was before deletion.
 */
const deleteById = async (participantId, chatId, userId) => {
    if (participantId === userId) {
        throw new BadRequestError(messages.errors.validation.participant.DELETING_ONESELF);
    }

    const deletedCollab = await collaboratorsRepository.deleteByChatOwnerAndUser(chatId, userId, participantId);

    if (!deletedCollab) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return collaboratorsDTO.colaboratorToParticipantOutputDTO(deletedCollab);
};

export default { createByChatId, getByChatId, getById, updateById, deleteById };
