import notificationsRepository from "../../repositories/notifications/notifications.js";
import notificationsDTO from "../../dtos/notifications/index.js";
import calculateSkip from "../../utils/db/calculateSkip.js";
import NotFoundError from "../../utils/errors/NotFoundError.js";
import { messages } from "../../utils/constants/index.js";

/**
 * Retrieves a list of notifications for the logged in user based on provided parameters.
 * @param {string} userId The Id of the user that is logged in for which to get the notifications.
 * @param {Object} [filtering] Filtering options. This will filter out values in the result.
 * @param {boolean} [filtering.isRead] If true it will retrieve only the notifications the user has read, otherwise it will retrieve the not read notificaitons. If not provided it will return everything.
 * @param {Object} [pagination] Pagination options.
 * @param {number} [pagination.page] Page number.
 * @param {number} [pagination.limit] Limit per page.
 * @returns The list of notifications that matches the parameters.
 */
const get = async (userId, filtering = { isRead: undefined }, pagination = { page: 1, limit: 10 }) => {
    const skip = calculateSkip(pagination.page, pagination.limit);

    const notificationsForUser = await notificationsRepository.getAllBy(
        { toId: userId, isRead: filtering.isRead },
        { skip, limit: pagination.limit, sort: "-createdAt" }
    );

    return notificationsForUser.map((notification) => notificationsDTO.toNotificationOutputDTO(notification));
};

/**
 * Retrieves the count of unread notifications for a given user Id (normally logged in user).
 * @param {string} userId The Id of the user from which to check for not read notifications.
 * @returns The total count of unread notifications as it should be exposed to the web.
 */
const getNotReadCount = async (userId) => {
    const notReadCount = await notificationsRepository.countByIsReadAndTo(false, userId);

    return notificationsDTO.toNotificationCountDTO(notReadCount);
};

/**
 * Updates a user notification by id that belongs to a user.
 * @param {*} updates The updates to be applied to the notification.
 * @param {string} notificationId The Id of the notification to update.
 * @param {string} userId The Id of the logged in user the notification belongs to.
 * @returns The updated notification as it should be exposed to the web.
 */
const updateById = async (updates, notificationId, userId) => {
    const updatedNotification = await notificationsRepository.updateByIdAndTo(updates, notificationId, userId);
    if (!updatedNotification) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    return notificationsDTO.toNotificationOutputDTO(updatedNotification);
};

export default { getNotReadCount, get, updateById };
