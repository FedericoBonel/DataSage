import { api } from "@/utils/constants";
import { makeRequest } from "@/lib/axios";

/**
 * Gets the number of notifications that have not been read by the logged in user.
 * @returns The server response payload with the number of notifications
 */
const getNotReadCount = async () => {
    return await makeRequest({
        url: api.urls.notifications.GET_NOT_READ,
        method: "get",
    });
};

/**
 * Gets a list of notifications from the back end for the logged in user
 * @param {object} filtering Filtering parameters
 * @param {string} filtering.isRead Whether or not only read notifications or not read notifications should be fetched.
 * @param {object} pagination Pagination parameters
 * @param {number} pagination.page Page number to get results from
 * @param {number} pagination.limit Number of results per page
 * @returns The server response payload with the list of notifications
 */
const getNotifications = async (filtering, pagination) => {
    const params = {
        isRead: filtering.isRead,
        page: pagination.page,
        limit: pagination.limit,
    };

    return await makeRequest({
        url: api.urls.notifications.GET_ALL,
        method: "get",
        params,
    });
};

/**
 * Deletes a notification by id
 * @param {string} notificationId Id of the notification to be deleted
 * @returns The server response payload with the deleted notification
 */
const deleteNotificationById = async (notificationId) => {
    return await makeRequest({
        url: api.urls.notifications.createDelete(notificationId),
        method: "delete",
    });
};

export default {
    getNotReadCount,
    getNotifications,
    deleteNotificationById,
};
