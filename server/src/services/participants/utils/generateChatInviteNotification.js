import notificationsRepository from "../../../repositories/notifications/notifications.js";
import notificationTypesRepository from "../../../repositories/notificationTypes/notificationTypes.js";
import relatedEntityTypesRepository from "../../../repositories/relatedEntityTypes/relatedEntityTypes.js";
import { notifications } from "../../../utils/constants/index.js";

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

export default generateChatInviteNotification;