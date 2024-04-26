import notificationsRepository from "../../repositories/notifications/notifications.js";
import notificationsDTO from "../../dtos/notifications/index.js";

/**
 * Retrieves the count of unread notifications for a given user Id (normally logged in user).
 * @param {string} userId The Id of the user from which to check for not read notifications.
 * @returns The total count of unread notifications as it should be exposed to the web.
 */
const getNotReadCount = async (userId) => {
    const notReadCount = await notificationsRepository.countByIsReadAndTo(false, userId);

    return notificationsDTO.toNotificationCountDTO(notReadCount);
};

export default { getNotReadCount };
